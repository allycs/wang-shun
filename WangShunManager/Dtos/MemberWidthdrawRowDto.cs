namespace WangShunManager.Dtos
{
    using System;

    public class MemberWithdrawRowDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public decimal Amount { get; set; }
        public int State { get; set; }
        public string Remark { get; set; }
        public string Auditor { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime? DealTime { get; set; }
        public decimal PreBalance { get; set; }
        public string SettleOrderId { get; set; }
        public string SettleChannel { get; set; }
        public string SettleAccountHolder { get; set; }
        public string SettleAccountNo { get; set; }
    }
}