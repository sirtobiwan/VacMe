import './App.css'
import {useEffect, useState} from "react";
import {Vaccine, VaccineWithoutId} from "./models/Vaccine.tsx";
import axios from "axios";
import Header from "./components/Header.tsx";
import VaccineList from "./components/VaccineList.tsx";
import {Route, Routes} from "react-router-dom";
import Form from "./components/Form.tsx";

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

    function handleAddVaccine(newVaccine: VaccineWithoutId) {

        axios.post("/api/vaccine", newVaccine)
            .then(() => getAllVaccines())
            .catch(function (error) {
                console.error(error);
            });
    }
    return (
        <>
            <Header />
            <Routes>
                <Route path={"/my-vaccines"} element={<VaccineList vaccines={vaccines} />} />
                <Route path={"/add"} element={
                    <Form onSubmit={handleAddVaccine} />}
                />
            </Routes>

        </>
    )
}