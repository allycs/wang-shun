using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Modules.ViewModules
{
    public class ViewMainModule : BaseModule
    {
        public ViewMainModule()
        {
            //Get("/main-page", _ => View["main-page"]);
            Get("/user-table", _ => View["user-table"]);
            Get("/product-table", _ => View["product-table"]);
            Get("/sale-table", _ => View["sale-table"]);
            Get("/sale-customer-table", _ => View["sale-customer-table"]);
            Get("/pre-card-table", _ => View["pre-card-table"]);
            Get("/pre-card-batch-table", _ => View["pre-card-batch-table"]);
            Get("/out-stock-table", _ => View["out-stock-table"]);
            Get("/out-stock-log-table", _ => View["out-stock-log-table"]);
            Get("/capital-details-table", _ => View["capital-details-table"]);
            Get("/member-withdraw-table", _ => View["member-withdraw-table"]);
        }
    }
}