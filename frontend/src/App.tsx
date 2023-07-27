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


    return (
        <>
            <Header/>
            <main>
                <VaccineList vaccines={vaccines}/>
            </main>

        </>
    )
}
