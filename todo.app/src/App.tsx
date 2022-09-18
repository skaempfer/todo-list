import React from "react";
import { Container, Box, Typography } from "@mui/material";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }} justifyContent={"center"}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo List
        </Typography>
        <TodoList />
      </Box>
    </Container>
  );
}

export default App;
