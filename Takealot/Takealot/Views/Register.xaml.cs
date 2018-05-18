using System;
using System.Collections.Generic;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class Register : ContentPage
    {
        public Register()
        {
            InitializeComponent();
        }
        
	public async void Handle_Clicked(object sender, System.EventArgs e)
		{
			RegisterServices registerServices = new RegisterServices();
			
			UserModel newUser = new UserModel
            {
				firstname = FirstName.Text,
				lastname = Surname.Text,
                email = Email.Text,
                password = Password.Text
            };
            
				var res = await registerServices.PostCustomer(newUser);
				successs.Text = res.ToString();
				if(res)
				{
					successs.Text = "Registration succeful";
				}
				else
				{
					successs.Text = res.ToString();
				}
            
            
            
		}
    }
}
