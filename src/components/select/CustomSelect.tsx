import AsyncSelect from 'react-select/async'
import { ApiClient } from '../../hooks/apiClient';
import { API_BASE_URL } from '../../api';
import { useAuth } from '../../stores/usePresupuestoStore';
import { useNavigate } from 'react-router-dom';

type props<T> = {
    selected: T | null;
    setSelected: (item: T | null) => void;
    campoNombre: string;
    col?: string; 
    url: string; 
}

export const CustomSelect = <T,>({ selected, setSelected, campoNombre, col, url }: props<T>) => {
    
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


const loadOptions = async (inputValue: string): Promise<T[]> => {
    if (!inputValue || inputValue.length < 4) return [];

    try {
        const dataResponse = await api.get<T[]>(url);
        return dataResponse;
    } catch (error: unknown) {
        console.error(error);
    }

    return [];
};

    const handleChange = (selectedOption: T) => {
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
                        onChange={(e) => handleChange(e as T)}
                        placeholder="Buscar usuario..."
                    />
                    <button className='btn btn-primary btn-danger' onClick={handleClear}>x</button>
                </div>
            </div>
        </div>
    )
}

export default CustomSelect;
