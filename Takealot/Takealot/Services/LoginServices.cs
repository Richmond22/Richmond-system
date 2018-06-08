using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

using Takealot.Helpers;
using Takealot.Model;

namespace Takealot.Services
{
    public class LoginServices
    {
		public HttpClient client = new HttpClient();
		public Token token = new Token();
        

		public bool userAuthentication(string email, string password)//get user token for login
        {
			

			string url = "http://www.takealotsite.somee.com/token";

            var accept = "application/json";
            client.DefaultRequestHeaders.Add("Accept", accept);
            string postBody = @"username=" + email + "&password=" + password + "&grant_type=password";

            var response = client.PostAsync(url, new StringContent(postBody, Encoding.UTF8, "application/x-www-form-urlencoded")).Result;
            if (response.IsSuccessStatusCode)
            {
				TempStorage.Username = email;
				UserModel cust = (UserModel)getCustomerClaims();
				TempStorage.CustomerID = cust.customerID.ToString();
                return true;
            }
            else
            {
                return false;
            }

        }



       
        public object getCustomerClaims() //get customer profile
        {

			string url = "http://www.takealotserver.somee.com/api/GetCust?email="+TempStorage.Username;

            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "Bearer " + TempStorage.Token);
            var response =  client.GetAsync(url).Result;

            
            if (response.IsSuccessStatusCode)
            {
				var result = response.Content.ReadAsStringAsync().Result;
                var cust = JsonConvert.DeserializeObject<List<UserModel>>(result);
                return cust[0];
            }
            else
            {
                return null;
            }



        }




    
    }
    
}
