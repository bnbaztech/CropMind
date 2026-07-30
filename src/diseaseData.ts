import { DiseasePreset, SatelliteMetric } from './types';

export const DISEASE_PRESETS: DiseasePreset[] = [
  {
    id: 'cassava_mosaic',
    name: 'Cassava Mosaic Disease (CMD)',
    scientificName: 'Cassava mosaic begomovirus',
    crop: 'Cassava',
    symptoms: [
      'Chlorotic mosaic patterns on leaves',
      'Distortion and twisting of leaflets',
      'Stunted plant growth and reduced tuberization',
      'Narrowing of lobes resembling "shoestring" symptoms'
    ],
    organicTreatment: 'Plant disease-resistant cassava cultivars (e.g., TMS series). Rogue (uproot and burn) infected plants immediately when symptoms appear in early stages. Practice crop rotation and fallowing.',
    chemicalTreatment: 'No direct chemical control exists for the virus. Systemic insecticides can target the whitefly vector (Bemisia tabaci) in severe commercial outbreaks, but this is rarely recommended for smallholders due to cost and safety.',
    preventiveMeasures: [
      'Use strictly virus-free stem cuttings from certified sources.',
      'Establish farms at least 50 meters away from existing diseased cassava fields.',
      'Inspect fields weekly for early rogueing.'
    ],
    confidence: 94,
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'maize_rust',
    name: 'Maize Common Rust',
    scientificName: 'Puccinia sorghi',
    crop: 'Maize',
    symptoms: [
      'Golden-brown, powdery pustules on both upper and lower leaf surfaces',
      'Pustules turn brownish-black as the leaf matures',
      'Premature leaf death (necrosis) in severe epidemics',
      'Weakened stalks leading to lodging'
    ],
    organicTreatment: 'Utilize genetic resistance (tolerant maize hybrids). Plant early in the rainy season to avoid the peak fungal spore load. Incorporate crop residues into the soil deep-plowing to kill overwintering spores.',
    chemicalTreatment: 'Apply triazole or strobilurin-based fungicides (e.g., azoxystrobin, propiconazole) if infection starts prior to tasseling and weather forecast shows prolonged humidity (above 95% relative humidity).',
    preventiveMeasures: [
      'Rotate maize with non-gramineous crops like groundnuts or beans.',
      'Maintain optimal soil potassium levels to improve cellular resilience.',
      'Clean all farming equipment after visiting an infected field.'
    ],
    confidence: 91,
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'rice_blast',
    name: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    crop: 'Rice',
    symptoms: [
      'Diamond-shaped (spindle) lesions on leaves with gray centers and reddish borders',
      'Rotten neck symptoms (dark lesions on the neck node of the panicle)',
      'Partial or total failure of grain filling',
      'Bluish-gray patches on leaf sheaths'
    ],
    organicTreatment: 'Avoid excessive nitrogen fertilization which triggers vegetative lushness susceptible to fungi. Keep paddy fields continuously flooded to reduce disease severity. Plant resistant landraces.',
    chemicalTreatment: 'Use seed treatment fungicides (e.g., tricyclazole, benomyl). Apply foliar sprays at the boot stage and early heading if disease lesions appear on upper leaves.',
    preventiveMeasures: [
      'Burn infected crop residue or compost it far from nurseries.',
      'Sow seeds at recommended densities to allow wind aeration through stalks.',
      'Use certified clean, blast-free seeds.'
    ],
    confidence: 89,
    imageUrl: 'https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tomato_blight',
    name: 'Tomato Late Blight',
    scientificName: 'Phytophthora infestans',
    crop: 'Tomato',
    symptoms: [
      'Water-soaked, dark greenish-black spots on leaves that expand rapidly',
      'White, downy mold growth on the undersides of leaves in humid conditions',
      'Large, greasy brown lesions on the green and ripe tomato fruit',
      'Rapid stem rot and complete collapse of the plant canopy in cool, wet weather'
    ],
    organicTreatment: 'Apply copper-based organic sprays (e.g., copper hydroxide) protectively. Prune lower leaves to maximize air circulation. Implement drip irrigation instead of overhead watering to keep foliage dry.',
    chemicalTreatment: 'Apply systemic fungicides such as metalaxyl-M, chlorothalonil, or mancozeb at the first warning of wet, cool weather conditions.',
    preventiveMeasures: [
      'Never plant tomatoes near potato fields (potatoes harbor the same oomycete).',
      'Destroy volunteer tomato and potato plants from previous seasons.',
      'Select well-drained slopes for tomato cultivation.'
    ],
    confidence: 96,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400'
  }
];

export const SATELLITE_FIELDS: SatelliteMetric[] = [
  {
    id: 'field_alpha',
    fieldName: 'North Ridge Maize Basin',
    cropType: 'Maize',
    ndvi: 0.72,
    soilMoisture: 42,
    canopyTemp: 24.5,
    stressLevel: 'None',
    waterStress: false,
    nitrogenDeficit: false
  },
  {
    id: 'field_beta',
    fieldName: 'Eastern Lowland Cassava Farm',
    cropType: 'Cassava',
    ndvi: 0.48,
    soilMoisture: 18,
    canopyTemp: 29.8,
    stressLevel: 'Medium',
    waterStress: true,
    nitrogenDeficit: false
  },
  {
    id: 'field_gamma',
    fieldName: 'Delta Rice Paddy Plot 4',
    cropType: 'Rice',
    ndvi: 0.81,
    soilMoisture: 95,
    canopyTemp: 22.1,
    stressLevel: 'None',
    waterStress: false,
    nitrogenDeficit: false
  },
  {
    id: 'field_delta',
    fieldName: 'Hillside Tomato Nursery',
    cropType: 'Tomato',
    ndvi: 0.31,
    soilMoisture: 12,
    canopyTemp: 34.2,
    stressLevel: 'High',
    waterStress: true,
    nitrogenDeficit: true
  }
];
