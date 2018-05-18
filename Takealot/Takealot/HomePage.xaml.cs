using System;
using System.Collections.Generic;
using System.IO;
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

        public HomePage()
        {
            InitializeComponent();

			List<Products> productList = productServices.getProducts();
			Products products = new Products();

			List<ProductView> productViews = new List<ProductView>();

				


			foreach (Products pro in productList)
            {
				Stream stream = new MemoryStream(pro.ProductImage);
                var imageSource = ImageSource.FromStream(() => stream);
				productViews.Add(new ProductView { Prodetils = pro.name + " "+ pro.model+" R"+ pro.price , ProductImage = imageSource});

            }
			prolist.ItemsSource = productViews;    


        }
    }
}
