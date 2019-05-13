namespace WangShunManager.Models
{
    using System;

    public class CapitalDetailsModel : BasePagesModel
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int? UserId { get; set; }
        public int? Type { get; set; }
        public int? Status { get; set; }
    }
}