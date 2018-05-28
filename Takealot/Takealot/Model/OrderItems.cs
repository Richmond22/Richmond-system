using System;
namespace Takealot.Model
{
    public class OrderItems
    {
		public Nullable<int> OrderID { get; set; }
        public Nullable<int> productID { get; set; }
        public Nullable<int> quantity { get; set; }
    }
}
