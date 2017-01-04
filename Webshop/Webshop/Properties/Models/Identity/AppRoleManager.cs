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
    public class AppRoleManager:RoleManager<AppRole>
    {
        public AppRoleManager(IRoleStore<AppRole,string> roleSotre)
           :base(roleSotre) 
        {

        }

        public static AppRoleManager Create(IdentityFactoryOptions<AppRoleManager> options,IOwinContext context)
        {
            var roleStore = new RoleStore<AppRole>(context.Get<AppContext>());
            return new AppRoleManager(roleStore);

        }

    }
}