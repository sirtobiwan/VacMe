import React, { useState } from "react";
import { Button, TextField, Paper, Grid, Typography, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importieren Sie den CSS für react-toastify
import { useNavigate } from "react-router-dom"; // Navigations-Hook von react-router

type RegisterProps = {
    onSignUp: (username: string, password: string) => void;
}
type ErrorState = {
    password?: string;
    passwordConfirm?: string;
};

export default function Register({ onSignUp }: RegisterProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<ErrorState>({});

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        const newError: ErrorState = {};

        if (password.length < 8) {
            newError.password = "Password should be at least 8 characters.";
            valid = false;
        }

        if (password !== passwordConfirm) {
            newError.passwordConfirm = "Passwords do not match.";
            valid = false;
        }

        setError(newError);

        if (valid) {
            onSignUp(username, password);
            toast.success("Successfully registered!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/login");
        }
    };

    return (
        <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: "2rem" }}>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            required
                            label="Username"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            required
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={Boolean(error.password)}
                            helperText={error.password || "Minimum 8 characters required."}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            label="Confirm password"
                            type={showConfirmPassword ? "text" : "password"}
                            margin="normal"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            error={Boolean(error.passwordConfirm)}
                            helperText={error.passwordConfirm}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            style={{ marginTop: "1rem" }}
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}
