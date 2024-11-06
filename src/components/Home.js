import React, { useState, useEffect } from 'react';
import { Typography, Switch } from 'antd';

const { Text } = Typography;

const HomeComponent = () => {
    const [isOpen, setIsOpen] = useState(() => {
        // Obtém o status inicial do localStorage, padrão como fechado (false)
        return JSON.parse(localStorage.getItem('isOpen')) || false;
    });

    useEffect(() => {
        // Salva o estado atual no localStorage sempre que ele muda
        localStorage.setItem('isOpen', JSON.stringify(isOpen));
    }, [isOpen]);

    // Handler para alternar o status
    const handleToggle = (checked) => {
        setIsOpen(checked);
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <Text style={{ fontSize: '24px', marginBottom: '20px' }}>
                Status do Estabelecimento
            </Text>
            <div style={{ marginTop: '20px' }}>
                <Switch
                    checked={isOpen}
                    onChange={handleToggle}
                    checkedChildren="Aberto"
                    unCheckedChildren="Fechado"
                />
            </div>
            <Text style={{ fontSize: '16px', marginTop: '10px', display: 'block' }}>
                O estabelecimento está atualmente <strong>{isOpen ? 'Aberto' : 'Fechado'}</strong>.
            </Text>
        </div>
    );
};

export default HomeComponent;
