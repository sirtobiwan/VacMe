import React, { useState } from "react";
import { Button, TextField, Paper, Grid, Typography, Link } from "@mui/material";
import {useNavigate} from "react-router-dom";

type LoginProps = {
    onLogin: (username: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: "2rem" }}>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            style={{ marginTop: "1rem" }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography style={{ marginTop: "1rem" }}>
                        No account yet?
                        <span style={{ marginLeft: "0.5rem" }}>
                             Register{" "}
                            <Link onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
                              here
                            </Link>
                        </span>
                    </Typography>

                </Paper>
            </Grid>
        </Grid>
    );
}
