using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Webshop.Models;
using WebShop.Models;

namespace WebShop
{
    public class AppContext : IdentityDbContext<ShopUser>
    {
        public DbSet<Order> Orders { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<OrderProduct> OrderProducts { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<ContactData> ContactData { get; set; }

       // public DbSet<ShopUser> Users { get; set; }

        public AppContext() : base("WebShopDB", throwIfV1Schema: false)        {
           

        }
        public static AppContext Create()
        {
            return new AppContext();
        }

        //Edit thye Many-toMany Relation to the product with accessories
        //Just to be more clear
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Accessories)
                .WithMany(p => p.AccessoryTo)
                .Map(m =>
                {
                    m.MapLeftKey("AccToProductId");
                    m.MapRightKey("AccessoryId");
                    m.ToTable("ProductAccessories");
                });

        }
    }
}