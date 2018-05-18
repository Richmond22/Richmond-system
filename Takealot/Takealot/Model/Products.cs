using System;
namespace Takealot.Model
{
    public class Products
    {
		public int productID { get; set; }
        public string name { get; set; }
        public string model { get; set; }
        public string category { get; set; }
        public double price { get; set; }
        public Nullable<int> quantity { get; set; }
        public byte[] ProductImage { get; set; }
    }
}
