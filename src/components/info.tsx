// Informacao.tsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Página de Informações do Produto.
 * 
 * Ao acessar esta página, esperamos que os dados do produto estejam disponíveis via
 * location.state. Caso contrário, é exibida uma mensagem de erro.
 * 
 * A página mostra:
 * - Imagem do produto (ou um placeholder, se não houver imagem)
 * - Informações básicas (nome de referência, categoria, peso, acabamento, tamanho, designer,
 *   público-alvo e nome do cliente)
 * - Dimensões
 * - Informações sobre as pedras cadastradas
 * - Observações
 * 
 * Ao clicar no botão "Alterar Produto", o usuário é redirecionado para a página de cadastro,
 * passando os dados do produto para edição.
 */
export default function Informacao() {
  // useLocation para acessar os dados enviados via state
  const location = useLocation();
  // useNavigate para redirecionamento
  const navigate = useNavigate();

  // Supomos que o objeto do produto esteja disponível em location.state.product
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="p-6">
        <p>Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-lg">
      {/* Cabeçalho */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações do Produto</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagem do Produto */}
        <div>
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/400'} 
            alt={product.referenceName} 
            className="w-full object-cover rounded-md" 
          />
        </div>

        {/* Informações Básicas */}
        <div className="space-y-2">
          <p className="text-lg"><strong>Nome de Referência:</strong> {product.referenceName}</p>
          <p className="text-lg"><strong>Categoria:</strong> {product.category}</p>
          <p className="text-lg"><strong>Peso:</strong> {product.weight} g</p>
          <p className="text-lg"><strong>Acabamento:</strong> {product.finish}</p>
          <p className="text-lg"><strong>Tamanho:</strong> {product.size}</p>
          <p className="text-lg"><strong>Designer:</strong> {product.designer}</p>
          <p className="text-lg"><strong>Público-Alvo:</strong> {product.targetAudience}</p>
          <p className="text-lg"><strong>Nome do Cliente:</strong> {product.clientName}</p>
        </div>
      </div>

      {/* Dimensões */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Dimensões</h3>
        <p className="text-gray-700">{product.dimensions}</p>
      </div>

      {/* Pedras */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Pedras</h3>
        {product.stones && product.stones.length > 0 ? (
          <div className="space-y-4">
            {product.stones.map((stone: any, index: number) => (
              <div key={index} className="border p-4 rounded-md">
                <p><strong>Tipo:</strong> {stone.stone_type}</p>
                <p><strong>Lapidação:</strong> {stone.cut}</p>
                <p><strong>Quantidade:</strong> {stone.quantity}</p>
                {stone.pts && <p><strong>PTS:</strong> {stone.pts}</p>}
                {stone.quilates && <p><strong>Quilates:</strong> {stone.quilates}</p>}
                {stone.dimensions && <p><strong>Dimensões:</strong> {stone.dimensions}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">Nenhuma pedra cadastrada.</p>
        )}
      </div>

      {/* Observações */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Observações</h3>
        <p className="text-gray-700">{product.observations}</p>
      </div>

      {/* Botão de Alterar */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/jewelry-form', { state: { product } })}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Alterar Produto
        </button>
      </div>
    </div>
  );
}
