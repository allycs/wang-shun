namespace WangShunManager.Dtos
{
    using System;

    public class SaleCustomerRowDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public float MaxPrice { get; set; }
        public float MinPrice { get; set; }
        public string Remark { get; set; }
        public bool IsDel { get; set; }
        public DateTime CreateTime { get; set; }
        public ProductDto Product { get; set; }
    }
}