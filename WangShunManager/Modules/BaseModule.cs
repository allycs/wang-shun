namespace WangShunManager.Modules
{
    using Nancy;
    using System;
    using System.Linq;
    using System.Text;

    public class BaseModule : NancyModule
    {
        private string path = string.Empty;

        public BaseModule()
        {
            CurrentRequestId = Guid.NewGuid().ToString();
            Before += ShowRequest;
            Before += CheckClientIP;
            Before += CheckAuth;
            After += WithRequestId;
        }

        private Response ShowRequest(NancyContext ctx)
        {
            var sb = new StringBuilder();
            sb.Append($"\n------------ Request:{CurrentRequestId}------------\n");
            sb.Append($"Request Url:{Request.Url}\n");
            foreach (var h in Request.Headers)
            {
                sb.Append($"Header {h.Key}:\t{h.Value.FirstOrDefault()}\n");
            }
            var logContent = sb.ToString();
            ctx.Items.Add("request-log", logContent);
            return null;
        }

        /// <summary>
        /// 当前请求的唯一Id
        /// </summary>
        protected string CurrentRequestId
        {
            get;
        }

        /// <summary>
        /// 客户端的IP地址
        /// </summary>
        protected string ClientIP
        {
            get;
            private set;
        }

        /// <summary>
        /// 为响应附加当前请求的Id
        /// </summary>
        /// <param name="ctx"></param>
        private void WithRequestId(NancyContext ctx)
        {
            ctx.Response.Headers.Add("x-request-id", CurrentRequestId);//添加当前请求的唯一id
        }

        /// <summary>
        /// 检查客户端的IP地址，并写入属性中
        /// </summary>
        /// <param name="ctx"></param>
        /// <returns></returns>
        private Response CheckClientIP(NancyContext ctx)
        {
            var clientIP = ctx.Request.UserHostAddress;
            //TODO: 客户端的IP不一定是该值，因为Server的前端可能有反向代理服务器。需要根据不同的场景处理

            var hasRealIP = ctx.Request.Headers.Keys.Contains("X-Real-IP");
            if (hasRealIP)
            {
                clientIP = ctx.Request.Headers["X-Real-IP"].FirstOrDefault();
            }
            ctx.Parameters.ClientIP = ClientIP = clientIP;
            return null;
        }

        private string token = string.Empty;

        protected string CurrentToken => token;

        private Response CheckAuth(NancyContext ctx)
        {
            var hasTokenHeader = ctx.Request.Headers.Keys.Contains("Token");
            if (hasTokenHeader)
            {
                var tokenHeaderValue = ctx.Request.Headers["Token"].FirstOrDefault();

                token = tokenHeaderValue;
            }
            else
            {
                if (ctx.Request.Cookies.Keys.Contains("token"))
                {
                    var cookieTokenValue = ctx.Request.Cookies["token"];
                    token = cookieTokenValue;
                }
            }

            ctx.Parameters.Token = token;

            return null;
        }
    }
}