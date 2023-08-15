import {useState} from "react";
import axios from "axios";
import {Button, List, ListItem, Typography, TextField} from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import {Countries} from './Countries';

export default function CountryRecommendation() {
    const [country, setCountry] = useState<string>("");
    const [recommendations, setRecommendations] = useState<string[]>([]);

    function handleSearch() {
        axios.get(`/api/vaccine/recommendation/${country}`)
            .then(response => {
                setRecommendations(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Impfempfehlung
            </Typography>

            <div>
                <div>
                    <Autocomplete
                        freeSolo
                        options={Countries}
                        onInputChange={(_, newValue) => {
                            setCountry(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Land"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    style={{marginTop: "20px"}}
                >
                    Suchen
                </Button>
            </div>

            {country && (
                <Typography variant="h6" gutterBottom style={{marginTop: "20px", marginBottom: "10px"}}>
                    Impfempfehlungen für {country}
                </Typography>
            )}

            <List>
                {recommendations.map((rec, index) => (
                    <ListItem key={index}>
                        {rec}
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
