using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebShop.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Display(Name ="Product Name")]
        [Required(ErrorMessage ="Product Name is required")]
        [StringLength(maximumLength:50,MinimumLength =2,ErrorMessage ="Length of the product name is 2..50")]
        public string Name { get; set; }

        [Display(Name ="Price")]
        [Required(ErrorMessage ="Price is required")]
        [Range(0,Double.MaxValue,ErrorMessage ="Try Valid Price")]
        public decimal Price { get; set; }

        [Display(Name= "isRecommended")]
        public bool isRecommended { get; set; }


        //[Display(Name = "isAccessory")]
        //public bool isAccessory { get; set; }

        //Using this property to know how many product in the cart
        [NotMapped]
        public int Quantity { get; set; }


        //Quantity In the Stock
        //[Range(0,Int32.MaxValue,ErrorMessage ="Try Valid Quantity")]
        public int StockQuantity { get; set; }


        //Quantity to show to the Customers
        [Range(0, Int32.MaxValue, ErrorMessage = "Try Valid Quantity")]
        public int StockQuantityToShow { get; set; }


        [Display(Name ="Description")]
        public string Description { get; set; }

        public string Photo { get; set; }

        [ForeignKey("Category")]
        public int? CategoryId { get; set; }
        public Category Category { get; set; }

        public ICollection<OrderProduct> OrderProducts { get; set; }

        //[InverseProperty("")]
        public ICollection<Product> AccessoryTo { get; set; }
        public ICollection<Product> Accessories { get; set; }


        public Product()
        {
            OrderProducts = new List<OrderProduct>();
            Accessories = new List<Product>();
            AccessoryTo = new List<Product>();
        }

    }
}