using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Takealot.Helpers;
using Takealot.Model;

namespace Takealot.Services
{
    public class PaymentServices
    {
		public HttpClient client = new HttpClient();
        //===============================================================================PAYMENT METHOD===============================================================================================================
        public object GetPaymentMethod()
        {

			string url = "http://www.takealotsite.somee.com/api/payment/" + TempStorage.CustomerID;
            var response = client.GetAsync(url).Result;


            if (response.IsSuccessStatusCode)
            {
                var result = response.Content.ReadAsStringAsync().Result;
                var method = JsonConvert.DeserializeObject<PaymentModel>(result);
				return method;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> PostMethod(PaymentModel pay)
        {
			string url = "http://www.takealotsite.somee.com/api/payment";
            var httpclient = new HttpClient();
            httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(pay);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await httpclient.PostAsync(url, httpcontent);
            return results.IsSuccessStatusCode;

            
            
        }

        public async Task<bool> PutPaymentMethod(PaymentModel pay)
        {
			string url = "http://www.takealotsite.somee.com/api/payment/";
            client.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(pay);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await client.PutAsync(url+pay.paymentID , httpcontent);
            return results.IsSuccessStatusCode;



        }
        //=======================================================================EFT=====================================================================================
		public object GetEFT()
        {

			string url = "http://www.takealotsite.somee.com/api/eft/" + TempStorage.CustomerID;
            var response = client.GetAsync(url).Result;


            if (response.IsSuccessStatusCode)
            {
                var result = response.Content.ReadAsStringAsync().Result;
                var method = JsonConvert.DeserializeObject<EFTModel>(result);
                return method;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> PostEFT(EFTModel eFT)
        {
			string url = "http://www.takealotsite.somee.com/api/eft";
            var httpclient = new HttpClient();
            httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(eFT);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await httpclient.PostAsync(url, httpcontent);
            return results.IsSuccessStatusCode;



        }
        
        public async Task<bool> PutEFT(EFTModel eFT)
        {
			string url = "http://www.takealotsite.somee.com/api/eft/";
            client.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(eFT);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await client.PutAsync(url + eFT.ID, httpcontent);
            return results.IsSuccessStatusCode;



        }
        //===============================================================CREDIT==========================================================================
		public object GetCredit()
        {

			string url = "http://www.takealotsite.somee.com/api/Tblcredit/" + TempStorage.CustomerID;
            var response = client.GetAsync(url).Result;


            if (response.IsSuccessStatusCode)
            {
                var result = response.Content.ReadAsStringAsync().Result;
                var method = JsonConvert.DeserializeObject<CREDITModel>(result);
                return method;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> PostCredit(CREDITModel credit)
        {
			string url = "http://www.takealotsite.somee.com/api/Tblcredit";
            var httpclient = new HttpClient();
            httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(credit);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await httpclient.PostAsync(url, httpcontent);
            return results.IsSuccessStatusCode;
            


        }

        public async Task<bool> PutCredit(CREDITModel credit)
        {
			string url = "http://www.takealotsite.somee.com/api/Tblcredit/";
            client.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(credit);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await client.PutAsync(url + credit.ID, httpcontent);
            return results.IsSuccessStatusCode;



        }
    }
}
