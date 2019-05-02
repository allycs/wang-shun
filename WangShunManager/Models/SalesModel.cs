using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Models
{
    public class SalesModel:BasePagesModel
    {
        public int? CategoryId { get; set; }
        public decimal? ParValue { get; set; }
        public int? State { get; set; }
    }
}