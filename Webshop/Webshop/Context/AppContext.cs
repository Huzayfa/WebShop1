using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebShop.Models;

namespace WebShop
{
    public class AppContext : IdentityDbContext<ShopUser>
    {
        public DbSet<Order> Orders { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<OrderProduct> OrderProducts { get; set; }

        public DbSet<Category> Categories { get; set; }

       // public DbSet<ShopUser> Users { get; set; }

        public AppContext() : base("WebShopDB", throwIfV1Schema: false)        {
           

        }
        public static AppContext Create()
        {
            return new AppContext();
        }
    }
}