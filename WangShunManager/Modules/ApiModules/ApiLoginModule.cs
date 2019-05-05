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