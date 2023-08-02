import {FormEvent, useState} from "react";
import {VaccineWithoutId} from "../models/Vaccine.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import delay from 'delay';

type FormProps = {
    onSubmit: (data: VaccineWithoutId) => void;
};

export default function Form(props: FormProps) {
    const [formData, setFormData] = useState({
        disease: "",
        vaccination: "",
        batch: "",
        vaccineDate: "",
        doctor: "",
        due: true,
        dueDate: "",
    });
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit(formData);
        // Reset the form after submission (optional)
        setFormData({
            disease: "",
            vaccination: "",
            batch: "",
            vaccineDate: "",
            doctor: "",
            due: true,
            dueDate: "",
        });
        delayedExecution()

    }

    const navigate = useNavigate();
    const delayedExecution = async () => {
        toast.success("Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        await delay(2000); // Delay of 2000 milliseconds (2 seconds)
        navigate("/my-vaccines")
    };
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: checked,
        }));
    };


    return (
        <>
        <Link to={"/my-vaccines"}>
            <IconButton className={"back-button-form"}  >
                <ArrowBack/>
            </IconButton>
        </Link>
        <form onSubmit={handleSubmit}>
            <section className="form-input-container">
            <div className="form-field">
                <label htmlFor="disease">Disease:</label>
                <input
                    type="text"
                    id="disease"
                    name="disease"
                    value={formData.disease}
                    onChange={e => setFormData({...formData, disease: e.target.value})}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="vaccination">Vaccination:</label>
                <input
                    type="text"
                    id="vaccination"
                    name="vaccination"
                    value={formData.vaccination}
                    onChange={e => setFormData({...formData, vaccination: e.target.value})}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="batch">Batch:</label>
                <input
                    type="text"
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={e => setFormData({...formData, batch: e.target.value})}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="vaccineDate">Vaccine Date:</label>
                <input
                    type="date"
                    id="vaccineDate"
                    name="vaccineDate"
                    value={formData.vaccineDate}
                    onChange={e => setFormData({...formData, vaccineDate: e.target.value})}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="doctor">Doctor:</label>
                <input
                    type="text"
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={e => setFormData({...formData, doctor: e.target.value})}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="due">Due:</label>
                <input
                    type="checkbox"
                    id="due"
                    name="due"
                    checked={formData.due}
                    onChange={handleCheckboxChange}
                />
            </div>
            {formData.due && (
                <div className="form-field">
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate || ""}
                        onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    />
                </div>
            )}
            </section>
            <button type="submit">Submit</button>
        </form>
            <ToastContainer/>
        </>
    );
}
