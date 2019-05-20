namespace WangShunManager.Dtos
{
    using System;

    public class OutStockRowDto
    {
        public string Id { get; set; }
        public int UserId { get; set; }
        public string UserOrderId { get; set; }
        public string Account { get; set; }
        public decimal ParValue { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime? CompleteTime { get; set; }
        public int State { get; set; }
        public int? NotifyUrlId { get; set; }
        public int ProductId { get; set; }
        public int ProductType { get; set; }
        public int ChannelId { get; set; }
        public string Remark { get; set; }
        public string ProductName { get; set; }
        public string Location { get; set; }
        public int? IspType { get; set; }
        public string PreCardId { get; set; }
        public string Version { get; set; }
    }
}