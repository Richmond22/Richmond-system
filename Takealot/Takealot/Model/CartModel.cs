using System;
namespace Takealot.Model
{
    public class CartModel
    {
		public int cartID { get; set; }
        public int customerID { get; set; }
        public int productID { get; set; }
        public int quantity { get; set; }
    }
}
