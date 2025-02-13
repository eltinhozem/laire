import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
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
  const navigate = useNavigate();

  // Busca as joias ao carregar o componente
  useEffect(() => {
    fetchJewelry();
  }, []);

  // Função para buscar joias
  const fetchJewelry = async () => {
    const { data, error } = await supabase
      .from('jewelry')
      .select('*')
      .ilike('reference_name', `%${searchTerm}%`);

    if (error) {
      console.error('Erro ao buscar joias:', error);
    } else {
      setJewelry(data as Jewelry[]); // Força a tipagem correta
    }
  };

  // Atualiza a busca quando o termo de busca muda
  useEffect(() => {
    fetchJewelry();
  }, [searchTerm]);

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
        </div>
      </div>

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