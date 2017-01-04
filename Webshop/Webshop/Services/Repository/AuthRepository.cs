using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebShop.Models.Account;
using WebShop.Models.Identity;

namespace WebShop.Services
{
    public class AuthRepository :IAuthRepository
    {
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

        public ActionResult IsLogedIn()
        {
            if( HttpContext.Current.User.Identity.IsAuthenticated)
            {
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.Unauthorized);
            }
        }

        #endregion Account Functions

    }
}