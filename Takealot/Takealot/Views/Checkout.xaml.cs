using System;
using System.Collections.Generic;
using Takealot.Model;
using Takealot.Services;
using Takealot.ViewModel;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class Checkout : ContentPage
    {
		public ProductServices productServices = new ProductServices();
		public OrderService orderService = new OrderService();
		public int oderIID = 0;

        public Checkout()
        {
            InitializeComponent();
        }
		protected override void OnAppearing()
		{
			base.OnAppearing();
			List<CartView> CartList = productServices.getCart();
			OrderModel orders = (OrderModel)orderService.GetOrder();
			oderIID = orders.OrderID; 
			orderNumber.Text = "Order ID :"+ orders.OrderID.ToString();
			cDate.Text ="Order Date : "+ orders.date;
			dDate.Text ="Delivery :" + orders.deliveryDate;
			cost.Text ="Total cost : R" + orders.totalCost.ToString();
			orderList.ItemsSource = CartList;
		}

		void Handle_Clicked(object sender, System.EventArgs e)
		{
			List<CartView> CartList = productServices.getCart();
            foreach(CartView cart in CartList)
			{
				OrderItems items = new OrderItems{
					OrderID = oderIID,
                    productID = cart.productID,
                    quantity = cart.quantity
					
				};
				var res = orderService.PostOrderItem(items);
				var ree = productServices.DeleteCartAsync(cart.cartID.ToString());
				Application.Current.MainPage = new MainPage();
			}
		}
	}
}
