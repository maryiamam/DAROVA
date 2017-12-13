namespace DAROVAapp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdditionalUserFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "EducationsEstablishment", c => c.String());
            AddColumn("dbo.AspNetUsers", "Grade", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Faculty", c => c.String());
            AddColumn("dbo.AspNetUsers", "Speciality", c => c.String());
            AddColumn("dbo.AspNetUsers", "ImageURL", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "ImageURL");
            DropColumn("dbo.AspNetUsers", "Speciality");
            DropColumn("dbo.AspNetUsers", "Faculty");
            DropColumn("dbo.AspNetUsers", "Grade");
            DropColumn("dbo.AspNetUsers", "EducationsEstablishment");
        }
    }
}
