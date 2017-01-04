using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebShop.Models.ShopUserModelView
{
    public class UserDetailsViewModel
    {

        [Required]
        public string Id { get; set; }


        [Required]
        [Display(Name = "First Name")]
        [StringLength(maximumLength: 50, MinimumLength = 3, ErrorMessage = "First Name Length 3...50")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        [StringLength(maximumLength: 50, MinimumLength = 3, ErrorMessage = "Last Name Lenght 3...50")]
        public string LastName { get; set; }

        /*[Required]
        [Display(Name = "Pass Word")]
        public string Password { get; set; }
        */
        [Required]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        /*
        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }
        */
    }
}