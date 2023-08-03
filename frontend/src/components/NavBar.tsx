import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";


export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 5 }}>
                <Toolbar>
                    <Link to="/" style={{ textDecoration: 'none', color: '#FFF' }}>
                        <HomeIcon/>
                    </Link>

                    <Typography variant="h6"  component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/my-vaccines" style={{ textDecoration: 'none', color: '#FFF' }}>
                                My Vaccines
                        </Link>
                    </Typography>
                    <Link to="/add" style={{ textDecoration: 'none', color: '#FFF' }}>
                        <AddIcon />
                    </Link>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
