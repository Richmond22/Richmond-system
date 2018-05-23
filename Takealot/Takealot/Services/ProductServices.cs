using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Takealot.Helpers;
using Takealot.Model;
using Takealot.ViewModel;

namespace Takealot.Services
{
    public class ProductServices
    {
		HttpClient client = new HttpClient();
		public string url = "http://www.takealotweb.somee.com/api/";
		public async Task<List<Products>> getProducts() 
        {
   
			var response = await client.GetAsync(url+"Tblproduct");
            
            
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
				var productList   = JsonConvert.DeserializeObject<List<Products>>(result);

				return productList;
            }
            else
            {
                return null;
            }         
        }
        

		public async Task<bool> PostCart(CartModel cart)
        {
            
            client.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(cart);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await client.PostAsync(url+"Tblcart", httpcontent);
            return results.IsSuccessStatusCode;



        }

		public List<CartView> getCart()
        {

			var response = client.GetAsync(url+"Tblcart?id="+TempStorage.CustomerID).Result;
            
            
            if (response.IsSuccessStatusCode)
            {
                var result = response.Content.ReadAsStringAsync().Result;
				List<CartView> cartList  = JsonConvert.DeserializeObject<List<CartView>>(result);
                return cartList;
            }
            else
            {
                return null;
            }         
         
        }
        
		public string DeleteCartAsync(string id)
		{
			var response = client.DeleteAsync(url+"Tblcart/"+id).Result;
			return response.StatusCode.ToString();
            
       }

		public async Task<string> PutCart(CartModel cart)
        {

            client.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(cart);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await client.PutAsync(url + "Tblcart/"+cart.cartID, httpcontent);
            return results.StatusCode.ToString();



        }
    }
}
