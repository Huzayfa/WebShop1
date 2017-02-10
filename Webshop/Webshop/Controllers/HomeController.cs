using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using WebShop.Services;

namespace WebShop.Controllers
{
    public class HomeController : Controller
    {
        private IRepository _rep;
        

        public HomeController(IRepository rep)
        {
            _rep = rep;
        }
        
        // GET: Home
        public ActionResult Index()
        {

            ViewBag.Message = "Welcome To Our Web Shop";
            return View();
        }
    }
}