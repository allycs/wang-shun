﻿namespace WangShunManager.Models
{
    public class UpdateSaleCustomerModel
    {
        public int Id { get; set; }
        public decimal MaxPrice { get; set; }
        public decimal MinPrice { get; set; }
        public string Remark { get; set; }
    }
}