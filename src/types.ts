export interface CropRecord {
  id: string;
  cropName: string;
  plantingDate: string;
  expectedHarvestDate: string;
  estimatedYield: number; // in kg
  status: 'Healthy' | 'Stressed' | 'Diseased';
  synced: boolean;
}

export interface DiseasePreset {
  id: string;
  name: string;
  scientificName: string;
  crop: string;
  symptoms: string[];
  organicTreatment: string;
  chemicalTreatment: string;
  preventiveMeasures: string[];
  confidence: number;
  imageUrl: string;
}

export interface SatelliteMetric {
  id: string;
  fieldName: string;
  cropType: string;
  ndvi: number; // 0.0 to 1.0
  soilMoisture: number; // percentage
  canopyTemp: number; // Celsius
  stressLevel: 'None' | 'Low' | 'Medium' | 'High';
  waterStress: boolean;
  nitrogenDeficit: boolean;
}

export interface OfflineAction {
  id: string;
  actionType: 'CREATE_RECORD' | 'DELETE_RECORD' | 'UPDATE_SOIL';
  payload: any;
  timestamp: string;
}

export type SupportedLanguage = 'en' | 'sw' | 'ha' | 'yo' | 'ig' | 'fr' | 'ar';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  localName: string;
  flag: string;
  greetings: string;
  assistantPrompt: string;
}

export interface BlueprintSection {
  id: string;
  title: string;
  category: 'Strategic' | 'Architecture' | 'Ecosystem' | 'Business' | 'Pitch';
  content: string;
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  farmName: string;
  location: string;
  farmSize: number; // in hectares
  primaryCrop: string;
  memberSince: string;
}

export interface HistoryProblem {
  id: string;
  farmerId: string;
  cropName: string;
  problemName: string;
  scientificName?: string;
  symptoms: string[];
  organicTreatment: string;
  chemicalTreatment?: string;
  confidence: number;
  dateLogged: string;
  status: 'active' | 'resolved';
  severity: 'Low' | 'Medium' | 'High';
  notes?: string;
}

