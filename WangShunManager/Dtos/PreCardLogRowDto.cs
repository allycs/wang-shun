namespace WangShunManager.Dtos
{
    using System;

    public class PreCardLogRowDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public int PreCardAccountType { get; set; }
        public string RequestIp { get; set; }
        public string PreCardId { get; set; }
        public DateTime CreateTime { get; set; }
        public string Message { get; set; }
    }
}