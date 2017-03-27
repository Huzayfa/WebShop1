using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webshop.Models
{
    public class AboutUs
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

    }
}