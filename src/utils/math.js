import { evaluate, pi } from 'mathjs';

/**
 * 1. БАРИЛГЫН МАТЕРИАЛ БОЛОН ТӨСӨВ (CONSTRUCTION)
 */
export const construction = {
  // Төсөв бодох ЕРӨНХИЙ функц (Таны нэмсэн хэсэг)
  calculate: (amount, type) => {
    const rates = {
      concrete: { price: 185000, label: "м³ бетон" },
      brick: { price: 650, label: "ш тоосго" },
      rebar: { price: 3200000, label: "тн арматур" },
      plaster: { price: 12000, label: "м² шавардлага" }
    };

    const selected = rates[type] || rates.concrete;
    return {
      total: amount * selected.price,
      label: selected.label
    };
  },

  // Материалын түүвэр (Дэлгэрэнгүй)
  estimateMaterials: (volume, materialType) => {
    const v = Number(volume);
    const rates = {
      concrete: { cement: 350, sand: 0.5, gravel: 0.8 },
      brick: { count: 512, mortar: 0.2 },
    };

    if (materialType === 'concrete') {
      return {
        cement: v * rates.concrete.cement,
        sand: v * rates.concrete.sand,
        gravel: v * rates.concrete.gravel,
      };
    }
    return { bricks: v * rates.brick.count };
  },

  // Төсөв бодолт (Нарийвчилсан)
  calculateBudget: (volume, materialType, unitPrice) => {
    const v = Number(volume);
    const norms = {
      concrete: { cement: 350, labor: 45000 },
      brick: { count: 512, labor: 65000 },
    };
    const selected = norms[materialType];
    const materialCost = unitPrice * v;
    const laborCost = selected.labor * v;

    return {
      materialCost,
      laborCost,
      total: materialCost + laborCost,
      details: materialType === 'concrete'
        ? `${(v * selected.cement).toLocaleString()} кг цемент`
        : `${(v * selected.count).toLocaleString()} ширхэг тоосго`,
    };
  },

  // Арматурын жин
  getRebarWeight: (diameter, length) => (diameter ** 2 / 162) * length,
};

/**
 * 2. БҮТЭЭЦИЙН АНЛИЗ (STRUCTURAL)
 */
export const structural = {
  getMaxMoment: (q, L) => (q * L ** 2) / 8,

  checkDeflection: (q, L, E, I) => {
    const E_kN = E * 1e6; 
    const I_m4 = I * 1e-8; 
    const delta = (5 * q * L ** 4) / (384 * E_kN * I_m4);
    const deltaMM = delta * 1000;
    const limit = (L * 1000) / 250;
    return {
      delta: deltaMM.toFixed(2),
      limit: limit.toFixed(2),
      pass: deltaMM <= limit,
    };
  },

  getBucklingLoad: (E, I, L, K = 1) => {
    const E_kN = E * 1e6;
    const I_m4 = I * 1e-8;
    const Pcr = (pi ** 2 * E_kN * I_m4) / (K * L) ** 2;
    return Pcr.toFixed(2);
  },

  getBearingPressure: (P, A) => (P / A).toFixed(2),
};

/**
 * 3. МЕХАНИК ИНЖЕНЕРЧЛЭЛ (MECHANICAL)
 */
export const mechanical = {
  getPower: (T, rpm) => (T * rpm) / 9550,

  getTorsionalStress: (T, d) => {
    const d_m = d / 1000;
    const tau = (16 * T) / (pi * d_m ** 3);
    return (tau / 1e6).toFixed(2);
  },

  getGearRatio: (Z1, Z2, inputRPM) => {
    const ratio = Z2 / Z1;
    return {
      ratio: ratio.toFixed(2),
      outputRPM: (inputRPM / ratio).toFixed(2),
    };
  },

  getBearingLife: (C, P) => ((C / P) ** 3).toFixed(2),
};

/**
 * 4. ЦАХИЛГААН (ELECTRICAL)
 */
export const electrical = {
  getBasicElectrical: (V, I) => ({
    power: V * I,
    resistance: V / I,
  }),

  getCableSizing: (I, material = 'Cu') => {
    const J = material === 'Cu' ? 5 : 3;
    const area = I / J;
    return {
      area: area.toFixed(2),
      recommendation: `Санал болгож буй огтлол: ${area > 2.5 ? Math.ceil(area) : 2.5} мм²`,
    };
  },

  getThreePhasePower: (V, I, cosPhi) => 
    ((Math.sqrt(3) * V * I * cosPhi) / 1000).toFixed(2),

  getShortCircuitCurrent: (V, Z) => (V / Z / 1000).toFixed(2),
};