using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Takealot.Helpers;
using Takealot.Model;
using Takealot.Services;
using Takealot.ViewModel;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class Cart : ContentPage
    {
		public ProductServices productServices = new ProductServices();
		public CartModel selected;
		public double TotalP = 0;
		public int TotalQ = 0;
        public Cart()
        {
            InitializeComponent();
            

        }
		protected async override void OnAppearing()
		{
			base.OnAppearing();
			if (TempStorage.logged == false)
            {

               await Navigation.PushAsync(new Login());
            }
			else
			{
				List<CartView> CartList = productServices.getCart();
                List<CartView> viewwC = new List<CartView>();
                foreach (CartView cr in CartList.ToList())
                {
                    TotalQ += cr.quantity;
                    TotalP += (cr.quantity * cr.price);
                    viewwC.Add(new CartView
                    {
                        cartID = cr.cartID,
                        productID = cr.productID,
                        quantity = cr.quantity,
                        picture = BytesToImage(cr.imgName),
                        model = cr.model,
                        customerID = cr.customerID,
                        price = cr.price
                    });
                }
                TP.Text = " R" + TotalP.ToString();
                TQ.Text = "Total ( " + TotalQ.ToString() + ") items) :";
                TempStorage.TotalP = TotalP.ToString();
                cartList.ItemsSource = viewwC;
			}


		}

		void Handle_ItemSelected(object sender, Xamarin.Forms.SelectedItemChangedEventArgs e)
		{
			CartView selectedCart = (CartView)e.SelectedItem;
			selected = new CartModel
			{
				cartID = selectedCart.cartID,
				customerID = selectedCart.customerID,
				productID = selectedCart.productID,
				quantity = selectedCart.quantity
			};
		}

		public ImageSource BytesToImage(byte[] imgArry)
        {
            try
            {
                return ImageSource.FromStream(() => new MemoryStream(imgArry));
            }
            catch (Exception)
            {
                return null;
            }
        }
        
	async void Delete(object sender, System.EventArgs e)
		{
			if(selected != null){
				string succ =  productServices.DeleteCartAsync(selected.cartID.ToString());
				TotalP = 0; TotalQ = 0;
				OnAppearing();

			}else
			{
			 await	DisplayAlert("Select", "Please select product", "ok");
			}
		}

		async void Add(object sender, System.EventArgs e)
		{
			if(selected != null)
			{
				selected.quantity += 1;
				var res = await productServices.PutCart(selected);
				TotalP = 0;TotalQ = 0;
				OnAppearing();
			}

            
		}

	async	void Subtract(object sender, System.EventArgs e)
		{
			if (selected != null)
            {
                selected.quantity -= 1;
                var res = await productServices.PutCart(selected);
				TotalP = 0; TotalQ = 0;
                OnAppearing();
            }
		}

		void Handle_Clicked(object sender, System.EventArgs e)
		{
			if(TotalQ > 0)
			{
				Navigation.PushAsync(new Shipping());
			}else
			{
				DisplayAlert("Empty", "Your shopping cart is empty, Please add products", "Ok");
			}

		}
    }
}
