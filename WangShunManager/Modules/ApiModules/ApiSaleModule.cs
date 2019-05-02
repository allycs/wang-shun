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
    public class ApiSaleModule : BaseModule
    {
        public ApiSaleModule()
        {
            Get("/sales", _ => GetSalesAsync());
            Get("/sales-customer", _ => GetSalesCustomerAsync());
        }

        private async Task<Response> GetSalesCustomerAsync()
        {
            var model = this.Bind<SalesCustomerModel>();
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.CategoryId == null && model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetCustomProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.CategoryId == null && model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                   .AppendPathSegment("GetCustomProductSaleList")
                   .PostJsonAsync(new { model.PageIndex, model.PageSize, model.State })
                   .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.CategoryId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                  .AppendPathSegment("GetCustomProductSaleList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue })
                  .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.ProductName) && model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                  .AppendPathSegment("GetCustomProductSaleList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId })
                  .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.CategoryId == null && model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                  .AppendPathSegment("GetCustomProductSaleList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName })
                  .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetCustomProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName, model.CategoryId })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.CategoryId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetCustomProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName, model.ParValue })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.CategoryId == null && model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetCustomProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ProductName, model.State })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetCustomProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId, model.ParValue, model.ProductName })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetCustomProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId, model.State, model.ProductName })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }



            if (string.IsNullOrWhiteSpace(model.ProductName))
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetCustomProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue, model.State, model.CategoryId })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            if (model.CategoryId == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetCustomProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue, model.State, model.ProductName })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            return Response.AsJson(await "http://vm.tongyun188.com:12009/ProductSale"
                    .AppendPathSegment("GetCustomProductSaleList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<SaleCustomerRowDto>>>().ConfigureAwait(false));
        }

        private async Task<Response> GetSalesAsync()
        {
            var model = this.Bind<SalesModel>();
            if (model.CategoryId == null && model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetDefaultProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.CategoryId == null && model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                   .AppendPathSegment("GetDefaultProductSaleList")
                   .PostJsonAsync(new { model.PageIndex, model.PageSize, model.State })
                   .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.CategoryId == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                  .AppendPathSegment("GetDefaultProductSaleList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue })
                  .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.ParValue == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                  .AppendPathSegment("GetDefaultProductSaleList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.CategoryId })
                  .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.CategoryId == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetDefaultProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue, model.State })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetDefaultProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.ParValue, model.CategoryId })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.ParValue == null)
            {
                var result = await "http://vm.tongyun188.com:12009/ProductSale"
                      .AppendPathSegment("GetDefaultProductSaleList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.State, model.CategoryId })
                      .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            return Response.AsJson(await "http://vm.tongyun188.com:12009/ProductSale"
                    .AppendPathSegment("GetDefaultProductSaleList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<SaleRowDto>>>().ConfigureAwait(false));
        }
    }
}