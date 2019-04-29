namespace WangShunManager.Modules.ViewModules
{
    public class ViewLoginModule : BaseModule
    {
        public ViewLoginModule()
        {
            Get("/login", _ => View["login"]);
        }
    }
}