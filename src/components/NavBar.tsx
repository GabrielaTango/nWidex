import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../stores/usePresupuestoStore";

export const NavBar = () => {
    const navigate = useNavigate();
    const { isLogged, logout, nombre } = useAuth();
    if (!isLogged) return null;

    

    const logouthandle = () => {
        localStorage.removeItem("token");
        logout(null)    
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="nav-link active" aria-current="page" to="/">
                    <img src="https://www.widex.com.ar/img/widex-dark-gray-logo.png"
                        className="img-fluid me-3" alt="" style={{ height: '22px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Presupuestos
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/presupuesto">Nuevo</Link></li>
                                <li><a className="dropdown-item" href="#">Abrir</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Pasar a Pedido</a></li>
                            </ul>
                        </li>
                        {/*
                            <li className="nav-item">
                                <Link className="nav-link" to="/presupuesto">Otro</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        */ }
                    </ul>
                    <form className="d-flex" role="search">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {nombre}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={logouthandle}>Salir</a></li>
                                </ul>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </nav >
    )
}