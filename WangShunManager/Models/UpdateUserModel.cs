using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Models
{
    public class UpdateUserModel
    {
        public int Id { get; set; }
        public string RealName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string ContactQq { get; set; }
        public string Email { get; set; }
        public string AccountManager { get; set; }
        public string Remark { get; set; }
    }
}