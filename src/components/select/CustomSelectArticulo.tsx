import AsyncSelect from 'react-select/async'
import { ApiClient } from '../../hooks/apiClient';
import { API_BASE_URL } from '../../api';
import type { IPresupuestoItem } from '../../types/presupuestos';

type props = {
    selected: IPresupuestoItem | null;
    setSelected: (user: IPresupuestoItem | null) => void;
    campoNombre: string;
    col : string | 'col-12'
}

export const CustomSelectArticulo = ({ selected, setSelected, campoNombre, col }: props) => {

    const api = new ApiClient({
        baseUrl:  API_BASE_URL,
        getToken: () => localStorage.getItem("token"),
        onUnauthorized: () => {
            console.log("Sesión expirada, redirigiendo al login...");
            //router.push("/");
        },
        retries: 2
    });


    const loadOptions = async (inputValue: string) => {
        if (!inputValue || inputValue.length < 4) return [];

        try {
            const dataResponse = await api.get<IPresupuestoItem[]>("/Articulos");
            /*
            const users = dataResponse.map((art: articulo) => ({
                value: art.codigo,
                label: "Codigo: " + art.codigo + ", Descripcion: " + art.descripcion + " " + art.descAdic
            }));
            */

            return dataResponse;
        } catch (error: unknown) {
            console.log(error);
        }
        return [];
    };

    const handleChange = (selectedOption: IPresupuestoItem) => {
        if (selectedOption !== null)
            setSelected(selectedOption);

    };

    const handleClear = () => {
        setSelected(null);
    };

    return (
        <div className="row">
            <div className={col}>
                <b><label>{campoNombre}</label></b>
                <div className='d-flex gap-2 align-items-center' style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    <AsyncSelect className='flex-grow-1'
                        //cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        value={selected} // <-- Estado controlado
                        onChange={(e) => handleChange(e as IPresupuestoItem)}
                        placeholder="Buscar usuario..."
                    />
                    <button className='btn btn-primary' onClick={handleClear}>x</button>
                </div>
            </div>
        </div>
    )
}

export default CustomSelectArticulo;
