using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebShop.Models.Identity
{
    public class AppRole : IdentityRole
    {
        public AppRole()
        {

        }

        public AppRole(string name)
            :base(name)
        {

        }
    }
}