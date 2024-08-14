import React, { useEffect, useState } from 'react';
import { Select, Typography, Card } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Cor = ({ handleFiltroChange }) => {
    const [cores, setCores] = useState([]);

    useEffect(() => {
        const fetchCores = async () => {
            try {
                const response = await fetch('/wp-json/autocerto/v1/cor', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                const data = await response.json();
                setCores(data);
            } catch (error) {
                console.error('Error fetching cores:', error);
            }
        };

        fetchCores();
    }, []);

    const handleChange = (value, option) => {
        handleFiltroChange("cor", { id: value, descricao: option.children });
    };


    return (
        <Card>
            <Title level={4}>Cores</Title>
            <Select
                style={{ width: '100%' }}
                placeholder="Selecione uma cor"
                onChange={handleChange}
            >
                {cores.map(cor => (
                    <Option key={cor.Codigo} value={cor.Codigo}>
                        {cor.Descricao}
                    </Option>
                ))}
            </Select>
        </Card>
    );
};

export default Cor;
