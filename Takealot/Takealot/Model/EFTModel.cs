using System;
namespace Takealot.Model
{
    public class EFTModel
    {
		public int ID { get; set; }
        public int paymentID { get; set; }
        public string AccHolder { get; set; }
        public string Bank { get; set; }
        public string AccNo { get; set; }
        public string Branch { get; set; }
    }
}
