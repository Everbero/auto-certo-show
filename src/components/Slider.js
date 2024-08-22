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

    if (filtros.tipo?.id !== null && carro.TipoVeiculo !== filtros.tipo.nome)
      return false;
    if (filtros.marca?.id !== null && carro.CodigoMarca !== +filtros.marca.id)
      return false;
    if (
      filtros.modelo?.id !== null &&
      carro.CodigoModelo !== +filtros.modelo.id
    )
      return false;
    if (filtros.precoDe !== null && carro.Preco < filtros.precoDe) return false;
    if (filtros.precoAte !== null && carro.Preco > filtros.precoAte)
      return false;
    if (
      filtros.combustivel?.id !== null &&
      carro.Combustivel !== filtros.combustivel.descricao
    )
      return false;
    if (filtros.cor?.id !== null && carro.Cor !== filtros.cor.descricao)
      return false;
    if (
      filtros.cambio?.id !== null &&
      carro.Cambio !== filtros.cambio.descricao
    )
      return false;
    if (
      filtros.opcionais.length > 0 &&
      !filtros.opcionais.every((opcional) => carro.Opcionais.includes(opcional))
    )
      return false;

    if (filtros.textoFiltro) {
      const textoFiltroLower = filtros.textoFiltro.toLowerCase();
      const camposParaPesquisar = [
        "Marca",
        "Modelo",
        "Versao",
        "Combustivel",
        "Cor",
      ];

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
      <Carousel
        arrows
        autoplay
        style={{ background: "#364d79", padding: 20 }}
        responsive={[
          {
            breakpoint: 768, // Tamanho máximo da tela para 1 slide
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1024, // Tamanho máximo da tela para 2 slides
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: Infinity, // Padrão para telas maiores
            settings: {
              slidesToShow: 3,
            },
          },
        ]}
      >
        {filteredCarros.map((carro) => (
          <div
            key={carro.Codigo}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <a href={`/veiculo/?id=${carro.Codigo}`}>
              <Card
                style={{ width: 300 }}
                bordered={true}
                hoverable={true}
                cover={
                  carro.Fotos.length > 0 ? (
                    <img
                      alt={`Foto 1`}
                      src={carro.Fotos[0].URL}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  ) : (
                    <img
                      alt="Placeholder"
                      src="https://placehold.it/600x400"
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  )
                }
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
            </a>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarSlider;
