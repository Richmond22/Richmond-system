using System;
namespace Takealot.Model
{
    public class PaymentModel
    {
		public int paymentID { get; set; }
        public int customerID { get; set; }
        public string paymentMethod { get; set; }
    }
}
