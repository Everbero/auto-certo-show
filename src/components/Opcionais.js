import React, { useEffect, useState } from 'react';
import { Select, Typography, Card } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Opcionais = ({ setCodigoOpcional, selectedOpcionais, setSelectedOpcionais }) => {
    const [opcionais, setOpcionais] = useState([]);

    useEffect(() => {
        const fetchOpcionais = async () => {
            try {
                const response = await fetch('/wp-json/autocerto/v1/opcionais', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                const data = await response.json();
                setOpcionais(data);
            } catch (error) {
                console.error('Error fetching opcionais:', error);
            }
        };

        fetchOpcionais();
    }, []);

    const handleChange = (value) => {
        setSelectedOpcionais(value);
    };

    return (
        <Card>
            <Title level={4}>Opcionais</Title>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Selecione opcionais"
                onChange={handleChange}
                value={selectedOpcionais}
            >
                {opcionais && opcionais.map(opcional => (
                    <Option key={opcional.Codigo} value={opcional.Codigo}>
                        {opcional.Descricao}
                    </Option>
                ))}
            </Select>
        </Card>
    );
};

export default Opcionais;
