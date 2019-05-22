namespace WangShunManager.Modules.ApiModules
{
    using Flurl;
    using Flurl.Http;
    using Nancy;
    using Nancy.ModelBinding;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using WangShunManager.Dtos;
    using WangShunManager.Models;

    public class ApiUserModule : BaseModule
    {
        public ApiUserModule()
        {
            Get("/users", _ => GetUsersAsync());
            Put("/users", _ => UpdateUserAsync());
            Put("/users/{id:int}/{state:int}", p => SetUsersStateAsync((int)p.id, (int)p.state));
            Delete("users/{id:int}", p => DeleteUserAsync((int)p.id));
            Put("/users/password/{password}", p => UpdateUserPassword((string)p.password));
        }

        private async Task<Response> UpdateUserPassword(string password)
        {
            var result = await "http://vm.tongyun188.com:12009/manager"
                         .AppendPathSegment("ModifyLoginPassword")
                         .PostJsonAsync(new { NewPassword = password })
                         .ReceiveJson<ResponseDto<UserDto>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> UpdateUserAsync()
        {
            var model = this.Bind<UpdateUserModel>();
            var result = await "http://vm.tongyun188.com:12009/manager"
                         .AppendPathSegment("editUser")
                         .PostJsonAsync(model)
                         .ReceiveJson<ResponseDto<UserDto>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> DeleteUserAsync(int id)
        {
            var result = await "http://vm.tongyun188.com:12009/manager"
                          .AppendPathSegment("DeleteUser")
                          .PostJsonAsync(new { id })
                          .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> SetUsersStateAsync(int id, int state)
        {
            var result = await "http://vm.tongyun188.com:12009/manager"
                       .AppendPathSegment("SetUser")
                       .PostJsonAsync(new { id, State = state })
                       .ReceiveJson<ResponseDto<string>>().ConfigureAwait(false);
            return Response.AsJson(result);
        }

        private async Task<Response> GetUsersAsync()
        {
            var model = this.Bind<UsersModel>();
            model.State = model.State == -1 ? null : model.State;
            //var result = await "http://vm.tongyun188.com:12009/manager"
            //        .AppendPathSegment("GetUserList")
            //        .PostJsonAsync(model)
            //        .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
            var newResult = await "http://vm.tongyun188.com:12009/manager"
                   .AppendPathSegment("GetUserList")
                   .PostJsonAsync(model)
                   .ReceiveJson<ResponseDto<PageDataDto<NewUserRowDto<UserDto>>>>().ConfigureAwait(false);
            var oldResult = new ResponseDto<PageDataDto<UserRowDto>>();
            oldResult.Data.Rows = new List<UserRowDto>();
            foreach (var item in newResult.Data.Rows)
            {
                oldResult.Data.Rows.Add(new UserRowDto
                {
                    Id= item.UserId,
                    UsableBalance = item.UsableBalance,
                    FreezeBalance = item.FreezeBalance,
                    CreditAmount=item.CreditAmount,
                    LoginId = item.UserInfo.LoginId,
                    RealName = item.UserInfo.RealName,
                    CompanyName = item.UserInfo.CompanyName,
                    CompanyAddress=item.UserInfo.CompanyAddress,
                    ContactQq = item.UserInfo.ContactQq,
                    Email = item.UserInfo.Email,
                    AccountManager = item.UserInfo.AccountManager,
                    Remark = item.UserInfo.Remark,
                    IsDel = item.UserInfo.IsDel,
                    UserInfoState = item.UserInfo.UserInfoState
                });
            }
            return Response.AsJson(oldResult);
        }
    }
}