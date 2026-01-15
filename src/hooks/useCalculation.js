import { useState } from 'react';
import { construction } from '../utils/math';

export const useConstructionCalc = () => {
  const [result, setResult] = useState(null);

  const estimate = (v, type) => {
    const data = construction.estimateMaterials(v, type);
    setResult(data);
  };

  return { result, estimate };
};