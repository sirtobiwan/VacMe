import './App.css'
import {useState} from "react";
import {Vaccine} from "./models/Vaccine.tsx";
import axios from "axios";
import Header from "./components/Header.tsx";

export default function App() {

    const [vaccines, setVaccines] = useState<Vaccine[]>([]);

    function getAllVaccines() {
        axios.get('/api/vaccine')
            .then(response => {
                setVaccines(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    if (!getAllVaccines)
        return <h1> ... loading </h1>

    return (
        <>
            <Header/>

        </>
    )
}
