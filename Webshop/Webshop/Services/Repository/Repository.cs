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
using WebShop.Models.ProductViewModels;
using Webshop.Models.ProductViewModels;

namespace WebShop.Services
{
    public class Repository : IRepository
    {





        #region RepProperties

        private AppContext _dbContext;
        private AppUserManager _userManager;

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

        

        #endregion RepProperties


        #region UserFunctions
        public List<UserForViewList> GetShoUserList()
        {
            IQueryable<UserForViewList> query = DbContext.Users.Select(u => new UserForViewList { FullName = u.FirstName + " " + u.LastName, Email = u.Email, Id = u.Id });
            List<UserForViewList> shopUsers = query.ToList();
            return shopUsers;
        }


        public List<UserForViewList> GetRegUserList()
        {
            string usName;
            var user = HttpContext.Current.User;
            usName = user.Identity.GetUserName();

            IQueryable<UserForViewList> query = DbContext.Users.Select(u => new UserForViewList { FullName = u.FirstName + " " + u.LastName, Email = u.Email, Id = u.Id, UserName = u.UserName });
            List<UserForViewList> shopUsers = query.ToList();

            shopUsers.RemoveAll(s => s.UserName != usName);

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
                City=user.City,
                Country=user.Country,
                PhoneNumber=user.PhoneNumber,
                PostNumber=user.PostNumber,
                StreetAddress=user.StreetAddress,
            };
            
            var result = await UserManager.CreateAsync(newUser,user.Password);
            
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
            //var user = UserManager.FindById(userId);
            var user = DbContext.Users.Include(u => u.Orders).SingleOrDefault(u => u.Id == userId);


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
                    Id = user.Id,
                    orders = user.Orders.Select(o => new Models.OrderViewModels.OrderViewMoedel {
                        Id = o.Id,
                        OrderDate = o.OrderDate,
                    }).ToList(),
                    City = user.City,
                    Country = user.Country,
                    PhoneNumber = user.PhoneNumber,
                    PostNumber = user.PostNumber,
                    StreetAddress = user.StreetAddress,

                };
            }
        }

        public ActionResult EditUser(UserDetailsViewModel user)
        {
            var userEdit = UserManager.FindById(user.Id);           
            userEdit.FirstName = user.FirstName;
            userEdit.LastName = user.LastName;
            userEdit.Email = user.Email;
            userEdit.City = user.City;            
            userEdit.Country = user.Country;
            userEdit.PhoneNumber = user.PhoneNumber;
            userEdit.PostNumber = user.PostNumber;
            userEdit.StreetAddress = user.StreetAddress;
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

        public ProductDetailsViewModel GetProductDetails(int? productId)
        {
            var product = DbContext.Products.Include("Category").SingleOrDefault(p => p.Id == productId);


           var pView= new ProductDetailsViewModel()
            {
                Category = product.Category.Name,
                Description = product.Description,
                Name = product.Name,
                Photo = product.Photo,
                Price = product.Price,
                Quantity=product.Quantity,
                Id=product.Id,
                CategoryId=product.CategoryId,
                StockQuantity=product.StockQuantity,
                StockQuantityToShow=product.StockQuantityToShow,
                
            };
            
                
            return pView;
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

        public List<ProductForCustomerViewModel> GetProductsForCustomerList()
        {

            IEnumerable<ProductForCustomerViewModel> products = DbContext.Products.Select(p =>
                new ProductForCustomerViewModel {
                    Id = p.Id,
                    Name = p.Name,
                    Price=p.Price,
                    Photo=p.Photo,
                    Description=p.Description,
                    StockQuantityToShow=p.StockQuantityToShow,
                });
            if (products != null)
            {
                return products.ToList();
            }
            else
            {
                return new List<ProductForCustomerViewModel>();
            }

        }
        public Product CreateProduct(NewProductViewModel product)
        {
            var files= HttpContext.Current.Request.Files;
            string filename = "";
            
            if (files.Count > 0)
            {
                filename = files[0].FileName;
                string path = HttpContext.Current.Server.MapPath("../Avatar//");
                filename = Guid.NewGuid() + "." + filename.Split('.')[1];
                files[0].SaveAs(path + filename);
                
            }
            else
            {
                filename = "image-not-available.jpg";
            }
            Product newProduct = new Product
            {
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                CategoryId = product.CategoryId,
                StockQuantity = product.StockQuantity,
                StockQuantityToShow = product.StockQuantityToShow,
                isRecommended=product.isRecommended,
                Photo = "/Avatar//" + filename,
            };
            try
            {
                DbContext.Products.Add(newProduct);
                DbContext.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }

            return newProduct;
        }


        public List<AccessoryViewModel> ProductAccessories(int? productId)
        {
            try
            {
               return  DbContext.Products.Include("Accessories").First(p => p.Id == productId).Accessories.Select(p=>
                    new AccessoryViewModel()
                    {
                        Id=p.Id,
                        Name=p.Name,
                    }
                    
                    ).ToList();
            }
            catch
            {
                return new List<AccessoryViewModel>();
            }

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
                order.TotalPrice = 0;
                var user = HttpContext.Current.User;
                order.CustomerId = user.Identity.GetUserId();
                foreach (var product in products)
                {
                    OrderProduct orderProduct = new OrderProduct()
                    {
                        ProductPrice = product.Price,
                        // Nedanstående rad tillagd
                         ProductId = product.Id,
                        // Nedanstående rad bortkommenterad
                        // Product = product,
                        Order = order,
                        Quantity = product.Quantity,
                    };


                    order.TotalPrice += (product.Price * product.Quantity);
                    order.OrderProducts.Add(orderProduct);
                    DbContext.OrderProducts.Add(orderProduct);


                    // - - - - -
                    // Update stock quantity 
                    var it = DbContext.Products.FirstOrDefault(x => x.Id == product.Id);
                    if (it != null)
                    {
                     it.StockQuantity = it.StockQuantity - product.Quantity;
                     it.StockQuantityToShow = it.StockQuantityToShow - product.Quantity;
                    }
                    // - - - - -

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

    }
}