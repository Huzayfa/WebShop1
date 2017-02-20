using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webshop.Models
{
    public class Events
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime EventDate { get; set; }

        public string Title { get; set; }

        public string Photo { get; set; }

    }
}