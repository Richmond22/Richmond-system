using System;
namespace Takealot.Model
{
    public class AddressModel
    {
		public int addressID { get; set; }
        public Nullable<int> customerID { get; set; }
        public string contactPerson { get; set; }
        public string phone { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string suburb { get; set; }
        public string city { get; set; }
        public string zip { get; set; }
    }
}
