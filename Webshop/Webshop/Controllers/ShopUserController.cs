using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebShop.Models;
using WebShop.Models.ShopUserModelView;
using WebShop.Services;

namespace WebShop.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ShopUserController : Controller
    {

        private IRepository _rep;

        public ShopUserController(IRepository rep)
        {
            _rep = rep;
        }


        // GET: ShopUser
        [Authorize]
        public ActionResult Index()
        {

            return PartialView("_ShopUsersPartialView");
        }

        [HttpPost]
        public ActionResult Delete(string userId)
        {

            if (userId == null || userId==HttpContext.User.Identity.GetUserId())
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                _rep.DeleteUser(userId);
            }
            return null;
        }


        //Get Edit User

        public ActionResult UserDetails(string userId)
        {
            if (userId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                var user = _rep.GetUserDetails(userId);
                if (user == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                else return Json(user, JsonRequestBehavior.AllowGet);
            }
        }


        //Post
        [HttpPost]
        public ActionResult Edit(UserDetailsViewModel user)
        {
            if (ModelState.IsValid)
            {
                return _rep.EditUser(user);
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.NotAcceptable);
            }
        }


        //Get jeson List Of the User
        public JsonResult ShopUsers()
        {
            List<UserForViewList> usersList = _rep.GetShoUserList();
            return Json(usersList, JsonRequestBehavior.AllowGet);
        }

        //Get
        public ActionResult Create()
        {
            return PartialView("_CreateShopUserPartialView");
        }


        //Post
        [HttpPost]
        //[Bind(Include = "FirstName")]
        //public async Task<ActionResult> Create(ShopUserCreateViewModel user)
        public async Task<ActionResult> Create(ShopUserCreateViewModel user)
        {

            if (ModelState.IsValid)
            {
               /* if (Request.Files != null)
                {
                    var file = Request.Files[0];
                }
                */

                var Result= await _rep.CreateUser(user);
                if(Result.Succeeded)
                {
                    return Content("Done");
                }
                else
                {
                    return Content(Result.Errors.ToList()[0]);
                }

            }
            return null;
        }
    }
}