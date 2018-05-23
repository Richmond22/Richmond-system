using System;
using Xamarin.Forms;
using Takealot.Model;


namespace Takealot.ViewModel
{
	public class ItemCell : ViewCell
    {
		public static readonly BindableProperty ProductName =
          BindableProperty.Create("PName", typeof(string), typeof(ItemCell), "");

        public string PName
        {
			get { return (string)GetValue(ProductName); }
			set { SetValue(ProductName, value); }
        }

        public static readonly BindableProperty ProductModel =
          BindableProperty.Create("PModel", typeof(string), typeof(ItemCell), "");

        public string PModel
        {
			get { return (string)GetValue(ProductModel); }
			set { SetValue(ProductModel, value); }
		}

		public static readonly BindableProperty ProductPrice =
          BindableProperty.Create("PPrice", typeof(string), typeof(ItemCell), "");
        
        public string PPrice
        {
			get { return (string)GetValue(ProductPrice); }
			set { SetValue(ProductPrice, value); }
        }

        public static readonly BindableProperty ProductImage =
          BindableProperty.Create("PImage", typeof(string), typeof(ItemCell), "");

        public string PImage
        {
			get { return (string)GetValue(ProductImage); }
			set { SetValue(ProductImage, value); }
        }
    }
}
