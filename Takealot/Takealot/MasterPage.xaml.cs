using System;
using System.Collections.Generic;
using Takealot;
using Takealot.Views;
using Xamarin.Forms;

namespace Takealot
{
    public partial class MasterPage : ContentPage
    {
		public ListView ListView { get { return listView; } }
        public MasterPage()
        {
            InitializeComponent();

			var masterPageItem = new List<MasterPageItem>();
			masterPageItem.Add(new MasterPageItem
			{
				Title = "Home",
				IconSource = "home.png",
				TargetType = typeof(HomePage)
			});

            
			masterPageItem.Add(new MasterPageItem
            {
                Title = "Order",
                IconSource = "order.png",
                TargetType = typeof(Orders)
            });

			masterPageItem.Add(new MasterPageItem
            {
                Title = "Cart",
                IconSource = "cart.png",
                TargetType = typeof(Cart)
            });

			masterPageItem.Add(new MasterPageItem
            {
                Title = "My Account",
                IconSource = "account.png",
                TargetType = typeof(MyAccount)
            });

			masterPageItem.Add(new MasterPageItem
            {
                Title = "Login",
                IconSource = "log.png",
                TargetType = typeof(Login)
            });

			masterPageItem.Add(new MasterPageItem
            {
                Title = "Register",
                IconSource = "register.png",
                TargetType = typeof(Register)
            });
			masterPageItem.Add(new MasterPageItem
            {
                Title = "Logout",
                IconSource = "logout1.png",
                TargetType = typeof(HomePage)
            });

			listView.ItemsSource = masterPageItem;

        }
    }
}
