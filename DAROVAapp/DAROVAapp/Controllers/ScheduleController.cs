using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Web.Mvc;
using DAROVAapp.Models;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using Microsoft.Ajax.Utilities;

namespace DAROVAapp.Controllers
{
    public class ScheduleController : Controller
    {
        private ApplicationUserManager _userManager;
        
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: Schedule
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult EditSchedule()
        {
            var userId = User.Identity.GetUserId();
            ApplicationDbContext db = new ApplicationDbContext();
            List<ScheduleItemModel> subjects = db.ScheduleItems.Where(t => t.UserId == userId).ToList();
            return View(subjects);
        }

        [HttpPost]
        public async Task<JsonResult> EditSchedule(ScheduleItemModel model)
        {
            var userId = User.Identity.GetUserId();
            var scheduleItem = new ScheduleItemModel();
            scheduleItem.SubjectName = model.SubjectName;
            scheduleItem.Professor = model.Professor;
            scheduleItem.Duration = model.Duration;
            scheduleItem.StartDate = model.StartDate;
            scheduleItem.StartTime = model.StartTime;
            scheduleItem.FinishTime = model.FinishTime;
            scheduleItem.Place = model.Place;
            scheduleItem.Type = model.Type;
            scheduleItem.UserId = userId;
            ApplicationDbContext db = new ApplicationDbContext();
            var result = db.ScheduleItems.Add(scheduleItem);
            await db.SaveChangesAsync();
            return Json(result);
        }

        [HttpGet]
        public void DeleteItem(string itemId)
        {
            ApplicationDbContext db = new ApplicationDbContext();
            ScheduleItemModel itemToDelete;
            if (itemId != null)
            {
                itemToDelete = db.ScheduleItems.FirstOrDefault(t => t.Id.ToString() == itemId);
                db.ScheduleItems.Remove(itemToDelete);
                db.SaveChanges();
            }
        }

       [HttpGet]
        public JsonResult GetWeek(DateTime start, DateTime end)
        {
            var userId = User.Identity.GetUserId();
            ApplicationDbContext db = new ApplicationDbContext();
            List<ScheduleItemModel> list = db.ScheduleItems.OrderBy(d => d.StartTime).ToList();
            List<ScheduleItemModel> week = list.Where(t => !(DateTime.Compare(t.StartDate, end) > 0) &&
                !(DateTime.Compare(t.StartDate.AddDays((t.Duration - 1) * 7), start) < 0) &&
                t.UserId == userId).ToList();
            return Json(week, JsonRequestBehavior.AllowGet);
        }
    }
}