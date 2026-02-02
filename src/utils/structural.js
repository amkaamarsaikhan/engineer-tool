import { STRUCTURAL_CONSTANTS } from './constants';

export const getMaxMoment = (q, L) => {
  const moment = (q * Math.pow(L, 2)) / STRUCTURAL_CONSTANTS.MOMENT_DIVISOR;
  return {
    value: moment.toFixed(2),
    unit: "кНм",
    label: "Хамгийн их момент",
    status: null // Зүгээр утга учир статусгүй
  };
};

export const checkDeflection = (q, L, E, I) => {
  const { KN_TO_N, CM4_TO_M4, DEFLECTION_BASE_FACTOR, DEFLECTION_DIVISOR, DEFLECTION_LIMIT_FACTOR, M_TO_MM } = STRUCTURAL_CONSTANTS;
  
  const E_N = E * KN_TO_N; 
  const I_m4 = I * CM4_TO_M4; 
  const delta = (DEFLECTION_BASE_FACTOR * q * Math.pow(L, 4)) / (DEFLECTION_DIVISOR * E_N * I_m4);
  const deltaMM = delta * M_TO_MM;
  const limit = (L * M_TO_MM) / DEFLECTION_LIMIT_FACTOR;
  
  // Статус тодорхойлох
  let status = "SAFE";
  if (deltaMM > limit) status = "DANGER";
  else if (deltaMM > limit * 0.85) status = "WARNING"; // 85%-аас хэтэрвэл анхааруулна

  return {
    value: deltaMM.toFixed(2),
    unit: "мм",
    limit: limit.toFixed(2),
    status: status,
    label: "Бодит хотойлт",
    ratio: ((deltaMM / limit) * 100).toFixed(1)
  };
};

export const getBearingPressure = (P, A) => {
  const pressure = P / A;
  return {
    value: pressure.toFixed(2),
    unit: "кН/м²",
    label: "Хөрсний даралт",
    status: null
  };
};