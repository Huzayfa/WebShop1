using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webshop.Models.ProductViewModels
{
    public class AccessoryViewModel
    {
        [Display(Name = "ProductId")]
        public int Id { get; set; }

        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(maximumLength: 50, MinimumLength = 2, ErrorMessage = "Length of the product name is 2..50")]
        public string Name { get; set; }

    }
}