import { FunctionComponent, useState } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";

type TodoListItemProps = {
  key: string;
  text: string;
  deleteCallback: () => void;
};

const TodoListItem: FunctionComponent<TodoListItemProps> = (
  props: TodoListItemProps
) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => () => {
    setChecked(!checked);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="Delete"
          onClick={() => props.deleteCallback()}
        >
          <DeleteOutlineOutlined />
        </IconButton>
      }
      disablePadding
    >
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
