import { FunctionComponent, PropsWithChildren } from "react";
import { List } from "@mui/material";

const TodoList: FunctionComponent<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  return (
    <List>
      {props.children}
    </List>
  );
};

export default TodoList;
