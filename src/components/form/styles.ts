// styles.ts
import { useState } from 'react';
import type { Stone } from '../../types/database';

// Estilos
export const formContainer = "bg-white shadow-sm rounded-lg p-6";
export const formTitle = "text-2xl font-semibold text-gray-900 mb-6";
export const formGrid = "grid grid-cols-1 gap-6 md:grid-cols-2";
export const inputLabel = "block text-sm font-medium text-gray-700";
export const inputField = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
export const selectField = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
export const stoneSection = "space-y-4";
export const stoneHeader = "flex justify-between items-center mb-4";
export const stoneTitle = "text-lg font-medium text-gray-900";
export const addStoneButton = "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
export const uploadContainer = "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md";
export const uploadIcon = "mx-auto h-12 w-12 text-gray-400";
export const uploadText = "flex text-sm text-gray-600";
export const uploadLink = "relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500";
export const uploadInfo = "text-xs text-gray-500";
export const textAreaField = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
export const actionButtonsContainer = "flex justify-end space-x-3";
export const cancelButton = "inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
export const submitButton = "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

// Funções utilitárias
export const useStones = () => {
  const [stones, setStones] = useState<Partial<Stone>[]>([]);

  const addStone = () => {
    setStones([...stones, {
      stone_type: '',
      cut: 'Round',
      quantity: 1
    }]);
  };

  const removeStone = (index: number) => {
    setStones(stones.filter((_, i) => i !== index));
  };

  return { stones, addStone, removeStone };
};