import { useState } from 'react';
import { usePresupuestoStore } from '../../stores/usePresupuestoStore'
import type { IPresupuestoVendedor } from '../../types/presupuestos';
import { VendedorModal } from './VendedorModal';
import { TablaVendedores } from './TablaVendedores';

export const Vendedores = () => {
    const vendedores = usePresupuestoStore((state) => state.presupuesto.vendedores);
    const addVendedor = usePresupuestoStore((state) => state.addVendedor);
    const [seleccionWidex, setSeleccionWidex] = useState(false);

    const [modalShow, toogleModal] = useState(false);



    const saveItem = (vendedor: IPresupuestoVendedor) => {
        const existe = vendedores.some(i => i.codigo === vendedor.codigo);
        if (!existe)
            addVendedor(vendedor);

        //setVendedor(null);
        toogleModal(false);

    }

    const AgregarVendedor = (seleccion: boolean) => {
        setSeleccionWidex(seleccion);
        toogleModal(true);
    }


    return (
        <div className="row mt-2">
            <div className="col-12">
                <VendedorModal
                    saveItem={saveItem}
                    modalShow={modalShow}
                    cerrarModal={() => toogleModal(false)}
                    vendedor={null}
                    seleccionWidex={seleccionWidex}
                />
                <div className="d-flex justify-content-between align-items-center">
                    <b>Vendedores</b>
                    <button className="btn btn-sm btn-primary py-0 px-1 " onClick={() => AgregarVendedor(false)} >Agregar Vendedor</button>
                </div>
                <TablaVendedores vendedores={vendedores.filter(item => !item.seleccionWidex)} />
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <b>Seleccion Widex</b>
                    <button className="btn btn-sm btn-primary py-0 px-1" onClick={() => AgregarVendedor(true)} >Agregar Vendedor</button>
                </div>
                <TablaVendedores vendedores={vendedores.filter(item => item.seleccionWidex)} />

            </div>
        </div>
    )
}
