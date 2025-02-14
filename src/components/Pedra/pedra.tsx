import React from 'react';
import { MinusCircle } from 'lucide-react';
import { classes } from './styles';

interface Stone {
  stone_type: string;
  cut: string;
  quantity: number;
  quilates?: number;
  pts?: number;
  largura?: string;
  altura?: string;
  comprimento?: string;
}

interface PedraProps {
  index: number;
  stone: Stone;
  onRemove: (index: number) => void;
  onChange: (updatedStone: Stone) => void;
}

const Pedra: React.FC<PedraProps> = ({ index, stone, onRemove, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...stone,
      [name]: value,
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h4 className={classes.headerTitle}>Pedra #{index + 1}</h4>
        <button type="button" onClick={() => onRemove(index)} className={classes.removeButton}>
          <MinusCircle className="h-5 w-5" />
        </button>
      </div>

      <div>
        <div className={classes.gridMain}>
          <div>
            <label className={classes.label}>Tipo *</label>
            <input
              type="text"
              name="stone_type"
              value={stone.stone_type}
              onChange={handleChange}
              required
              className={classes.input}
            />
          </div>
          <div>
            <label className={classes.label}>Lapidação *</label>
            <select
              name="cut"
              value={stone.cut}
              onChange={handleChange}
              required
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
              name="quantity"
              min="1"
              value={stone.quantity}
              onChange={handleChange}
              required
              className={classes.input}
            />
          </div>
          <div>
            <label className={classes.label}>Quilates</label>
            <input
              type="number"
              name="quilates"
              step="0.001"
              value={stone.quilates || ''}
              onChange={handleChange}
              className={classes.input}
            />
          </div>
        </div>

        <div className={classes.gridPTS}>
          <div>
            <label className={classes.label}>PTS</label>
            <input
              type="number"
              name="pts"
              step="0.01"
              value={stone.pts || ''}
              onChange={handleChange}
              className={classes.input}
            />
          </div>
        </div>

        <div className={classes.gridDimensions}>
          <div className="md:col-span-2">
            <div className="flex space-x-4 mt-1">
              <div className={classes.halfWidth}>
                <label className={classes.label}>
                  Largura (mm){(stone.cut === 'Redonda' || stone.cut === 'Quadrada') && ' (sincronizado)'}
                </label>
                <input
                  type="number"
                  name="largura"
                  step="0.1"
                  placeholder="Largura"
                  value={stone.largura || ''}
                  onChange={handleChange}
                  className={classes.input}
                />
              </div>
              <div className={classes.halfWidth}>
                <label className={classes.label}>
                  Comprimento (mm){(stone.cut === 'Redonda' || stone.cut === 'Quadrada') && ' (sincronizado)'}
                </label>
                <input
                  type="number"
                  name="comprimento"
                  step="0.1"
                  placeholder="Comprimento"
                  value={stone.comprimento || ''}
                  onChange={handleChange}
                  className={classes.input}
                />
              </div>
            </div>
          </div>
          <div>
            <label className={classes.label}>Altura (mm)</label>
            <input
              type="number"
              name="altura"
              step="0.1"
              value={stone.altura || ''}
              onChange={handleChange}
              className={classes.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedra;