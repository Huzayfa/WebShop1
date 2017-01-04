namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addresstotheuser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "StreetAddress", c => c.String(nullable: false, maxLength: 50));
            AddColumn("dbo.AspNetUsers", "City", c => c.String(nullable: false, maxLength: 50));
            AddColumn("dbo.AspNetUsers", "PostNumber", c => c.String(nullable: false, maxLength: 6));
            AddColumn("dbo.AspNetUsers", "Country", c => c.String(nullable: false, maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Country");
            DropColumn("dbo.AspNetUsers", "PostNumber");
            DropColumn("dbo.AspNetUsers", "City");
            DropColumn("dbo.AspNetUsers", "StreetAddress");
        }
    }
}
