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
    public class ApiPreCardModule : BaseModule
    {
        public ApiPreCardModule()
        {
            Get("/pre-card", _ => GetPreCardAsync());
            Get("/pre-card-log", _ => GetPreCardLockAsync());
            Get("/pre-card-batch", _ => GetPreCardBatchAsync());
        }

        private async Task<Response> GetPreCardLockAsync()
        {
            var model = this.Bind<PreCardLogModel>();
            return Response.AsJson(await "http://vm.tongyun188.com:12009/PreCard"
                    .AppendPathSegment("GetPreCardLog")
                    .PostJsonAsync(new { PreCardId = model.Id})
                    .ReceiveJson<ResponseDto<PageDataDto<OutStockLogRowDto>>>().ConfigureAwait(false));
        }

        private async Task<Response> GetPreCardAsync()
        {
            var model = this.Bind<PreCardModel>();
            model.CardState = model.CardState == -1 ? null : model.CardState;
            model.ManagedState = model.ManagedState == -1 ? null : model.ManagedState;
            model.SettleState = model.SettleState == -1 ? null : model.SettleState;
            var result = await "http://vm.tongyun188.com:12009/PreCard"
                    .AppendPathSegment("GetPreCardList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<PreCardRowDto>>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> GetPreCardBatchAsync()
        {
            var model = this.Bind<PreCardBatchModel>();
            model.ParValue = model.ParValue == -1 ? null : model.ParValue;
            model.CategoryId = model.CategoryId == -1 ? null : model.CategoryId;
            model.State = model.State == -1 ? null : model.State;
            //if (model.BatchId==null && model.CategoryId == null && model.ParValue == null && model.State == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //          .AppendPathSegment("GetUploadBatchList")
            //          .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime })
            //          .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}
            //if (model.BatchId==null && model.CategoryId == null && model.ParValue == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //       .AppendPathSegment("GetUploadBatchList")
            //       .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.State })
            //       .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}
            //if (model.BatchId==null && model.CategoryId == null && model.State == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //      .AppendPathSegment("GetUploadBatchList")
            //      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.ParValue })
            //      .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}
            //if (model.BatchId==null && model.ParValue == null && model.State == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //      .AppendPathSegment("GetUploadBatchList")
            //      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.CategoryId })
            //      .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}
            //if (model.CategoryId == null && model.ParValue == null && model.State == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //      .AppendPathSegment("GetUploadBatchList")
            //      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.BatchId })
            //      .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}
            //if (model.ParValue == null && model.State == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //          .AppendPathSegment("GetUploadBatchList")
            //          .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.BatchId, model.CategoryId })
            //          .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}
            //if (model.CategoryId == null && model.State == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //          .AppendPathSegment("GetUploadBatchList")
            //          .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.BatchId, model.ParValue })
            //          .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}

            //if (model.CategoryId == null && model.ParValue == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //          .AppendPathSegment("GetUploadBatchList")
            //          .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.BatchId, model.State })
            //          .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}

            //if (model.State == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //          .AppendPathSegment("GetUploadBatchList")
            //          .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.CategoryId, model.ParValue, model.BatchId })
            //          .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}
            //if (model.ParValue == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //          .AppendPathSegment("GetUploadBatchList")
            //          .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.CategoryId, model.State, model.BatchId })
            //          .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}

            //if (model.BatchId==null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //          .AppendPathSegment("GetUploadBatchList")
            //          .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.ParValue, model.State, model.CategoryId })
            //          .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}

            //if (model.CategoryId == null)
            //{
            //    var result = await "http://vm.tongyun188.com:12009/PreCard"
            //          .AppendPathSegment("GetUploadBatchList")
            //          .PostJsonAsync(new { model.PageIndex, model.PageSize, model.StartTime, model.EndTime, model.ParValue, model.State, model.BatchId })
            //          .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            //    return Response.AsJson(result);
            //}

            var result = await "http://vm.tongyun188.com:12009/PreCard"
                    .AppendPathSegment("GetUploadBatchList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }
    }
}