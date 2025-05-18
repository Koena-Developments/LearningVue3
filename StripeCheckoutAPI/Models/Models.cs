namespace StripeCheckoutAPI.Models
{
    // Represents the FakeStore API product
    public class FakeStoreProduct
    {
        public int Id      { get; set; }
        public string Title  { get; set; } = "";
        public decimal Price { get; set; }
        public string Image  { get; set; } = "";
    }

    // Represents an item in the cart request
    public record CartItemRequest(int Id, int Quantity);

    // Holds your Stripe keys from configuration
    public record StripeSettings
    {
        public string SecretKey     { get; init; } = "";
        public string PublishableKey{ get; init; } = "";
    }
}
