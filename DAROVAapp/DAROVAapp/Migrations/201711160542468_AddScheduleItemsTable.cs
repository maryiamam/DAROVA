namespace DAROVAapp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddScheduleItemsTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScheduleItemModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        StartTime = c.DateTime(nullable: false),
                        FinishTime = c.DateTime(nullable: false),
                        SubjectName = c.String(),
                        Professor = c.String(),
                        Place = c.String(),
                        Type = c.String(),
                        Duration = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ScheduleItemModels");
        }
    }
}
