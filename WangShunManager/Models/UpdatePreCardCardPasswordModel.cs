using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Models
{
    public class UpdatePreCardCardPasswordModel
    {
        public int Id { get; set; }
        public string Version { get; set; }
        public string CardPassword { get; set; }
        public int CardState { get; set; }
    }
}