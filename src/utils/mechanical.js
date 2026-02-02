import { pi } from 'mathjs';
import { STRUCTURAL_CONSTANTS } from './constants';

export const getPower = (T, rpm) => {
  const power = (T * rpm) / STRUCTURAL_CONSTANTS.POWER_CONVERSION_FACTOR;
  return `Чадал: ${power.toFixed(2)} кВт`;
};

export const getTorsionalStress = (T, d) => {
  const { M_TO_MM, TORSIONAL_FACTOR, KN_TO_N } = STRUCTURAL_CONSTANTS;
  const d_m = d / M_TO_MM;
  const tau = (TORSIONAL_FACTOR * T) / (pi * Math.pow(d_m, 3));
  return `τ = ${(tau / KN_TO_N).toFixed(2)} МПа`;
};

export const getGearRatio = (Z1, Z2, rpm) => {
  const ratio = Z2 / Z1;
  return `Харьцаа: ${ratio.toFixed(2)} (Гаралт: ${(rpm / ratio).toFixed(2)} RPM)`;
};