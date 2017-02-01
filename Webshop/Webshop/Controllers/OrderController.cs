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
    [Authorize(Roles ="Admin")]
    public class OrderController : Controller
    {
        private IRepository _rep;


        public OrderController(IRepository rep)
        {
            _rep = rep;
        }
        // GET: Order
        public ActionResult Index()
        {
            return PartialView("_OrderPanelPartialView");
        }



        [HttpPost]
        public ActionResult Delete(int? orderId)
        {

            if (orderId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return _rep.DeleteOrder(orderId);

        }


        //Get Edit User

        public ActionResult OrderDetails(int? orderId)
        {
            if (orderId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                var order = _rep.GetOrderDetails(orderId);
                if (order == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                else return Json(order, JsonRequestBehavior.AllowGet);
            }
        }


        //Post
        [HttpPost]
        public ActionResult Edit(Order user)
        {
            return _rep.EditOrder(user);

        }


      //Get jeson List Of the User
        public JsonResult Orders()
        {
            List<Order> ordersList = _rep.GetOrdersList();
            return Json(ordersList, JsonRequestBehavior.AllowGet);
        }
    }
}