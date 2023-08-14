import { Button, Container, Typography, Box } from "@mui/material";

type UserProfileProps = {
    onLogout: () => void;
    user: string | undefined | null;
}

export default function UserProfile({ onLogout, user }: UserProfileProps) {
    return (
        <Container
            component={Box}
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginTop="3rem"
        >
            <Typography variant="h3" gutterBottom component={Box} marginBottom={4} fontWeight="bold">
                Welcome, {user}
            </Typography>
            <Button variant="contained" color="secondary" onClick={onLogout} size="large">
                Logout
            </Button>
        </Container>
    );
}
