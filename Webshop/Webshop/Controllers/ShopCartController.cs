
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebShop.Models;
using WebShop.Services;

namespace WebShop.Controllers
{
    public class ShopCartController : Controller
    {
        private IRepository _rep;


        public ShopCartController(IRepository rep)
        {
            _rep = rep;
        }
        // GET: ShopCart to add Product to the Cart
        public ActionResult Index()
        {
            return PartialView("_ShopCartPartialView");
        }


        //Get viwe the cart and the product in this Cart
        public ActionResult ViewShopCart()
        {
            return PartialView("_ViewShopCartPartialView");
        }

        public ActionResult IsLogedIn()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.Forbidden);
            }
        }

        //Confirm the Order
        [Authorize]
        [ValidateAntiForgeryToken]
        // public ActionResult ConfirmShoping(List<Product> products)
        public ActionResult ConfirmShoping(List<Product> products)
        {
            if (HttpContext.Session.Contents["customerCart"] != null)
            {
                // products = (List<Product>)HttpContext.Session["customerCart"];
            }
            var serializer = new JavaScriptSerializer();
            HttpCookie cookie;
            if (HttpContext.Request.Cookies["customerCart"] != null)
            {

                cookie = HttpContext.Request.Cookies["customerCart"];
                // serializer.DeserializeObject(cookie.Value);
                // Newtonsoft.Json.JsonConverter j = new Newtonsoft.Json.JsonConverter();
                // Product product = (Product)JsonConvert.DeserializeObject(cookie.Value);
                // JsonConvert.DeserializeAnonymousType<List<Product>>(cookie.Values.ToString(), products);
                // var product=JsonConvert.d <IEnumerable<Product>>(cookie.Values);
                // var product = serializer.Deserialize<List<Product>>(cookie.Value);

            }
            //return Content("");
            return _rep.ConfirmShoping(products);

        }


    }
}