using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebShop.Models.Identity
{
    public class AppSignInManager : SignInManager<ShopUser,string>
    {
        public AppSignInManager(AppUserManager userManager,IAuthenticationManager authentication)
           : base(userManager,authentication)
        {

        }


        public static AppSignInManager Create(IdentityFactoryOptions<AppSignInManager> options,IOwinContext context)
        {
            AppUserManager userManager = context.GetUserManager<AppUserManager>();
            return new AppSignInManager(userManager, context.Authentication);
        }
    }
}