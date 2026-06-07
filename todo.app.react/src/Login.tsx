import { FunctionComponent, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";

type LoginProps = {
  onLogin: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login: FunctionComponent<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    fetch("http://localhost:5044/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((response) => {
        if (response.ok) {
          onLogin();
          return;
        }
        return response.json().then((body) => {
          throw new Error(body?.error ?? "Login failed.");
        });
      })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" align="center">
        Sign in
      </Typography>
      <TextField
        label="Email"
        type="email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        fullWidth
      />
      <LoadingButton
        variant="contained"
        onClick={handleLogin}
        loading={loading}
        disabled={loading}
        fullWidth
      >
        Login
      </LoadingButton>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default Login;
