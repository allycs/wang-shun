namespace WangShunManager.Dtos
{
    public class PreCardRowDto
    {
        public long Id { get; set; }
        public string BatchId { get; set; }
        public string CardId { get; set; }
        public int CardState { get; set; }
        public int ManagedState { get; set; }
        public int SettleState { get; set; }
        public int UseNum { get; set; }
        public string Version { get; set; }
        public PreCardBatchDto UploadBatch { get; set; }
    }
}