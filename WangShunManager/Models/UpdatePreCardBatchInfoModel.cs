using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Models
{
    public class UpdatePreCardBatchInfoModel
    {
        public string Id { get; set; }
        public string Version { get; set; }
        public int BatchState { get; set; }
        public int Pri { get; set; }
        public decimal Discount { get; set; }
        public string Remark { get; set; }
    }
}