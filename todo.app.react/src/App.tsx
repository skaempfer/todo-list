import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import TodoList from "./TodoList";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }} justifyContent={"center"}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo List
        </Typography>
        {isLoggedIn ? (
          <TodoList />
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </Box>
    </Container>
  );
}

export default App;
