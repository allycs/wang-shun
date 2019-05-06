namespace WangShunManager.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public decimal ParValue { get; set; }
        public int State { get; set; }
    }
}