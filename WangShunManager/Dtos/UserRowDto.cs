namespace WangShunManager.Dtos
{
    public class UserRowDto: UserDto
    {
        public decimal UsableBalance { get; set; }
        public decimal FreezeBalance { get; set; }
        public decimal CreditAmount { get; set; }
    }
}