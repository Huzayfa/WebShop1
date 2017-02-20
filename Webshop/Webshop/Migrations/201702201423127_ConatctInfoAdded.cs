namespace WebShop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ConatctInfoAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ContactDatas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OpningWorkDays = c.String(),
                        OpningSaturday = c.String(),
                        OpningSunday = c.String(),
                        OpningCustomerService = c.String(),
                        Telephone = c.String(),
                        Vxl = c.String(),
                        Mobil = c.String(),
                        EMail = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ContactDatas");
        }
    }
}
