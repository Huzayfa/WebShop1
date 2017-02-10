using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebShop.Models;
using WebShop.Services;

namespace WebShop.Controllers
{
   // [Authorize(Roles = "Admin")]
    public class ContactController : Controller
    {
        private IRepository _rep;

        public ContactController(IRepository rep)
        {
            _rep = rep;
        }
        // GET: Order
        public ActionResult Index()
        {
            return PartialView("_ContactPanelPartialView");
        }

    }
}