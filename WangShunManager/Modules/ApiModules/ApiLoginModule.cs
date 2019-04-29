using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Modules.ApiModules
{
    public class ApiLoginModule : BaseModule
    {
        public ApiLoginModule()
        {
            Post("/login", _ => { return Response.AsRedirect("/main-page"); });
        }
    }
}