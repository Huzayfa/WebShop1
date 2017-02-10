using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebShop.Models.OrderViewModels
{
    public class OrderViewMoedel
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Order Date")]
        [DataType(DataType.DateTime)]
        public DateTime OrderDate { get; set; }

        [Display(Name = "Deliver Date")]
        [DataType(DataType.DateTime)]
        public DateTime DeliverDate { get; set; }

        [Display(Name = "Total Price")]
        public decimal TotalPrice { get; set; }


        public string CustomerEmail { get; internal set; }
        
        public string CustomerName { get; internal set; }

        public ICollection<OrderProductViewModel> orderProducts;


    }
}