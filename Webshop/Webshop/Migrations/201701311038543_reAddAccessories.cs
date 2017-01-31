namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class reAddAccessories : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProductProducts",
                c => new
                    {
                        Product_Id = c.Int(nullable: false),
                        Product_Id1 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Product_Id, t.Product_Id1 })
                .ForeignKey("dbo.Products", t => t.Product_Id)
                .ForeignKey("dbo.Products", t => t.Product_Id1)
                .Index(t => t.Product_Id)
                .Index(t => t.Product_Id1);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductProducts", "Product_Id1", "dbo.Products");
            DropForeignKey("dbo.ProductProducts", "Product_Id", "dbo.Products");
            DropIndex("dbo.ProductProducts", new[] { "Product_Id1" });
            DropIndex("dbo.ProductProducts", new[] { "Product_Id" });
            DropTable("dbo.ProductProducts");
        }
    }
}
