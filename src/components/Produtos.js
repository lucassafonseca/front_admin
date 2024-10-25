import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Input, List } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProdutosComponent = () => {
    const [produtos, setProdutos] = useState([]);
    const [filteredProdutos, setFilteredProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);

    const [produtoName, setProdutoName] = useState('');

    // Função para buscar os produtos da API
    const fetchProdutos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/produtos');
            setProdutos(response.data);
            setFilteredProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredProdutos(
            produtos.filter(produto => produto.nome.toLowerCase().includes(value.toLowerCase()))
        );
    };

    const showModal = () => {
        setIsEditMode(false);
        setProdutoName('');
        setIsModalVisible(true);
    };

    const showEditModal = (produto) => {
        setIsEditMode(true);
        setSelectedProduto(produto);
        setProdutoName(produto.nome);
        setIsModalVisible(true);
    };

    const handleSave = async () => {
        try {
            if (isEditMode && selectedProduto) {
                await axios.put(`http://localhost:8080/api/produtos/${selectedProduto.id}`, { nome: produtoName });
            } else {
                await axios.post('http://localhost:8080/api/produtos', { nome: produtoName });
            }
            fetchProdutos();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Erro ao salvar o produto:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/produtos/${id}`);
            fetchProdutos();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    return (
        <div>
            {/* Barra de Pesquisa */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Input
                    placeholder="Buscar produto"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: '300px' }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    Adicionar Produto
                </Button>
            </div>

            {/* Lista de Produtos */}
            <List
                bordered
                dataSource={filteredProdutos}
                renderItem={produto => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                icon={<EditOutlined />}
                                onClick={() => showEditModal(produto)}
                            >
                                Editar
                            </Button>,
                            <Button
                                type="link"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(produto.id)}
                            >
                                Excluir
                            </Button>
                        ]}
                    >
                        {produto.nome}
                    </List.Item>
                )}
            />

            {/* Modal para Adicionar/Editar */}
            <Modal
                title={isEditMode ? 'Editar Produto' : 'Adicionar Produto'}
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form>
                    <Form.Item label="Nome do Produto">
                        <Input
                            value={produtoName}
                            onChange={(e) => setProdutoName(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProdutosComponent;
