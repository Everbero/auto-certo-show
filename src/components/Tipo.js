import React from 'react';
import { Select, Typography, Card } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Tipo = ({ setTipo }) => {
    const handleChange = (value) => {
        const tipoVeiculoMap = {
            1: "CARRO",
            2: "MOTO"
        };

        setTipo({
            id: value,
            nome: tipoVeiculoMap[value],
        });
    };

    return (
        <Card>
            <Title level={4}>Tipo</Title>
            <Select
                style={{ width: '100%' }}
                placeholder="Selecione o tipo"
                onChange={handleChange}
            >
                <Option value="1">Carro</Option>
                <Option value="2">Moto</Option>
            </Select>
        </Card>
    );
};

export default Tipo;
