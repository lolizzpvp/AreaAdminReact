import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="d-flex flex-column justify-content-center min-vh-100 align-items-center">
                <h1>Página Não Encontrada</h1>
                <p className="text-muted">A página que você está procurando não existe.</p>
                <NavLink to="/" className="btn btn-primary">Voltar para a Home</NavLink>
            </div>
        </>        
    )
}

export default NotFound;