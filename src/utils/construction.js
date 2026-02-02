import { CONSTRUCTION_NORMS, STRUCTURAL_CONSTANTS } from './constants';

export const getBudget = (volume, materialType, unitPrice) => {
  const v = Number(volume);
  const selected = CONSTRUCTION_NORMS[materialType] || CONSTRUCTION_NORMS.concrete;
  const materialCost = unitPrice * v;
  const laborCost = selected.labor * v;
  return `Нийт: ${(materialCost + laborCost).toLocaleString()} ₮ (Ажил: ${laborCost.toLocaleString()} ₮)`;
};

export const getRebarWeight = (d, L) => {
  const weight = (Math.pow(d, 2) / STRUCTURAL_CONSTANTS.REBAR_DENSITY_FACTOR) * L;
  return `Жин: ${weight.toFixed(2)} кг`;
};