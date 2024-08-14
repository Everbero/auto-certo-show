import React from 'react';
import { Select, Card } from 'antd';

const { Option } = Select;

const OrdenarPreco = ({ setOrdenacaoPreco }) => {
    const handleChange = (value) => {
        setOrdenacaoPreco(value);
    };

    return (
        <Card>
            <h4>Ordenar por Preço</h4>
            <Select defaultValue="asc" onChange={handleChange} style={{ width: '100%' }}>
                <Option value="asc">Menor para Maior</Option>
                <Option value="desc">Maior para Menor</Option>
            </Select>
        </Card>
    );
};

export default OrdenarPreco;
