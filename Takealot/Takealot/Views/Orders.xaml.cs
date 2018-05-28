using System;
using System.Collections.Generic;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class Orders : ContentPage
    {
		public OrderService orderService = new OrderService();
        public Orders()
        {
            InitializeComponent();
        }
		protected override async void OnAppearing()
		{
			base.OnAppearing();
			List<OrderModel> ordeerlist = await orderService.getOrders();
			orderList.ItemsSource = ordeerlist;
            
		}
	}
}
