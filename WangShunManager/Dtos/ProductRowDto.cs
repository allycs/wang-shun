using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Dtos
{
    public class ProductRowDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public decimal ParValue { get; set; }
        public int State { get; set; }
        public decimal MaxPrice { get; set; }
        public decimal MinPrice { get; set; }
        public string MaxDiscount { get; set; }
        public string MinDiscount { get; set; }
    }
}