// pedras.tsx

import React from 'react';
import { MinusCircle } from 'lucide-react';
import { classes, usePedraLogic } from './styles';

// Interface das props do componente
interface PedraProps {
  index: number;
  onRemove: (index: number) => void;
}

/**
 * Componente Pedra: renderiza o formulário de cadastro da pedra (ou o resumo salvo).
 * A lógica e as classes de estilo são importadas do arquivo styles.ts.
 */
const Pedra: React.FC<PedraProps> = ({ index, onRemove }) => {
  // Obtém os estados, handlers e a string de dimensões do hook
  const {
    tipo,
    lapidacao,
    quantidade,
    quilates,
    largura,
    altura,
    comprimento,
    pts,
    saved,
    handleTipoChange,
    handleLapidacaoChange,
    handleQuantidadeChange,
    handleQuilatesChange,
    handlePtsChange,
    handleLarguraChange,
    handleComprimentoChange,
    handleAlturaChange,
    handleSave,
    dimensionsWithUnit,
  } = usePedraLogic();

  return (
    <div className={classes.container}>
      {/* Cabeçalho: Exibe o número da pedra e um botão para removê-la */}
      <div className={classes.header}>
        <h4 className={classes.headerTitle}>Pedra #{index + 1}</h4>
        <button type="button" onClick={() => onRemove(index)} className={classes.removeButton}>
          <MinusCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Renderização condicional: exibe o formulário ou o resumo salvo */}
      {!saved ? (
        <div>
          {/* Bloco principal: Tipo, Lapidação, Quantidade e Quilates */}
          <div className={classes.gridMain}>
            <div>
              <label className={classes.label}>Tipo *</label>
              <input
                type="text"
                required
                value={tipo}
                onChange={handleTipoChange}
                className={classes.input}
              />
            </div>
            <div>
              <label className={classes.label}>Lapidação *</label>
              <select
                required
                value={lapidacao}
                onChange={handleLapidacaoChange}
                className={classes.input}
              >
                <option value="Redonda">Redonda</option>
                <option value="Quadrada">Quadrada</option>
                <option value="Oval">Oval</option>
                <option value="Gota">Gota</option>
                <option value="Navete">Navete</option>
                <option value="Esmeralda">Esmeralda</option>
                <option value="Princesa">Princesa</option>
                <option value="Almofada">Esmeralda quadrada</option>
                <option value="Outra">Outra</option>
              </select>
            </div>
            <div>
              <label className={classes.label}>Quantidade *</label>
              <input
                type="number"
                min="1"
                required
                value={quantidade}
                onChange={handleQuantidadeChange}
                className={classes.input}
              />
            </div>
            <div>
              <label className={classes.label}>Quilates</label>
              <input
                type="number"
                step="0.001"
                value={quilates}
                onChange={handleQuilatesChange}
                className={classes.input}
              />
            </div>
          </div>

          {/* Campo PTS */}
          <div className={classes.gridPTS}>
            <div>
              <label className={classes.label}>PTS</label>
              <input
                type="number"
                step="0.01"
                value={pts}
                onChange={handlePtsChange}
                className={classes.input}
              />
            </div>
          </div>

          {/* Seção de dimensões: Largura, Comprimento e Altura */}
          <div className={classes.gridDimensions}>
            <div className="md:col-span-2">
              <div className="flex space-x-4 mt-1">
                <div className={classes.halfWidth}>
                  <label className={classes.label}>
                    Largura (mm){(lapidacao === 'Redonda' || lapidacao === 'Quadrada') && ' (sincronizado)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Largura"
                    value={largura}
                    onChange={handleLarguraChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.halfWidth}>
                  <label className={classes.label}>
                    Comprimento (mm){(lapidacao === 'Redonda' || lapidacao === 'Quadrada') && ' (sincronizado)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Comprimento"
                    value={comprimento}
                    onChange={handleComprimentoChange}
                    className={classes.input}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className={classes.label}>Altura (mm)</label>
              <input
                type="number"
                step="0.1"
                value={altura}
                onChange={handleAlturaChange}
                className={classes.input}
              />
            </div>
          </div>

          {/* Botão para salvar os dados da pedra */}
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={handleSave} className={classes.saveButton}>
              Salvar Pedra
            </button>
          </div>
        </div>
      ) : (
        // Resumo dos dados salvos
        <div className={classes.summaryContainer}>
          <h4 className={classes.summaryTitle}>{tipo}</h4>
          {dimensionsWithUnit && <p className={classes.summaryText}>{dimensionsWithUnit}</p>}
          {quantidade && <p className={classes.summaryText}>Quantidade: {quantidade}</p>}
          {pts && <p className={classes.summaryText}>PTS: {pts}</p>}
          {lapidacao && <p className={classes.summaryText}>Lapidação: {lapidacao}</p>}
          {quilates && <p className={classes.summaryText}>Quilates: {quilates}</p>}
        </div>
      )}
    </div>
  );
};

export default Pedra;
