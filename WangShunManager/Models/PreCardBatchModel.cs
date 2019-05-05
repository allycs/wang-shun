﻿using System;

namespace WangShunManager.Models
{
    public class PreCardBatchModel : BasePagesModel
    {
        public DateTime StartTime { get; set; } = DateTime.Now.AddDays(-7);
        public DateTime EndTime { get; set; } = DateTime.Now;
        public long? BatchId { get; set; }
        public int? CategoryId { get; set; }
        public decimal? ParValue { get; set; }
        public int? State { get; set; }
    }
}