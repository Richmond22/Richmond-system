using System;
using System.Collections.Generic;
using Takealot.Helpers;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class Address : ContentPage
    {
		public AddressServices addressService = new AddressServices();
		public bool isNew = true;
        public Address()
        {
            InitializeComponent();
        }
		protected async override void OnAppearing()
		{
			base.OnAppearing();
			if (TempStorage.logged)
			{
				AddressModel address = (AddressModel)addressService.GetAddress();
				if (address != null)
				{
					isNew = false;
					ADID.Text = address.addressID.ToString();
					Custname.Text = address.contactPerson;
					contact.Text = address.phone;
					line1.Text = address.address1;
					line2.Text = address.address2;
					surb.Text = address.suburb;
					city.Text = address.city;
					code.Text = address.zip;
				}
			}
			else
			{
			  await	Navigation.PushAsync(new Login());
			}
		}
		async void Save(object sender, System.EventArgs e)
		{
			if (isNew)
			{
				AddressModel address = new AddressModel
				{
					contactPerson = Custname.Text,
					customerID = Convert.ToInt32(TempStorage.CustomerID),
					phone = contact.Text,
					address1 = line1.Text,
					address2 = line2.Text,
					suburb = surb.Text,
					city = city.Text,
					zip = code.Text
				};
				bool res = await addressService.PostAddress(address);
				if (res)
				{
					isNew = false;
					await DisplayAlert("Address", "Address successfully added", "Ok");

				}
				else
				{
					await DisplayAlert("Error", "Error occured Please try again", "Ok");
				}
			}
			else
			{
				AddressModel address = new AddressModel
				{
					addressID = Convert.ToInt32(ADID.Text),
					customerID = Convert.ToInt32(TempStorage.CustomerID),
					contactPerson = Custname.Text,
					phone = contact.Text,
					address1 = line1.Text,
					address2 = line2.Text,
					suburb = surb.Text,
					city = city.Text,
					zip = code.Text
				};
				bool res2 = await addressService.PutAddress(address);
				if (res2)
				{
				  
			    	await Navigation.PushAsync(new Payment());
				}
				else
				{
					await DisplayAlert("Error", "Error occured Please try again", "Ok");
				}
			}
		}
		}
    }

