import { FunctionComponent, useEffect, useState } from "react";
import { Alert, Box, CircularProgress, List, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import TodoListItem from "./TodoListItem";

type Todo = {
  text: string;
  id: string;
};

const TodoList: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      const response = await fetch("http://localhost:5044/todos");
      const data = (await response.json()) as Todo[];
      setTodos(data);
    };
    loadTodos();
  }, []);

  const addTodo = () => {
    const newTodo = inputText.trim();
    if (newTodo.length > 0) {
      setProcessing(true);
      fetch("http://localhost:5044/todos", {
        method: "POST",
        body: JSON.stringify({ text: newTodo }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTodos([...(todos ?? []), json as Todo]);
          setInputText("");
        })
        .catch((reason) => setError(reason))
        .finally(() => setProcessing(false));
    }
  };

  const removeTodo = (id: string) => {
    fetch(`http://localhost:5044/todo/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setTodos((todos ?? []).filter((x) => x.id !== id));
          return;
        }
        throw new Error(
          `Could not delete todo with id ${id}: ${response.statusText}`
        );
      })
      .catch((reason) => setError(reason));
  };

  return (
    <>
      <TextField
        variant="standard"
        value={inputText}
        placeholder="New todo"
        onChange={(e) => setInputText(e.target.value)}
        style={{ marginRight: "16px", width: "250px" }}
        disabled={todos === null || processing}
      />
      <LoadingButton
        variant="outlined"
        onClick={() => addTodo()}
        disabled={todos === null || processing}
        startIcon={<Add />}
        loadingPosition="start"
        loading={processing}
      >
        Add
      </LoadingButton>
      <Box justifyContent={"center"}>
        {todos === null && (
          <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {todos !== null && (
          <List>
            {todos.map((todo) => (
              <TodoListItem
                text={todo.text}
                key={todo.id}
                deleteCallback={() => removeTodo(todo.id)}
              />
            ))}
          </List>
        )}
      </Box>
      <Box>
        {error != null && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default TodoList;
