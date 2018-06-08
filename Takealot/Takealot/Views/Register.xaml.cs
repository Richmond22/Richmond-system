using System;
using System.Collections.Generic;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;
using System.Net.Mail;
using System.Net;

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

				var fromAddress = new MailAddress("rmmatsama@gmail.com", "Takealot");
                var toAddress = new MailAddress(newUser.email, newUser.firstname);
                const string fromPassword = "RICHie@22";
                const string subject = "Takealot Registration";
                const string body = "Thank you for registering at takealot, enjoy our big deals and low prices. Also get free delivery for your first purchase";

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }




					successs.Text = "Registration succeful";
				}
				else
				{
					successs.Text = res.ToString();
				}
            
            
            
		}
    }
}
