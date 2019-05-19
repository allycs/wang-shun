namespace WangShunManager.Dtos
{
    using System;

    public class PreCardBatchDto
    {
        public long Id { get; set; }
        public int ProductId { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal ParValue { get; set; }
        public string Count { get; set; }
        public DateTime CreateTime { get; set; }
        public int UsedNum { get; set; }
        public int UnUsedNum { get; set; }
        public int ErrorNum { get; set; }
        public int InUseNum { get; set; }
        public int UserId { get; set; }
        public int State { get; set; }
        public decimal InitialDiscount { get; set; }
        public decimal CurrentDiscount { get; set; }
        public string UserRemark { get; set; }
        public int Pri { get; set; }
        public int ProductCategory { get; set; }
        public string CardInfos { get; set; }
    }
}