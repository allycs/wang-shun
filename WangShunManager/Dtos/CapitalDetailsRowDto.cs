using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Dtos
{
    public class CapitalDetailsRowDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime CreateTime { get; set; }
        public string BizId { get; set; }
        public decimal TradeAmount { get; set; }
        public decimal PreBalance { get; set; }
        public decimal PostBalance { get; set; }
        public int Type { get; set; }
        public string Remark { get; set; }
        public int Status { get; set; }
    }
}