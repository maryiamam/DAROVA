using DAROVAapp.Extensions;
using DAROVAapp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace DAROVAapp.Controllers
{
    public class ProfileController : Controller
    {
        private ApplicationUserManager _userManager;

        public ProfileController()
        {
        }

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

        // GET: Profile
        public async Task<ActionResult> Index()
        {
            var userId = User.Identity.GetUserId();
            var user = UserManager.Users.FirstOrDefault(u => u.Id == userId);
            var model = new ProfileViewModel
            {
                Email = await UserManager.GetEmailAsync(userId),
                PhoneNumber = await UserManager.GetPhoneNumberAsync(userId),
                Nickname = user.Nickname,
                EducationsEstablishment = user.EducationsEstablishment,
                Grade = user.Grade,
                Faculty = user.Faculty,
                Speciality = user.Speciality,
                ImageURL = user.ImageURL

            };
            return View(model);
        }

        [HttpPost]
        public async Task<JsonResult> SaveChanges(ProfileViewModel model)
        {
            var userId = User.Identity.GetUserId();
            var user = await UserManager.FindByIdAsync(userId);
            user.Nickname = model.Nickname;
            user.ImageURL = model.ImageURL;
            user.Speciality = model.Speciality;
            user.Faculty = model.Faculty;
            user.EducationsEstablishment = model.EducationsEstablishment;
            user.Grade = model.Grade;
            var result = await UserManager.UpdateAsync(user);
            User.AddUpdateClaim("Nickname", user.Nickname);
            return Json(result);
        }
    }
}