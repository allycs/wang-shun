using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WangShunManager.Dtos
{
    public class NewUserRowDto<T>
    {
        public int UserId { get; set; }
        public decimal UsableBalance { get; set; }
        public decimal FreezeBalance { get; set; }
        public decimal CreditAmount { get; set; }
        public T UserInfo { get; set; }
    }
}