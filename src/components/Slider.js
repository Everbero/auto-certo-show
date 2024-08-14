import React, { useState, useEffect, useRef } from "react";
import { Badge, Card, Typography, Button, Carousel } from "antd";
import {
  CarOutlined,
  DollarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import DetalhesCarro from "./DetalhesCarro";

const { Title } = Typography;
const { Meta } = Card;

const CarSlider = ({ carros, filtros, ordenacaoPreco }) => {
  const [selectedCarro, setSelectedCarro] = useState(null);
  const [filtrosAplicados, setFiltrosAplicados] = useState(false);
  const prevFiltros = useRef(filtros);

  useEffect(() => {
    if (prevFiltros.current !== filtros) {
      const filtrosAlterados = Object.keys(filtros).some(
        (key) => filtros[key] !== prevFiltros.current[key]
      );

      if (filtrosAlterados) {
        setFiltrosAplicados(true);
        prevFiltros.current = filtros; // Atualiza os filtros anteriores
      }
    }
  }, [filtros]);

  const filterCarros = (carro, filtros) => {
    if (!filtrosAplicados) return true;

    if (filtros.tipo?.id !== null && carro.TipoVeiculo !== filtros.tipo.nome) return false;
    if (filtros.marca?.id !== null && carro.CodigoMarca !== +filtros.marca.id) return false;
    if (filtros.modelo?.id !== null && carro.CodigoModelo !== +filtros.modelo.id) return false;
    if (filtros.precoDe !== null && carro.Preco < filtros.precoDe) return false;
    if (filtros.precoAte !== null && carro.Preco > filtros.precoAte) return false;
    if (filtros.combustivel?.id !== null && carro.Combustivel !== filtros.combustivel.descricao) return false;
    if (filtros.cor?.id !== null && carro.Cor !== filtros.cor.descricao) return false;
    if (filtros.cambio?.id !== null && carro.Cambio !== filtros.cambio.descricao) return false;
    if (filtros.opcionais.length > 0 && !filtros.opcionais.every((opcional) => carro.Opcionais.includes(opcional))) return false;

    if (filtros.textoFiltro) {
      const textoFiltroLower = filtros.textoFiltro.toLowerCase();
      const camposParaPesquisar = ["Marca", "Modelo", "Versao", "Combustivel", "Cor"];

      const encontrou = camposParaPesquisar.some((campo) => {
        return (
          carro[campo] && carro[campo].toLowerCase().includes(textoFiltroLower)
        );
      });

      if (!encontrou) return false;
    }

    return true;
  };

  const filteredCarros = carros
    .filter((carro) => filterCarros(carro, filtros))
    .sort((a, b) =>
      ordenacaoPreco === "asc" ? a.Preco - b.Preco : b.Preco - a.Preco
    );

  if (selectedCarro) {
    return (
      <DetalhesCarro
        carro={selectedCarro}
        onBack={() => setSelectedCarro(null)}
      />
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Carousel arrows autoplay slidesToShow={3} style={{background: '#364d79', padding: 20}}>
        {filteredCarros.map((carro) => (
          <div key={carro.Codigo} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card
              style={{ width: 300 }}
              bordered={true}
              hoverable={true}
              cover={<img alt="example" src="https://placehold.it/300x200" />}
              actions={[
                <Button
                  type="link"
                  href={`/veiculo/?id=${carro.Codigo}`}>Detalhes
                </Button>
              ]}
            >
              <Badge.Ribbon text={carro.Combustivel}>
                <Meta
                  title={`${carro.Marca} ${carro.Modelo}`}
                  description={carro.Versao}
                />
              </Badge.Ribbon>
              <div>
                <p>
                  <CarOutlined /> {carro.AnoFabricacao}/{carro.AnoModelo}{" "}
                  <DashboardOutlined /> {carro.Km.toLocaleString("pt-BR")} km
                </p>
                <p>
                  <DollarOutlined />{" "}
                  {carro.Preco > 0
                    ? carro.Preco.toLocaleString("pt-BR")
                    : "Consulte-nos"}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarSlider;
