namespace WangShunManager.Dtos
{
    public class LoginDataDto
    {
        public int Id { get; set; }
        public string LoginId { get; set; }
        public string RealName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string ContactQq { get; set; }
        public string Email { get; set; }
        public string AccountManager { get; set; }
        public string Remark { get; set; }
        public bool IsDel { get; set; }
        public int UserInfoState { get; set; }
    }
}