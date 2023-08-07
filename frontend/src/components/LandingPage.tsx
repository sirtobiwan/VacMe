import {useEffect, useState} from "react";
import axios from "axios";
import {Vaccine} from "../models/Vaccine.tsx";
import { Alert } from '@mui/material';
import '../App.css';
import {LocalHospital} from "@mui/icons-material";

export default function LandingPage() {

    const [vaccines, setVaccines] = useState<Vaccine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('/api/vaccine')
            .then(response => {
                setVaccines(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>

    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    }

    const dueVaccines = vaccines.filter(vaccine => vaccine.dueDate && new Date(vaccine.dueDate) < new Date(getCurrentDate())).length;

    return (
        <div className="landing-page">
            <LocalHospital className="vaccine-icon" />
            <h1>Welcome to your Vaccine Tracker App</h1>
            {dueVaccines > 0 ? (
                <Alert severity="error">{dueVaccines} vaccination(s) due!</Alert>
            ) : (
                <Alert severity="success">No vaccinations are due!</Alert>
            )}
        </div>
    );
}
