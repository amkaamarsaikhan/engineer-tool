import { pi } from 'mathjs';

export const construction = {
  getBudget: (volume, materialType, unitPrice) => {
    const v = Number(volume);
    const norms = {
      concrete: { cement: 350, labor: 45000, label: "м³ бетон" },
      brick: { count: 512, labor: 65000, label: "ш тоосго" },
    };
    const selected = norms[materialType] || norms.concrete;
    const materialCost = unitPrice * v;
    const laborCost = selected.labor * v;
    return `Нийт: ${(materialCost + laborCost).toLocaleString()} ₮ (Ажил: ${laborCost.toLocaleString()} ₮)`;
  },
  getRebarWeight: (d, L) => {
    const weight = (Math.pow(d, 2) / 162) * L;
    return `Жин: ${weight.toFixed(2)} кг`;
  }
};

export const structural = {
  getMaxMoment: (q, L) => `Mmax = ${((q * Math.pow(L, 2)) / 8).toFixed(2)} кНм`,
  checkDeflection: (q, L, E, I) => {
    const E_kN = E * 1e6; 
    const I_m4 = I * 1e-8; 
    const delta = (5 * q * Math.pow(L, 4)) / (384 * E_kN * I_m4);
    const deltaMM = delta * 1000;
    const limit = (L * 1000) / 250;
    return `Хазайлт: ${deltaMM.toFixed(2)} мм (Зөвшөөрөх: ${limit.toFixed(2)} мм) ${deltaMM <= limit ? '✅' : '❌'}`;
  },
  getBearingPressure: (P, A) => `Даралт: ${(P / A).toFixed(2)} кН/м²`
};

export const mechanical = {
  getPower: (T, rpm) => `Чадал: ${( (T * rpm) / 9550 ).toFixed(2)} кВт`,
  getTorsionalStress: (T, d) => {
    const d_m = d / 1000;
    const tau = (16 * T) / (pi * Math.pow(d_m, 3));
    return `τ = ${(tau / 1e6).toFixed(2)} МПа`;
  },
  getGearRatio: (Z1, Z2, rpm) => {
    const ratio = Z2 / Z1;
    return `Харьцаа: ${ratio.toFixed(2)} (Гаралт: ${(rpm / ratio).toFixed(2)} RPM)`;
  }
};

export const electrical = {
  getBasicElectrical: (V, I) => `P = ${(V * I).toFixed(2)} Вт, R = ${(V / I).toFixed(2)} Ω`,
  getThreePhasePower: (V, I, cosPhi) => `P = ${((Math.sqrt(3) * V * I * cosPhi) / 1000).toFixed(2)} кВт`,
  getCableSizing: (I) => {
    const area = I / 5;
    return `Огтлол: ${area.toFixed(2)} мм² (Санал: ${area > 2.5 ? Math.ceil(area) : 2.5} мм²)`;
  }
};