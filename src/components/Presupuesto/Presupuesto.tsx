import { Link, useNavigate } from "react-router-dom"
import CustomSelect from "../select/CustomSelect"
import { useAuth, usePresupuestoStore } from "../../stores/usePresupuestoStore";
import { DetallePresupuesto } from "./DetallePresupuesto";
import { Solapas } from "./Solapas";
import { ApiClient } from "../../hooks/apiClient";
import { API_BASE_URL } from "../../api";
import type { IPresupuesto } from "../../types/presupuestos";

export const Presupuesto = () => {

    const navigate = useNavigate();

    const { logout } = useAuth();
        const api = new ApiClient({
            baseUrl:  API_BASE_URL,
            getToken: () => localStorage.getItem("token"),
            onUnauthorized: () => {     
              logout("Su sesion ha expirado!!!")
              navigate("/login")
            },
            retries: 2
        });

    const { presupuesto, setPaciente, setRazonSocial, setObraSocial } = usePresupuestoStore();

    const verPresup = () => {
        console.log(presupuesto);
        api.post<IPresupuesto>("/Presupuesto/Calcular", presupuesto)
        .then((data) => {
            console.log("Presupuesto guardado:", data);
        })
        .catch((error) => {
            console.error("Error guardando el presupuesto:", error);
        });
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h1>Presupuesto</h1>
                    <Link className="btn btn-primary float-end" to="/">Volver</Link>
                    {presupuesto.paciente?.cod_Client}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-8 rounded p-3 bg-light">
                    <CustomSelect
                        col="col-12"
                        campoNombre="Paciente "
                        selected={presupuesto.paciente}
                        setSelected={setPaciente} />
                    <CustomSelect
                        col="col-12"
                        campoNombre="Razon Social"
                        selected={presupuesto.razonSocial}
                        setSelected={setRazonSocial} />
                    <CustomSelect
                        col="col-12"
                        campoNombre="Obra Social"
                        selected={presupuesto.obraSocial}
                        setSelected={setObraSocial} />
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Orden de compra</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                </div>
                <div className="col-4 rounded p-3 bg-light text-end">
                    <p><b>Nro. Presupuesto:</b> X0000100002635</p>
                    <p><b>Fecha:</b> 2025-08-25</p>
                </div>
            </div>
            <Solapas />
            <hr />
            <div className="row mt-2">
                <div className="col-12">
                    <DetallePresupuesto />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
            <button onClick={() => verPresup()}>Ver Presupuesto por consola</button>
                </div>
            </div>
            
         </>
    )
}