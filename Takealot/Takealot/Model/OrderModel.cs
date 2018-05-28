using System;
namespace Takealot.Model
{
    public class OrderModel
    {
		public int OrderID { get; set; }
        public int customerID { get; set; }
        public string date { get; set; }
        public int totalCost { get; set; }
        public string deliveryDate { get; set; }
        public string DeliveryStatus { get; set; }
    }
}
