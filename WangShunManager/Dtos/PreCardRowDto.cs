namespace WangShunManager.Dtos
{
    public class PreCardRowDto
    {
        public int Id { get; set; }
        public int BatchId { get; set; }
        public string CardId { get; set; }
        public int CardState { get; set; }
        public int ManagedState { get; set; }
        public int SettleState { get; set; }
        public int UseNum { get; set; }
        public PreCardBatchDto UploadBatch { get; set; }
    }
}