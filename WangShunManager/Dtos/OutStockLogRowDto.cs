namespace WangShunManager.Dtos
{
    using System;

    public class OutStockLogRowDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public int PreCardAccountType { get; set; }
        public string RequestIp { get; set; }
        public string StockId { get; set; }
        public DateTime CreateTime { get; set; }
        public string Message { get; set; }
    }
}