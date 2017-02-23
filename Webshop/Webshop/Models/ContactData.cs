using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Webshop.Models
{
    public class ContactData
    {
        [Key]
        public int Id { get; set; }

        public string Address { get; set; }

        public string OpningWorkDays { get; set; }

        public string OpningSaturday { get; set; }

        public string OpningSunday { get; set; }

        public string OpningCustomerService { get; set; }

        

        public string Telephone { get; set; }

        public string Fax { get; set; }

        public string Vxl { get; set; }

        public string Mobil { get; set; }

        public string EMail { get; set; }

    }
}