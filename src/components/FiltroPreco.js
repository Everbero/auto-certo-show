import React from 'react';
import { Select, Card } from 'antd';

const { Option } = Select;

const FiltroPreco = ({ setPrecoFiltro }) => {
    const handleChange = (value) => {
        const parsedValue = JSON.parse(value);
        setPrecoFiltro(parsedValue);
    };

    return (
        <Card>
            <h4>Filtrar por Preço</h4>
            <Select defaultValue={JSON.stringify([0, 1000000])} onChange={handleChange} style={{ width: '100%' }}>
                <Option value={JSON.stringify([0, 50000])}>0 a 50k</Option>
                <Option value={JSON.stringify([0, 100000])}>0 a 100k</Option>
                <Option value={JSON.stringify([0, 200000])}>0 a 200k</Option>
                <Option value={JSON.stringify([0, 300000])}>0 a 300k</Option>
                <Option value={JSON.stringify([0, 500000])}>0 a 500k</Option>
                <Option value={JSON.stringify([0, 1000000])}>0 a 1M+</Option>
            </Select>
        </Card>
    );
};

export default FiltroPreco;
