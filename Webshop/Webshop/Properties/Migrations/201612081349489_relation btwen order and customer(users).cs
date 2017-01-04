namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class relationbtwenorderandcustomerusers : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Orders", name: "ShopUser_Id", newName: "CustomerId");
            RenameIndex(table: "dbo.Orders", name: "IX_ShopUser_Id", newName: "IX_CustomerId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Orders", name: "IX_CustomerId", newName: "IX_ShopUser_Id");
            RenameColumn(table: "dbo.Orders", name: "CustomerId", newName: "ShopUser_Id");
        }
    }
}
