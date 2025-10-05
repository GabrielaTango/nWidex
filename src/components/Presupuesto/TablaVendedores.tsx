import { usePresupuestoStore } from "../../stores/usePresupuestoStore";
import type { IPresupuestoVendedor } from "../../types/presupuestos"

type Props = {
    vendedores?: IPresupuestoVendedor[]
}
export const TablaVendedores = ({ vendedores }: Props) => {
const {removeVendedor} = usePresupuestoStore();

    return (
        <>
            {
                vendedores ?
                    <table className="table mt-2" style={{ fontSize: '0.75rem' }} >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Codigo</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Porc.Comision</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vendedores.map((vendedor, index) => (
                                    <tr key={vendedor.codigo}>
                                        <td scope="row">{index + 1}
                                        </td>
                                        <td >{vendedor.codigo}</td>
                                        <td>{vendedor.nombre}</td>
                                        <td>{vendedor.comision}</td>
                                        <td>
                                            <button className="btn btn-danger btn-xs" onClick={() => removeVendedor(vendedor.codigo)}>X</button></td>
                                    </tr>
                                ))}

                        </tbody>
                    </table >
                    : <></>
            }
        </>
    )
}
