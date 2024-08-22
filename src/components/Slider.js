import React, { useState, useEffect, useRef } from "react";
import { Badge, Card, Typography, Button, Carousel } from "antd";
import {
  CarOutlined,
  DollarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import DetalhesCarro from "./DetalhesCarro";
import { useMediaQuery } from "react-responsive";

const { Title } = Typography;
const { Meta } = Card;

const CarSlider = ({ carros, filtros, ordenacaoPreco }) => {
  const [selectedCarro, setSelectedCarro] = useState(null);
  const [filtrosAplicados, setFiltrosAplicados] = useState(false);
  const prevFiltros = useRef(filtros);
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });

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
        slidesToShow={isDesktop ? 3 : 1}
      >
        {filteredCarros.map((carro) => (
          <a key={carro.Codigo} href={`/veiculo/?id=${carro.Codigo}`}>
            <Badge.Ribbon
              text={carro.Combustivel}
              style={{ marginRight: 15 }}
            >
              <Card
                style={{ margin: "10px 15px 10px 0" }}
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
                <Meta
                  title={`${carro.Marca} ${carro.Modelo}`}
                  description={carro.Versao}
                />

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
            </Badge.Ribbon>
          </a>
        ))}
      </Carousel>
    </div>
  );
};

export default CarSlider;
