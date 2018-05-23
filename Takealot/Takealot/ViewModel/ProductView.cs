using System;
using Xamarin.Forms;

namespace Takealot.ViewModel
{
    public class ProductView
    {
		public int productID { get; set; }
		public string Proname { get; set; }
        public string Promodel { get; set; }
        public string Procategory { get; set; }
		public string Proprice { get; set; } 
        public ImageSource ProductImage { get; set; }
    }
}
