import './App.css'
import {useEffect, useState} from "react";
import {Vaccine} from "./models/Vaccine.tsx";
import axios from "axios";
import Header from "./components/Header.tsx";
import VaccineList from "./components/VaccineList.tsx";

export default function App() {

    const [vaccines, setVaccines] = useState<Vaccine[]>([]);

    useEffect(getAllVaccines, [])
    function getAllVaccines() {
        axios.get('/api/vaccine')
            .then(response => {
                setVaccines(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const sampleVaccines: Vaccine[] = [
        {
            id: "1",
            disease: "COVID-19",
            vaccination: "Moderna",
            batch: "Batch1",
            vaccineDate: "2023-25-07",
            doctor: "Dr. Smith",
            due: true,
            dueDate: "2024-25-07"
        },
        {
            id: "2",
            disease: "Flu",
            vaccination: "Sanofi",
            batch: "Batch2",
            vaccineDate: "2023-25-07",
            doctor: "Dr. Johnson",
            due: false,
            dueDate: null
        }
    ];

    return (
        <>
            <Header/>
            <main>
                <VaccineList vaccines={vaccines}/>
            </main>

        </>
    )
}
