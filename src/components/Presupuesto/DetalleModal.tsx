import { useEffect, useState } from "react";
import CustomSelectArticulo from "../select/CustomSelectArticulo";
import type { articulo } from "../../types/articulo";

type props = {
    modalShow: boolean;
    cerrarModal: () => void;
    detalleEdit: articulo | null;
    saveItem: (item: articulo) => void;
}

/*
type dataSelect = {
  value: string;
  label: string;
} */

export const DetalleModal = ({modalShow, cerrarModal, detalleEdit, saveItem} : props) => {

    const [title, setTitle] = useState("");
    const [descripcion, setDescripcion] = useState<articulo | null>(null);
    const [cantidad, setCantidad] = useState(0);
    const [precioUnitario, setPrecioUnitario] = useState(0.0);

    useEffect(() => {
        if (detalleEdit !== null) {
            setTitle("Modificar")
            setDescripcion(detalleEdit);
            setCantidad(detalleEdit.cantidad);
            setPrecioUnitario(detalleEdit.precio);
        } else {
            setTitle("Agregar")
            setDescripcion(null);
            setCantidad(0);
            setPrecioUnitario(0.0);
        }       
    }, [modalShow, detalleEdit]);

    const onClose = () => {
        cerrarModal();;
    }

    const onclick = () => {
        if(descripcion !== null )
            saveItem({...descripcion, cantidad: cantidad, precio: precioUnitario});
   }

   return (
        <>
        {modalShow ?
            <div className="modal" id='exampleModal' tabIndex={-1} style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title} articulo</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CustomSelectArticulo 
                                col="col-12"
                                campoNombre="Descripcion: "
                                selected={descripcion}
                                setSelected={setDescripcion} />

                            <input type="number" className="form-control mb-2" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} />
                            <input type="number" step="0.01" className="form-control mb-2" placeholder="Precio Unitario" value={precioUnitario} onChange={(e) => setPrecioUnitario(parseFloat(e.target.value))} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={onclick}>{title}</button>
                        </div>
                    </div>
                </div>
            </div> : null}
        </>
    )
}
