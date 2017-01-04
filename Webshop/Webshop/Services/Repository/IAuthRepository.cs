using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebShop.Models.Account;

namespace WebShop.Services
{
    public interface IAuthRepository
    {
        //Account Functions
        Task<ActionResult> Login(LoginViewModel model, string returnUrl);
        void LogOff();
        ActionResult IsLogedIn();
        
    }
}