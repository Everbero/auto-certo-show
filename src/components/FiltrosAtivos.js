import React from "react";
import { Tag, Button } from "antd";

const FiltrosAtivos = ({ filtrosAtivos, setFiltrosAtivos }) => {
  const handleClearFilters = () => {
    setFiltrosAtivos({
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
  };

  const isNotDefaultValue = (filtro, valor) => {
    switch (filtro) {
      case "tipo":
      case "marca":
      case "modelo":
      case "versao":
      case "combustivel":
      case "cor":
      case "cambio":
        return valor.id !== null && valor.descricao !== "";
      case "anoDe":
      case "anoAte":
      case "precoDe":
      case "precoAte":
        return valor !== null;
      case "opcionais":
        return Array.isArray(valor) && valor.length > 0;
      case "textoFiltro":
        return valor !== "";
      default:
        return false;
    }
  };

  return (
    <>
      {filtrosAtivos && (
        <div style={{ marginBottom: "16px" }}>
          {Object.entries(filtrosAtivos).map(([filtro, valor]) => {
            if (isNotDefaultValue(filtro, valor)) {
              let label = "";

              switch (filtro) {
                case "tipo":
                  label = valor?.nome || "Tipo";
                  break;
                case "marca":
                  label = valor?.descricao || "Marca";
                  break;
                case "modelo":
                  label = valor?.descricao || "Modelo";
                  break;
                case "versao":
                  label = valor?.descricao || "Versão";
                  break;
                case "anoDe":
                  label = `Ano De: ${valor}`;
                  break;
                case "anoAte":
                  label = `Ano Até: ${valor}`;
                  break;
                case "precoDe":
                  label = `Preço De: ${valor}`;
                  break;
                case "precoAte":
                  label = `Preço Até: ${valor}`;
                  break;
                case "combustivel":
                  label = `Combustível: ${valor.descricao}`;
                  break;
                case "cor":
                  label = `Cor: ${valor.descricao}`;
                  break;
                case "cambio":
                  label = `Câmbio: ${valor.descricao}`;
                  break;
                case "opcionais":
                  label = `Opcionais: ${valor.join(", ")}`;
                  break;
                case "textoFiltro":
                  label = `Busca: ${valor}`;
                  break;
                default:
                  break;
              }

              return (
                <Tag
                  key={filtro}
                  closable
                  onClose={() =>
                    setFiltrosAtivos({ ...filtrosAtivos, [filtro]: null })
                  }
                  style={{ marginBottom: "8px" }}
                >
                  {label} ✕
                </Tag>
              );
            }
            return null;
          })}
          <Button
            type="primary"
            onClick={handleClearFilters}
            style={{ marginLeft: "8px" }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </>
  );
};

export default FiltrosAtivos;
