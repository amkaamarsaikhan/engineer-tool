// Барилгын төсвийн норм утгууд
export const CONSTRUCTION_NORMS = {
  concrete: { cement: 350, labor: 45000, label: "м³ бетон" },
  brick: { count: 512, labor: 65000, label: "ш тоосго" },
};

// Механик болон бүтээцийн тогтмол утгууд
export const STRUCTURAL_CONSTANTS = {
  REBAR_DENSITY_FACTOR: 162,      
  MOMENT_DIVISOR: 8,              
  DEFLECTION_BASE_FACTOR: 5,      
  DEFLECTION_DIVISOR: 384,        
  DEFLECTION_LIMIT_FACTOR: 250,   
  POWER_CONVERSION_FACTOR: 9550,  
  TORSIONAL_FACTOR: 16,           
  KN_TO_N: 1e6,                   
  CM4_TO_M4: 1e-8,                
  M_TO_MM: 1000                   
};

// Жишээ утгууд (UX Example)
export const TOOL_EXAMPLES = {
  getBudget: { v1: "45", v2: "195000" },
  getRebarWeight: { v1: "16", v2: "12" },
  getMaxMoment: { v1: "12", v2: "6" },
  checkDeflection: { v1: "10", v2: "5", v3: "200", v4: "1850" },
  getPower: { v1: "250", v2: "1450" },
  getCableSizing: { v1: "35" }
};

// Томьёоны тайлбар (Tooltip)
export const FORMULAS = {
  getBudget: "Cost = (Material + Labor) * V",
  getRebarWeight: "W = (d² / 162) * L",
  getMaxMoment: "Mmax = (q * L²) / 8",
  checkDeflection: "δ = (5 * q * L⁴) / (384 * E * I)",
  getPower: "P = (T * n) / 9550",
  getCableSizing: "S = I / 5"
};

export const ELECTRICAL_STANDARDS = {
  CABLE_CURRENT_DENSITY: 5,
  MIN_CABLE_AREA: 2.5,
  VOLTAGE_THREE_PHASE: 380,
  VOLTAGE_SINGLE_PHASE: 220,
};