import React, { useState, useEffect } from "react";
import Marcas from "./components/Marcas";
import Modelos from "./components/Modelos";
import Versoes from "./components/Versoes";
import Combustivel from "./components/Combustivel";
import Cor from "./components/Cor";
import Cambio from "./components/Cambio";
import Opcionais from "./components/Opcionais";
import Tipo from "./components/Tipo";
import Carros from "./components/Carros";
import FiltroTexto from "./components/FiltroTexto";
import FiltroPreco from "./components/FiltroPreco";
import OrdenarPreco from "./components/OrdenarPreco";
import FiltrosAtivos from "./components/FiltrosAtivos";
import { Layout, Row, Col } from "antd";
import CarSlider from "./components/Slider";
const { Content } = Layout;

const Slideshow = () => {
  const [carros, setCarros] = useState([]);
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    tipo: { id: null, nome: "" },
    marca: { id: null, descricao: "" },
    modelo: { id: null, descricao: "" },
    versao: { id: null, descricao: "" },
    anoDe: null,
    anoAte: null,
    precoDe: null,
    precoAte: null,
    combustivel: { id: null, descricao: "" },
    cor: { id: null, descricao: "" },
    cambio: { id: null, descricao: "" },
    opcionais: [],
    textoFiltro: "",
    ordenacaoPreco: "asc",
  });

  const handleFiltroChange = (filtro, valor) => {
    setFiltrosAtivos((prevFiltros) => {
      if (prevFiltros[filtro] === valor) {
        return prevFiltros; // Evita atualização se o valor não mudou
      }
      return {
        ...prevFiltros,
        [filtro]: valor,
      };
    });
  };

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const response = await fetch("/wp-json/autocerto/v1/estoque", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });

        const data = await response.json();

        setCarros(data);
      } catch (error) {
        console.error("Error fetching carros:", error);
      }
    };

    fetchCarros();
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          <CarSlider
            carros={carros}
            filtros={filtrosAtivos}
            ordenacaoPreco={filtrosAtivos.ordenacaoPreco}
          />
        </Row>
      </Content>
    </Layout>
  );
};

export default Slideshow;
