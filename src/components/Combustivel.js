import React, { useEffect, useState } from 'react';
import { Select, Typography, Card } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Combustivel = ({ setCodigoCombustivel }) => {
    const [combustiveis, setCombustiveis] = useState([]);

    useEffect(() => {
        const fetchCombustivel = async () => {
            try {
                const response = await fetch('/wp-json/autocerto/v1/combustivel', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                const data = await response.json();
                setCombustiveis(data);
            } catch (error) {
                console.error('Error fetching combustiveis:', error);
            }
        };

        fetchCombustivel();
    }, []);

    const handleChange = (value, option) => {
        setCodigoCombustivel({ id: value, descricao: option.children });
    };

    return (
        <Card>
            <Title level={4}>Combustíveis</Title>
            <Select
                style={{ width: '100%' }}
                placeholder="Selecione um combustível"
                onChange={handleChange}
            >
                {combustiveis.map(combustivel => (
                    <Option key={combustivel.Codigo} value={combustivel.Codigo}>
                        {combustivel.Descricao}
                    </Option>
                ))}
            </Select>
        </Card>
    );
};

export default Combustivel;
