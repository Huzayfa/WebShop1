using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebShop.Models.OrderViewModels
{
    public class OrderProductViewModel
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Product Price")]
        //Price Per one st
        public decimal ProductPrice { get; set; }

        [Display(Name = "Quantity")]
        public int Quantity { get; set; }

        [Display(Name = "Order Id")]
        public int OrderId { get; set; }

        [Display(Name = "Product Id")]
        public int ProductId { get; set; }


    }
}