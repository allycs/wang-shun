using System.Collections.Generic;

namespace WangShunManager.Dtos
{
    public class PageDataDto<T>
    {
        public int MaxPage { get; set; }
        public int Page { get; set; }
        public int Total { get; set; }
        public int PageSize { get; set; }
        public List<T> Rows { get; set; }
    }
}