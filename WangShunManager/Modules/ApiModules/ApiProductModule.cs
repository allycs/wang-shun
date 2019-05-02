using Flurl;
using Flurl.Http;
using Nancy;
using Nancy.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WangShunManager.Dtos;
using WangShunManager.Models;

namespace WangShunManager.Modules.ApiModules
{
    public class ApiProductModule : BaseModule
    {
        public ApiProductModule()
        {
            Get("/products", _ => GetProductsAsync());
        }

        private async Task<Response> GetProductsAsync()
        {
            var model = this.Bind<ProductsModel>();
            if (string.IsNullOrWhiteSpace(model.ProductName)&&model.CategoryId == null &&model.ParValue==null && model.State == null)
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
                   .PostJsonAsync(new { model.PageIndex,model.PageSize,model.State})
                   .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.CategoryId == null &&  model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                  .AppendPathSegment("GetPreCardProductList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue })
                  .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.ProductName)  && model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                  .AppendPathSegment("GetPreCardProductList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId })
                  .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if ( model.CategoryId == null && model.ParValue == null && model.State == null)
                {
                var result = await "http://vm.tongyun188.com:12009/Product"
                  .AppendPathSegment("GetPreCardProductList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName })
                  .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (  model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize,model.ProductName,model.CategoryId })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.CategoryId == null  && model.State == null)
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

            if (model.State==null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize,model.CategoryId,model.ParValue,model.ProductName })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if ( model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId,model.State ,model.ProductName})
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }



            if (string.IsNullOrWhiteSpace(model.ProductName))
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize,model.ParValue,model.State,model.CategoryId })
                      .ReceiveJson<ResponseDto<PageDataDto<ProductRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if ( model.CategoryId == null)
            {
                var result = await "http://vm.tongyun188.com:12009/Product"
                      .AppendPathSegment("GetPreCardProductList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize,model.ParValue,model.State,model.ProductName })
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