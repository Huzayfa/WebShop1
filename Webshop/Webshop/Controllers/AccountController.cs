using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebShop.Models.Account;
using WebShop.Services;

namespace WebShop.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private IAuthRepository _rep;


        public AccountController(IAuthRepository rep)
        {
            _rep = rep;
        }
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }


        //Log In
        [HttpGet]
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
           /* if(HttpContext.User.Identity.IsAuthenticated)
            {
                // return RedirectToAction("Index","Home");
                return new HttpStatusCodeResult(HttpStatusCode.Forbidden);
            }
            ViewBag.ReturnUrl = returnUrl;*/
            return PartialView("_LogInPartialView",new LoginViewModel());
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            return await _rep.Login(model, returnUrl);
            
        }

        [HttpPost]
        
        public ActionResult LogOff()
        {
            _rep.LogOff();             
            return RedirectToAction("Index", "Home");
        }
    }


}
