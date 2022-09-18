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
    { text: "Foo", key: createKey() },
    { text: "Bar", key: createKey() },
  ]);
  const [inputText, setInputText] = useState<string>("");

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputText(event.target.value.trim());
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (inputText.length > 0) {
      setTodos([...todos, { text: inputText, key: createKey() }]);
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
      <List>
        {todos.map((todo) => (
          <TodoListItem
            text={todo.text}
            key={todo.key}
            deleteCallback={() => deleteItem(todo.key)}
          />
        ))}
      </List>
      <TextField
        variant="standard"
        value={inputText}
        placeholder="New todo"
        onChange={handleTextChange}
      />
      <Button variant="outlined" onClick={handleButtonClick}>
        Add
      </Button>
    </>
  );
};

export default TodoList;
