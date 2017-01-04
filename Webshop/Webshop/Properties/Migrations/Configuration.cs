namespace WebShop.Migrations
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.AspNet.Identity.Owin;
    using Models;
    using Models.Identity;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;

    internal sealed class Configuration : DbMigrationsConfiguration<WebShop.AppContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override  void Seed(WebShop.AppContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            

            Task.Run(async () => { await SeedAsync(context); }).Wait();
            


        }

        private async Task SeedAsync(AppContext context)
        {
            var user = new ShopUser()
            {
                UserName = AdminUser.UserName,
                Email = AdminUser.Email,
                FirstName = AdminUser.FirstName,
                LastName = AdminUser.LastName,
                City = AdminUser.City,
                StreetAddress = AdminUser.StreetAddress,
                PostNumber = AdminUser.PostNumber,
                Country = AdminUser.Country,
            };
            var role = new AppRole(RoleNames.Admin);

            ///
            UserStore<ShopUser> uStore = new UserStore<ShopUser>(context);
            var userManager = new AppUserManager(uStore);
            RoleStore<AppRole> rStore = new RoleStore<AppRole>(context);
            var roleManager = new AppRoleManager(rStore);
            var adminRole =await roleManager.FindByNameAsync(RoleNames.Admin);
            if(adminRole==null)
             {
                 adminRole = new AppRole(RoleNames.Admin);
                 await roleManager.CreateAsync(adminRole);
             }
            
           // await roleManager.CreateAsync(new AppRole(RoleNames.Admin));
            var result= await userManager.CreateAsync(user, AdminUser.Password);
            user = await userManager.FindByNameAsync(AdminUser.UserName);
            await userManager.AddToRoleAsync(user.Id,RoleNames.Admin);        
        }
    }
}
