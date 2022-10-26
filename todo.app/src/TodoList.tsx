import { FunctionComponent, useEffect, useState } from "react";
import { Alert, Box, CircularProgress, List, TextField } from "@mui/material";
import { Add, KeyboardReturnOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { v4 as uuidv4 } from "uuid";
import TodoListItem from "./TodoListItem";

type Todo = {
  text: string;
  id: string;
};

const TodoList: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      const response = await fetch("https://localhost:7066/todos");
      const data = (await response.json()) as Todo[];
      setTodos(data);
    };
    loadTodos();
  }, []);

  const addTodo = () => {
    const newTodo = inputText.trim();
    if (newTodo.length > 0) {
      setSaving(true);
      fetch("https://localhost:7066/todos", {
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
        .finally(() => setSaving(false));
    }
  };

  const removeTodo = (id: string) => {
    fetch(`https://localhost:7066/todo/${id}`, { method: "DELETE" })
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
        disabled={todos === null || saving}
      />
      <LoadingButton
        variant="outlined"
        onClick={() => addTodo()}
        disabled={todos === null || saving}
        startIcon={<Add />}
        loadingPosition="start"
        loading={saving}
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
