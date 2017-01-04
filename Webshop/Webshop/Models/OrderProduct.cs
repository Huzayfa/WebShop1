using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebShop.Models
{
    public class OrderProduct
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Display(Name ="Product Price")]
        [Range (minimum:0,maximum:double.MaxValue,ErrorMessage ="Try Valid Price")]
        //Price Per one st
        public decimal ProductPrice { get; set; }

        [Required]
        [Display (Name ="Quantity")]
        [Range(minimum:1,maximum:int.MaxValue,ErrorMessage ="Quantity Must be Valid")]
        public int Quantity { get; set; }


        [ForeignKey("Order")]
        public int OrderId { get; set; }
        public Order Order { get; set; }


        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Product Product { get; set; }

    }
}