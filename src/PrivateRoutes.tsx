import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './stores/usePresupuestoStore';

const PrivateRoutes = () => {
  const isLogged = useAuth((state) => state.isLogged);

return (
    isLogged ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;