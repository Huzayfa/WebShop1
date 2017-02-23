namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addresstocontactdata : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ContactDatas", "Address", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ContactDatas", "Address");
        }
    }
}
