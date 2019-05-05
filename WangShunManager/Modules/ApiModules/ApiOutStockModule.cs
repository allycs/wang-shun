using Flurl;
using Flurl.Http;
using Nancy;
using Nancy.ModelBinding;
namespace WangShunManager.Modules.ApiModules
{
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiOutStockModule : BaseModule
    {
        public ApiOutStockModule()
        {
            Get("/out-stock", _ => GetOutStockAsync());
            Get("/out-stock-log", _ => GetOutStockLockAsync());
        }

        private async Task<Response> GetOutStockAsync()
        {
            
            var model = this.Bind<OutStockModel>();

            return Response.AsJson(await "http://vm.tongyun188.com:12009/PreCard"
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