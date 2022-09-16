import { FunctionComponent, useState } from "react";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type TodoListItemProps = {
  text: string;
};

const TodoListItem: FunctionComponent<TodoListItemProps> = (
  props: TodoListItemProps
) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => () => {
    setChecked(!checked);
  };
  return (
    <ListItem>
      <ListItemButton role={undefined} onClick={handleToggle()} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoListItem;
