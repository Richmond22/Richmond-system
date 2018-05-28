using System;
using System.Collections.Generic;
using Takealot.Helpers;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class CREDIT : ContentPage
    {
		public PaymentServices paymentServices = new PaymentServices();
        public bool isNew = true;
		public bool paid = false;
        public CREDIT()
        {
            InitializeComponent();
        }
		protected override void OnAppearing()
		{
			base.OnAppearing();
			CREDITModel cREDITModel = (CREDITModel)paymentServices.GetCredit();
            if(cREDITModel != null)
			{
				nameOnC.Text = cREDITModel.NameonCard;
				CDescription.Text = cREDITModel.CardDescription;
				cardNum.Text = cREDITModel.CardNumber;
				expDate1.Text = cREDITModel.ExpirationDate;
				CvvNa.Text = cREDITModel.Cvv;
				ccType.Text = cREDITModel.Type;
				CreditID.Text = cREDITModel.ID.ToString();
				
			}

		}

		async void Handle_Clicked(object sender, System.EventArgs e)
		{
			if(isNew)
			{
				CREDITModel cREDITModel = new CREDITModel
				{
                    paymentID = Convert.ToInt32(TempStorage.PaymentID),
                    NameonCard = nameOnC.Text,
                    CardNumber = cardNum.Text,
                    ExpirationDate = expDate1.Text,
                    Cvv = CvvNa.Text,
                    Type = ccType.Text,
                    CardDescription = CDescription.Text


				};
				var res = await paymentServices.PostCredit(cREDITModel);
                if(res)
				{
					paid = true;
				}else
				{
					paid = false;
				}
			}
			else
			{
				CREDITModel cREDITModel = new CREDITModel
                {
					ID = Convert.ToInt32( CreditID.Text),
                    paymentID = Convert.ToInt32(TempStorage.PaymentID),
                    NameonCard = nameOnC.Text,
                    CardNumber = cardNum.Text,
                    ExpirationDate = expDate1.Text,
                    Cvv = CvvNa.Text,
                    Type = ccType.Text,
                    CardDescription = CDescription.Text


                };
                var res = await paymentServices.PostCredit(cREDITModel);
				if (res)
                {
                    paid = true;
                }
                else
                {
                    paid = false;
                }

			}
            if(paid)
			{
				OrderModel orderModel = new OrderModel
				{
					customerID = Convert.ToInt32( TempStorage.CustomerID),
                    date = DateTime.Now.ToString("yy-MMM-dd ddd"),
                    DeliveryStatus = "Not Delivered",
                    OrderID = 0,
					deliveryDate = "7 working days",
                    totalCost = Convert.ToInt32(TempStorage.TotalP)
                    
				};
				OrderService orderService = new OrderService();
				var res = await orderService.PostOrder(orderModel);
				if (res)
                {
                    await Navigation.PushAsync(new Checkout());
                }
			}
		}
    }
}
