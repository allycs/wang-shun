namespace WangShunManager.Modules.ApiModules
{
    using Flurl;
    using Flurl.Http;
    using Nancy;
    using Nancy.ModelBinding;
    using System;
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiOutStockModule : BaseModule
    {
        public ApiOutStockModule()
        {
            Get("/out-stock", _ => GetOutStockAsync());
            Get("/out-stock-count", _ => CountOutStockAsync());
            Get("/out-stock-log", _ => GetOutStockLockAsync());
        }

        private async Task<Response> CountOutStockAsync()
        {
            var result = await "http://vm.tongyun188.com:12009/PreCardStock"
                         .AppendPathSegment("GetPreCardStockList")
                         .PostJsonAsync(new { PageIndex = 1, PageSize = 1, StartTime = "2015/05/05", EndTime = DateTime.Now })
                         .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> GetOutStockAsync()
        {
            var model = this.Bind<OutStockModel>();
            model.ParValue = model.ParValue == -1 ? null : model.ParValue;
            model.State = model.State == -1 ? null : model.State;
            model.CategoryId = model.CategoryId == -1 ? null : model.CategoryId;
            return Response.AsJson(await "http://vm.tongyun188.com:12009/PreCardStock"
                    .AppendPathSegment("GetPreCardStockList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<OutStockRowDto>>>().ConfigureAwait(false));
        }

        private async Task<Response> GetOutStockLockAsync()
        {
            var model = this.Bind<OutStockLogModel>();
            return Response.AsJson(await "http://vm.tongyun188.com:12009/PreCardStock"
                    .AppendPathSegment("GetPreCardStockLog")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<OutStockLogRowDto>>>().ConfigureAwait(false));
        }
    }
}