// src/components/FiltroTexto.js
import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const FiltroTexto = ({ setTextoFiltro }) => {
    const handleSearch = (value) => {
        setTextoFiltro(value);
    };

    return (
        <Search
            placeholder="Filtrar carros"
            onSearch={handleSearch}
            onChange={e => handleSearch(e.target.value)}
            style={{ marginBottom: 20 }}
        />
    );
};

export default FiltroTexto;
