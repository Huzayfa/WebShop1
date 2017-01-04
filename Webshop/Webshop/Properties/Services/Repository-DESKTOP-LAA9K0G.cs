using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebShop.Models;
using WebShop.Models.Identity;
using WebShop.Models.ShopUserModelView;
using WebShop.Models.Account;
using Microsoft.Owin.Security;

namespace WebShop.Services
{
    public class Repository : IRepository
    {





        #region RepProperties
        private AppContext _dbContext;
        private AppUserManager _userManager;
        private AppSignInManager _signInManager;
        private IAuthenticationManager authManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Authentication;
            }
        }
        

        private AppSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<AppSignInManager>();
            }
            /*set
            {
                _signInManager = value;
            }*/
        }

        private AppContext DbContext
        {
            get
            {
                return _dbContext ?? HttpContext.Current.GetOwinContext().Get<AppContext>();
            }
           /* set
            {
                _dbContext = value;
            }*/
        }

        private AppUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<AppUserManager>();
            }
            /*set
            {
                _userManager = value;
            }*/
        }

        //private AppContext _dp= new AppContext();
        public string test()
        {
            // _dp.Orders.ToList();
            return ("From Repository Test");
        }

        #endregion RepProperties


        #region UserFunctions
        public List<UserForViewList> GetShoUserList()
        {
            IQueryable<UserForViewList> query = DbContext.Users.Select(u => new UserForViewList { FullName = u.FirstName + " " + u.LastName, Email = u.Email, Id = u.Id });
            List<UserForViewList> shopUsers = query.ToList();
            return shopUsers;
        }

        public async Task<IdentityResult> CreateUser(ShopUserCreateViewModel user)
        {
            var newUser = new ShopUser()
            {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
            };
            var result = await UserManager.CreateAsync(newUser, user.Password);
            /* if (result.Succeeded)
             {

                 if (model.IsAdmin)
                 {

                     var newUser = UserManager.FindByName(model.UserName);
                     var adminRole = await RoleManager.FindByNameAsync("Admin");
                     if (adminRole == null)
                     {
                         adminRole = new AppRole("Admin");
                         await RoleManager.CreateAsync(adminRole);
                     }
                     var roleResult = UserManager.AddToRole(newUser.Id, "Admin");

                 }
                 await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);

             }*/
            return result;
        }

        public ActionResult DeleteUser(string userId)
        {
            ShopUser user = UserManager.FindById(userId);
            if (user == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                UserManager.Delete(user);
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        public UserDetailsViewModel GetUserDetails(string userId)
        {
            var user = UserManager.FindById(userId);
            if (user == null)
            {
                return null;
            }
            else
            {
                return new UserDetailsViewModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Id=user.Id
                };
            }
        }

        public ActionResult EditUser(UserDetailsViewModel user)
        {
            var userEdit = UserManager.FindById(user.Id);
            userEdit.FirstName = user.FirstName;
            userEdit.LastName = user.LastName;
            userEdit.Email = user.Email;
            var Result = UserManager.Update(userEdit);
            if(Result.Succeeded)
            {
                return new HttpStatusCodeResult(HttpStatusCode.OK); ;
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
           
        }


#endregion UserFunctions

        #region ProductFunctions

        /// <summary>
        /// CProduct Functions
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        public ActionResult DeleteProduct(int? productId)
        {

            var product = DbContext.Products.Find(productId);
            if(product==null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NotFound);
            }
            else
            {
                DbContext.Products.Remove(product);
                DbContext.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            
        }

        public Product GetProductDetails(int? productId)
        {
            var product = DbContext.Products.Find(productId);
            return product;
        }

        public ActionResult EditProduct(Product product)
        {
            DbContext.Entry(product).State = EntityState.Modified;
            DbContext.SaveChanges();
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        public List<Product> GetProductsList()
        {
            
            IEnumerable < Product > products = DbContext.Products;
            if(products!=null)
            {
                return products.ToList();
            }
            else
            {
                return new List<Product>();
            }
            
        }

        public Product CreateProduct(Product product)
        {
            try
            {
                DbContext.Products.Add(product);
                DbContext.SaveChanges();
            }
            catch(Exception)
            {
                return null;
            }
            return product;
        }

        #endregion


        #region CategoryFunctions
        /// <summary>
        /// /Category Function
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public ActionResult DeleteCategory(int? categoryId)
        {
            if (DbContext.Categories == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NotFound);
            }
            else
            {
                var category = DbContext.Categories.Find(categoryId);
                if (category == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.NotFound);
                }
                else
                {
                    DbContext.Categories.Remove(category);
                    DbContext.SaveChanges();
                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                }
            }
        }


        //Get Category
        public Category GetCategoryDetails(int? categoryId)
        {
            if(DbContext.Categories==null)
            {
                return null;
            }
            else
            {
                var category = DbContext.Categories.Find(categoryId);
                return category;
            }
        }


        //Edit Category
        public ActionResult EditCategory(Category category)
        {
            DbContext.Entry(category).State = EntityState.Modified;
            DbContext.SaveChanges();
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }


        //Get Category List
        public List<Category> GetCategoriesList()
        {

            IEnumerable<Category> categories = DbContext.Categories;
            if (categories != null)
            {
                return categories.ToList();
            }
            else
            {
                return new List<Category>();
            }

        }


        //Create Category
        public Category CreateCategory(Category category)
        {
            try
            {
                DbContext.Categories.Add(category);
                DbContext.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }
            return category;
        }
        #endregion


        #region ShoppingFunctions

        public ActionResult ConfirmShoping(List<Product> products)
        {
            if(products==null || products.Count==0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                Order order = new Order();
                order.OrderDate = DateTime.Now;
                order.DeliverDate = order.OrderDate.AddDays(4);
                foreach (var product in products)
                {
                    OrderProduct orderProduct = new OrderProduct()
                    {
                        ProductPrice = product.Price,
                        Product = product,
                        Order = order,
                        Quantity = 1,

                    };
                    order.OrderProducts.Add(orderProduct);
                    DbContext.OrderProducts.Add(orderProduct);
                }
                try
                {
                    DbContext.Orders.Add(order);
                    DbContext.SaveChanges();
                }
                catch (Exception e)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            
        }

        #endregion

        #region OrdersFunctions
        /// <summary>
        /// Order Functions
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public ActionResult DeleteOrder(int? orderId)
        {
            if(orderId==null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            else
            {
                var order = DbContext.Orders.Find(orderId);
                if (order == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.NotFound);
                }
                else
                {
                    foreach (var orderproduct in order.OrderProducts)
                    {
                        DbContext.OrderProducts.Remove(orderproduct);
                    }
                    DbContext.Orders.Remove(order);
                    DbContext.SaveChanges();
                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                }
            }
                
            
        }

        public object GetOrderDetails(int? orderId)
        {
            if (DbContext.Orders == null)
            {
                return null;
            }
            else
            {
                var order = DbContext.Orders.Find(orderId);
                return order;
            }
        }

        public ActionResult EditOrder(Order order)
        {
            DbContext.Entry(order).State = EntityState.Modified;
            DbContext.SaveChanges();
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        public List<Order> GetOrdersList()
        {
            IEnumerable<Order> orders = DbContext.Orders;
            if (orders != null)
            {
                return orders.ToList();
            }
            else
            {
                return new List<Order>();
            }
        }


        #endregion



        #region Account Functions
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return //RedirectToLocal(returnUrl);
                            new HttpStatusCodeResult(HttpStatusCode.OK);
                case SignInStatus.LockedOut:
                    return new HttpStatusCodeResult(HttpStatusCode.NotAcceptable);
                case SignInStatus.Failure:
                default:

                    return new HttpStatusCodeResult(HttpStatusCode.NotFound);
            }
            
        }

        public void LogOff()
        {
            authManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
        }
        #endregion Account Functions
    }
}