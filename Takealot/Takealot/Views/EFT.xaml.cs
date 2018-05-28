using System;
using System.Collections.Generic;
using Takealot.Helpers;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
	public partial class EFT : ContentPage
	{

		public PaymentServices paymentServices = new PaymentServices();
		public bool isNew = true;
		public bool paid = false;
		public EFT()
		{
			InitializeComponent();
		}
		protected override void OnAppearing()
		{
			base.OnAppearing();

			EFTModel eftModel = (EFTModel)paymentServices.GetEFT();
			if (eftModel != null)
			{
				eftID1.Text = eftModel.ID.ToString();
				AccHolder.Text = eftModel.AccHolder;
				bankN.Text = eftModel.Bank;
				accNumber.Text = eftModel.AccNo;
				Branchc.Text = eftModel.Branch;
				isNew = false;

			}else{
				PaymentModel paymentModel = (PaymentModel)paymentServices.GetPaymentMethod();
				TempStorage.PaymentID = paymentModel.paymentID.ToString();
			}

		}
		async void Handle_Clicked(object sender, System.EventArgs e)
		{
			if(isNew){
				EFTModel eFTModel = new EFTModel
				{
					paymentID = Convert.ToInt32(TempStorage.PaymentID),
					AccHolder = AccHolder.Text,
					Bank = bankN.Text,
                    AccNo =AccHolder.Text,
                    Branch = Branchc.Text
				};
			 var res = await paymentServices.PostEFT(eFTModel);
				isNew = false;
				if (res)
                {
                    paid = true;
                }
                else
                {
                    paid = false;
                }
			}else
			{
				EFTModel eFTModel = new EFTModel
                {
					ID = Convert.ToInt32( eftID1.Text),
                    paymentID = Convert.ToInt32(TempStorage.PaymentID),
                    AccHolder = AccHolder.Text,
                    Bank = bankN.Text,
                    AccNo = AccHolder.Text,
                    Branch = Branchc.Text
                };
				var res = await paymentServices.PutEFT(eFTModel);

				if (res)
                {
                    paid = true;
                }
                else
                {
                    paid = false;
                }
			}

			if (paid)
            {
                OrderModel orderModel = new OrderModel
                {
                    customerID = Convert.ToInt32(TempStorage.CustomerID),
                    date = DateTime.Now.ToString("yy-MMM-dd ddd"),
                    DeliveryStatus = "Not Delivered",
                    OrderID = 0,
                    deliveryDate = "7 working days",
                    totalCost = Convert.ToInt32(TempStorage.TotalP)

                };
                OrderService orderService = new OrderService();
                var res = await orderService.PostOrder(orderModel);
                if(res)
				{
				 await	Navigation.PushAsync(new Checkout());
				}
            }

		}
	}
}