import { ELECTRICAL_STANDARDS } from './constants';

export const getBasicElectrical = (V, I) => `P = ${(V * I).toFixed(2)} Вт, R = ${(V / I).toFixed(2)} Ω`;

export const getThreePhasePower = (V, I, cosPhi) => {
  const power = (Math.sqrt(3) * V * I * cosPhi) / 1000;
  return `P = ${power.toFixed(2)} кВт`;
};

export const getCableSizing = (I) => {
  const { CABLE_CURRENT_DENSITY, MIN_CABLE_AREA } = ELECTRICAL_STANDARDS;
  const area = I / CABLE_CURRENT_DENSITY;
  const suggestion = area > MIN_CABLE_AREA ? Math.ceil(area) : MIN_CABLE_AREA;
  return `Огтлол: ${area.toFixed(2)} мм² (Санал: ${suggestion} мм²)`;
};