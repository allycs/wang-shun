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

    public class ApiMemberWithdrawModule : BaseModule
    {
        public ApiMemberWithdrawModule()
        {
            Get("/member-withdraw", _ => GetMemberWidthdrawAsync());
            Get("/member-withdraw-count", _ => GetMemberWidthdrawCountAsync());
            Put("/member-withdraw/cash-audit", _ => AuditCashAsync());
        }

        private async Task<Response> GetMemberWidthdrawCountAsync()
        {
            var result = await "http://vm.tongyun188.com:12009/Finance"
                         .AppendPathSegment("GetWithdrawList")
                         .PostJsonAsync(new { PageIndex=1, PageSize=1, StartTime="2015/05/05",EndTime=DateTime.Now,State=1 })
                         .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> AuditCashAsync()
        {
            var model = this.Bind<MemberWithdrawCashAditModel>();
            return Response.AsJson(await "http://vm.tongyun188.com:12009/Finance"
                    .AppendPathSegment("SetUserWithDraw")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false));
        }

        private async Task<Response> GetMemberWidthdrawAsync()
        {
            var model = this.Bind<MemberWithdrawModel>();
            model.State = model.State == -1 ? null : model.State;
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
            var response = await "http://vm.tongyun188.com:12009/Finance"
                    .AppendPathSegment("GetWithdrawList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<MemberWithdrawRowDto>>>().ConfigureAwait(false);
            return Response.AsJson(response);
        }
    }
}