# ASP.NET Minimal API Demo

This application demonstrates the capabilities of [ASP.NET Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-6.0).
It consists of an React-based web application todo list (todo.app) and a ASP.NET6-based web service (todo.service).

## Run the applications

1. Open two command line shells
2. In the first shell navigate to `./todo.service` and execute `dotnet run`
3. In the second shell navigate to `./todo.app` and execute `npm ci` and then `npm run dev`

## Developing

### Debugging

The VS Code settings for both todo.app and todo.service are configured to be opened in separate VS Code instances. This makes it easier to debug both applications simultaneously.

## Run development servers in watch mode

For rapid development of your ASP.NET Core service consider using `dotnet watch --no-hot-reload run`. This will restart your service on every saving of a project file in scope. For small services this is more relient than using dotnet's hot module replacement since this only applied for some code parts and impossible to apply for others, e.g. server startup code. 
