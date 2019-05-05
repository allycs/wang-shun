﻿namespace WangShunManager.Models
{
    using System;

    public class CapitalDetailsModel : BasePagesModel
    {
        public DateTime StartTime { get; set; } = DateTime.Now.AddDays(-7);
        public DateTime EndTime { get; set; } = DateTime.Now;
        public int? UserId { get; set; }
        public int? Type { get; set; }
        public int? Status { get; set; }
    }
}