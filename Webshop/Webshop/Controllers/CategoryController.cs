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
    public class CategoryController : Controller
    {

        private IRepository _rep;


        public CategoryController(IRepository rep)
        {
            _rep = rep;
        }


        // GET: Category
        public ActionResult Index()
        {
            return PartialView("_CategoryPanelPartialView");
        }


        [HttpPost]
        public ActionResult Delete(int? categoryId)
        {

            if (categoryId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return _rep.DeleteCategory(categoryId);

        }


        //Get  Category

        public ActionResult Details(int? categoryId)
        {
            if (categoryId == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                var category = _rep.GetCategoryDetails(categoryId);
                if (category == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                else return Json(category, JsonRequestBehavior.AllowGet);
            }
        }


        //Post
        [HttpPost]
        public ActionResult Edit(Category category)
        {

            return _rep.EditCategory(category);

        }


        //Get jeson List Of the User
        [AllowAnonymous]
        public JsonResult Categories()
        {
            List<Category> categoriesList = _rep.GetCategoriesList();
            return Json(categoriesList, JsonRequestBehavior.AllowGet);
        }




        //Post
        [HttpPost]
        public ActionResult Create(Category category)
        {

            if (ModelState.IsValid)
            {
                if (_rep.CreateCategory(category) != null)
                {
                    return Json(category, JsonRequestBehavior.AllowGet);
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