﻿using Flurl;
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
            if (model.Id == null && string.IsNullOrWhiteSpace(model.Loginid) && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                      .AppendPathSegment("GetUserList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize })
                      .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.Id == null && string.IsNullOrWhiteSpace(model.Loginid))
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                   .AppendPathSegment("GetUserList")
                   .PostJsonAsync(new { model.PageIndex,model.PageSize,model.State})
                   .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.Id == null && model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                  .AppendPathSegment("GetUserList")
                  .PostJsonAsync(new { model.PageIndex, model.PageSize, model.Loginid })
                  .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.Loginid) && model.State == null)
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
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.Loginid,model.State })
                      .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (model.State == null)
            {
                var result = await "http://vm.tongyun188.com:12009/manager"
                      .AppendPathSegment("GetUserList")
                      .PostJsonAsync(new { model.PageIndex, model.PageSize, model.Loginid, model.Id })
                      .ReceiveJson<ResponseDto<PageDataDto<UserRowDto>>>().ConfigureAwait(false);
                return Response.AsJson(result);
            }
            if (string.IsNullOrWhiteSpace(model.Loginid))
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