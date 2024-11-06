import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, List, Select } from 'antd';

const { Option } = Select;

const PedidosComponent = ({ fetchPedidos }) => {
  const [pedidos, setPedidos] = useState([]);

  // Função para buscar pedidos da API
  const fetchPedidosFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  // Função para atualizar o status do pedido
  const updatePedidoStatus = async (pedidoId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/pedidos/${pedidoId}`, { status: newStatus });
      fetchPedidosFromAPI();
      fetchPedidos(); // Recarrega a lista de pedidos na App.js
    } catch (error) {
      console.error('Erro ao atualizar o status do pedido:', error);
    }
  };

  useEffect(() => {
    fetchPedidosFromAPI();
  }, []);

  return (
    <div>
      <List
        bordered
        dataSource={pedidos}
        renderItem={pedido => (
          <List.Item
            actions={[
              <Select
                defaultValue={pedido.status}
                onChange={(value) => updatePedidoStatus(pedido.id, value)}
                style={{ width: 120 }}
              >
                <Option value="Pendente">Pendente</Option>
                <Option value="Em Preparo">Em Preparo</Option>
                <Option value="Pronto">Pronto</Option>
                <Option value="Finalizado">Finalizado</Option>
              </Select>,
              <Button type="primary">
                Imprimir Nota
              </Button>
            ]}
          >
            Pedido #{pedido.id} - {pedido.nomeCliente}
          </List.Item>
        )}
      />
    </div>
  );
};

export default PedidosComponent;
