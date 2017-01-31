namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleteAccessories1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductProducts", "Product_Id", "dbo.Products");
            DropForeignKey("dbo.ProductProducts", "Product_Id1", "dbo.Products");
            DropIndex("dbo.ProductProducts", new[] { "Product_Id" });
            DropIndex("dbo.ProductProducts", new[] { "Product_Id1" });
            DropTable("dbo.ProductProducts");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ProductProducts",
                c => new
                    {
                        Product_Id = c.Int(nullable: false),
                        Product_Id1 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Product_Id, t.Product_Id1 });
            
            CreateIndex("dbo.ProductProducts", "Product_Id1");
            CreateIndex("dbo.ProductProducts", "Product_Id");
            AddForeignKey("dbo.ProductProducts", "Product_Id1", "dbo.Products", "Id");
            AddForeignKey("dbo.ProductProducts", "Product_Id", "dbo.Products", "Id");
        }
    }
}
