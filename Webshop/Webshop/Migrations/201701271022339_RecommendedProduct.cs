namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RecommendedProduct : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "isRecommended", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "isRecommended");
        }
    }
}
