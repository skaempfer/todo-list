import { FunctionComponent, useCallback, useState } from "react";
import { Button, List, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TodoListItem from "./TodoListItem";

type Todo = {
  text: string;
  id: string;
};

const TodoList: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { text: "Empty trash", id: uuidv4() },
    { text: "Bake cookies", id: uuidv4() },
    { text: "Water plants", id: uuidv4() },
  ]);
  const [inputText, setInputText] = useState<string>("");

  const addTodo = () => {
    const newTodo = inputText.trim();
    if (newTodo.length > 0) {
      setTodos([...todos, { text: newTodo, id: uuidv4() }]);
      setInputText("");
    }
  };

  const removeTodo = useCallback(
    (id: string) => {
      setTodos(todos.filter((x) => x.id !== id));
    },
    [todos]
  );

  return (
    <>
      <TextField
        variant="standard"
        value={inputText}
        placeholder="New todo"
        onChange={(e) => setInputText(e.target.value)}
        style={{ marginRight: "16px", width: "250px" }}
      />
      <Button variant="outlined" onClick={() => addTodo()}>
        Add
      </Button>
      <List>
        {todos.map((todo) => (
          <TodoListItem
            text={todo.text}
            key={todo.id}
            deleteCallback={() => removeTodo(todo.id)}
          />
        ))}
      </List>
    </>
  );
};

export default TodoList;
