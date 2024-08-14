import React, { useState } from 'react';
import { Card, Form, InputNumber, Button, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const SimularFinanciamento = ({ onSimular, valorInicial }) => {
    const [form] = Form.useForm();
    const [resultado, setResultado] = useState(null);

    const handleFinish = (values) => {
        const { preco, entrada, parcelas, juros } = values;
        const valorFinanciado = preco - entrada;
        const valorParcela = valorFinanciado * ((juros / 100) / (1 - Math.pow(1 + (juros / 100), -parcelas)));

        const resultadoSimulacao = {
            ...values,
            valorParcela: valorParcela.toFixed(2),
            valorTotal: (valorParcela * parcelas).toFixed(2),
            valorFinanciado: valorFinanciado.toFixed(2),
        };

        setResultado(resultadoSimulacao);

        if (onSimular) {
            onSimular(resultadoSimulacao);
        }
    };

    return (
        <Card
            title="Simular Financiamento"
            bordered
            style={{ borderRadius: '8px', overflow: 'hidden' }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={valorInicial}
            >
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="preco"
                            label="Preço do Veículo"
                            rules={[{ required: true, message: 'Por favor, insira o preço do veículo' }]}
                        >
                            <InputNumber 
                                style={{ width: '100%' }} 
                                min={0}
                                formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\R\$\s?|(,*)/g, '')}
                                placeholder="Ex: 50000" 
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="entrada"
                            label="Entrada"
                            rules={[{ required: true, message: 'Por favor, insira o valor da entrada' }]}
                        >
                            <InputNumber 
                                style={{ width: '100%' }} 
                                min={0} 
                                formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\R\$\s?|(,*)/g, '')}
                                placeholder="Ex: 10000" 
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="parcelas"
                            label="Número de Parcelas"
                            rules={[{ required: true, message: 'Por favor, insira o número de parcelas' }]}
                        >
                            <InputNumber 
                                style={{ width: '100%' }} 
                                min={1} 
                                placeholder="Ex: 36" 
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="juros"
                            label="Taxa de Juros (%)"
                            rules={[{ required: true, message: 'Por favor, insira a taxa de juros' }]}
                        >
                            <InputNumber 
                                style={{ width: '100%' }} 
                                min={0} 
                                max={100}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                placeholder="Ex: 5" 
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Simular
                    </Button>
                </Form.Item>
            </Form>

            {resultado && (
                <div style={{ marginTop: '20px' }}>
                    <Title level={4}>Resultado da Simulação</Title>
                    <Text strong>Valor Financiado: </Text><Text>R$ {resultado.valorFinanciado}</Text><br />
                    <Text strong>Valor da Parcela: </Text><Text>R$ {resultado.valorParcela} em {resultado.parcelas}x</Text><br />
                    <Text strong>Valor Total a Pagar: </Text><Text>R$ {resultado.valorTotal}</Text>
                </div>
            )}
        </Card>
    );
};

export default SimularFinanciamento;
