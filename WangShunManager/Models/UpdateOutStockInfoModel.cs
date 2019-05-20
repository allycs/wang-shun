namespace WangShunManager.Models
{
    public class UpdateOutStockInfoModel
    {
        public string Id { get; set; }
        public string Version { get; set; }
        public int StockState { get; set; }
        public string Remark { get; set; }
    }
}