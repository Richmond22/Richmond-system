using System;
using System.Collections.Generic;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class PeronalDetails : ContentPage
    {
		LoginServices loginServices = new LoginServices();
		public UserModel details = new UserModel();
        public  PeronalDetails()
        {
            InitializeComponent();
			details = (UserModel)loginServices.getCustomerClaims();

			name.Text = details.firstname;
			Sur.Text = details.lastname;
			mail.Text = details.email;
			mobile.Text = details.phone;

        }


		 
    }
    
}
