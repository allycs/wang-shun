using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Dtos
{
    public class SaleRowDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public float MaxPrice { get; set; }
        public float MinPrice { get; set; }
        public string Remark { get; set; }
        public ProductDto Product { get; set; }
    }
}