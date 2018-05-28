using System;
using System.Collections.Generic;

using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class Shipping : ContentPage
    {
        public Shipping()
        {
            InitializeComponent();
        }

		void Handle_Clicked(object sender, System.EventArgs e)
		{
			Navigation.PushAsync(new Payment());
		}

		void Handle_Clicked_1(object sender, System.EventArgs e)
		{
			Navigation.PushAsync(new Address());
		}
    }
}
