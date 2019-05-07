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

    public class ApiProductModule : BaseModule
    {
        public ApiProductModule()
        {
            Get("/products", _ => GetProductsAsync());
            Put("/products/{id:int}/{state:int}", p => SetProductsStateAsncAsync((int)p.id, (int)p.state));
        }

        private async Task<Response> SetProductsStateAsncAsync(int id, int state)
        {
            var result = await "http://vm.tongyun188.com:12009/Product"
                          .AppendPathSegment("SetPreCardProduct")
                          .PostJsonAsync(new { id, State = state })
                          .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> GetProductsAsync()
        {
            var model = this.Bind<ProductsModel>();
            model.CategoryId = model.CategoryId == -1 ? null : model.CategoryId;
            model.State = model.State == -1 ? null : model.State;
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.CategoryId == null && model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.CategoryId == null && model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                   .AppendPathSegment("GetPreCardProductList")
                   .PostJsonAsync(new { model.PageIndex, model.PageSize, model.State })
                   .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.CategoryId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                  .AppendPathSegment("GetPreCardProductList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue })
                  .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                  .AppendPathSegment("GetPreCardProductList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId })
                  .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.CategoryId == null && model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                  .AppendPathSegment("GetPreCardProductList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName })
                  .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName, model.CategoryId })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.CategoryId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName, model.ParValue })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.CategoryId == null && model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName, model.State })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId, model.ParValue, model.ProductName })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId, model.State, model.ProductName })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (string.IsNullOrWhiteSpace(model.ProductName))
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue, model.State, model.CategoryId })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.CategoryId == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue, model.State, model.ProductName })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            return Response.AsJson(await "http://vm.tongyun188.com:12009/Product"
                    .AppendPathSegment("GetPreCardProductList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false));
        }
    }
}