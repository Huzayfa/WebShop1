namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class lennart2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "DeliverDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Orders", "DeliverDate");
        }
    }
}
