﻿using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using WebShop.Models;
using WebShop.Models.ShopUserModelView;
using WebShop.Models.Account;
using WebShop.Models.ProductViewModels;

namespace WebShop.Services
{
    public interface IRepository
    {
        
        List<UserForViewList> GetShoUserList();
        Task<IdentityResult> CreateUser(ShopUserCreateViewModel user);
        ActionResult DeleteUser(string userId);
        UserDetailsViewModel GetUserDetails(string userId);
        ActionResult EditUser(UserDetailsViewModel user);


        //Product Functions
        ActionResult DeleteProduct(int? productId);
        Product GetProductDetails(int? productId);
        ActionResult EditProduct(Product product);
        ActionResult DeleteOrder(int? orderId);
        List<Product> GetProductsList();
        Product CreateProduct(NewProductViewModel product);
        



        //Category Functions
        ActionResult DeleteCategory(int? categoryId);
        Category GetCategoryDetails(int? categoryId);
        
        ActionResult EditCategory(Category category);
        object GetOrderDetails(int? orderId);
        
        List<Category> GetCategoriesList();
        Category CreateCategory(Category category);


        //Shoping Cart Functions
        ActionResult ConfirmShoping(List<Product> products);
        ActionResult EditOrder(Order user);
        List<Order> GetOrdersList();


    }
}
