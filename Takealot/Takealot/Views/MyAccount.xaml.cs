using System;
using System.Collections.Generic;
using Takealot.Helpers;
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
			if(TempStorage.logged)
			{
				await Navigation.PushAsync(new PeronalDetails());
			}else
			{
				await	Navigation.PushAsync(new Login());
			}

		}

		async	void Handle_Clicked_1(object sender, System.EventArgs e)
		{
			if (TempStorage.logged)
            {
                await Navigation.PushAsync(new Address());
            }
            else
            {
                await Navigation.PushAsync(new Login());
            }
		}

		async void Handle_Clicked_2(object sender, System.EventArgs e)
		{
			if (TempStorage.logged)
            {
                await Navigation.PushAsync(new Orders());
            }
            else
            {
                await Navigation.PushAsync(new Login());
            }
		}


    }
}
