namespace WangShunManager.Models
{
    public class SalesCustomerModel : BasePagesModel
    {
        public string ProductName { get; set; }
        public int? UserId { get; set; }
        public int? CategoryId { get; set; }
        public decimal? ParValue { get; set; }
        public int? State { get; set; }
    }
}