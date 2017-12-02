﻿using AutoMapper;
using DAROVAapp.Business.Initialization;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace DAROVAapp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AutofacConfig.ConfigureContainer();

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Mapper.Initialize(cfg => {
                cfg.AddProfile<AutoMapperProfileConfiguration>();
            });
        }
    }
}
