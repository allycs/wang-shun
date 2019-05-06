namespace WangShunManager.Modules.ApiModules
{
    using Flurl;
    using Flurl.Http;
    using Nancy;
    using Nancy.ModelBinding;
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiUserModule : BaseModule
    {
        public ApiUserModule()
        {
            Get("/users", _ => GetUsersAsync());
        }

        private async Task<Response> GetUsersAsync()
        {
            var model = this.Bind<UsersModel>();
            if (model.Id == null && string.IsNullOrWhiteSpace(model.LoginId) && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                      .AppendPathSegment("GetUserList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize })
                      .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.Id == null && string.IsNullOrWhiteSpace(model.LoginId))
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                   .AppendPathSegment("GetUserList")
                   .PostJsonAsync(new { model.PageIndex, model.PageSize, model.State })
                   .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.Id == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                  .AppendPathSegment("GetUserList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.LoginId })
                  .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.LoginId) && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                  .AppendPathSegment("GetUserList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.Id })
                  .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.Id == null)
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                      .AppendPathSegment("GetUserList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.LoginId, model.State })
                      .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                      .AppendPathSegment("GetUserList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.LoginId, model.Id })
                      .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.LoginId))
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                      .AppendPathSegment("GetUserList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.State, model.Id })
                      .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }

            return Response.AsJson(await "http://vm.tongyun188.com:12009/manager"
                    .AppendPathSegment("GetUserList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false));
        }
    }
}