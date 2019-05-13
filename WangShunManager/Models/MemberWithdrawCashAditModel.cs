namespace WangShunManager.Models
{
    using System;

    public class MemberWithdrawCashAditModel
    {
        public int Id { get; set; }
        public int State { get; set; } = 0;
        public string SettleOrderId { get; set; }
    }
}