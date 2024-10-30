import { useEffect, useState } from "react";
import NoUsers from "./NoUsers"; // Um componente para exibir mensagem quando não houver usuários
import TableUsers from "./TableUsers"; // Componente de tabela para exibir usuários
import api from "./axiosApi"; // API configurada
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

    // Função para carregar os usuários do backend
    const loadUsers = () => {
        setLoading(true);
        api.get("obter_usuarios")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar usuários:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Função para excluir usuário
    const deleteUser = (userId) => {
        setLoading(true);
        api.post("excluir_usuario", { "id_usuario": userId })
            .then(response => {
                if (response.status === 204) {
                    loadUsers();
                }
            })
            .catch(error => {
                console.error("Erro ao excluir usuário:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Função para abrir o modal de confirmação de exclusão
    const handleDeleteUser = (userId) => {
        setSelectedUserId(userId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteUser'));
        modal.show();
    };

    // Carrega os usuários quando o componente é montado
    useEffect(() => {
        loadUsers();
    }, []);

    // Filtra a lista de usuários com base no termo de pesquisa
    const filteredUsers = users.filter(user => 
        user.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1>Usuários</h1>
            {/* Barra de pesquisa */}
            <input 
                type="text" 
                placeholder="Pesquisar usuários..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />

            {/* Verificação de carregamento e exibição da lista de usuários */}
            {loading ? (
                <Loading />
            ) : (
                users.length > 0 ? (
                    <>
                        <ModalConfirm 
                            modalId="modalDeleteUser" 
                            question="Tem certeza que deseja excluir o usuário selecionado?" 
                            confirmAction={() => deleteUser(selectedUserId)} 
                        />
                        <TableUsers items={filteredUsers} handleDeleteUser={handleDeleteUser} />
                    </>
                ) : (
                    <NoUsers />
                )
            )}
        </>
    );
};

export default Users;
