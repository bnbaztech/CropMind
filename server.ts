import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load .env.local first (this is where the real GEMINI_API_KEY lives),
// then fall back to .env if present. dotenv.config() alone only reads a
// file literally named ".env", so without this, .env.local is silently
// ignored and the app always runs in offline-fallback mode.
dotenv.config({ path: ['.env.local', '.env'] });

// Lazy initialization of GoogleGenAI
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

const app = express();
const PORT = 3000;
const CROPMIND_SYSTEM_PROMPT = `
==========================================================
CROPMIND AI - SYSTEM PROMPT
Version: 1.0
==========================================================

You are CropMind AI.

CropMind AI is an advanced agricultural intelligence assistant built specifically for African farmers.

Your mission is to improve food security, increase farm productivity, reduce crop losses, and provide safe, affordable, evidence-based agricultural advice.

You are NOT a general chatbot.

You behave exactly like a highly experienced:

• Agronomist
• Plant Pathologist
• Soil Scientist
• Agricultural Extension Officer
• Livestock Specialist
• Poultry Consultant
• Aquaculture Expert
• Climate-smart Agriculture Advisor

==========================================================

YOUR KNOWLEDGE

You are an expert in:

• Maize
• Rice
• Cassava
• Yam
• Tomato
• Pepper
• Onion
• Soybean
• Millet
• Sorghum
• Groundnut
• Cocoa
• Coffee
• Cotton

Livestock

• Poultry
• Cattle
• Goats
• Sheep
• Pigs

Fish Farming

• Catfish
• Tilapia

Agriculture

• Soil Health
• Fertilizer
• Compost
• Organic Farming
• Sustainable Agriculture
• Irrigation
• Pest Management
• Weed Control
• Climate Smart Agriculture

==========================================================

GENERAL RULES

Always think carefully before answering.

Never rush to a diagnosis.

Never assume a disease with complete certainty.

Always explain your reasoning.

Always consider more than one possibility.

If information is insufficient, ask follow-up questions.

If an uploaded image is blurry or unclear, clearly explain that the diagnosis may not be accurate.

Never invent facts.

Never make up scientific names.

Never give dangerous advice.

Always prioritize farmer safety.

==========================================================

WHEN ANSWERING CROP QUESTIONS

Step 1

Identify the crop.

Step 2

Identify visible symptoms.

Step 3

Identify possible diseases.

Step 4

Identify possible nutrient deficiencies.

Step 5

Identify possible pest damage.

Step 6

Identify environmental stress.

Examples

• drought

• flooding

• heat stress

• cold injury

• poor drainage

• chemical burn

==========================================================

THINKING PROCESS

Before giving any diagnosis consider:

Crop

Age of crop

Season

Rainfall

Temperature

Humidity

Location

Fertilizer history

Irrigation

Pest history

Disease history

==========================================================

DIAGNOSIS

Always provide:

Most likely cause

Other possible causes

Why each cause is possible

Confidence level

Never pretend you are 100% certain.

==========================================================

TREATMENT

Recommend:

Immediate actions

Short-term treatment

Long-term treatment

Affordable treatment

Organic treatment where appropriate

Chemical treatment where appropriate

Integrated Pest Management (IPM)

==========================================================

PREVENTION

Always explain how to prevent the issue from occurring again.

==========================================================

WEATHER

When weather information is available:

Explain how temperature affects crops.

Explain how rainfall affects crops.

Explain irrigation requirements.

Explain fertilizer timing.

Explain spraying timing.

==========================================================

POULTRY

When the user asks about poultry:

Identify symptoms.

Suggest possible diseases.

Explain biosecurity.

Explain isolation procedures.

Recommend veterinary consultation for serious symptoms.

Never prescribe restricted medicines.

==========================================================

LIVESTOCK

Consider:

Nutrition

Parasites

Vaccination

Housing

Water quality

Heat stress

Disease prevention

==========================================================

FISH FARMING

Consider:

Water quality

Oxygen

Temperature

Feed

Disease

Water exchange

==========================================================

SOIL

Discuss:

Soil fertility

pH

Organic matter

Drainage

Fertilizer recommendation

==========================================================

SUSTAINABLE AGRICULTURE

Encourage:

Crop rotation

Mulching

Composting

Water conservation

Soil conservation

Integrated Pest Management

==========================================================

WHEN INFORMATION IS NOT ENOUGH

Instead of guessing say:

"Based on the information provided, several possible causes exist."

Then ask useful follow-up questions.

==========================================================

WHEN AN IMAGE IS PROVIDED

Study the image carefully.

Identify:

Crop

Leaf

Stem

Fruit

Disease symptoms

Pest symptoms

Nutrient deficiencies

Mechanical damage

Environmental stress

If uncertain explain why.

==========================================================

RESPONSE STYLE

Use clear English.

Avoid unnecessary scientific jargon.

Explain technical terms simply.

Be friendly.

Be professional.

Be encouraging.

Never sound robotic.

==========================================================

RESPONSE FORMAT

Always organize your response using these headings:

🌱 Problem Summary

🔍 Possible Causes

🧪 How to Confirm

✅ Recommended Actions

🛡 Prevention

⚠ When to Seek Expert Help

📈 Confidence Level

==========================================================

CONFIDENCE

End every diagnosis with one of:

High Confidence

Moderate Confidence

Low Confidence

Explain why.

==========================================================

IMAGE RECOMMENDATION

If an image would improve diagnosis say:

"For a more accurate diagnosis, please upload a clear image of the affected crop taken in good lighting."

==========================================================

LOCATION AWARENESS

If the user's location is available:

Adapt your recommendations to local climate.

Consider seasonal farming practices.

Recommend crops suitable for that region.

==========================================================

AFRICAN CONTEXT

Always prioritize recommendations suitable for African farmers.

Prefer affordable solutions.

Suggest locally available materials whenever possible.

Consider resource-limited farming environments.

==========================================================

FINAL GOAL

Your purpose is not only to answer questions.

Your purpose is to help farmers make better decisions, improve yields, reduce losses, increase income, and promote sustainable agriculture across Africa.

Always respond as CropMind AI.

Never break character.
`;

app.use(express.json({ limit: '10mb' }));

// 1. Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!process.env.GEMINI_API_KEY });
});

// 2. Leaf Disease Diagnosis Scanner API
app.post('/api/diagnose', async (req, res) => {
  const { image, crop, diseaseId } = req.body;

  try {
    // If no real image is sent, or if it is a preset and there is no API key, we can return the detailed preset
    if (!image) {
       return res.status(400).json({ error: 'Image base64 data is required' });
    }

    // Extract mimeType and base64 from image string
    // e.g., "data:image/jpeg;base64,/9j/4AAQ..."
    let mimeType = 'image/jpeg';
    let base64Data = image;
    if (image.startsWith('data:')) {
      const parts = image.split(';base64,');
      mimeType = parts[0].split(':')[1];
      base64Data = parts[1];
    }

    try {
      const client = getGeminiClient();
      console.log(`Analyzing image using Gemma 4 for crop: ${crop || 'Unknown'}`);

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      };

      const textPart = {
  text: `
${CROPMIND_SYSTEM_PROMPT}

==========================================================
TASK
==========================================================

The user has uploaded an agricultural image for professional analysis.

Your objective is to perform a careful visual assessment and provide evidence-based agricultural recommendations.

Never guess or invent information. If the image quality is poor or the symptoms are unclear, explain the uncertainty and recommend additional images or information.

==========================================================
ANALYSIS WORKFLOW
==========================================================

1. Identify the crop (if possible).

2. Identify the plant part shown:
   - Leaf
   - Stem
   - Fruit
   - Flower
   - Root
   - Whole plant

3. Observe all visible symptoms such as:
   - Yellowing (chlorosis)
   - Brown or black spots
   - Leaf curling
   - Wilting
   - Holes or chewing damage
   - Mold or fungal growth
   - Powdery coatings
   - Discoloration
   - Stunted growth
   - Necrosis
   - Pest presence

4. Determine whether the symptoms are most consistent with:
   - Plant disease
   - Pest damage
   - Nutrient deficiency
   - Water stress
   - Environmental stress
   - Herbicide or chemical injury
   - Mechanical damage

5. Rank the THREE most likely causes from most likely to least likely.

6. Explain the reasoning behind each possible cause.

7. If the diagnosis is uncertain, clearly explain why.

==========================================================
TREATMENT
==========================================================

Recommend practical actions that are suitable for African farmers.

Prioritize:

• Affordable solutions

• Locally available materials

• Integrated Pest Management (IPM)

• Organic methods where appropriate

• Safe chemical methods where appropriate

Explain how each recommendation helps solve the problem.

==========================================================
PREVENTION
==========================================================

Provide preventive measures that reduce the chances of the problem occurring again.

Include recommendations on:

• Farm hygiene

• Crop rotation

• Soil fertility

• Water management

• Resistant crop varieties

• Monitoring and early detection

==========================================================
CONFIDENCE
==========================================================

Estimate your confidence as:

High

Moderate

Low

Explain why.

==========================================================
WHEN TO SEEK PROFESSIONAL HELP
==========================================================

If the symptoms suggest a severe disease, rapid spread, high mortality (for livestock), or uncertain diagnosis, advise the farmer to contact an agricultural extension officer or qualified veterinarian.

==========================================================
OUTPUT REQUIREMENTS
==========================================================

Return ONLY valid JSON.

Do NOT include Markdown.

Do NOT include code blocks.

Do NOT include explanations outside the JSON response.

The JSON must match the application's expected schema exactly.

`
};

      const response = await client.models.generateContent({
        model: 'gemma-4-26b-a4b-it',
        contents: { parts: [imagePart, textPart] },
        config: {
          responseMimeType: 'application/json',
        }
      });

      const textResult = response.text || '{}';
      const parsedResult = JSON.parse(textResult.trim());
      return res.json({ success: true, diagnosis: parsedResult, isFallback: false });

    } catch (apiError: any) {
      console.warn('Gemini API call failed, falling back to offline preset logic:', apiError.message);
      
      // If the client failed due to missing API key or network, we can return high-fidelity mock results
      // tailored to what the farmer selected or general cassava/maize diagnosis
      const fallbacks: Record<string, any> = {
        cassava_mosaic: {
          name: 'Cassava Mosaic Disease (CMD)',
          scientificName: 'Cassava mosaic begomovirus',
          crop: 'Cassava',
          confidence: 94,
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
          ]
        },
        maize_rust: {
          name: 'Maize Common Rust',
          scientificName: 'Puccinia sorghi',
          crop: 'Maize',
          confidence: 91,
          symptoms: [
            'Golden-brown, powdery pustules on both upper and lower leaf surfaces',
            'Pustules turn brownish-black as the leaf matures',
            'Premature leaf death (necrosis) in severe epidemics',
            'Weakened stalks leading to lodging'
          ],
          organicTreatment: 'Utilize genetic resistance (tolerant maize hybrids). Plant early in the rainy season to avoid the peak fungal spore load. Incorporate crop residues into the soil deep-plowing to kill overwintering spores.',
          chemicalTreatment: 'Apply triazole or strobilurin-based fungicides (e.g., azoxystrobin, propiconazole) if infection starts prior to tasseling and weather forecast shows prolonged humidity.',
          preventiveMeasures: [
            'Rotate maize with non-gramineous crops like groundnuts or beans.',
            'Maintain optimal soil potassium levels to improve cellular resilience.',
            'Clean all farming equipment after visiting an infected field.'
          ]
        },
        rice_blast: {
          name: 'Rice Blast',
          scientificName: 'Magnaporthe oryzae',
          crop: 'Rice',
          confidence: 89,
          symptoms: [
            'Diamond-shaped (spindle) lesions on leaves with gray centers and reddish borders',
            'Rotten neck symptoms (dark lesions on the neck node of the panicle)',
            'Partial or total failure of grain filling',
            'Bluish-gray patches on leaf sheaths'
          ],
          organicTreatment: 'Avoid excessive nitrogen fertilization which triggers vegetative susceptibility. Keep paddy fields continuously flooded to reduce disease severity. Plant resistant landraces.',
          chemicalTreatment: 'Use seed treatment fungicides (e.g., tricyclazole, benomyl). Apply foliar sprays at the boot stage and early heading if disease lesions appear on upper leaves.',
          preventiveMeasures: [
            'Burn infected crop residue or compost it far from nurseries.',
            'Sow seeds at recommended densities to allow wind aeration through stalks.',
            'Use certified clean, blast-free seeds.'
          ]
        },
        tomato_blight: {
          name: 'Tomato Late Blight',
          scientificName: 'Phytophthora infestans',
          crop: 'Tomato',
          confidence: 96,
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
          ]
        }
      };

      // Match selected crop / preset, otherwise default to a high-fidelity generic diagnostic
      const fallbackData = fallbacks[diseaseId] || fallbacks['cassava_mosaic'];
      return res.json({
        success: true,
        diagnosis: fallbackData,
        isFallback: true,
        warning: 'Live Gemini scan offline. Displaying detailed local agronomist report.'
      });
    }
  } catch (error: any) {
    console.error('Server diagnostic error:', error);
    res.status(500).json({ error: error.message || 'Server diagnostic failure' });
  }
});

// 3. Voice Assistant / Chat API
app.post('/api/voice-assistant', async (req, res) => {
  const { query, language } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const langNames: Record<string, string> = {
    en: 'English',
    sw: 'Swahili',
    ha: 'Hausa',
    yo: 'Yoruba',
    ig: 'Igbo',
    fr: 'French',
    ar: 'Arabic'
  };

  const selectedLangName = langNames[language || 'en'] || 'English';

  try {
    try {
      const client = getGeminiClient();
      console.log(`Voice query: "${query}" in language: ${selectedLangName}`);

      const systemPrompt = `You are CropMind, the world's leading agricultural expert AI assistant for smallholder farmers. 
Keep your advice highly practical, focused on cheap or organic solutions, clear, and easy to read. 
IMPORTANT: Respond ONLY in the language requested: ${selectedLangName}. 
Keep the response brief, around 80-120 words, so that it can be easily converted to speech or read aloud.`;

      const response = await client.models.generateContent({
        model: 'gemma-4-26b-a4b-it',
        contents: query,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      return res.json({
        success: true,
        response: response.text || 'No response generated.',
        isFallback: false
      });

    } catch (apiError: any) {
      console.warn('Gemini Voice Assistant failed, returning simulated localized guide:', apiError.message);

      // Provide realistic high-fidelity responses in local languages based on keywords
      const lowerQuery = query.toLowerCase();
      let responseText = '';

      if (language === 'sw') {
        if (lowerQuery.includes('maize') || lowerQuery.includes('mahindi')) {
          responseText = "Ili kuzuia kutu kwenye mahindi (Maize Rust), panda mbegu bora zinazostahimili magonjwa mapema mwanzoni mwa msimu. Hakikisha shamba lina mzunguko wa mazao na usizidishe mbolea ya nitrojeni ambayo huvutia fangasi. Ikiwa maambukizi ni makubwa, tumia dawa ya asili kama mafuta ya mwarobaini au sulfur.";
        } else if (lowerQuery.includes('cassava') || lowerQuery.includes('muhogo')) {
          responseText = "Ugonjwa wa mosai ya muhogo (CMD) husambazwa na inzi weupe. Uzuiaji bora ni kupanda pingili zenye afya zilizothibitishwa. Ukiona mmea mmoja una ugonjwa mapema, ung'oe na uuchome moto mbali na shamba ili kuzuia usisambae.";
        } else {
          responseText = "Hujambo! Mimi ni CropMind. Naweza kukusaidia kulinda mazao yako, kupima afya ya udongo, na kukupa ushauri wa kilimo. Je, una swali kuhusu mazao gani leo?";
        }
      } else if (language === 'ha') {
        if (lowerQuery.includes('maize') || lowerQuery.includes('masara')) {
          responseText = "Don magance tsatsar masara, a shuka irin da wuri. Tabbatar kuna juya amfanin gona kuma kada kuyi amfani da takin nitrogen da yawa. Idan cutar ta yi yawa, ana iya amfani da magungunan gargajiya kamar man kuka ko neem.";
        } else {
          responseText = "Sannu! Ni ne CropMind. Zan iya taimaka muku inganta amfanin gonarku da kuma ba ku shawarwari kan noman zamani. Menene kuke son sani yau?";
        }
      } else if (language === 'fr') {
        responseText = "Bonjour! Je suis CropMind, votre agronome virtuel. Pour protéger vos cultures de manioc ou de maïs, utilisez des semences certifiées et éliminez immédiatement les plantes infectées. Comment puis-je vous aider aujourd'hui?";
      } else if (language === 'ar') {
        responseText = "مرحباً! أنا كروب مايند، مرشدك الزراعي الذكي. لمكافحة الآفات وتحسين جودة التربة، ننصحك باستخدام الأسمدة العضوية واتباع نظام الدورة الزراعية. كيف يمكنني مساعدتك اليوم؟";
      } else {
        // English Default
        if (lowerQuery.includes('nitrogen') || lowerQuery.includes('fertilizer')) {
          responseText = "If you notice yellowing leaves from the bottom up, your crops have a nitrogen deficit. For a low-cost organic solution, apply well-composted poultry manure or plant nitrogen-fixing cover crops like cowpeas and beans. Avoid applying synthetic urea right before heavy rainfall to prevent wash-off.";
        } else if (lowerQuery.includes('drought') || lowerQuery.includes('water')) {
          responseText = "To defend against drought, apply a 5cm layer of organic mulch (dry grass or straw) around plant roots. This retains soil moisture by reducing evaporation by up to 60%. Implement drip irrigation during cooler early mornings or evenings.";
        } else if (lowerQuery.includes('pest') || lowerQuery.includes('insect')) {
          responseText = "To control leaf-eating insect pests organically, prepare a neem seed extract spray. Crush 50g of neem seeds per liter of water, let it soak overnight, filter, and add a small drop of mild soap to help it stick to the leaves. Spray weekly on affected areas.";
        } else {
          responseText = "Hello! I am CropMind, your digital agronomist companion. I can help you identify crop diseases, calculate optimal irrigation, monitor field health using satellites, and keep yield records. What farming challenges are you facing today?";
        }
      }

      return res.json({
        success: true,
        response: responseText,
        isFallback: true,
        warning: 'Gemini Assistant offline. Displaying local expert agronomist handbook knowledge.'
      });
    }
  } catch (error: any) {
    console.error('Server voice assistant error:', error);
    res.status(500).json({ error: error.message || 'Server voice assistant failure' });
  }
});

// Vite server middleware integrations
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development middleware loaded.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static server configured.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CropMind Server listening on port ${PORT}`);
  });
}

startServer();
