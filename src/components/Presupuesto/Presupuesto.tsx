import { Link, useNavigate } from "react-router-dom"
import CustomSelect from "../select/CustomSelect"
import { useAuth, usePresupuestoStore } from "../../stores/usePresupuestoStore";
import { DetallePresupuesto } from "./DetallePresupuesto";
import { Solapas } from "./Solapas";
import { ApiClient } from "../../hooks/apiClient";
import { API_BASE_URL } from "../../api";
import type { IPresupuesto } from "../../types/presupuestos";
import { Vendedores } from "./Vendedores";
import { useEffect, useRef } from "react";

export const Presupuesto = () => {

    const navigate = useNavigate();

    const { logout } = useAuth();
    const api = new ApiClient({
        baseUrl: API_BASE_URL,
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


    const collapseRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = collapseRef.current;
        if (!element) return;

        const handleShown = () => {
            // Esperamos un poco para que la animación termine del todo
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest', // o 'start' si querés que quede arriba del todo
                });
            }, 100);
        };

        element.addEventListener('shown.bs.collapse', handleShown);

        return () => {
            element.removeEventListener('shown.bs.collapse', handleShown);
        };
    }, []);


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Presupuesto</h1>
                        <Link className="btn btn-primary float-end" to="/">Volver</Link>
                    </div>
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col-12 col-md-8">
                    <p><b>Nro. Presupuesto </b> X0000100002635</p>
                    <p><b>Fecha </b> 2025-08-25</p>

                </div>
                <div className="col-12 col-md-4">
                    <p><b>Talonario</b><select className="form-control form-select mt-2 " aria-label="Default select example">
                        <option selected>Seleccione un talonario</option>
                        <option value="1">San Isidro</option>
                        <option value="2">Rosario</option>
                        <option value="3">Lomas</option>
                    </select>
                    </p>
                </div>
            </div>



            <div className="row border-bottom border-top border-3 mt-2">
                <div className="col-12 col-md-6 rounded p-3 bg-light">
                    <CustomSelect
                        col="col-12"
                        campoNombre="Paciente "
                        selected={presupuesto.paciente}
                        setSelected={setPaciente}
                        url="/Clientes"
                    />
                    <CustomSelect
                        col="col-12"
                        campoNombre="Razon Social"
                        selected={presupuesto.razonSocial}
                        setSelected={setRazonSocial}
                        url="/Clientes"
                    />
                    <CustomSelect
                        col="col-12"
                        campoNombre="Obra Social"
                        selected={presupuesto.obraSocial}
                        setSelected={setObraSocial}
                        url="/Clientes" />
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Orden de compra</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                </div>
                <div className="col-12 col-md-6 rounded p-3 bg-light">
                    <Vendedores />

                </div>
            </div>
            <div className="row border-bottom border-3">
                <div className="col-12">
                    <Solapas />
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-12">
                    <DetallePresupuesto />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <button onClick={() => verPresup()}>Ver Presupuesto por consola</button>
                </div>
            </div>



        </>
    )
}