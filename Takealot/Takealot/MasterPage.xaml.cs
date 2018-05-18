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
				IconSource = "",
				TargetType = typeof(HomePage)
			});

            
			masterPageItem.Add(new MasterPageItem
            {
                Title = "Order",
                IconSource = "",
                TargetType = typeof(Orders)
            });

			masterPageItem.Add(new MasterPageItem
            {
                Title = "Cart",
                IconSource = "",
                TargetType = typeof(Cart)
            });

			masterPageItem.Add(new MasterPageItem
            {
                Title = "My Account",
                IconSource = "",
                TargetType = typeof(MyAccount)
            });

			masterPageItem.Add(new MasterPageItem
            {
                Title = "Login",
                IconSource = "",
                TargetType = typeof(Login)
            });

			masterPageItem.Add(new MasterPageItem
            {
                Title = "Register",
                IconSource = "",
                TargetType = typeof(Register)
            });

			listView.ItemsSource = masterPageItem;

        }
    }
}
