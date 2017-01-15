using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebShop.Models.OrderViewModels;

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

        
        [Required]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }



        [Required]
        [Display(Name = "Street Address")]
        [StringLength(maximumLength: 50, MinimumLength = 3, ErrorMessage = "Last Street Name Lenght 3...50")]
        public string StreetAddress { get; set; }

        [Required]
        [Display(Name = "City Name")]
        [StringLength(maximumLength: 50, MinimumLength = 3, ErrorMessage = "Last City Name Lenght 3...50")]
        public string City { get; set; }

        [Required]
        [Display(Name = "Post Number")]
        [StringLength(maximumLength: 6, MinimumLength = 4, ErrorMessage = "Post Nmber Lenght 4...6")]
        public string PostNumber { get; set; }

        [Required]
        [Display(Name = "Country Name")]
        [StringLength(maximumLength: 50, MinimumLength = 3, ErrorMessage = "Country Name Lenght 3...50")]
        public string Country { get; set; }


        [StringLength(maximumLength: 50, MinimumLength = 3, ErrorMessage = "Phone Number Lenght 3...6")]
        public string PhoneNumber { get; set; }

        public ICollection<OrderViewMoedel> orders;
        /*
        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }
        */
    }
}