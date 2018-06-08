using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Takealot.Model;

namespace Takealot.Services
{
    public class RegisterServices
    {
        public RegisterServices()
        {
			
        }
        
		string url = "http://www.takealotsite.somee.com/api/Tblcustomer";

		public HttpClient httpclient = new HttpClient();



        public async Task<bool> PostCustomer(UserModel user)
        {
           
            httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(user);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await httpclient.PostAsync(url, httpcontent);
            return results.IsSuccessStatusCode;



        }
        

		public async Task<bool> PutCustomer(UserModel cust)
        {

			httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(cust);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

			var results = await httpclient.PutAsync(url + "?id=" + cust.customerID, httpcontent);
            return results.IsSuccessStatusCode;



        }
    }
}
