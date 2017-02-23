namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FaxtoContact : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ContactDatas", "Fax", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ContactDatas", "Fax");
        }
    }
}
