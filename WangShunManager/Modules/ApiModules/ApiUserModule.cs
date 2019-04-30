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
    public class ApiUserModule : BaseModule
    {
        public ApiUserModule()
        {
            Get("/users", _ => GetUsersAsync());
        }

        private async Task<Response> GetUsersAsync()
        {
            var model = this.Bind<UsersModel>();
            var result = await "http://vm.tongyun188.com:12009/manager"
                    .AppendPathSegment("GetUserList")
                    .PostJsonAsync(model)
                    .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }
    }
}