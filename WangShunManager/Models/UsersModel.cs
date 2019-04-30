using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Models
{
    public class UsersModel:BasePagesModel
    {
        public int Id { get; set; }
        public string Loginid { get; set; }
        public int? State { get; set; }
    }
}