namespace WangShunManager.Modules.ApiModules
{
    using Flurl;
    using Flurl.Http;
    using Nancy;
    using Nancy.ModelBinding;
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiSaleModule : BaseModule
    {
        public ApiSaleModule()
        {
            Get("/sales", _ => GetSalesAsync());
            Put("/sales", _ => UpdateSaleAsync());
            Get("/sales-customer", _ => GetSalesCustomerAsync());
            Put("/sales-customer", _ => UpdateSalesCustomerAsync());
            Delete("/sales-customer/{id:int}", p => DeleteSalesCustomerAsync((int)p.id));
            Post("/sales-customer", _ => InsertSalesCustomerAsync());
        }

        private async Task<Response> InsertSalesCustomerAsync()
        {
            var model = this.Bind<InsertSaleCustomerModel>();
            var result = await "http://vm.tongyun188.com:12009/ProductSale"
                   .AppendPathSegment("AddCustomProductSalePrice")
                   .PostJsonAsync(model)
                   .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> DeleteSalesCustomerAsync(int id)
        {
            var result = await "http://vm.tongyun188.com:12009/ProductSale"
                          .AppendPathSegment("DeleteCustomProductSalePrice")
                          .PostJsonAsync(new { id })
                          .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> UpdateSalesCustomerAsync()
        {
            var model = this.Bind<UpdateSaleCustomerModel>();
            return Response.AsJson(await "http://vm.tongyun188.com:12009/ProductSale"
                   .AppendPathSegment("SetCustomProductSalePrice")
                   .PostJsonAsync(model)
                   .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false));
        }

        private async Task<Response> UpdateSaleAsync()
        {
            var model = this.Bind<UpdateSaleModel>();
            return Response.AsJson(await "http://vm.tongyun188.com:12009/ProductSale"
                   .AppendPathSegment("SetDefaultProductSalePrice")
                   .PostJsonAsync(model)
                   .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false));
        }

        private async Task<Response> GetSalesCustomerAsync()
        {
            var model = this.Bind<SalesCustomerModel>();
            model.ParValue = model.ParValue == -1 ? null : model.ParValue;
            model.CategoryId = model.CategoryId == -1 ? null : model.CategoryId;
            model.State = model.State == -1 ? null : model.State;

            return Response.AsJson(await "http://vm.tongyun188.com:12009/ProductSale"
                    .AppendPathSegment("GetCustomProductSaleList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false));
        }

        private async Task<Response> GetSalesAsync()
        {
            var model = this.Bind<SalesModel>();
            model.ParValue = model.ParValue == -1 ? null : model.ParValue;
            model.CategoryId = model.CategoryId == -1 ? null : model.CategoryId;
            model.State = model.State == -1 ? null : model.State;
            return Response.AsJson(await "http://vm.tongyun188.com:12009/ProductSale"
                    .AppendPathSegment("GetDefaultProductSaleList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false));
        }
    }
}