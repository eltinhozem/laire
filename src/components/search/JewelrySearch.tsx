import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import {
  searchContainer,
  searchHeader,
  searchInputContainer,
  searchInputWrapper,
  searchIcon,
  searchInput,
  resultsGrid,
  resultCard,
  resultImageContainer,
  resultImage,
  resultCardContent,
  resultTitle,
  resultDescription,
} from './styles';

interface Jewelry {
  id: number;
  reference_name: string;
  category: string;
  weight: number;
  finish: string;
  size: string;
  designer: string;
  target_audience: string;
  client_name: string;
  created_at: string;
}

export default function JewelrySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jewelry, setJewelry] = useState<Jewelry[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    designer: '',
    target_audience: '',
  });
  const navigate = useNavigate();

  // Busca as joias ao carregar o componente e quando os filtros mudam
  useEffect(() => {
    fetchJewelry();
  }, [filters]);

  // Função para buscar joias com filtros
  const fetchJewelry = async () => {
    let query = supabase
      .from('jewelry')
      .select('*')
      .ilike('reference_name', `%${searchTerm}%`);

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.designer) {
      query = query.eq('designer', filters.designer);
    }
    if (filters.target_audience) {
      query = query.eq('target_audience', filters.target_audience);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar joias:', error);
    } else {
      setJewelry(data);
    }
  };

  // Atualiza a busca quando o termo de busca muda
  useEffect(() => {
    fetchJewelry();
  }, [searchTerm]);

  // Função para aplicar os filtros
  const applyFilters = () => {
    fetchJewelry();
    setShowFilters(false); // Fecha o painel de filtros após aplicar
  };

  return (
    <div className={searchContainer}>
      {/* Cabeçalho de Busca */}
      <div className={searchHeader}>
        <div className={searchInputContainer}>
          <div className={searchInputWrapper}>
            <div className={searchIcon}>
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={searchInput}
              placeholder="Buscar por referência, cliente, tipo de pedra..."
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="ml-4 p-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Todas</option>
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
              <label className="block text-sm font-medium text-gray-700">
                Designer
              </label>
              <select
                value={filters.designer}
                onChange={(e) => setFilters({ ...filters, designer: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="classic">Clássico</option>
                <option value="modern">Moderno</option>
                <option value="vintage">Vintage</option>
                <option value="contemporary">Contemporâneo</option>
                <option value="personalizado">Personalizado</option>
                <option value="minimalist">Minimalista</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Público-Alvo
              </label>
              <select
                value={filters.target_audience}
                onChange={(e) => setFilters({ ...filters, target_audience: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Todos</option>
                <option value="female">Feminino</option>
                <option value="male">Masculino</option>
                <option value="children">Infantil</option>
                <option value="unisex">Unissex</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={applyFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}

      {/* Grade de Resultados */}
      <div className={resultsGrid}>
        {jewelry.length > 0 ? (
          jewelry.map((item) => (
            <div
              key={item.id}
              className={resultCard}
              onClick={() => navigate(`/info/${item.id}`)}
            >
              <div className={resultImageContainer}>
                <img
                  src={`https://source.unsplash.com/random/400x400?jewelry&${item.id}`}
                  alt="Joia"
                  className={resultImage}
                />
              </div>
              <div className={resultCardContent}>
                <h3 className={resultTitle}>{item.reference_name}</h3>
                <p className={resultDescription}>{item.category}</p>
                <p className={resultDescription}>Cliente: {item.client_name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma joia encontrada.</p>
        )}
      </div>
    </div>
  );
}