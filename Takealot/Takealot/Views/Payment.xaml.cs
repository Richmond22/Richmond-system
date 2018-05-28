using System;
using System.Collections.Generic;
using Takealot.Helpers;
using Takealot.Model;
using Takealot.Services;
using Xamarin.Forms;

namespace Takealot.Views
{
    public partial class Payment : ContentPage
    {
        public Payment()
        {
            InitializeComponent();
        }
		public PaymentServices paymentServices = new PaymentServices();
		async void EftMethod(object sender, System.EventArgs e)
		{
			PaymentModel payment = (PaymentModel)paymentServices.GetPaymentMethod();
			if(payment != null){
				payment.paymentMethod = "EFT";
				TempStorage.PaymentID = payment.paymentID.ToString();

			bool res = await paymentServices.PutPaymentMethod(payment);
                
			}else
			{
				payment = new PaymentModel
				{
					customerID = Convert.ToInt32(TempStorage.CustomerID),
					paymentMethod = "EFT"
				};
				bool pa = await paymentServices.PostMethod(payment);
			}
			await Navigation.PushAsync(new EFT());
		}

	async void CreditMethod(object sender, System.EventArgs e)
		{
			PaymentModel payment = (PaymentModel)paymentServices.GetPaymentMethod();
            if (payment != null)
            {
                payment.paymentMethod = "CREDIT";
				TempStorage.PaymentID = payment.paymentID.ToString();
                bool res = await paymentServices.PutPaymentMethod(payment);
            }
            else
            {
                payment = new PaymentModel
                {
                    customerID = Convert.ToInt32(TempStorage.CustomerID),
					paymentMethod = "CREDIT"
                };
                bool pa = await paymentServices.PostMethod(payment);
            }
			await	Navigation.PushAsync(new CREDIT());
		}
    }
}
