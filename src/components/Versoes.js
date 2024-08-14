import React, { useEffect, useState } from 'react';
import { Select, Typography, Card } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Versoes = ({ codigoModelo, anoModelo, setCodigoVersao }) => {
    const [versoes, setVersoes] = useState([]);

    useEffect(() => {
        if (!codigoModelo || !anoModelo) return;

        const fetchVersoes = async () => {
            try {
                const response = await fetch(`/wp-json/autocerto/v1/versoes?codigoModelo=${codigoModelo}&anoModelo=${anoModelo}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                });

                const data = await response.json();
                setVersoes(data);
            } catch (error) {
                console.error('Error fetching versoes:', error);
            }
        };

        fetchVersoes();
    }, [codigoModelo, anoModelo]);

    const handleChange = (value) => {
        setCodigoVersao(value);
    };

    return (
        <Card>
            <Title level={4}>Versões</Title>
            <Select
                style={{ width: '100%' }}
                placeholder="Selecione uma versão"
                onChange={handleChange}
            >
                {versoes.map(versao => (
                    <Option key={versao.Codigo} value={versao.Codigo}>
                        {versao.Descricao}
                    </Option>
                ))}
            </Select>
        </Card>
    );
};

export default Versoes;
