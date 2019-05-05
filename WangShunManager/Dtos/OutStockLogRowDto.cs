﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Dtos
{
    public class OutStockLogRowDto
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public int PreCardAccountType { get; set; }
        public string RequestId { get; set; }
        public long StockId { get; set; }
        public DateTime CreateTime { get; set; }
        public string Message { get; set; }
    }
}