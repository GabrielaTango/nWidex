import AsyncSelect from 'react-select/async'
import { ApiClient } from '../../hooks/apiClient';
import type { cliente } from '../../types/clientes';
import type { dataSelect } from '../../types/dataSelect';
import { API_BASE_URL } from '../../api';
import { useAuth } from '../../stores/usePresupuestoStore';
import { useNavigate } from 'react-router-dom';

type props = {
    selected: dataSelect | null;
    setSelected: (user: dataSelect | null) => void;
    campoNombre: string;
    col : string | 'col-12'
}

export const CustomSelect = ({ selected, setSelected, campoNombre, col }: props) => {
    
    const { logout } = useAuth();

    const navigate = useNavigate();

    const api = new ApiClient({
        baseUrl:  API_BASE_URL,
        getToken: () => localStorage.getItem("token"),
        onUnauthorized: () => {     
          logout("Su sesion ha expirado!!!")
          navigate("/login")
        },
        retries: 2
    });


    const loadOptions = async (inputValue: string) => {
        if (!inputValue || inputValue.length < 4) return [];

        try {
            const dataResponse = await api.get<cliente[]>("/Clientes");

            const users = dataResponse.map((user: cliente) => ({
                value: user.cod_Client,
                label: "Codigo: " + user.cod_Client + ", Nombre: " + user.razon_Soci
            }));

            return users;
        } catch (error: unknown) {
            console.error(error)
        }
        return [];
    };

    const handleChange = (selectedOption: dataSelect) => {
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
                        onChange={(e) => handleChange(e as dataSelect)}
                        placeholder="Buscar usuario..."
                    />
                    <button className='btn btn-primary' onClick={handleClear}>x</button>
                </div>
            </div>
        </div>
    )
}

export default CustomSelect;
