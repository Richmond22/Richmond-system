﻿using System;
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
        
		string url = "http://www.takealotweb.somee.com/api/Tblcustomer";





        public async Task<bool> PostCustomer(UserModel user)
        {
            var httpclient = new HttpClient();
            httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(user);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await httpclient.PostAsync(url, httpcontent);
            return results.IsSuccessStatusCode;



        }
    }
}
