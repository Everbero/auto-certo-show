import React, { useState, useEffect } from 'react';
import { Card, Typography, Descriptions, Row, Col, Button, Tag, Divider, Spin, Carousel, Space } from 'antd';
import { CarOutlined, CalendarOutlined, DollarOutlined, DashboardOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate substitui useHistory
// import Contato from './components/Contato';
// import SimularFinanciamento from './components/SimularFinanciamento';

const { Title, Text } = Typography;

const Veiculo = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const [carro, setCarro] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchCarro = async () => {
            try {
                const response = await fetch(`/wp-json/autocerto/v1/veiculo?codigoVeiculo=${id}`);
                const data = await response.json();
                setCarro(data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar os dados do veículo:", error);
                setLoading(false);
            }
        };

        fetchCarro();
    }, [id]);

    const handleContactSubmit = (values) => {
        console.log('Formulário de Contato Enviado:', values);
    };

    const handleFinanceSimulation = (values) => {
        console.log('Simulação de Financiamento:', values);
    };

    if (loading) {
        return <Spin tip="Carregando..." style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }} />;
    }

    if (!carro) {
        return <p>Veículo não encontrado.</p>;
    }

    return (
        <Card
            style={{ borderRadius: '8px', overflow: 'hidden', padding: '20px', maxWidth: '1200px', margin: 'auto' }}
            bodyStyle={{ padding: 0 }}
        >

            <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/listagem')}
                href={`/listagem`}
                style={{ marginBottom: 16 }}
                
            >
                Voltar para listagem
            </Button>

            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <Carousel arrows autoplay>
                        {carro.Fotos.length > 0 ? (
                            carro.Fotos.map((foto, index) => (
                                <div key={index}>
                                    <img
                                        alt={`Foto ${index + 1}`}
                                        src={foto.URL || "https://placehold.it/600x400"}
                                        style={{ width: '100%', borderRadius: '8px' }}
                                    />
                                </div>
                            ))
                        ) : (
                            <img
                                alt="Placeholder"
                                src="https://placehold.it/600x400"
                                style={{ width: '100%', borderRadius: '8px' }}
                            />
                        )}
                    </Carousel>
                </Col>

                <Col xs={24} md={12}>
                    <Title level={3}>{`${carro.Marca} ${carro.Modelo}`}</Title>
                    <Descriptions
                        column={1}
                        bordered
                        labelStyle={{ fontWeight: 'bold' }}
                        contentStyle={{ fontSize: '16px' }}
                    >
                        <Descriptions.Item label={<><CalendarOutlined /> Ano Fabricação</>}>{carro.AnoFabricacao}</Descriptions.Item>
                        <Descriptions.Item label={<><CarOutlined /> Ano Modelo</>}>{carro.AnoModelo}</Descriptions.Item>
                        <Descriptions.Item label={<><DollarOutlined /> Preço</>}>
                            <Text strong type="success" style={{ fontSize: '18px' }}>
                                R${carro.Preco.toLocaleString()}
                            </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<><DashboardOutlined /> KM</>}>{carro.Km.toLocaleString("pt-BR")} km</Descriptions.Item>
                        <Descriptions.Item label="Versão">{carro.Versao}</Descriptions.Item>
                        <Descriptions.Item label="Combustível">{carro.Combustivel}</Descriptions.Item>
                        <Descriptions.Item label="Câmbio">{carro.Cambio}</Descriptions.Item>
                        <Descriptions.Item label="Cor">{carro.Cor}</Descriptions.Item>
                        <Descriptions.Item label="Placa">{carro.Placa}</Descriptions.Item>
                        <Descriptions.Item label="Chassi">{carro.Chassi}</Descriptions.Item>
                        <Descriptions.Item label="Renavam">{carro.Renavam}</Descriptions.Item>
                        <Descriptions.Item label="Observações">{carro.Observacao || 'N/A'}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Title level={4}>Opcionais</Title>
                    {carro.Opcionais.length > 0 ? (
                        <Space size={[8, 16]} wrap>
                            {carro.Opcionais.map((item, index) => (
                                <Tag key={index} color="blue">
                                    {item.Descricao}
                                </Tag>
                            ))}
                        </Space>
                    ) : (
                        <p>Não há opcionais disponíveis para este veículo.</p>
                    )}
                </Col>
            </Row>
{/* 
            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <SimularFinanciamento onSimular={handleFinanceSimulation} valorInicial={carro.Preco} />
                </Col>
            </Row> */}

            <Divider />

            {/* <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Contato onSubmit={handleContactSubmit} />
                </Col>
            </Row> */}
        </Card>
    );
};

export default Veiculo;
