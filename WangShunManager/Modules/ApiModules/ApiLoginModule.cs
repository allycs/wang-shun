namespace WangShunManager.Modules.ApiModules
{
    using Flurl;
    using Flurl.Http;
    using Nancy;
    using Nancy.ModelBinding;
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiLoginModule : BaseModule
    {
        public ApiLoginModule()
        {
            Post("/login", _ => DoLoginAsync());
            Get("/logout", _ => DoLogoutAsync());
        }

        private async Task<Response> DoLogoutAsync()
        {
            var result = await "http://vm.tongyun188.com:12009/manager"
                    .AppendPathSegment("Logout")
                    .GetJsonAsync<ResponseDto<string>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> DoLoginAsync()
        {
            var model = this.Bind<LoginModel>();
            var result = await "http://vm.tongyun188.com:12009/manager"
                    .AppendPathSegment("login")
                    .PostJsonAsync(new
                    {
                        LoginId = model.Name,
                        Password = model.Password
                    })
                    .ReceiveJson<ResponseDto<LoginDataDto>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }
    }
}