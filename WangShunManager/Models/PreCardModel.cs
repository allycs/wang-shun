namespace WangShunManager.Models
{
    using System;

    public class PreCardModel : BasePagesModel
    {
        public DateTime StartTime { get; set; } = new DateTime(2015, 01, 01, 0, 0, 0, 0);
        public DateTime EndTime { get; set; } = DateTime.Now;
        public long? BatchId { get; set; }
        public string CardId { get; set; }
        public int? CardState { get; set; }
        public int? ManagedState { get; set; }
        public int? SettleState { get; set; }
    }
}