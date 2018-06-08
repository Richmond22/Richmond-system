using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Takealot.Helpers;
using Takealot.Model;

namespace Takealot.Services
{
    public class AddressServices
    {
		public HttpClient client = new HttpClient();
		public object GetAddress() 
        {

			string url = "http://www.takealotsite.somee.com/api/Tbladdresse/" + TempStorage.CustomerID;
            var response = client.GetAsync(url).Result;
            

            if (response.IsSuccessStatusCode)
            {
                var result = response.Content.ReadAsStringAsync().Result;
                var Address = JsonConvert.DeserializeObject<AddressModel>(result);
                return Address;
            }
            else
            {
                return null;
            }         
        }

		public async Task<bool> PostAddress(AddressModel address)
        {
			string url = "http://www.takealotsite.somee.com/api/Tbladdresse";
            var httpclient = new HttpClient();
            httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(address);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await httpclient.PostAsync(url, httpcontent);
            return results.IsSuccessStatusCode;

            

        }

		public async Task<bool> PutAddress(AddressModel address)
        {
			string url = "http://www.takealotsite.somee.com/api/Tbladdresse/";
            client.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(address);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await client.PutAsync(url+ address.addressID, httpcontent);
            return results.IsSuccessStatusCode;



        }
    }
}
