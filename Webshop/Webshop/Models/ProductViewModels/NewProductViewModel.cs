﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace WebShop.Models.ProductViewModels
{
    public class NewProductViewModel
    {
        
        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(maximumLength: 50, MinimumLength = 2, ErrorMessage = "Length of the product name is 2..50")]
        public string Name { get; set; }

        [Display(Name = "Price")]
        [Required(ErrorMessage = "Price is required")]
        [Range(0, Double.MaxValue, ErrorMessage = "Try Valid Price")]
        public decimal Price { get; set; }

        [Display(Name = "isRecommended")]
        public bool isRecommended { get; set; }


        //Using this property to know how many product in the cart
        //[NotMapped]
        public int Quantity { get; set; }

        //Quantity In the Stock
        [Display(Name = "Stock quantity")]
        public int StockQuantity { get; set; }


        //Quantity to show to the Customers
        [Display(Name = "Stock quantity to show")]
        public int StockQuantityToShow { get; set; }


        [Display(Name = "Description")]
        public string Description { get; set; }


        //public HttpPostedFileBase photoFile { get; set; }

        public string Photo { get; set; }

        
        public Nullable<int> CategoryId { get; set; }
        
        public NewProductViewModel() :base()
        {
            //photoFile = new List<HttpPostedFileBase>();
        }

    }
}