namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addAccessories2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProductAccessories",
                c => new
                    {
                        AccToProductId = c.Int(nullable: false),
                        AccessoryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.AccToProductId, t.AccessoryId })
                .ForeignKey("dbo.Products", t => t.AccToProductId)
                .ForeignKey("dbo.Products", t => t.AccessoryId)
                .Index(t => t.AccToProductId)
                .Index(t => t.AccessoryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductAccessories", "AccessoryId", "dbo.Products");
            DropForeignKey("dbo.ProductAccessories", "AccToProductId", "dbo.Products");
            DropIndex("dbo.ProductAccessories", new[] { "AccessoryId" });
            DropIndex("dbo.ProductAccessories", new[] { "AccToProductId" });
            DropTable("dbo.ProductAccessories");
        }
    }
}
