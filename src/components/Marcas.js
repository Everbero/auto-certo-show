import React, { useEffect, useState } from 'react';
import { Select, Typography, Card } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Marcas = ({ tipo, setCodigoMarca }) => {
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        if (!tipo.id) return;

        const fetchMarcas = async () => {
            try {
                const response = await fetch(`/wp-json/autocerto/v1/marcas?tipo=${+tipo.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                const data = await response.json();
                setMarcas(data);
            } catch (error) {
                console.error('Error fetching marcas:', error);
            }
        };

        fetchMarcas();
    }, [tipo]);

    const handleChange = (value, option) => {
        setCodigoMarca({ id: value, descricao: option.children });
    };

    return (
        <Card>
            <Title level={4}>Marcas</Title>
            <Select
                style={{ width: '100%' }}
                placeholder="Selecione uma marca"
                onChange={handleChange}
            >
                {marcas.map(marca => (
                    <Option key={marca.Codigo} value={marca.Codigo}>
                        {marca.Descricao}
                    </Option>
                ))}
            </Select>
        </Card>
    );
};

export default Marcas;
