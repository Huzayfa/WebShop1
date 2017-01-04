using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebShop.Models
{
    public class ShopUser :IdentityUser
    {
        [Required]
        [Display(Name ="First Name")]
        [StringLength (maximumLength:50,MinimumLength =3,ErrorMessage ="First Name Length 3...50")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name ="Last Name")]
        [StringLength (maximumLength:50,MinimumLength =3,ErrorMessage ="Last Name Lenght 3...50")]
        public string LastName { get; set; }

        [NotMapped]
        [Display (Name ="Full Name")]
        public string FullName { get {
                return FirstName + " " + LastName;
            }
           private set { }
        }

        //User Address
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
        [StringLength(maximumLength: 50, MinimumLength = 3, ErrorMessage = "Country Name Lenght 4...6")]
        public string Country { get; set; }

        public string Photo { get; set; }


        public ICollection<Order> Orders { get; set; }

        public ShopUser() :base()
        {
            Orders = new List<Order>();
        }


        public ShopUser Create()
        {
            return new ShopUser();
        }

    }
}