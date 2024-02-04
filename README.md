# Todo List

This todo list application is serves as a basis for technology demonstrations and playground. Currently is consists of

- a web service component based on [ASP.NET Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-8.0)
- a web application component based on a [React](https://react.dev/).

## Running the applications

### Running the applications without VS Code

1. Open two command line shells
2. In the first shell navigate to `./todo.service` and execute `dotnet run`
3. In the second shell navigate to `./todo.app.react` and execute `npm ci` and then `npm run dev`
4. Open `https://localhost:7066/todos` to access the service
5. Open `http://localhost:3000/` to access the app

### Running the applications with VS Code

1. Open the VS Code workspace file (*.code-workspace)
2. Execute launch configuration "Compound: Service + App"
3. Two browser windows will be opened
   1. One for the service at `https://localhost:7066/todos`
   2. One for the app at `http://localhost:3000/`
