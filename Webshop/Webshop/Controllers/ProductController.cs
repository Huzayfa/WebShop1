using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Webshop.Models.ProductViewModels;
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


        // GET: Products
        public ActionResult Index()
        {
            return PartialView("_ProductPanelPartialView");
        }

        //Get 
        public ActionResult ProductCustomerAllDetails(int? productId)
        {
            if(productId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
               var product=_rep.GetProductCustomerAllDetails(productId);
                if (product!=null)
                {
                    return Json(product, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return new HttpStatusCodeResult(HttpStatusCode.NotFound);
                }
            }
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

        public ActionResult AddAccessoryToProduct(int? productId,int? accessoryId)
        {
            if (productId == null || accessoryId==null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                return _rep.AddAccessoryToProduct(productId, accessoryId);
            }
        }

        public ActionResult RemoveAccessory(int? productId,int? accessoryId)
        {
            if (productId == null || accessoryId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                return _rep.RemoveAccessory(productId, accessoryId);
            }
        }


        [AllowAnonymous]
        public ActionResult ProductAccessories(int? productId)
        {
            if (productId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return Json(_rep.ProductAccessories(productId),JsonRequestBehavior.AllowGet);
        }


        //Get Edit User
        //[AllowAnonymous]
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
        public ActionResult Edit(Product product)
        {

            return _rep.EditProduct(product);

        }

        //[AllowAnonymous]
        public JsonResult Products()
        {
            List<Product> productsList = _rep.GetProductsList();
            return Json(productsList, JsonRequestBehavior.AllowGet);
        }


        [AllowAnonymous]
        public JsonResult RecommedndedProducts()
        {
            List<ProductForCustomerViewModel> productsList = _rep.GetRecommedndedProductsList();
            return Json(productsList, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult ProductsForCustomer()
        {
            List<ProductForCustomerViewModel> productsList = _rep.GetProductsForCustomerList();
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
