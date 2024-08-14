import React, { useEffect, useState } from 'react';
import { Select, Typography, Card } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Cambio = ({ setCodigoCambio }) => {
    const [cambios, setCambios] = useState([]);

    useEffect(() => {
        const fetchCambios = async () => {
            try {
                const response = await fetch('/wp-json/autocerto/v1/cambio', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                const data = await response.json();
                setCambios(data);
            } catch (error) {
                console.error('Error fetching cambios:', error);
            }
        };

        fetchCambios();
    }, []);

    const handleChange = (value, option) => {
        setCodigoCambio({ id: value, descricao: option.children });
    };

    return (
        <Card>
            <Title level={4}>Câmbios</Title>
            <Select
                style={{ width: '100%' }}
                placeholder="Selecione um câmbio"
                onChange={handleChange}
            >
                {cambios.map(cambio => (
                    <Option key={cambio.Codigo} value={cambio.Codigo}>
                        {cambio.Descricao}
                    </Option>
                ))}
            </Select>
        </Card>
    );
};

export default Cambio;
