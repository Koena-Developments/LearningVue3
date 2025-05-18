using Microsoft.AspNetCore.Mvc;
using StripeCheckoutAPI.Models;
using StripeCheckoutAPI.Services;

namespace StripeCheckoutAPI.Endpoints
{
    public static class CheckoutEndpoints
    {
        public static IEndpointRouteBuilder MapCheckoutEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("/create-checkout-session", async (
                [FromBody] List<CartItemRequest> cartItems,
                CartCheckoutService checkoutService
            ) =>
            {
                try
                {
                    var url = await checkoutService.CreateCheckoutSessionAsync(cartItems);
                    return Results.Ok(new { url });
                }
                catch (ArgumentException ae)
                {
                    return Results.BadRequest(ae.Message);
                }
                catch
                {
                    return Results.Problem("Failed to create checkout session.");
                }
            })
            .WithName("CreateCheckoutSession")
            .WithOpenApi();

            return app;
        }
    }
}
