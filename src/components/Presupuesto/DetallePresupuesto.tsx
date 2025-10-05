import { useRef, useState } from "react";
import { usePresupuestoStore } from "../../stores/usePresupuestoStore";
import { DetalleModal } from "./DetalleModal";
import type { IPresupuestoItem } from "../../types/presupuestos";
import { Link } from "react-router-dom";

export const DetallePresupuesto = () => {

    const [modalShow, toogleModal] = useState(false);
    const [presupuestoItem, setPresupuestoItem] = useState<IPresupuestoItem | null>(null);
    const { presupuesto, addItem, updateItem, removeItem } = usePresupuestoStore();


    const saveItem = (item: IPresupuestoItem) => {
        const existe = presupuesto.items.some(i => i.codArticu === item.codArticu);
        if (existe)
            updateItem(item);
        else
            addItem(item);

        setPresupuestoItem(null);
        toogleModal(false);
        irATotales();
    }

    const nuevo = () => {
        setPresupuestoItem(null);
        toogleModal(true);
    }

    const deleteItem = (detalleItem: IPresupuestoItem) => {
        removeItem(detalleItem.codArticu);
    }

    const edtiItem = (detalleItem: IPresupuestoItem) => {
        setPresupuestoItem(detalleItem);
        toogleModal(true);
    }

    const totalesAnchor = useRef<HTMLDivElement>(null);

    const irATotales = () => {
        totalesAnchor.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <DetalleModal
                saveItem={saveItem}
                modalShow={modalShow}
                cerrarModal={() => toogleModal(false)}
                presupuestoItem={presupuestoItem}
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
                        <th className="text-end">Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {presupuesto.items.length === 0 ?
                        <tr>
                            <td colSpan={5} className="text-center">No hay items en el presupuesto</td>
                        </tr>
                        :
                        presupuesto.items.map((item, index) => (
                            <tr key={index}>

                                <td >
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteItem(item)}>X</button>
                                    <Link onClick={() => edtiItem(item)} to="#" style={{ textDecoration: 'none' }}>
                                        {item.codArticu}
                                    </Link>
                                </td>

                                <td>{item.descripcio}</td>
                                <td>{item.cantidad.toFixed(2)}</td>
                                <td>${item.precio.toFixed(2)}</td>
                                <td className="text-end">${(item.cantidad * item.precio).toFixed(2)}</td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr className="fw-bold" style={{ borderTop: '2px solid black' }}>
                        <td colSpan={3}></td>
                        <td >SubTotal</td>
                        <td className="text-end">${(presupuesto.items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0) / 1.21).toFixed(2)}</td>

                    </tr>
                    <tr className="fw-bold">
                        <td colSpan={3}></td>
                        <td >Cobertura</td>
                        <td className="text-end">${0.00.toFixed(2)}</td>

                    </tr>
                    <tr className="fw-bold">
                        <td colSpan={3}></td>
                        <td >Total</td>
                        <td className="text-end">${presupuesto.items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0).toFixed(2)}</td>

                    </tr>
                </tfoot>
            </table >
            <div className="row mt-2">
                <div className="col12"></div>
            </div>
            <div ref={totalesAnchor}></div>
        </>
    )
}
