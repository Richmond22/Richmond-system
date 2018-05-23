using System;
using Xamarin.Forms;

namespace Takealot.ViewModel
{
    public class CartView
    {
		public int customerID { get; set; }
		public int cartID { get; set; }
		public int quantity { get; set; }
		public string model { get; set; }
		public double price { get; set; }
		public byte[] imgName { get; set; }
		public ImageSource picture { get; set; }
		public int productID { get; set; }
    }
}
