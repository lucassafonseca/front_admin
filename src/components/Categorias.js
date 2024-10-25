import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Para chamadas de API
import { Modal, Button, Form, Input, List } from 'antd'; // Biblioteca UI, pode ser outra
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoriaComponent = () => {
    const [categorias, setCategorias] = useState([]);
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Para saber se estamos editando
    const [selectedCategoria, setSelectedCategoria] = useState(null); // Categoria a ser editada

    // Dados para o form de adicionar/editar
    const [categoriaName, setCategoriaName] = useState('');

    // Função para buscar as categorias da API
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('/api/categorias');
            setCategorias(response.data);
            setFilteredCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    useEffect(() => {
        fetchCategorias(); // Carrega as categorias ao montar o componente
    }, []);

    // Função para pesquisar por nome
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredCategorias(
            categorias.filter(categoria => categoria.nome.toLowerCase().includes(value.toLowerCase()))
        );
    };

    // Função para abrir o modal de adicionar categoria
    const showModal = () => {
        setIsEditMode(false);
        setCategoriaName('');
        setIsModalVisible(true);
    };

    // Função para abrir o modal de editar categoria
    const showEditModal = (categoria) => {
        setIsEditMode(true);
        setSelectedCategoria(categoria);
        setCategoriaName(categoria.nome);
        setIsModalVisible(true);
    };

    // Função para adicionar ou editar a categoria
    const handleSave = async () => {
        try {
            if (isEditMode && selectedCategoria) {
                await axios.put(`/api/categorias/${selectedCategoria.id}`, { nome: categoriaName });
            } else {
                await axios.post('/api/categorias', { nome: categoriaName });
            }
            fetchCategorias(); // Atualiza as categorias após a operação
            setIsModalVisible(false); // Fecha o modal
        } catch (error) {
            console.error('Erro ao salvar a categoria:', error);
        }
    };

    // Função para excluir uma categoria
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/categorias/${id}`);
            fetchCategorias(); // Atualiza as categorias após excluir
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
        }
    };

    return (
        <div>
            {/* Barra de pesquisa */}
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
                            value={categoriaName}
                            onChange={(e) => setCategoriaName(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoriaComponent;
