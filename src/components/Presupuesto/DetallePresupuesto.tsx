import { useEffect, useState } from "react";
import { usePresupuestoStore } from "../../stores/usePresupuestoStore";
import { DetalleModal } from "./DetalleModal";
import type { articulo } from "../../types/articulo";

export const DetallePresupuesto = () => {

    const [modalShow, toogleModal] = useState(false);

    const [detalleEdit, setDetalleEdit] = useState<articulo | null>(null);

    const {detalle, setDetalle} = usePresupuestoStore();

    useEffect(() => {
        const datosEjemplo: articulo[] = [
            { codigo: "1", descripcion: "Aud Widex xxxx", cantidad: 1, precio: 500000.00 },
            { codigo: "2", descripcion: "Pilas", cantidad: 1, precio: 0.00 },
            { codigo: "3", descripcion: "Molde", cantidad: 1, precio: 0.00 }
        ];
        setDetalle(datosEjemplo);
    }, []);

    const saveItem = (item: articulo) => {
        const existe = detalle.some(i => i.codigo === item.codigo);
        if (existe) {
                setDetalle(
                detalle.map((it) =>
                    it.codigo == item.codigo ? item : it
                )
            );
        } 
        else { 
            
            setDetalle([...detalle, item]);
        }

        setDetalleEdit(null);
        toogleModal(false);
    }

    const nuevo = () => {
        setDetalleEdit(null);
        toogleModal(true);
    }

    const deleteItem = (detalleItem: articulo) => {
        const nuevoDetalle = detalle.filter(item => item.codigo !== detalleItem.codigo);
        setDetalle(nuevoDetalle);
    }

    const edtiItem = (detalleItem: articulo) => {
        setDetalleEdit(detalleItem);
        toogleModal(true);
    }

    return (
        <>
            <DetalleModal
                saveItem={saveItem}
                modalShow={modalShow}
                cerrarModal={() => toogleModal(false)}
                detalleEdit={detalleEdit}
            />
            <button type="button" className="btn btn-success btn-sm"
                onClick={() => nuevo()}>
                Agregar
            </button>
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Cod.</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        detalle.map((item, index) => (
                            <tr key={index}>
                                <td>{item.codigo}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.cantidad}</td>
                                <td>${item.precio.toFixed(2)}</td>
                                <td>${(item.cantidad * item.precio).toFixed(2)}</td>
                                <td><button className="btn btn-warning btn-sm" onClick={() => edtiItem(item)}>M</button>
                                    <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteItem(item)}>X</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
