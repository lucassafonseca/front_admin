import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

const PedidosComponent = () => {
    const [pedidos, setPedidos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Função para buscar os pedidos do backend
    const fetchPedidos = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/pedidos');
            setPedidos(response.data);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Polling para verificar novos pedidos a cada 10 segundos
    useEffect(() => {
        fetchPedidos();
        const interval = setInterval(fetchPedidos, 10000); // 10 segundos
        return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
    }, []);

    // Função para imprimir o pedido
    const handlePrint = (pedido) => {
        // Aqui você pode personalizar a lógica de impressão
        // Por exemplo, abrir uma nova janela com o pedido formatado ou gerar um PDF
        console.log('Imprimindo pedido:', pedido);
        window.print(); // Simplesmente abre a interface de impressão
    };

    return (
        <div>
            <h2>Lista de Pedidos</h2>

            {/* Lista de Pedidos */}
            <List
                loading={isLoading}
                bordered
                dataSource={pedidos}
                renderItem={pedido => (
                    <List.Item
                        actions={[
                            <Button
                                type="primary"
                                icon={<PrinterOutlined />}
                                onClick={() => handlePrint(pedido)}
                            >
                                Imprimir Nota
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={`Pedido #${pedido.id}`}
                            description={`Cliente: ${pedido.cliente} | Total: R$${pedido.total}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PedidosComponent;
