using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Rg.Plugins.Popup.Services;
using Takealot.Helpers;
using Takealot.Model;
using Takealot.Services;
using Takealot.ViewModel;
using Xamarin.Forms;

namespace Takealot
{
	public partial class HomePage : ContentPage
	{
		public ProductServices productServices = new ProductServices();
		public ProductView productView = new ProductView();
		public List<ProductView> productViews = new List<ProductView>();
		public Boolean loading = true;

		public HomePage()
		{
			InitializeComponent();

		
		}
		protected async override void OnAppearing()
		{
			base.OnAppearing();

			List<Products> productList = await productServices.getProducts();


            Products products = new Products();
            foreach (Products pro in productList)
            {
				if(pro != null)
				{
					productViews.Add(new ProductView
                    {
                        Proname = pro.name + " " + pro.model,
                        productID = pro.productID,
                        Proprice = "R " + pro.price.ToString(),
                        ProductImage = BytesToImage(pro.ProductImage)
                    });
					
				}
                


            }
            prolist.ItemsSource = productViews;

		}

		async void  Handle_ItemSelected(object sender, Xamarin.Forms.SelectedItemChangedEventArgs e)
		{
			ProductView selectedProduct =  (ProductView)e.SelectedItem;
			CartModel cart = new CartModel { customerID = Convert.ToInt32(TempStorage.CustomerID), productID = selectedProduct.productID, quantity = 1 };
		  var respone = await DisplayAlert("Add to Cart", selectedProduct.productID.ToString(), "ADD", "Cancel");
           if(respone) 
			{
				var message = await productServices.PostCart(cart);
                if(message)
			         await	DisplayAlert("added", TempStorage.CustomerID, "ok");
			}
		}  


		public ImageSource BytesToImage( byte[] imgArry  ) 
		{
			try{
				return ImageSource.FromStream(() => new MemoryStream(imgArry));
			  }
			catch(Exception) 
			  {
				return null;
		      }
		}


	}
}
