namespace DAROVAapp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addstartdatetoscheduleitemmodel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ScheduleItemModels", "StartDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ScheduleItemModels", "StartDate");
        }
    }
}
