import { Link } from "react-router-dom"
import CustomSelect from "../select/CustomSelect"
import { usePresupuestoStore } from "../../stores/usePresupuestoStore";
import { DetallePresupuesto } from "./DetallePresupuesto";
import { Solapas } from "./Solapas";

export const Presupuesto = () => {
    const { paciente, setPaciente, obraSocial, setObraSocial, razonSocial, setRazonSocial } = usePresupuestoStore();

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h1>Presupuesto</h1>
                    <Link className="btn btn-primary float-end" to="/">Volver</Link>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-8 rounded p-3 bg-light">
                    <CustomSelect
                        col="col-12"
                        campoNombre="Paciente "
                        selected={paciente}
                        setSelected={setPaciente} />
                    <CustomSelect
                        col="col-12"
                        campoNombre="Razon Social"
                        selected={razonSocial}
                        setSelected={setRazonSocial} />
                    <CustomSelect
                        col="col-12"
                        campoNombre="Obra Social"
                        selected={obraSocial}
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
        </>
    )
}