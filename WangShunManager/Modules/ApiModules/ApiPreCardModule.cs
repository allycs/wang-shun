﻿namespace WangShunManager.Modules.ApiModules
{
    using Flurl;
    using Flurl.Http;
    using Nancy;
    using Nancy.ModelBinding;
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiPreCardModule : BaseModule
    {
        public ApiPreCardModule()
        {
            Get("/pre-card", _ => GetPreCardAsync());
            Get("/pre-card-log", _ => GetPreCardLogAsync());
            Get("/pre-card-batch", _ => GetPreCardBatchAsync());
            Get("/pre-card-batch-log", _ => GetPreCardBatchLockAsync());
            Put("/pre-card/info-state/{id:int}/{version}/{state:int}", p => SetPreCardManagedStateAsncAsync((int)p.id, (string)p.version, (int)p.state));
            Put("/pre-card/card-password", _ => UpdatePreCardCardPasswordAsync());
            Put("/pre-card-batch/info", _ => UpdatePreCardBatchInfoAsync());
        }

        private async Task<Response> UpdatePreCardBatchInfoAsync()
        {
            var model = this.Bind<UpdatePreCardBatchInfoModel>();
            return Response.AsJson(await "http://vm.tongyun188.com:12009/PreCard"
                    .AppendPathSegment("UpdateUploadBatch")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false));
        }

        private async Task<Response> GetPreCardBatchLockAsync()
        {
            var model = this.Bind<PreCardBatchLogModel>();
            return Response.AsJson(await "http://vm.tongyun188.com:12009/PreCard"
                    .AppendPathSegment("GetUploadBatchLog")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchLogRowDto>>>().ConfigureAwait(false));
        }

        private async Task<Response> UpdatePreCardCardPasswordAsync()
        {
            var model = this.Bind<UpdatePreCardCardPasswordModel>();
            var result = await "http://vm.tongyun188.com:12009/PreCard"
                          .AppendPathSegment("UpdatePreCard")
                          .PostJsonAsync(model)
                          .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> SetPreCardManagedStateAsncAsync(int id, string version, int state)
        {
            var result = await "http://vm.tongyun188.com:12009/PreCard"
                          .AppendPathSegment("SetManagedState")
                          .PostJsonAsync(new { id, Version = version, ManagedState = state })
                          .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> GetPreCardLogAsync()
        {
            var model = this.Bind<PreCardLogModel>();
            return Response.AsJson(await "http://vm.tongyun188.com:12009/PreCard"
                    .AppendPathSegment("GetPreCardLog")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<PreCardLogRowDto>>>().ConfigureAwait(false));
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

            var result = await "http://vm.tongyun188.com:12009/PreCard"
                    .AppendPathSegment("GetUploadBatchList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<PreCardBatchRowDto>>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }
    }
}