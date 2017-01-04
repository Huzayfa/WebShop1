using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebShop.Models;
using WebShop.Models.ProductViewModels;
using WebShop.Services;

namespace WebShop.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ProductController : Controller
    {

        private IRepository _rep;


        public ProductController(IRepository rep)
        {
            _rep = rep;
        }


        // GET: Product
        public ActionResult Index()
        {
            return PartialView("_ProductPanelPartialView");
        }


        [HttpPost]
        public ActionResult Delete(int? productId)
        {

            if (productId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return _rep.DeleteProduct(productId);
            
        }


        //Get Edit User
        [AllowAnonymous]
        public ActionResult ProductDetails(int? productId)
        {
            if (productId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                var product = _rep.GetProductDetails(productId);
                if (product == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                else return Json(product, JsonRequestBehavior.AllowGet);
            }
        }


        //Post
        [HttpPost]
        public ActionResult Edit(Product user)
        {

            return _rep.EditProduct(user);

        }

        [AllowAnonymous]
        //Get jeson List Of the User
        public JsonResult Products()
        {
            List<Product> productsList = _rep.GetProductsList();
            return Json(productsList, JsonRequestBehavior.AllowGet);
        }

       


        //Post
        [HttpPost]
        public ActionResult Create(NewProductViewModel product)
        {
            if (ModelState.IsValid)
            {
                var newProduct = _rep.CreateProduct(product);
                if (newProduct != null)
                {
                    return Json(newProduct, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        }
    }
}
