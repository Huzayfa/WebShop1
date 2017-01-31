namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleteAccessories : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductAccessories", "AccToProductId", "dbo.Products");
            DropForeignKey("dbo.ProductAccessories", "AccessoryId", "dbo.Products");
            DropIndex("dbo.ProductAccessories", new[] { "AccToProductId" });
            DropIndex("dbo.ProductAccessories", new[] { "AccessoryId" });
            DropTable("dbo.ProductAccessories");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ProductAccessories",
                c => new
                    {
                        AccToProductId = c.Int(nullable: false),
                        AccessoryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.AccToProductId, t.AccessoryId });
            
            CreateIndex("dbo.ProductAccessories", "AccessoryId");
            CreateIndex("dbo.ProductAccessories", "AccToProductId");
            AddForeignKey("dbo.ProductAccessories", "AccessoryId", "dbo.Products", "Id");
            AddForeignKey("dbo.ProductAccessories", "AccToProductId", "dbo.Products", "Id");
        }
    }
}
