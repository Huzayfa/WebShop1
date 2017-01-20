using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebShop.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Display(Name ="Order Date")]
        [DataType(DataType.Date)]
        public DateTime OrderDate { get; set; }


        [Display(Name = "Deliver Date")]
        [DataType(DataType.Date)]
        public DateTime DeliverDate { get; set; }

        [Display(Name ="Total Price")]
        public decimal TotalPrice { get; set; }


        public ICollection<OrderProduct> OrderProducts { get; set; }

        [ForeignKey("Customer")]
        public string CustomerId { get; set; }
        public ShopUser Customer { get; set; }


        public Order()
        {
            OrderProducts = new List<OrderProduct>();
        }
    }
}