using Flurl;
using Flurl.Http;
using Nancy;
using Nancy.ModelBinding;
namespace WangShunManager.Modules.ApiModules
{
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiCapitalDetailsModule : BaseModule
    {
        public ApiCapitalDetailsModule()
        {
            Get("/capital-details", _ => GetCapitalDetailsAsync());
        }

        private async Task<Response> GetCapitalDetailsAsync()
        {
            var model = this.Bind<CapitalDetailsModel>();
            if (model.UserId == null && model.Status == null && model.Type == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetAccountstatementList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize,model.StartTime,model.EndTime })
                      .ReceiveJson<ResponseDto<PageDataDto<CapitalDetailsRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.UserId == null && model.Status == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                   .AppendPathSegment("GetAccountstatementList")
                   .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.Type })
                   .ReceiveJson<ResponseDto<PageDataDto<CapitalDetailsRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.UserId == null && model.Type == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                  .AppendPathSegment("GetAccountstatementList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.Status })
                  .ReceiveJson<ResponseDto<PageDataDto<CapitalDetailsRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.Status == null && model.Type == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                  .AppendPathSegment("GetAccountstatementList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.UserId })
                  .ReceiveJson<ResponseDto<PageDataDto<CapitalDetailsRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.UserId == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetAccountstatementList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.Status, model.Type })
                      .ReceiveJson<ResponseDto<PageDataDto<CapitalDetailsRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.Type == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetAccountstatementList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.Status, model.UserId })
                      .ReceiveJson<ResponseDto<PageDataDto<CapitalDetailsRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.Status == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetAccountstatementList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.Type, model.UserId })
                      .ReceiveJson<ResponseDto<PageDataDto<CapitalDetailsRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            return Response.AsJson(await "http://vm.tongyun188.com:12009/Finance"
                    .AppendPathSegment("GetAccountstatementList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<CapitalDetailsRowDto>>>().ConfigureAwait(false));
        }
    }
}