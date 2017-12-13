using Autofac;
using Autofac.Integration.Mvc;
using DAROVAapp;
using DAROVAapp.Models;
using System.Data.Entity;
using System.Web.Mvc;

public class AutofacConfig
{
    public static void ConfigureContainer()
    {
        // получаем экземпляр контейнера
        var builder = new ContainerBuilder();

        // регистрируем контроллер в текущей сборке
        builder.RegisterControllers(typeof(MvcApplication).Assembly);

        // создаем новый контейнер с теми зависимостями, которые определены выше
        var container = builder.Build();

        // установка сопоставителя зависимостей
        DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        
        builder.RegisterType<ApplicationDbContext>().As<ApplicationDbContext>().InstancePerLifetimeScope();
    }
}