namespace WangShunManager.Modules.ApiModules
{
    using Flurl;
    using Flurl.Http;
    using Nancy;
    using Nancy.ModelBinding;
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiMemberWithdrawModule : BaseModule
    {
        public ApiMemberWithdrawModule()
        {
            Get("/member-withdraw", _ => GetMemberWidthdrawAsync());
        }

        private async Task<Response> GetMemberWidthdrawAsync()
        {
            var model = this.Bind<MemberWithdrawModel>();
            if (model.StartTime == null && model.EndTime == null && model.UserId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetWithdrawList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize })
                      .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.StartTime == null && model.EndTime == null && model.UserId == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                   .AppendPathSegment("GetWithdrawList")
                   .PostJsonAsync(new { model.PageIndex, model.PageSize, model.State })
                   .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.StartTime == null && model.EndTime == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                  .AppendPathSegment("GetWithdrawList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.UserId })
                  .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.StartTime == null && model.UserId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                  .AppendPathSegment("GetWithdrawList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.EndTime })
                  .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.EndTime == null && model.UserId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                  .AppendPathSegment("GetWithdrawList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime })
                  .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.UserId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetWithdrawList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime })
                      .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.EndTime == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetWithdrawList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.UserId })
                      .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.EndTime == null && model.UserId == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetWithdrawList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.State })
                      .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetWithdrawList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.EndTime, model.UserId, model.StartTime })
                      .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.UserId == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetWithdrawList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.EndTime, model.State, model.StartTime })
                      .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.StartTime == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetWithdrawList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.UserId, model.State, model.EndTime })
                      .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.EndTime == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Finance"
                      .AppendPathSegment("GetWithdrawList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.UserId, model.State, model.StartTime })
                      .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            return Response.AsJson(await "http://vm.tongyun188.com:12009/Finance"
                    .AppendPathSegment("GetWithdrawList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false));
        }
    }
}