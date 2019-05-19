namespace WangShunManager.Models
{
    public class UpdatePreCardCardPasswordModel
    {
        public string Id { get; set; }
        public string Version { get; set; }
        public string CardPassword { get; set; }
        public int CardState { get; set; }
    }
}