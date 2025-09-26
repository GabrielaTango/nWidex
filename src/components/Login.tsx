import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/usePresupuestoStore";
import { API_BASE_URL } from "../api";
import { ApiClient } from "../hooks/apiClient";
import type { auth } from "../types/auth";

export const Login = () => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const { login, logout, error, setNombre } = useAuth();
    const navigate = useNavigate();

    const api = new ApiClient({
        baseUrl: API_BASE_URL,
        getToken: () => '',
        onUnauthorized: () => {
            logout("Su sesion ha expirado!!!")
            navigate("/login");
        },
        retries: 2
    });


    const handleLogin = async () => {
        try {
            const res = await api.post<auth>("/user/login", { Username: user, Password: password })
            localStorage.setItem("token", res.token);
            setNombre(res.nombre);
            login(); // justo después del localStorage.setItem("token")
            navigate("/home");
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Error: " + err.message);
            } else {
                alert("Error: " + String(err));
            }
        }
    };

    return (
        <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="col-xl-4 col-sm-12 ">
                <div className="card rounded p-3 bg-light">
                    <div className="card-body">
                        <div className="text-center">
                            <img src="https://www.widex.com.ar/img/widex-dark-gray-logo.png"
                                className="img-fluid me-3 align-center" alt="" />
                        </div>
                        <form action="" autoComplete="off">
                            <div className="form-group mt-2">
                                <label htmlFor="username">Usuario</label>
                                <input type="text" className="form-control" name="username"
                                    value={user} onChange={e => setUser(e.target.value)} />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className="form-control" name="password"
                                    value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="button" className="btn btn-primary " onClick={handleLogin}>Ingresar</button>
                            </div>
                        </form>
                            {error !== null ? <div className="d-grid gap-2 mt-3 text-center">
                                            <p className="text-danger">{error}</p>
                                        </div> : <></>}
                    </div>
                </div>
            </div>
        </div>

    )
}