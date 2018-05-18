using System;
using System.Collections.Generic;
using System.Net.Http;
using Newtonsoft.Json;
using Takealot.Model;

namespace Takealot.Services
{
    public class ProductServices
    {
		HttpClient client = new HttpClient();
		public List<Products> getProducts() //get customer profile
        {

            string url = "http://www.takealotweb.somee.com/api/Tblproduct";

            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "Bearer " + TempStorage.Token);
            var response = client.GetAsync(url).Result;
            
            
            if (response.IsSuccessStatusCode)
            {
                var result = response.Content.ReadAsStringAsync().Result;
				List<Products> productList   = JsonConvert.DeserializeObject<List<Products>>(result);
				return productList;
            }
            else
            {
                return null;
            }
            


        }
    }
}
