using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DAROVAapp.Startup))]
namespace DAROVAapp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
