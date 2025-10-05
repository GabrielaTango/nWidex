import { useEffect, useState } from "react";
import CustomSelect from "../select/CustomSelect";
import type { IPresupuestoVendedor } from "../../types/presupuestos";

type props = {
    modalShow: boolean;
    seleccionWidex: boolean
    cerrarModal: () => void;
    vendedor: IPresupuestoVendedor | null;
    saveItem: (item: IPresupuestoVendedor) => void;
}

export const VendedorModal = ({modalShow, cerrarModal, vendedor, saveItem, seleccionWidex} : props) => {

    const [title, setTitle] = useState("");
    const [descripcion, setDescripcion] = useState<IPresupuestoVendedor | null>(null);

    useEffect(() => {
        if (vendedor == null) {
            setTitle("Agregar")
            setDescripcion(null);
        } else {
            setTitle("Modificar")
            setDescripcion(vendedor);
            
        }       
    }, [modalShow, vendedor]);

    const onClose = () => {
        cerrarModal();;
    }

    const onclick = () => {       
        if(descripcion !== null )
            saveItem({...descripcion, seleccionWidex: seleccionWidex});
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
                            <CustomSelect<IPresupuestoVendedor> 
                                col="col-12"
                                campoNombre="Descripcion: "
                                selected={descripcion}
                                setSelected={setDescripcion} 
                                url="/Vendedores"
                                />
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
