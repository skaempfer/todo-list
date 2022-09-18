import { FunctionComponent, useCallback, useState } from "react";
import { Button, List, TextField } from "@mui/material";
import TodoListItem from "./TodoListItem";

const createKey = (): string => (Date.now() + Math.random() * 10).toString();

type Todo = {
  text: string;
  key: string;
};

const TodoList: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { text: "Empty trash", key: createKey() },
    { text: "Bake cookies", key: createKey() },
    { text: "Water plants", key: createKey() },
  ]);
  const [inputText, setInputText] = useState<string>("");

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputText(event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTodo = inputText.trim();
    if (newTodo.length > 0) {
      setTodos([...todos, { text: newTodo, key: createKey() }]);
      setInputText("");
    }
  };

  const deleteItem = useCallback(
    (deleteKey: string) => {
      setTodos(todos.filter((x) => x.key !== deleteKey));
    },
    [todos]
  );

  return (
    <>
      <TextField
        variant="standard"
        value={inputText}
        placeholder="New todo"
        onChange={handleTextChange}
        style={{ marginRight: "16px", width: "250px" }}
      />
      <Button variant="outlined" onClick={handleButtonClick}>
        Add
      </Button>
      <List>
        {todos.map((todo) => (
          <TodoListItem
            text={todo.text}
            key={todo.key}
            deleteCallback={() => deleteItem(todo.key)}
          />
        ))}
      </List>
    </>
  );
};

export default TodoList;
