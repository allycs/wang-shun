namespace WangShunManager.Dtos
{
    public class ResponseDto<T>
    {
        public int State { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}