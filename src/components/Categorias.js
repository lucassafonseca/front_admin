import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Input, List, Select } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const CategoriasComponent = () => {
    const [categorias, setCategorias] = useState([]);
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    const [categoryName, setCategoryName] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Função para buscar as categorias da API
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categorias');
            setCategorias(response.data);
            setFilteredCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    // Função para buscar a lista de produtos da API
    const fetchProdutos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchCategorias();
        fetchProdutos();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredCategorias(
            categorias.filter(cat => cat.nome.toLowerCase().includes(value.toLowerCase()))
        );
    };

    const showModal = () => {
        setIsEditMode(false);
        setCategoryName('');
        setSelectedProducts([]);
        setIsModalVisible(true);
    };

    const showEditModal = (categoria) => {
        setIsEditMode(true);
        setSelectedCategoria(categoria);
        setCategoryName(categoria.nome);
        setSelectedProducts(categoria.produtos || []);
        setIsModalVisible(true);
    };

    const handleSave = async () => {
        try {
            const categoriaData = {
                nome: categoryName,
                produtos: selectedProducts,
            };

            if (isEditMode && selectedCategoria) {
                await axios.put(`http://localhost:8080/api/categorias/${selectedCategoria.id}`, categoriaData);
            } else {
                await axios.post('http://localhost:8080/api/categorias', categoriaData);
            }
            fetchCategorias();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Erro ao salvar a categoria:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/categorias/${id}`);
            fetchCategorias();
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
        }
    };

    return (
        <div>
            {/* Barra de Pesquisa */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Input
                    placeholder="Buscar categoria"
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
                    Adicionar Categoria
                </Button>
            </div>

            {/* Lista de Categorias */}
            <List
                bordered
                dataSource={filteredCategorias}
                renderItem={categoria => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                icon={<EditOutlined />}
                                onClick={() => showEditModal(categoria)}
                            >
                                Editar
                            </Button>,
                            <Button
                                type="link"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(categoria.id)}
                            >
                                Excluir
                            </Button>
                        ]}
                    >
                        {categoria.nome}
                    </List.Item>
                )}
            />

            {/* Modal para Adicionar/Editar */}
            <Modal
                title={isEditMode ? 'Editar Categoria' : 'Adicionar Categoria'}
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form>
                    <Form.Item label="Nome da Categoria">
                        <Input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Produtos Associados">
                        <Select
                            mode="multiple"
                            placeholder="Selecione os produtos"
                            value={selectedProducts}
                            onChange={(values) => setSelectedProducts(values)}
                            style={{ width: '100%' }}
                        >
                            {produtos.map((produto) => (
                                <Option key={produto.id} value={produto.id}>
                                    {produto.nome}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoriasComponent;
