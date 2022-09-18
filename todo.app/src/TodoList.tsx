import { FunctionComponent, useEffect, useState } from "react";
import { Box, Button, CircularProgress, List, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TodoListItem from "./TodoListItem";

type Todo = {
  text: string;
  id: string;
};

const TodoList: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [inputText, setInputText] = useState<string>("");

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
      setTodos([...(todos ?? []), { text: newTodo, id: uuidv4() }]);
      setInputText("");
    }
  };

  const removeTodo = (id: string) => {
    setTodos((todos ?? []).filter((x) => x.id !== id));
  };

  return (
    <>
      <TextField
        variant="standard"
        value={inputText}
        placeholder="New todo"
        onChange={(e) => setInputText(e.target.value)}
        style={{ marginRight: "16px", width: "250px" }}
        disabled={todos === null}
      />
      <Button
        variant="outlined"
        onClick={() => addTodo()}
        disabled={todos === null}
      >
        Add
      </Button>
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
    </>
  );
};

export default TodoList;
