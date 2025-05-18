using Stripe;
using StripeCheckoutAPI.Models;
using StripeCheckoutAPI.Endpoints;
using StripeCheckoutAPI.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Load Stripe settings
builder.Services.Configure<StripeSettings>(
    builder.Configuration.GetSection("Stripe"));

// Register HttpClient for external calls
builder.Services.AddHttpClient();

// Register your renamed service
builder.Services.AddSingleton<CartCheckoutService>();

// Enable CORS for your Vue app
builder.Services.AddCors(opts =>
{
    opts.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:8080")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "StripeCheckoutAPI", Version = "v1" });
});

var app = builder.Build();

// Apply Stripe secret key on startup
StripeConfiguration.ApiKey = app.Configuration["Stripe:SecretKey"];

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "StripeCheckoutAPI v1");
    });
}
app.UseCors();

// Health-check
app.MapGet("/", () => "Stripe Checkout API is up.");

// Mount the checkout endpoints
app.MapCheckoutEndpoints();

app.Run();
