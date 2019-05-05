namespace WangShunManager.Models
{
    using System;

    public class MemberWithdrawModel : BasePagesModel
    {
        public DateTime StartTime { get; set; } = DateTime.Now.AddDays(-7);
        public DateTime EndTime { get; set; } = DateTime.Now;
        public int? UserId { get; set; }
        public int? State { get; set; }
    }
}