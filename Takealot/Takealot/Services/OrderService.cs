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
    public class OrderService
    {
		public HttpClient httpclient = new HttpClient();
		public async Task<bool> PostOrder(OrderModel order)
        {
			string url = "http://www.takealotsite.somee.com/api/Tblorder";
            
            httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(order);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await httpclient.PostAsync(url, httpcontent);
            return results.IsSuccessStatusCode;
         
        }
        
		public async Task<bool> PostOrderItem(OrderItems item)
        {
			string url = "http://www.takealotsite.somee.com/api/OrderItem";

            httpclient.DefaultRequestHeaders.ExpectContinue = false;
            var _json = JsonConvert.SerializeObject(item);
            HttpContent httpcontent = new StringContent(_json);
            httpcontent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var results = await httpclient.PostAsync(url, httpcontent);
            return results.IsSuccessStatusCode;

        }

		public object GetOrder()
        {

			string url = "http://www.takealotsite.somee.com/api/Tblorder/" + TempStorage.CustomerID;
			var response = httpclient.GetAsync(url).Result;


            if (response.IsSuccessStatusCode)
            {
                var result = response.Content.ReadAsStringAsync().Result;
                var method = JsonConvert.DeserializeObject<OrderModel>(result);
                return method;
            }
            else
            {
                return null;
            }
        }

		public async Task<List<OrderModel>> getOrders()
        {
			string url = "http://www.takealotsite.somee.com/api/GetTblorderbyid?id=" + TempStorage.CustomerID;
			var response = await httpclient.GetAsync(url);

            
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var orderList = JsonConvert.DeserializeObject<List<OrderModel>>(result);

                return orderList;
            }
            else
            {
                return null;
            }
        }
    }
}
