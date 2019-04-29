namespace WangShunManager
{
    using Nancy;
    using Nancy.Conventions;

    public class Bootstrapper : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(Nancy.TinyIoc.TinyIoCContainer container, Nancy.Bootstrapper.IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);
        }

        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);
            nancyConventions.StaticContentsConventions.Clear();
            nancyConventions.StaticContentsConventions.Add
               (StaticContentConventionBuilder.AddDirectory("images", "/images"));
            nancyConventions.StaticContentsConventions.Add
                (StaticContentConventionBuilder.AddDirectory("css", "/css"));
            nancyConventions.StaticContentsConventions.Add
                (StaticContentConventionBuilder.AddDirectory("fonts", "/fonts"));
            nancyConventions.StaticContentsConventions.Add
                (StaticContentConventionBuilder.AddDirectory("js", "/js"));
        }
    }
}