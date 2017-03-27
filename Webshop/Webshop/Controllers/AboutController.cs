using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Webshop.Models;
using WebShop.Models;
using WebShop.Services;

namespace WebShop.Controllers
{
    // [Authorize(Roles = "Admin")]
    public class AboutController : Controller
    {
        private IRepository _rep;

        public AboutController(IRepository rep)
        {
            _rep = rep;
        }

        // GET: Order
        public ActionResult Index()
        {
            return PartialView("_AboutPanelPartialView");
        }


        public JsonResult GetAboutUsInformations()
        {
            return Json(_rep.getAboutUsData(), JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult AdminAboutUs()
        {
            return PartialView("_AdminAboutUsPanelPartialView");
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult EditAboutUsData(string data)
        {
            var newData = new AboutUs() { Content = data };
            return _rep.EditAboutUsData(newData);
        }

        

    }
}