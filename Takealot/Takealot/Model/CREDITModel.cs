using System;
namespace Takealot.Model
{
    public class CREDITModel
    {
		public int ID { get; set; }
        public Nullable<int> paymentID { get; set; }
        public string CardDescription { get; set; }
        public string NameonCard { get; set; }
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public string Type { get; set; }
        public string Cvv { get; set; }
    }
}
