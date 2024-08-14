import React from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';

const Contato = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        if (onSubmit) {
            onSubmit(values);
        }
    };

    return (
        <Card
            title="Entre em Contato"
            bordered
            style={{ borderRadius: '8px', overflow: 'hidden' }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="nome"
                            label="Nome"
                            rules={[{ required: true, message: 'Por favor, insira seu nome' }]}
                        >
                            <Input placeholder="Seu nome completo" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[{ required: true, message: 'Por favor, insira seu e-mail' }]}
                        >
                            <Input type="email" placeholder="seuemail@dominio.com" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="telefone"
                            label="Telefone"
                            rules={[{ required: true, message: 'Por favor, insira seu telefone' }]}
                        >
                            <Input placeholder="(00) 12345-6789" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="mensagem"
                    label="Mensagem"
                    rules={[{ required: true, message: 'Por favor, insira sua mensagem' }]}
                >
                    <Input.TextArea rows={4} placeholder="Sua mensagem" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Contato;
