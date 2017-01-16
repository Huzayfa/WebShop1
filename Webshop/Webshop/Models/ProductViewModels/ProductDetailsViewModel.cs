using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webshop.Models.ProductViewModels
{
    public class ProductDetailsViewModel
    {

        [Display(Name ="ProductId")]
        public int Id { get; set; }

        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(maximumLength: 50, MinimumLength = 2, ErrorMessage = "Length of the product name is 2..50")]
        public string Name { get; set; }

        [Display(Name = "Price")]
        [Required(ErrorMessage = "Price is required")]
        [Range(0, Double.MaxValue, ErrorMessage = "Try Valid Price")]
        public decimal Price { get; set; }

        //Using this property to know how many product in the cart
        //[NotMapped]
        public int Quantity { get; set; }


        [Display(Name = "Description")]
        public string Description { get; set; }

        
        public int? CategoryId { get; set; }
        [Display(Name ="Category")]
        public string Category { get; set; }

        public string Photo { get; set; }
       
    }
}