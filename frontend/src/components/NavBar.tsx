import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import {Link} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlightIcon from '@mui/icons-material/Flight';



export default function NavigationBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 5 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#FFF' }}>
                        <HomeIcon/>
                    </Link>
                    <Link to="/my-vaccines" style={{ textDecoration: 'none', color: '#FFF', marginRight: '10px' }}>
                        <ListIcon />
                    </Link>

                    <Link to="/add" style={{ textDecoration: 'none', color: '#FFF', marginRight: '10px' }}>
                        <AddIcon />
                    </Link>
                    <Link to="/traveling" style={{ textDecoration: 'none', color: '#FFF', marginRight: '10px' }}>
                        <FlightIcon />
                    </Link>


                    <Link to="/me" style={{ textDecoration: 'none', color: '#FFF' }}>
                        <AccountCircleIcon />
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
