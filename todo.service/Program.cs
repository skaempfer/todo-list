var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: "TodoAppCorsPolicy", policy => policy
    .WithOrigins("http://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod());
});

builder.Services.AddSingleton<Todos>();

var app = builder.Build();

app.UseCors("TodoAppCorsPolicy");

//app.MapGet("/todos", () => Results.Json(todos));
app.MapGet("/todos", (Todos todos) => todos.GetAll());

app.Run();

public record Todo(string text, string Id);

public class Todos
{
  private static IReadOnlyList<Todo> AllTodos = new List<Todo>{
    new Todo("Empty trash", "1"),
    new Todo("Bake cookies", "2"),
    new Todo("Water plants", "3"),
  }.AsReadOnly();

  public IReadOnlyList<Todo> GetAll() => AllTodos;
}