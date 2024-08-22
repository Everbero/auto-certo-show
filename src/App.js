import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Skeleton, Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
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

const { Content } = Layout;

const App = () => {
  const [carros, setCarros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Usando react-responsive para definir breakpoints
  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });

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
        return prevFiltros;
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
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarros();
  }, []);

  const openDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          {isTabletOrBelow && (
            <>
              <Button
                type="primary"
                icon={<MenuOutlined />}
                onClick={openDrawer}
                style={{ marginBottom: "16px", display: "block" }}
              >
                Filtrar
              </Button>
              <FiltrosAtivos
                filtrosAtivos={filtrosAtivos}
                setFiltrosAtivos={setFiltrosAtivos}
              />
              <Drawer
                title="Filtros"
                placement="left"
                onClose={closeDrawer}
                visible={isDrawerVisible}
                width={300}
                closeIcon={<CloseOutlined />}
                bodyStyle={{ padding: "16px" }}
              >
                <FiltroPreco
                  setPrecoFiltro={(valor) => {
                    handleFiltroChange("precoDe", valor[0]);
                    handleFiltroChange("precoAte", valor[1]);
                  }}
                />
                <OrdenarPreco
                  setOrdenacaoPreco={(valor) =>
                    handleFiltroChange("ordenacaoPreco", valor)
                  }
                />
                <Tipo setTipo={(valor) => handleFiltroChange("tipo", valor)} />
                {filtrosAtivos.tipo && (
                  <>
                    <Marcas
                      tipo={filtrosAtivos.tipo}
                      setCodigoMarca={(valor) =>
                        handleFiltroChange("marca", valor)
                      }
                    />
                    {filtrosAtivos.marca.id && (
                      <Modelos
                        codigoMarca={filtrosAtivos.marca.id}
                        setCodigoModelo={(valor) =>
                          handleFiltroChange("modelo", valor)
                        }
                      />
                    )}
                    {filtrosAtivos.modelo && filtrosAtivos.anoAte && (
                      <Versoes
                        codigoModelo={filtrosAtivos.modelo}
                        setCodigoVersao={(valor) =>
                          handleFiltroChange("versao", valor)
                        }
                        anoModelo={filtrosAtivos.anoAte}
                      />
                    )}
                    <Combustivel
                      setCodigoCombustivel={(valor) =>
                        handleFiltroChange("combustivel", valor)
                      }
                    />
                    <Cor handleFiltroChange={handleFiltroChange} />
                    <Cambio
                      setCodigoCambio={(valor) =>
                        handleFiltroChange("cambio", valor)
                      }
                    />
                    <Opcionais
                      tipo={filtrosAtivos.tipo}
                      setCodigoOpcionais={(valor) =>
                        handleFiltroChange("opcionais", valor)
                      }
                      selectedOpcionais={filtrosAtivos.opcionais}
                      setSelectedOpcionais={(valor) =>
                        handleFiltroChange("opcionais", valor)
                      }
                    />
                  </>
                )}
              </Drawer>
            </>
          )}

          {isDesktop && (
            <Col md={8} lg={4}>
              {/* Filtros visíveis em telas maiores que tablet */}
              <div>
                <FiltroPreco
                  setPrecoFiltro={(valor) => {
                    handleFiltroChange("precoDe", valor[0]);
                    handleFiltroChange("precoAte", valor[1]);
                  }}
                />
                <OrdenarPreco
                  setOrdenacaoPreco={(valor) =>
                    handleFiltroChange("ordenacaoPreco", valor)
                  }
                />
                <Tipo setTipo={(valor) => handleFiltroChange("tipo", valor)} />
                {filtrosAtivos.tipo && (
                  <>
                    <Marcas
                      tipo={filtrosAtivos.tipo}
                      setCodigoMarca={(valor) =>
                        handleFiltroChange("marca", valor)
                      }
                    />
                    {filtrosAtivos.marca.id && (
                      <Modelos
                        codigoMarca={filtrosAtivos.marca.id}
                        setCodigoModelo={(valor) =>
                          handleFiltroChange("modelo", valor)
                        }
                      />
                    )}
                    {filtrosAtivos.modelo && filtrosAtivos.anoAte && (
                      <Versoes
                        codigoModelo={filtrosAtivos.modelo}
                        setCodigoVersao={(valor) =>
                          handleFiltroChange("versao", valor)
                        }
                        anoModelo={filtrosAtivos.anoAte}
                      />
                    )}
                    <Combustivel
                      setCodigoCombustivel={(valor) =>
                        handleFiltroChange("combustivel", valor)
                      }
                    />
                    <Cor handleFiltroChange={handleFiltroChange} />
                    <Cambio
                      setCodigoCambio={(valor) =>
                        handleFiltroChange("cambio", valor)
                      }
                    />
                    <Opcionais
                      tipo={filtrosAtivos.tipo}
                      setCodigoOpcionais={(valor) =>
                        handleFiltroChange("opcionais", valor)
                      }
                      selectedOpcionais={filtrosAtivos.opcionais}
                      setSelectedOpcionais={(valor) =>
                        handleFiltroChange("opcionais", valor)
                      }
                    />
                  </>
                )}
              </div>
            </Col>
          )}

          <Col xs={24} md={16} lg={20}>
            {isDesktop && (
              <FiltrosAtivos
                filtrosAtivos={filtrosAtivos}
                setFiltrosAtivos={setFiltrosAtivos}
              />
            )}

            <FiltroTexto
              setTextoFiltro={(valor) =>
                handleFiltroChange("textoFiltro", valor)
              }
            />

            {/* Lista de veículos ou Skeleton */}
            {isLoading ? (
              <SkeletonLoading />
            ) : (
              <Carros
                carros={carros}
                filtros={filtrosAtivos}
                ordenacaoPreco={filtrosAtivos.ordenacaoPreco}
              />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

const SkeletonLoading = () => {
  return (
    <Row gutter={[16, 16]}>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <Col key={index} xs={24} md={12} lg={8}>
          <Skeleton active />
        </Col>
      ))}
    </Row>
  );
};

export default App;
