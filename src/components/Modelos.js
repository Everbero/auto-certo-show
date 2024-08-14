import React, { useEffect, useState } from 'react';
import { Select, Typography, Card } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Modelos = ({ codigoMarca, setCodigoModelo }) => {
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        if (!codigoMarca) return;
        
        const fetchModelos = async () => {
            try {
                const response = await fetch(`/wp-json/autocerto/v1/modelos?codigoMarca=${codigoMarca}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                const data = await response.json();
                setModelos(data);
            } catch (error) {
                console.error('Error fetching modelos:', error);
            }
        };

        fetchModelos();
    }, [codigoMarca]);

    const handleChange = (value, option) => {
        setCodigoModelo({ id: value, descricao: option.children });
    };

    return (
        <Card>
            <Title level={4}>Modelos</Title>
            <Select
                style={{ width: '100%' }}
                placeholder="Selecione um modelo"
                onChange={handleChange}
            >
                {modelos.map(modelo => (
                    <Option key={modelo.Codigo} value={modelo.Codigo}>
                        {modelo.Descricao}
                    </Option>
                ))}
            </Select>
        </Card>
    );
};

export default Modelos;
