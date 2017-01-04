using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebShop.Models.Identity
{
    public class AppUserManager : UserManager<ShopUser>
    {
        public AppUserManager(IUserStore<ShopUser> store) : base(store)
        {

        }
        
        public static AppUserManager Create(IdentityFactoryOptions<AppUserManager> option,IOwinContext context)
        {
            var dbContext = context.Get<AppContext>();
            UserStore<ShopUser> store = new UserStore<ShopUser>(dbContext);
            AppUserManager userManager = new AppUserManager(store);
            userManager.UserValidator = new UserValidator<ShopUser>(userManager) {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true,
            };
            userManager.PasswordValidator = new PasswordValidator()
            {
                RequireDigit=false,
                RequiredLength=4,
                RequireLowercase=false,
                RequireNonLetterOrDigit=false,
                RequireUppercase=false,
            };


            userManager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(10);
            userManager.UserLockoutEnabledByDefault = true;
            userManager.MaxFailedAccessAttemptsBeforeLockout = 3;


            var DataProtectionProvider = option.DataProtectionProvider;
            if(DataProtectionProvider!=null)
            {
                userManager.UserTokenProvider = new
                    DataProtectorTokenProvider<ShopUser>(DataProtectionProvider.Create(""+
                    "Shop used for user stamp creation"));
            }
            return userManager;
            
        }
    }
}