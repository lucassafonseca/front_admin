import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Input, List } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ItensComponent = () => {
    const [itens, setItens] = useState([]);
    const [filteredItens, setFilteredItens] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [itemName, setItemName] = useState('');

    // Função para buscar os itens da API
    const fetchItens = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/itens');
            setItens(response.data);
            setFilteredItens(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };

    useEffect(() => {
        fetchItens();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredItens(
            itens.filter(item => item.nome.toLowerCase().includes(value.toLowerCase()))
        );
    };

    const showModal = () => {
        setIsEditMode(false);
        setItemName('');
        setIsModalVisible(true);
    };

    const showEditModal = (item) => {
        setIsEditMode(true);
        setSelectedItem(item);
        setItemName(item.nome);
        setIsModalVisible(true);
    };

    const handleSave = async () => {
        try {
            if (isEditMode && selectedItem) {
                await axios.put(`http://localhost:8080/api/itens/${selectedItem.id}`, { nome: itemName });
            } else {
                await axios.post('http://localhost:8080/api/itens', { nome: itemName });
            }
            fetchItens();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Erro ao salvar o item:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/itens/${id}`);
            fetchItens();
        } catch (error) {
            console.error('Erro ao excluir item:', error);
        }
    };

    return (
        <div>
            {/* Barra de Pesquisa */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Input
                    placeholder="Buscar item"
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
                    Adicionar Item
                </Button>
            </div>

            {/* Lista de Itens */}
            <List
                bordered
                dataSource={filteredItens}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                icon={<EditOutlined />}
                                onClick={() => showEditModal(item)}
                            >
                                Editar
                            </Button>,
                            <Button
                                type="link"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(item.id)}
                            >
                                Excluir
                            </Button>
                        ]}
                    >
                        {item.nome}
                    </List.Item>
                )}
            />

            {/* Modal para Adicionar/Editar */}
            <Modal
                title={isEditMode ? 'Editar Item' : 'Adicionar Item'}
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form>
                    <Form.Item label="Nome do Item">
                        <Input
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ItensComponent;
