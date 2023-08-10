import './App.css'
import {useEffect, useState} from "react";
import {Vaccine, VaccineWithoutId} from "./models/Vaccine.tsx";
import axios from "axios";
import Header from "./components/Header.tsx";
import VaccineList from "./components/VaccineList.tsx";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Form from "./components/Form.tsx";
import LandingPage from "./components/LandingPage.tsx";
import NavigationBar from "./components/NavBar.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import {ToastContainer} from "react-toastify";


export default function App() {
    const [vaccines, setVaccines] = useState<Vaccine[]>([]);
    const [user, setUser] = useState<string>()

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

    function handleUpdateVaccine(updatedVaccine: Vaccine) {
        axios.put(`/api/vaccine/${updatedVaccine.id}`, updatedVaccine)
            .then(() => getAllVaccines())
            .catch(function (error) {
                console.error(error);
            });
    }

    function handleDeleteVaccine(VaccineToDelete: Vaccine) {
        axios.delete(`/api/vaccine/${VaccineToDelete.id}`)
            .then(() => getAllVaccines())
            .catch(function (error) {
                console.error(error);
            });
    }

    const navigate = useNavigate()
    function handleLogin(username: string, password: string) {
        axios.post("/api/users/login", null, {auth: {username, password}})
            .then(response => {
                setUser(response.data)
                navigate("/")
            })
    }

    const location = useLocation();

    useEffect(() => {
        if (!user && location.pathname !== "/register") {
            navigate("/login");
        }
    }, [user, navigate, location.pathname]);

    function handleRegister(username: string, password: string) {
        axios.post("/api/users/register", {username, password})
            .then(response => {
                setUser(response.data)
                navigate("/")
            })
    }


    return (
        <>
            <Header />
            <Routes>
                <Route path={"/"} element={user ? <LandingPage /> : <Login onLogin={handleLogin} />} />
                <Route path={"/my-vaccines"} element={<VaccineList vaccines={vaccines} onUpdate={handleUpdateVaccine} onDelete={handleDeleteVaccine} />} />
                <Route path={"/login"} element={<Login onLogin={handleLogin} />} />
                <Route path={"/register"} element={<Register onSignUp={handleRegister} />} />
                <Route path={"/add"} element={
                    <Form onSubmit={handleAddVaccine} />}
                />

            </Routes>
            <ToastContainer />
            <NavigationBar />

        </>
    )
}
