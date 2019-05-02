﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Modules.ViewModules
{
    public class ViewMainModule : BaseModule
    {
        public ViewMainModule()
        {
            Get("/main-page", _ => View["main-page"]);
            Get("/user-table", _ => View["user-table"]);
            Get("/product-table", _ => View["product-table"]);
            Get("/sale-table", _ => View["sale-table"]);
            Get("/sale-customer-table", _ => View["sale-customer-table"]);
            Get("/capital-details-table", _ => View["capital-details-table"]);
        }
    }
}