using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebShop.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Display(Name ="Order Date")]
        [DataType(DataType.DateTime)]

        public DateTime OrderDate { get; set; }


        [Display(Name = "Deliver Date")]
        [DataType(DataType.Date)]
        public DateTime DeliverDate;

        public ICollection<OrderProduct> OrderProducts { get; set; }


        public Order()
        {
            OrderProducts = new List<OrderProduct>();
        }
    }
}