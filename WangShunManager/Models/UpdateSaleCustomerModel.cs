namespace WangShunManager.Models
{
    public class InsertSaleCustomerModel
    {
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public decimal ParValue { get; set; }
        public decimal MaxPrice { get; set; }
        public decimal MinPrice { get; set; }
        public string Remark { get; set; }
    }
}