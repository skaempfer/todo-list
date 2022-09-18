var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: "TodoAppCorsPolicy", policy => policy
    .WithOrigins("http://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("TodoAppCorsPolicy");

List<Todo> todos = new List<Todo>{
  new Todo("Empty trash", "1"),
  new Todo("Bake cookies", "2"),
  new Todo("Water plants", "3"),
};

//app.MapGet("/todos", () => Results.Json(todos));
app.MapGet("/todos", () => todos);

app.Run();

public record Todo(string text, string Id);