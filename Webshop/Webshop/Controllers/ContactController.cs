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


        public JsonResult GetContactInformations()
        {
            return Json( _rep.GetContactInformations(), JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        [Authorize(Roles ="Admin")]
        public ActionResult AdminContact()
        {
            return PartialView("_AdminContactPanelPartialView");
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public ActionResult EditContactInformations(ContactData newContact)
        {
            return _rep.EditContactInformations(newContact);
        }

        public ActionResult GetAddress()
        {
            return Json(_rep.GetCompanyAddress(),JsonRequestBehavior.AllowGet);
        }

    }
}