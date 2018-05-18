using System;
using System.Collections.Generic;
using Takealot.Views;

using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class MyAccount : ContentPage
    {
        public MyAccount()
        {
            InitializeComponent();
        }

		public async void Handle_Clicked(object sender, System.EventArgs e)
		{
			await Navigation.PushAsync(new PeronalDetails());
		}
    }
}
