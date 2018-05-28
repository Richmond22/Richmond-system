using System;
using System.Collections.Generic;
using Takealot.Helpers;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
	public partial class Login : ContentPage
	{
		public LoginServices loginService = new LoginServices();
		public Login()
		{
			InitializeComponent();
		}

		public  void Handle_Clicked(object sender, System.EventArgs e)
		{
			bool logged = loginService.userAuthentication(email.Text, Password.Text);
			if (logged)
			{
				TempStorage.logged = true;
				Application.Current.MainPage = new MainPage();

			}
			else
			{
				loggedin.Text = "failed to log";
			}
		}
	}
}
