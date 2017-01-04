namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class productquantity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "StockQuantity", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "StockQuantityToShow", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "StockQuantityToShow");
            DropColumn("dbo.Products", "StockQuantity");
        }
    }
}
