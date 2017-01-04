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
    }
}