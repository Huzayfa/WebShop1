using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebShop.Models;
using WebShop.Models.Identity;


//[assembly: OwinStartup(typeof(WebShop.App_Start.IdentityOwinConfig))]
namespace WebShop.App_Start
{
    
    public class IdentityOwinConfig
    {
        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext<AppContext>(AppContext.Create);
            app.CreatePerOwinContext<AppUserManager>(AppUserManager.Create);
            app.CreatePerOwinContext<AppSignInManager>(AppSignInManager.Create);
            app.CreatePerOwinContext<AppRoleManager>(AppRoleManager.Create);
            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                CookieName="LampanWebShopIdentity",
                LoginPath = new PathString("/Account/LogIn"),

                LogoutPath = new PathString("/Home"),

                Provider =new CookieAuthenticationProvider()
                {
                        OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<AppUserManager, ShopUser>(

                            validateInterval: TimeSpan.FromMinutes(10),
                            regenerateIdentity: (manager, user) =>
                            manager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie)

                            )

                }
            });
        }
    }
}