﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Models
{
    public class BasePagesModel
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 25;
    }
}