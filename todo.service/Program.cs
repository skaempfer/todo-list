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

app.MapPost("/todos", (Todos todos, TodoCreation newTodo) =>
{
  Todo createdTodo = todos.Add(newTodo);
  return Results.Created($"/todos/{createdTodo.Id}", createdTodo);
});

app.MapDelete("/todo/{id}", (Todos todos, string id) =>
{
  todos.Remove(id);
  return Results.NoContent();
});

app.Run();

public record Todo(string Text, string Id);

public record TodoCreation(string Text);

public class Todos
{
  private static List<Todo> AllTodos = new List<Todo>{
    new Todo("Empty trash", "6bd67589-f7aa-43bd-86c7-e9c1c701b344"),
    new Todo("Bake cookies", "3101ffa0-b63b-41d9-a38c-908514a96ec7"),
    new Todo("Water plants", "bba7f76b-e7ee-42d0-9262-8c9e0eb17335"),
  };

  public IReadOnlyList<Todo> GetAll() => AllTodos.AsReadOnly();

  public Todo Add(TodoCreation todoCreation)
  {
    Todo newTodo = new Todo(todoCreation.Text, Guid.NewGuid().ToString());
    AllTodos.Add(newTodo);
    return newTodo;
  }

  public void Remove(string id)
  {
    Todo todo = AllTodos.Single(x => x.Id == id);
    AllTodos.Remove(todo);
  }
}
