import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Input, List, Select, Upload } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProdutosComponent = () => {
    const [produtos, setProdutos] = useState([]);
    const [filteredProdutos, setFilteredProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);
    const [produtoName, setProdutoName] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [selectedItens, setSelectedItens] = useState([]);
    const [imagem, setImagem] = useState(null);
    const [itensDisponiveis, setItensDisponiveis] = useState([]); // Lista de itens disponíveis

    // Função para buscar produtos
    const fetchProdutos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/produtos');
            setProdutos(response.data);
            setFilteredProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    // Função para buscar itens adicionais disponíveis
    const fetchItensDisponiveis = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/itens');
            setItensDisponiveis(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens adicionais:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
        fetchItensDisponiveis();
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
        setDescricao('');
        setPreco('');
        setSelectedItens([]);
        setImagem(null);
        setIsModalVisible(true);
    };

    const showEditModal = (produto) => {
        setIsEditMode(true);
        setSelectedProduto(produto);
        setProdutoName(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setSelectedItens(produto.itens || []);
        setImagem(produto.imagem || null);
        setIsModalVisible(true);
    };

    const handleSave = async () => {
        try {
            const produtoData = {
                nome: produtoName,
                descricao,
                preco,
                itens: selectedItens,
                imagem,
            };

            if (isEditMode && selectedProduto) {
                await axios.put(`http://localhost:8080/api/produtos/${selectedProduto.id}`, produtoData);
            } else {
                await axios.post('http://localhost:8080/api/produtos', produtoData);
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

    const handleFileChange = (info) => {
        if (info.file.status === 'done') {
            setImagem(info.file.response.url); // URL do upload, ajuste conforme necessário
        }
    };

    return (
        <div>
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

            <Modal
                title={isEditMode ? 'Editar Produto' : 'Adicionar Produto'}
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Nome do Produto">
                        <Input
                            value={produtoName}
                            onChange={(e) => setProdutoName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Descrição">
                        <Input.TextArea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Preço">
                        <Input
                            type="number"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Itens Adicionais">
                        <Select
                            mode="multiple"
                            placeholder="Selecione os itens adicionais"
                            value={selectedItens}
                            onChange={(value) => setSelectedItens(value)}
                            style={{ width: '100%' }}
                        >
                            {itensDisponiveis.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.nome}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Imagem">
                        <Upload
                            name="file"
                            listType="picture"
                            onChange={handleFileChange}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProdutosComponent;
