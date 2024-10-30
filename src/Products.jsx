import { useEffect, useState } from "react";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

    const loadProducts = () => {
        setLoading(true);
        const productsEndpoint = "obter_produtos";
        api.get(productsEndpoint)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteProduct = (productId) => {
        setLoading(true);
        api.post("excluir_produto", { "id_produto": productId })
            .then(response => {
                if (response.status === 204) {
                    loadProducts();
                }
            })
            .catch(error => {
                console.error("Erro ao excluir produto:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteProduct = (productId) => {
        setSelectedProductId(productId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteProduct'));
        modal.show();
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Filtra a lista de produtos com base no termo de pesquisa
    const filteredProducts = products.filter(product => 
        product.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1>Produtos</h1>
            {/* Barra de pesquisa */}
            <input 
                type="text" 
                placeholder="Pesquisar produtos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />

            {/* Verificação de carregamento e exibição da lista de produtos */}
            {loading ? (
                <Loading />
            ) : (
                products.length > 0 ? (
                    <>
                        <ModalConfirm 
                            modalId="modalDeleteProduct" 
                            question="Tem certeza que deseja excluir o produto selecionado?" 
                            confirmAction={() => deleteProduct(selectedProductId)} 
                        />
                        <TableProducts items={filteredProducts} handleDeleteProduct={handleDeleteProduct} />
                    </>
                ) : (
                    <NoProducts />
                )
            )}
        </>
    );
};

export default Products;
