namespace WangShunManager.Models
{
    using System;

    public class MemberWithdrawModel : BasePagesModel
    {
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int? UserId { get; set; }
        public int? State { get; set; }
    }
}