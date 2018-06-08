using System;
using System.Collections.Generic;
using Takealot.Helpers;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class PeronalDetails : ContentPage
    {
		LoginServices loginServices = new LoginServices();
		RegisterServices registerServices = new RegisterServices();
		public UserModel details = new UserModel();
        public  PeronalDetails()
        {
            InitializeComponent();



        }
		protected override void OnAppearing()
		{
			base.OnAppearing();
            if(TempStorage.logged)
			{
				details = (UserModel)loginServices.getCustomerClaims();

                name.Text = details.firstname;
                Sur.Text = details.lastname;
                mail.Text = details.email;
                mobile.Text = details.phone;
			}else
			{
				Navigation.PushAsync(new Login());
			}
		}



		async void Handle_Clicked(object sender, System.EventArgs e)
		{
			UserModel user = new UserModel
			{
				customerID = Convert.ToInt32(TempStorage.CustomerID),
				firstname = name.Text,
				lastname = Sur.Text,
				email = mail.Text,
				phone = mobile.Text
			};
			var res = await registerServices.PostCustomer(user);
			if (res)
				await DisplayAlert("Profile", "Profile successfully updated", "Ok");
		}
    }
    
}
