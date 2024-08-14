import React from 'react';
import { Card, Typography, Descriptions, Row, Col, Button, Tag, Divider } from 'antd';
import { CarOutlined, CalendarOutlined, DollarOutlined, DashboardOutlined } from '@ant-design/icons';
import Contato from './Contato';  // Importe o componente de Contato
import SimularFinanciamento from './SimularFinanciamento';  // Importe o componente de Simular Financiamento

const { Title } = Typography;

const DetalhesCarro = ({ carro, onBack }) => {
    if (!carro) {
        return null;
    }

    const handleContactSubmit = (values) => {
        console.log('Formulário de Contato Enviado:', values);
    };

    const handleFinanceSimulation = (values) => {
        console.log('Simulação de Financiamento:', values);
    };

    return (
        <Card
            title={<Title level={3}>{`${carro.Marca} ${carro.Modelo}`}</Title>}
            actions={[
                <Button type="dashed" onClick={onBack}>Voltar</Button>
            ]}
            style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}
        >
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <img 
                        alt="example" 
                        src={carro.Fotos[0]?.URL || "https://placehold.it/300x200"} 
                        style={{ width: '100%', borderRadius: '8px' }} 
                    />
                </Col>
                <Col xs={24} md={12}>
                    <Descriptions 
                        column={1} 
                        bordered
                        labelStyle={{ fontWeight: 'bold' }}
                    >
                        <Descriptions.Item label={<><CarOutlined /> Ano</>}>{carro.AnoModelo}</Descriptions.Item>
                        <Descriptions.Item label={<><CalendarOutlined /> Fabricação</>}>{carro.AnoFabricacao}</Descriptions.Item>
                        <Descriptions.Item label={<><DollarOutlined /> Preço</>}>R${carro.Preco}</Descriptions.Item>
                        <Descriptions.Item label={<><DashboardOutlined /> KM</>}>{carro.Km}</Descriptions.Item>
                        <Descriptions.Item label="Versão">{carro.Versao}</Descriptions.Item>
                        <Descriptions.Item label="Combustível">{carro.Combustivel}</Descriptions.Item>
                        <Descriptions.Item label="Câmbio">{carro.Cambio}</Descriptions.Item>
                        <Descriptions.Item label="Cor">{carro.Cor}</Descriptions.Item>
                        <Descriptions.Item label="Placa">{carro.Placa}</Descriptions.Item>
                        <Descriptions.Item label="Chassi">{carro.Chassi}</Descriptions.Item>
                        <Descriptions.Item label="Renavam">{carro.Renavam}</Descriptions.Item>
                        <Descriptions.Item label="Observações">{carro.Observacao}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>

            <Divider />

            <Row>
                <Col xs={24}>
                    <Title level={4}>Opcionais</Title>
                    {carro.Opcionais.length > 0 ? (
                        carro.Opcionais.map((item, index) => (
                            <Tag key={index} color="blue" style={{ marginBottom: '8px' }}>
                                {item.Descricao}
                            </Tag>
                        ))
                    ) : (
                        <p>Não há opcionais disponíveis para este veículo.</p>
                    )}
                </Col>
            </Row>

            <Divider />

            {/* Componente de Simulação de Financiamento */}
            <Row>
                <Col xs={24}>
                    <SimularFinanciamento onSimular={handleFinanceSimulation} valorInicial={carro.Preco}/>
                </Col>
            </Row>

            <Divider />

            {/* Componente de Contato */}
            <Row>
                <Col xs={24}>
                    <Contato onSubmit={handleContactSubmit} />
                </Col>
            </Row>
        </Card>
    );
};

export default DetalhesCarro;
