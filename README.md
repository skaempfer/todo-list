# Todo List with ASP.NET Minimal API and React

This application demonstrates the capabilities of [ASP.NET Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-6.0).
It consists of an React-based web application todo list (todo.app) and a ASP.NET6-based web service (todo.service).

## Running the applications

### Running the applications without VS Code

1. Open two command line shells
2. In the first shell navigate to `./todo.service` and execute `dotnet run`
3. In the second shell navigate to `./todo.app` and execute `npm ci` and then `npm run dev`
4. Open `https://localhost:7066/todos` to access the service
5. Open `http://localhost:3000/` to access the app

### Running the applications with VS Code

1. Open the VS Code workspace file (*.code-workspace)
2. Execute launch configuration "Compound: Service + App"
3. Two browser windows will be opened
   1. One for the service at `https://localhost:7066/todos`
   2. One for the app at `http://localhost:3000/`
