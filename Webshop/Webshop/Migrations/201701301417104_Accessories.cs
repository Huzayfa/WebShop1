namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Accessories : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "Product_Id", c => c.Int());
            CreateIndex("dbo.Products", "Product_Id");
            AddForeignKey("dbo.Products", "Product_Id", "dbo.Products", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Products", "Product_Id", "dbo.Products");
            DropIndex("dbo.Products", new[] { "Product_Id" });
            DropColumn("dbo.Products", "Product_Id");
        }
    }
}
