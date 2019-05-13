namespace WangShunManager.Models
{
    using System;

    public class OutStockModel : BasePagesModel
    {
        public DateTime StartTime { get; set; } = DateTime.Now.AddDays(-7);
        public DateTime EndTime { get; set; } = DateTime.Now;
        public int? UserId { get; set; }
        public string UserOrderId { get; set; }
        public string Account { get; set; }
        public decimal? ParValue { get; set; }
        public int? State { get; set; }
        public int? CategoryId { get; set; }
        public int? ChannelId { get; set; }
        public string Location { get; set; }
        public string PreCardId { get; set; }
    }
}