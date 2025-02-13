import React, { useState } from 'react';
import { PlusCircle, Upload } from 'lucide-react';
import { supabase } from '../config/supabase';
import Pedra from '../Pedra/pedra'; // Importa o componente de pedra
import {
  formContainer,
  formTitle,
  formGrid,
  inputLabel,
  inputField,
  selectField,
  stoneSection,
  stoneHeader,
  stoneTitle,
  addStoneButton,
  textAreaField,
  actionButtonsContainer,
  cancelButton,
  submitButton,
} from './styles';

interface JewelryFormData {
  reference_name: string;
  category: string;
  weight: number | null;
  finish: string;
  size: string;
  designer: string;
  target_audience: string;
  client_name: string;
  observations: string;
}

export default function JewelryForm() {
  const [formData, setFormData] = useState<JewelryFormData>({
    reference_name: '',
    category: '',
    weight: null,
    finish: '',
    size: '',
    designer: '',
    target_audience: '',
    client_name: '',
    observations: '',
  });

  const [stones, setStones] = useState<any[]>([]); // Array de pedras

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addStone = () => {
    setStones([...stones, {}]); // Adiciona uma nova pedra ao array
  };

  const removeStone = (index: number) => {
    setStones(stones.filter((_, i) => i !== index)); // Remove a pedra pelo índice
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combina os dados do formulário com as pedras
    const jewelryData = {
      ...formData,
      stones: stones, // Adiciona as pedras ao objeto de dados
    };

    // Envia os dados para o Supabase
    const { data, error } = await supabase
      .from('jewelry')
      .insert([jewelryData]);

    if (error) {
      console.error('Erro ao salvar joia:', error);
    } else {
      console.log('Joia salva com sucesso:', data);
      alert('Joia salva com sucesso!');
      // Limpa o formulário após o sucesso
      setFormData({
        reference_name: '',
        category: '',
        weight: null,
        finish: '',
        size: '',
        designer: '',
        target_audience: '',
        client_name: '',
        observations: '',
      });
      setStones([]); // Limpa as pedras
    }
  };

  return (
    <div className={formContainer}>
      <h2 className={formTitle}>Cadastrar Nova Joia</h2>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Informações Básicas */}
        <div className={formGrid}>
          <div>
            <label htmlFor="reference_name" className={inputLabel}>
              Nome de Referência *
            </label>
            <input
              type="text"
              id="reference_name"
              name="reference_name"
              value={formData.reference_name}
              onChange={handleChange}
              required
              className={inputField}
            />
          </div>

          <div>
            <label htmlFor="category" className={inputLabel}>
              Categoria *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={selectField}
            >
              <option value="">Selecione uma categoria</option>
              <option value="ring">Anel</option>
              <option value="wedding_ring">Aliança</option>
              <option value="meia_alianca">Meia Aliança</option>
              <option value="pendant">Pingente</option>
              <option value="earring">Brinco</option>
              <option value="necklace">Colar</option>
              <option value="bracelet">Pulseira</option>           
              <option value="brooch">Broche</option>              
              <option value="rivi">Rivieira</option>
            </select>
          </div>

          <div>
            <label htmlFor="weight" className={inputLabel}>
              Peso (g)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              step="0.01"
              className={inputField}
            />
          </div>

          <div>
            <label htmlFor="finish" className={inputLabel}>
              Acabamento
            </label>
            <select
              id="finish"
              name="finish"
              value={formData.finish}
              onChange={handleChange}
              className={selectField}
            >
              <option value="">Selecione um acabamento</option>
              <option value="polished">Polido</option>
              <option value="matte">Fosco</option>
              <option value="textured">Texturizado</option>
              <option value="hammered">Martelado</option>
              <option value="brushed">Escovado</option>
              <option value="antique">Envelhecido</option>
            </select>
          </div>

          <div>
            <label htmlFor="size" className={inputLabel}>
              Tamanho
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={inputField}
            />
          </div>

          <div>
            <label htmlFor="designer" className={inputLabel}>
              Designer
            </label>
            <select
              id="designer"
              name="designer"
              value={formData.designer}
              onChange={handleChange}
              className={selectField}
            >
              <option value="">Selecione um estilo</option>
              <option value="classic">Clássico</option>
              <option value="modern">Moderno</option>
              <option value="vintage">Vintage</option>
              <option value="contemporary">Contemporâneo</option>
              <option value="personalizado">Personalizado</option>
              <option value="minimalist">Minimalista</option>
            </select>
          </div>

          <div>
            <label htmlFor="target_audience" className={inputLabel}>
              Público-Alvo
            </label>
            <select
              id="target_audience"
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
              className={selectField}
            >
              <option value="">Selecione o público-alvo</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
              <option value="children">Infantil</option>
              <option value="unisex">Unissex</option>
            </select>
          </div>

          <div>
            <label htmlFor="client_name" className={inputLabel}>
              Nome do Cliente
            </label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className={inputField}
            />
          </div>
        </div>

        {/* Pedras */}
        <div>
          <div className={stoneHeader}>
            <h3 className={stoneTitle}>Pedras</h3>
            <button
              type="button"
              onClick={addStone}
              className={addStoneButton}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Pedra
            </button>
          </div>

          <div className={stoneSection}>
            {stones.map((_, index) => (
              <Pedra
                key={index}
                index={index}
                onRemove={removeStone}
              />
            ))}
          </div>
        </div>

        {/* Observações */}
        <div>
          <label htmlFor="observations" className={inputLabel}>
            Observações
          </label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={4}
            className={textAreaField}
          />
        </div>

        {/* Botões de Ação */}
        <div className={actionButtonsContainer}>
          <button
            type="button"
            className={cancelButton}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={submitButton}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}