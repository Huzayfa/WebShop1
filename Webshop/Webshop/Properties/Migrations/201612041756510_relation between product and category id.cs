namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class relationbetweenproductandcategoryid : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Products", name: "Category_Id", newName: "CategoryId");
            RenameIndex(table: "dbo.Products", name: "IX_Category_Id", newName: "IX_CategoryId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Products", name: "IX_CategoryId", newName: "IX_Category_Id");
            RenameColumn(table: "dbo.Products", name: "CategoryId", newName: "Category_Id");
        }
    }
}
