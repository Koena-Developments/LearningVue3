using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using StripeCheckoutAPI.Models;

namespace StripeCheckoutAPI.Services
{
    public class CartCheckoutService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly StripeSettings    _stripeSettings;

        public CartCheckoutService(
            IHttpClientFactory httpClientFactory,
            IOptions<StripeSettings> stripeOptions)
        {
            _httpClientFactory = httpClientFactory;
            _stripeSettings    = stripeOptions.Value;

            // Set the Stripe API key
            StripeConfiguration.ApiKey = _stripeSettings.SecretKey;
        }

        public async Task<string> CreateCheckoutSessionAsync(List<CartItemRequest> cartItems)
        {
            if (cartItems == null || cartItems.Count == 0)
                throw new ArgumentException("Cart is empty", nameof(cartItems));

            var client    = _httpClientFactory.CreateClient();
            var lineItems = new List<SessionLineItemOptions>();

            foreach (var item in cartItems)
            {
                var res = await client.GetAsync($"https://fakestoreapi.com/products/{item.Id}");
                res.EnsureSuccessStatusCode();

                var product = await res.Content.ReadFromJsonAsync<FakeStoreProduct>()
                              ?? throw new Exception($"Failed to parse product {item.Id}");

                lineItems.Add(new SessionLineItemOptions
                {
                    Quantity = item.Quantity,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "zar",
                        UnitAmount  = (long)(product.Price * 100),
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name   = product.Title,
                            Images = new List<string> { product.Image }
                        }
                    }
                });
            }

            var sessionOptions = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                Mode               = "payment",
                LineItems          = lineItems,
                SuccessUrl         = "http://localhost:8080/success",
                CancelUrl          = "http://localhost:8080/cancel"
            };

            var stripeSvc = new SessionService();
            var session   = await stripeSvc.CreateAsync(sessionOptions);
            return session.Url!;
        }
    }
}
