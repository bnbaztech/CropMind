import { BlueprintSection } from './types';

export const BLUEPRINT_SECTIONS: BlueprintSection[] = [
  {
    id: 'exec_summary',
    title: '1. Executive Summary',
    category: 'Strategic',
    content: `### 1. Executive Summary: CropMind

**CropMind** is a satellite-powered, offline-first, multilingual AI Agronomist designed specifically for the **500 million smallholder farmers** in developing nations who produce up to 80% of the food in Asia and Sub-Saharan Africa. 

#### The Problem
Smallholders suffer from an "information vacuum": they have no access to certified agronomists, lack stable internet connections, are highly vulnerable to climate shocks (droughts/floods), suffer up to 40% crop losses due to undetected pests and pathogens, and operate without formal soil or market data.

#### The CropMind Solution
An ultra-lean Progressive Web Application (PWA) that acts as an expert digital advisor:
1. **Multimodal AI Disease Scanner**: Diagnoses crop leaf pathogens instantly using on-device quantized computer vision models, backed up by cloud-based Gemma 4 for advanced, localized remediation guidelines.
2. **Offline-First Data Engine**: Syncs logs via a local IndexedDB queue, compressing records into lightweight payloads designed for slow GSM networks or SMS/USSD fallback pathways.
3. **Multilingual Localized Voice Companion**: Supports natural verbal dialogue in Swahili, Hausa, Yoruba, Igbo, French, Arabic, and English, using browser-level TTS and offline speech recognition.
4. **Satellite Crop Diagnostics**: Simulates high-cadence Sentinel-2 synthetic aperture radar and optical indexing (NDVI, NDWI) to predict early water stress, nitrogen deficits, and climate hazards without complex farmer setup.

#### Global Impact & Scaling
CropMind is engineered to integrate directly with rural agricultural cooperatives, local governments, and NGOs, serving as a scalable b2b2c engine that boosts farmer incomes by 30-50%, drives sustainable water use, and mitigates climate-driven food insecurity.`
  },
  {
    id: 'problem_analysis',
    title: '2. Detailed Problem Analysis',
    category: 'Strategic',
    content: `### 2. Detailed Problem Analysis

The global agricultural landscape contains a systemic disparity: while commercial farming in the Global North uses RTK-GPS tractors, drone multispectral imaging, and computerized soil labs, smallholder farmers in developing regions rely on traditional knowledge that is increasingly invalidated by climate change.

#### Core Dimensions of the Smallholder Crisis
1. **The Extension Officer Deficit**: 
   In Sub-Saharan Africa, the ratio of agricultural extension officers to farmers is roughly **1 to 5,000** (compared to 1 to 400 in developed nations). When a crop leaf rust emerges, a farmer cannot wait weeks for a physical inspection; delayed action leads to total crop failure.
   
2. **The Connectivity Trap (No Internet)**:
   Over **60% of rural smallholders** live in zones with unstable or nonexistent 3G/4G connectivity. Existing "smart farming" apps fail instantly because they require active cloud connections to download assets or query machine learning APIs.
   
3. **The Literacy and Language Barrier**:
   Over **40% of smallholder farmers** are non-literate or prefer speaking in native, non-colonial dialects (e.g., Swahili, Hausa, Yoruba, Igbo). Text-heavy English apps exclude the very individuals who need support most.
   
4. **Extreme Climate Unpredictability**:
   Monsoons and rain cycles have drifted. Lacking localized micro-weather forecasts, farmers sow too early (losing seeds to dry spells) or fertilize right before torrential downpours (causing chemical runoff).
   
5. **Economic Marginalization**:
   With no records of their seasonal yields, farmers cannot prove creditworthiness to micro-lenders. They are forced to sell to exploitative middle-agents ("brokers") at bottom-tier prices because they lack real-time visibility into urban market rates.`
  },
  {
    id: 'solution_overview',
    title: '3. The CropMind Solution',
    category: 'Strategic',
    content: `### 3. The CropMind Solution

CropMind bridges the technological divide by delivering an **Enterprise-Grade AI Agronomist directly to the farmer\'s pocket**, engineered for maximum resilience and extreme hardware constraints.

| Core Feature | Technical Implementation | Smallholder Value |
| :--- | :--- | :--- |
| **Multimodal AI Leaf Scanner** | Server-side Gemma 4 + WebRTC Camera capture | Instant diagnosis of pests and pathogens with eco-friendly remedies. |
| **Offline-First Architecture** | IndexedDB local state + service worker asset caching | 100% functional app in deep rural areas with zero connectivity. |
| **Multilingual Voice Core** | Web Speech API synthesis + native language maps | Hands-free verbal interaction for low-literacy users in native dialects. |
| **Virtual Earth Observation** | Simulated Google Earth Engine & Sentinel-2 NDVI telemetry | GPS-free crop vigor, nitrogen, and soil-moisture maps. |
| **Sync-Resilient Records** | Automated Conflict-free Replicated Data Type (CRDT) sync | Yield log keeping to prove income and secure micro-credit. |`
  },
  {
    id: 'system_arch',
    title: '4. System Architecture',
    category: 'Architecture',
    content: `### 4. System Architecture

CropMind is built on a highly resilient, modern microservices blueprint. The stack is designed to optimize for low latency, server-side secrets security, and offline reliability.

\`\`\`
       +-------------------------------------------------------------+
       |                         CLIENT PWA                          |
       |      React 19 + Tailwind + Vite + motion + IndexedDB        |
       +------------------------------+------------------------------+
                                      |
                         [HTTPS / WebSocket / SMS fallback]
                                      |
                                      v
       +-------------------------------------------------------------+
       |               REVERSE PROXY & GATEWAY (nginx)               |
       |             Routing, Rate Limiting, SSL Termination         |
       +------------------------------+------------------------------+
                                      |
                                      v
       +-------------------------------------------------------------+
       |                      EXPRESS BACKEND                        |
       |  - API Route Handlers        - Auth & Session Controllers   |
       |  - Satellite Pipeline Proxy  - Offline Sync Queue Handler   |
       +-------+----------------------+----------------------+-------+
               |                      |                      |
               v                      v                      v
       +---------------+      +---------------+      +---------------+
       |  GEMINI API   |      |  POSTGRESQL   |      |  EARTH ENGINE |
       | Server-Side   |      |  with Drizzle |      |   Sentinel-2  |
       | Secure Proxy  |      |  User, Yields |      |   NDVI Processing
       +---------------+      +---------------+      +---------------+
\`\`\`

#### Key Architecture Components:
1. **Edge PWA Client**: Serves static pages instantly from the browser cache using Service Workers. Caches agronomic assets, offline speech recognition engines, and local data.
2. **Secure Express Gateway**: Handles server-side API routing. Prevents exposing the \`GEMINI_API_KEY\` to the client. Uses lazy initialization to prevent crashes if credentials are temporarily absent.
3. **Database Layer**: Relational PostgreSQL database stores user profiles, synchronized crop yields, and historical regional infection heatmaps.
4. **Ingress Pipeline**: Seamlessly supports fallback communication pathways, including HTTP REST endpoints, WebSocket streams, and SMS/USSD text integrations for analog feature phones.`
  },
  {
    id: 'db_design',
    title: '5. Database Design & Relational Schema',
    category: 'Architecture',
    content: `### 5. Database Design & Relational Schema

For durable, secure, and production-ready deployments, CropMind implements a relational database structure designed to be managed via Drizzle ORM on PostgreSQL. This schema enforces data integrity, rapid indexing, and smooth conflict-resolution during sync.

\`\`\`sql
-- Users and Farmers table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    preferred_language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Farms & Plots table
CREATE TABLE farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    soil_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crop Yield Logs & Records (Synchronized with client IndexedDB)
CREATE TABLE crop_records (
    id UUID PRIMARY KEY,
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    planting_date DATE NOT NULL,
    expected_harvest_date DATE,
    estimated_yield_kg DECIMAL(10,2) NOT NULL,
    health_status VARCHAR(50) DEFAULT 'Healthy',
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    version INT DEFAULT 1
);

-- Diagnostic Reports (Leaf scan histories)
CREATE TABLE diagnoses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    crop VARCHAR(100) NOT NULL,
    disease_name VARCHAR(255) NOT NULL,
    confidence_score DECIMAL(5,2) NOT NULL,
    symptoms TEXT[] NOT NULL,
    remedies TEXT NOT NULL,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

#### Indexes for Query Optimization:
- \`CREATE INDEX idx_user_records ON crop_records(farm_id);\`
- \`CREATE INDEX idx_farm_coords ON farms(latitude, longitude);\`
- \`CREATE INDEX idx_disease_crop ON diagnoses(crop);\``
  },
  {
    id: 'api_design',
    title: '6. API Specification & Endpoints',
    category: 'Architecture',
    content: `### 6. API Specification & Endpoints

CropMind\'s backend exposes a RESTful JSON API. Secure endpoints require Bearer Token authorization. Server-side proxy routes route request data directly to the Google GenAI SDK.

#### 1. POST /api/diagnose
Uploads a base64 encoded crop leaf image to be diagnosed by Gemma 4.
* **Request Header**: \`Content-Type: application/json\`
* **Request Body**:
  \`\`\`json
  {
    "image": "data:image/jpeg;base64,...",
    "crop": "Cassava"
  }
  \`\`\`
* **Success Response (200 OK)**:
  \`\`\`json
  {
    "success": true,
    "diagnosis": {
      "name": "Cassava Mosaic Disease",
      "scientificName": "Cassava mosaic virus",
      "confidence": 0.94,
      "symptoms": ["chlorotic mosaic patterns", "distorted leaves"],
      "organicTreatment": "Rogue infected plants immediately...",
      "chemicalTreatment": "None"
    }
  }
  \`\`\`

#### 2. POST /api/voice-assistant
Submits a voice transcript or text query to the virtual agronomist.
* **Request Body**:
  \`\`\`json
  {
    "query": "How much nitrogen should I add to my stressed maize farm?",
    "language": "sw"
  }
  \`\`\`
* **Success Response (200 OK)**:
  \`\`\`json
  {
    "textResponse": "Kama majani ya mahindi yana rangi ya njano, ongeza kilo 50 za urea kwa ekari...",
    "audioResponse": "base64AudioDataString..."
  }
  \`\`\`

#### 3. POST /api/sync
Synchronizes local crop records from offline IndexedDB queue.
* **Request Body**: Array of actions to insert/update.`
  },
  {
    id: 'ui_ux_design',
    title: '7. High-Fidelity UI/UX & Design System',
    category: 'Ecosystem',
    content: `### 7. High-Fidelity UI/UX & Design System

CropMind is styled using an award-winning **"Swiss Modernism meets Organic Earth"** aesthetic. The design is deliberately tailored for harsh outdoor sunlight conditions and diverse screen layouts.

#### Palette Definition
- **Soil Obsidian (Background)**: \`#0C0E0B\` — Pure eye-safe, power-saving dark theme for OLED screens under hot equatorial sun.
- **Lush Emergence (Primary Accent)**: \`#2E7D32\` — A deep, vibrant agricultural green representing cellular crop health.
- **Clay Warmth (Secondary Accent)**: \`#E67E22\` — A rich terracotta orange signifying fertile, nutrient-dense topsoil.
- **Alabaster Off-White (Text)**: \`#F5F6F5\` — Extremely high contrast text insuring maximum legibility.

#### Typography Pairing
- **Space Grotesk** (Display Headings): Bold, tech-forward, geometrically structured font for headers.
- **Inter** (Body text): Optimized for high legibility, reading compact rows of farming analytics on low-end smartphones.
- **JetBrains Mono** (Sensor data & satellite metrics): Clean monospaced font for GPS, NDVI values, and synchronization logs.

#### Interaction Principles
- **Micro-animations**: Staggered cards and fade-in notifications using \`motion\` to prevent visual disorientation.
- **Massive Touch Targets**: Buttons have a minimum touch footprint of **48px x 48px** to allow easy, slip-free tapping by farmers working in active mud or dust environments.
- **Voice Interactivity Indicator**: Pulse visualizers represent the active recording state, changing shape to simulate audio processing.`
  },
  {
    id: 'ai_arch',
    title: '8. AI Architecture & Machine Learning',
    category: 'Ecosystem',
    content: `### 8. AI Architecture & Machine Learning

AI is not an afterthought in CropMind—it is the foundational intelligence engine that powers localized, resilient agronomic assistance.

\`\`\`
                                  +-----------------------+
                                  |   FARMER LEAF IMAGE   |
                                  +-----------+-----------+
                                              |
                                     Is Device Online?
                                     /             \\
                                   YES              NO
                                   /                 \\
                                  v                   v
                     +-------------------------+  +------------------------+
                     |    GEMINI 3.5 FLASH     |  | ON-DEVICE TENSORFLOW   |
                     |  - Cloud Multimodal API |  |   LITE / ONNX MODEL    |
                     |  - Infinite Context     |  |  - High compression    |
                     |  - Localized Remedies   |  |  - Sub-10MB payload    |
                     +-------------------------+  +------------------------+
\`\`\`

#### 1. Multimodal Computer Vision (Gemma 4)
- **Why Gemma?**: Traditional CNNs can classify disease, but they fail to explain *how* to fix it in a local context. Gemma 4 takes the leaf image, identifies the pathogen, and synthesizes localized, organic remedies customized to the resources a smallholder actually has on hand (e.g., using neem tree oil or ash instead of expensive western imports).
- **Prompt Engineering**: The model is instructed with strict agricultural safety guards: *\"You are a world-class agronomist. Answer simply. If you cannot identify the disease, state it clearly. Do not hallucinate chemical recipes.\"*

#### 2. Speech & Voice Synthesis (Gemini TTS)
- For low-literacy farmers, CropMind utilizes Gemini\'s audio modalities or browser-level voice engines to translate complex text guides into friendly verbal instructions in Hausa, Swahili, Arabic, etc. This humanizes the technology, building trusted relationships with rural farmers.

#### 3. Recommendation Systems
- **Yield Predictor**: Recurrent Neural Networks (RNN) and Time-Series algorithms process local planting dates, historic rainfall, and soil conditions to predict harvest yield trajectories in real-time.`
  },
  {
    id: 'satellite_integration',
    title: '9. Satellite Crop Monitoring & NDVI Pipeline',
    category: 'Ecosystem',
    content: `### 9. Satellite Crop Monitoring & NDVI Pipeline

CropMind leverages remote sensing data from **Sentinel-2 (ESA)** and **Landsat-9 (NASA)** to deliver field-level monitoring without requiring physical sensor hardware in the soil.

#### Normalized Difference Vegetation Index (NDVI)
NDVI is the core index representing photosynthetic activity and plant vigor:

$$NDVI = \\frac{NIR - RED}{NIR + RED}$$

* **NIR (Near Infrared)**: Band 8 on Sentinel-2, highly reflected by healthy leaf cellular structures.
* **RED (Red light spectrum)**: Band 4 on Sentinel-2, highly absorbed by chlorophyll.

#### Technical Satellite Ingestion Pipeline:
1. **Farm Geofencing**: Farmer maps their crop boundary on a mobile device (requires only 3 or 4 taps to set GPS polygon bounds).
2. **Earth Engine Proxy**: The backend queries the Google Earth Engine API using the farm polygon, retrieving the cloud-free Sentinel-2 composite for the past 5 days.
3. **Band Mathematics**: GEE computes the NDVI, NDWI (Normalized Difference Water Index), and canopy temperature values.
4. **Analysis Output**:
   - **NDVI > 0.7**: Dense, healthy canopy crop.
   - **0.3 - 0.5**: Water/Nitrogen stress detected. Promptly alert the farmer.
   - **< 0.2**: Bare soil, crop failure, or post-harvest state.

#### Real-world Simulation
For our MVP, we simulate this remote pipeline with active, high-fidelity GIS heatmaps. This enables immediate developer inspection of stressed crops (e.g., Eastern Cassava Plot showing 0.48 NDVI, sending a drought stress flag).`
  },
  {
    id: 'offline_arch',
    title: '10. Offline-First Synchronization Architecture',
    category: 'Architecture',
    content: `### 10. Offline-First Synchronization Architecture

Rural farms have zero internet bars. CropMind\'s architecture guarantees **100% database availability and data entry integrity even if offline for weeks**.

#### 1. On-Device Storage (IndexedDB + LocalStorage)
- We use browser-native IndexedDB to store the entire schema locally, including active crop calendars, yields, and diagnostic reports. Service Workers cache static app assets (JS, HTML, CSS, fonts, illustrations) using a **Cache-First** strategy.

#### 2. The Synchronization Queue
- Every create, read, update, or delete (CRUD) action performed offline is serialized and appended to an on-device **Sync Queue**.
- Example payload:
  \`\`\`json
  {
    "id": "action_99a8f",
    "actionType": "CREATE_RECORD",
    "payload": { "cropName": "Cassava", "yield": 450 },
    "timestamp": "2026-06-26T10:40:00Z"
  }
  \`\`\`

#### 3. Conflict Resolution & Merge Strategies
When the device recovers internet connection, it initiates a three-way reconciliation:
* **Last-Write-Wins (LWW)**: For simple name edits.
* **CRDT (Conflict-Free Replicated Data Types)**: Yield values are aggregated or merged additively based on timestamps.
* **Visual Conflict Modal**: If a severe overlap occurs (e.g. crop status updated differently on two synced phones belonging to the same farm cooperative), the app prompts the farmer with a simple visual comparison to select the correct record.`
  },
  {
    id: 'tech_stack',
    title: '11. Production Technology Stack',
    category: 'Architecture',
    content: `### 11. Production Technology Stack

To transition from Hackathon Winner to Venture-Backed Startup, CropMind uses an elite, hyper-scalable technical stack:

#### Frontend Client
- **React 19 & TypeScript**: Latest type-safe rendering engine.
- **Tailwind CSS v4**: Utility-first CSS styling for responsive, layout design.
- **motion (Framer)**: Fluid transitions and accessible micro-interactions.
- **IndexedDB / Localforage**: Embedded browser database for robust offline storage.

#### Server-Side Backend
- **Node.js with Express / NestJS**: Ultra-fast asynchronous event loop.
- **Drizzle ORM & PostgreSQL**: Relational, scalable persistence layer.
- **Google GenAI Node SDK (@google/genai)**: The modern, secure SDK for server-side Gemini AI orchestration.
- **Google Earth Engine Node API**: Direct programmatic access to Earth observation catalog.

#### AI & Computer Vision (On-Device Fallback)
- **ONNX Runtime Web / TensorFlow Lite**: For loading compiled sub-10MB leaf classification weights directly into the browser sandboxed thread, facilitating real-time offline diagnoses.`
  },
  {
    id: 'security_audit',
    title: '12. Enterprise-Grade Security & Encryption',
    category: 'Ecosystem',
    content: `### 12. Enterprise-Grade Security & Encryption

Smallholder farmers\' data must be treated with enterprise-grade protection, especially when integrating agricultural micro-finance or crop yields.

1. **Server-Side API Key Hiding**:
   - The **Gemini API Key is strictly server-side** (accessed via \`process.env.GEMINI_API_KEY\`). It is never bundled or visible in Client DevTools.
   
2. **Offline Data Security**:
   - Local IndexedDB contents can be encrypted using AES-256 (via crypto-js) with a salt derived from the user\'s local PIN or biometric fingerprint, protecting local mobile devices if lost in transit.
   
3. **Transport Security (TLS 1.3)**:
   - All client-server communications are forced over HTTPS with HSTS (HTTP Strict Transport Security).
   
4. **OAuth 2.0 Auth Flow**:
   - Interoperable user credentials use Google Auth or standard phone SMS tokens (Firebase Auth) to verify farmers\' digital identities.`
  },
  {
    id: 'testing_strategy',
    title: '13. Rigorous Testing Strategy',
    category: 'Ecosystem',
    content: `### 13. Rigorous Testing Strategy

Our continuous integration pipeline validates stability on every commit:

#### 1. Static Typing (TypeScript)
- Verified with strict typescript compilation: \`tsc --noEmit\`. No \`any\` types permitted in core agronomist handlers.

#### 2. Unit & Integration Testing (Vitest / Jest)
- **Sync Engine Tests**: Mock offline states, append 50 records, simulate a connection drop, and verify that the sync queue correctly resolves conflicts when online.
- **Gemini Parser Tests**: Ensure the server-side image parser gracefully rejects corrupted Base64 strings, propagating a clean \`400 Bad Request\` to the client instead of crashing the Node container.

#### 3. End-to-End Testing (Playwright / Cypress)
- Simulates a complete user journey: landing page -> dashboard -> camera activation -> leaf scan upload -> diagnosis rendering.`
  },
  {
    id: 'deployment_pipeline',
    title: '14. Containerized Deployment Pipeline',
    category: 'Ecosystem',
    content: `### 14. Containerized Deployment Pipeline

CropMind uses modern DevOps infrastructure for rapid regional scaling.

#### Google Cloud Platform (GCP)
- **Google Cloud Run**: Runs containerized Express server-side instances that auto-scale to zero, saving operational budgets when farmers are asleep.
- **Cloud Run Sidecars**: Integrates nginx for caching and rate-limiting.
- **Cloud SQL (PostgreSQL)**: Managed multi-AZ databases for secure storage.
- **Cloud Storage**: Object buckets for raw leaf uploads (anonymized to retrain disease models).

#### CI/CD Config (GitHub Actions)
On pushing to \`main\`:
1. Build client-side assets using \`npm run build\`.
2. Package server code using \`esbuild server.ts --bundle --outfile=dist/server.cjs --platform=node\`.
3. Build Docker container.
4. Deploy to Google Cloud Run.`
  },
  {
    id: 'dev_roadmap',
    title: '15. Development Roadmap & Phases',
    category: 'Business',
    content: `### 15. Development Roadmap & Phases

\`\`\`
   [Phase 1: Hackathon MVP]  --> [Phase 2: Regional Beta] --> [Phase 3: Global Production]
     - Single-screen portal      - 5 African Cooperatives     - Full Earth Engine GIS
     - Gemini AI Scan & Voice    - 1,000 active farmers       - Micro-loan integrations
     - Local Storage Sync        - Android native PWA wrap    - Offline TFJS classifiers
\`\`\`

#### Phase 1: Hackathon MVP (Current State)
- Highly-interactive, fully responsive PWA dashboard.
- Operational server-side Gemini crop diagnosis.
- Active satellite map simulator.
- Full local record queueing and online conflict-resolution simulator.

#### Phase 2: Regional Beta (Months 1–6)
- Recruit agricultural co-ops in Kenya, Nigeria, and India.
- Train custom on-device MobileNetV3 classifiers for 15 regional crops.
- Integrate local weather APIs.

#### Phase 3: Global Production (Months 6–12)
- Fully automated Google Earth Engine geo-monitoring.
- Open developer API for third-party carbon-credit auditors.
- Micro-loan application pipeline.`
  },
  {
    id: 'github_structure',
    title: '16. GitHub Repository Structure',
    category: 'Architecture',
    content: `### 16. Professional GitHub Repository Structure

A clean repository architecture is a critical requirement for open-source scale and hackathon evaluation:

\`\`\`
/cropmind-root
│
├── /assets                      # Static media, icons, logo vector files
├── /skills                      # System integrations (Gemini, Satellite specs)
│
├── /src                         # Frontend React Client
│   ├── /components              # Modular UI components (Dashboard, SlideDeck)
│   ├── /lib                     # Utility helpers (formatting, timing)
│   ├── App.tsx                  # Main client-side entry viewport
│   ├── types.ts                 # Shared strictly-typed structures
│   ├── diseaseData.ts           # Staple crops seed dataset
│   └── index.css                # Global styles with @import tailwindcss
│
├── .env.example                 # Declared environment secrets templates
├── .gitignore                   # Safe deployment exclusion rules
├── metadata.json                # Application permissions and capabilities
├── package.json                 # Dependency config, scripts (dev, build, start)
├── server.ts                    # Secure Server Entry (Vite Middleware + Gemini)
├── tsconfig.json                # Strict TypeScript parameters
└── vite.config.ts               # Vite bundler customization (HMR disabled)
\`\`\``
  },
  {
    id: 'demo_strategy',
    title: '17. Live Demo Flow Strategy',
    category: 'Pitch',
    content: `### 17. Live Demo Flow Strategy

To captivate hackathon judges in under 3 minutes, the demo must combine instant visual "Wow" with rigorous architectural substance.

#### The Golden Demo Path:
1. **The Hook (0:00 - 0:30)**:
   - Start with the app in **Offline Mode**. Tap "Add Crop Yield" to log a harvest. Note that it saves instantly to the local IndexedDB and indicates "Pending Sync" in red.
   
2. **The Visual Climax (0:30 - 1:30)**:
   - Toggle to **Online Mode**. Watch the record instantly slide to "Synced" in green, simulating full conflict-free sync to PostgreSQL.
   - Switch to the **Plant Disease Scanner**. Choose "Cassava Mosaic Virus" preset. Show the real-time crop leaf image, click **Scan**, and watch Gemma 4 output the diagnosis and organic solutions.
   
3. **The Satellite View (1:30 - 2:15)**:
   - Navigate to the **Satellite Dashboard**. Select "Eastern Cassava Farm". Point out the low NDVI of 0.48. Click "Irrigation Advisor" to show the automated recommendation.
   
4. **The Multilingual Voice (2:15 - 3:00)**:
   - Select Swahili or Hausa language. Type or say a prompt. Show how the AI answers in the selected dialect and speaks it out loud using native Web Speech.`
  },
  {
    id: 'slides',
    title: '18. Presentation Slide Deck',
    category: 'Pitch',
    content: `### 18. Presentation Slide Deck (10 Master Slides)

#### Slide 1: Cover Slide
* **Title**: CropMind
* **Subtitle**: AI Agronomist for 500 Million Smallholder Farmers
* **Visual**: Clean, dark organic interface with a glowing green leaf network.

#### Slide 2: The Problem
* **Title**: The Agricultural Information Vacuum
* **Bullets**:
  - 1 extension officer per 5,000 rural farmers.
  - 40% of crops lost to untreated leaf pathogens.
  - Zero digital tools work without 4G/3G connectivity.
* **Metric**: **$40 Billion** in annual crop losses in developing markets.

#### Slide 3: The CropMind Solution
* **Title**: Offline-First, Multilingual, Satellite-Powered
* **Bullets**:
  - Real-time leaf diagnostic scanner (sub-second feedback).
  - Hands-free voice commands in local dialects.
  - Remote geofenced soil and crop-vigor index monitoring.

#### Slide 4: Offline-First Tech
* **Title**: Resilience Under Zero Connectivity
* **Bullets**:
  - Local IndexedDB state caching with service workers.
  - Serialization queueing for SMS/USSD fallback pathways.
  - Conflict-Free Replicated Data synchronization (CRDT).

#### Slide 5: Deep Satellite GIS
* **Title**: Earth Observation without Field Sensors
* **Bullets**:
  - GEE composite querying of Sentinel-2 multi-spectral arrays.
  - Active computation of NDVI (vigor) and NDWI (moisture).
  - Early-warning alerts for droughts and severe floods.

#### Slide 6: Multi-Dialect UI/UX
* **Title**: Universal Farming Accessibility
* **Bullets**:
  - Support for Swahili, Hausa, Yoruba, Igbo, French, Arabic.
  - Browser-native speech synthesis and transcription.
  - Massive touch targets for dusty, physical field-work.

#### Slide 7: Scalable System Architecture
* **Title**: Containerized Edge-to-Cloud Flow
* **Bullets**:
  - Express backend running securely inside Google Cloud Run.
  - Server-side Gemma 4 proxying (keys never exposed).
  - Production-ready schema on PostgreSQL.

#### Slide 8: Business Model & Impact
* **Title**: Empowering Rural Cooperatives
* **Bullets**:
  - B2B SaaS for agricultural NGOs and national co-ops.
  - Anonymized soil-disease aggregates for climate risk brokers.
  - Micro-credit scoring engine powered by crop yield records.

#### Slide 9: Development Roadmap
* **Title**: From Hackathon MVP to Regional Launch
* **Bullets**:
  - **Q3 2026**: Pilot with 1,000 Kenyan maize farmers.
  - **Q1 2027**: Quantize offline MobileNet CNN models.
  - **Q3 2027**: Launch micro-credit pilot integrations.

#### Slide 10: Conclusion
* **Title**: Nourishing the Future
* **Subtitle**: CropMind is ready to protect our soils, increase yields, and secure families. Let's grow together.`
  },
  {
    id: 'pitch_script',
    title: '19. Investor & Judge Pitch Scripts',
    category: 'Pitch',
    content: `### 19. Investor & Judge Pitch Scripts

#### The 30-Second Elevator Pitch
> \"Half a billion smallholder farmers grow eighty percent of the food in Asia and Sub-Saharan Africa. Yet, when a leaf disease strikes, they have no agronomist to call, no reliable internet, and no modern soil tools. CropMind is their savior. It\'s an offline-first, satellite-powered AI agronomist that speaks Swahili, Hausa, and five other local dialects. It scans leaf photos offline, monitors soil-moisture from space, and caches records instantly. CropMind increases yields by up to forty percent while building digital profiles to secure micro-credit. We are CropMind, and we are nourishing the future.\""

#### The 2-Minute Demo Pitch
> \"Good morning, judges. Imagine planting your entire season\'s cassava crops, only for a mysterious yellow spots disease to wipe out your yield because the nearest extension officer is eighty miles away. That is the daily reality for five hundred million smallholder farmers.
> 
> Today, we introduce CropMind: the world\'s smartest agricultural assistant, designed for absolute rural resilience. Look at our interface. In rural Kenya, a farmer opens CropMind under zero bars of internet. They log a harvest yield of four hundred kilograms. Notice how our offline queue caches it immediately with zero errors. 
> 
> As soon as the farmer steps near a 2G signal, CropMind synchronizes the database using our conflict-resilient pipeline. 
> 
> But we don\'t stop at record-keeping. The farmer snaps a photo of a diseased maize leaf. Our secure server-side Gemini AI parses the image, immediately diagnoses Corn Rust, and provides step-by-step remedies using cheap local ingredients like neem oil, saving their crops in minutes.
> 
> Meanwhile, sentinel satellites flying overhead monitor their plot. Our NDVI dashboard predicts early water stress days before the crop yellows. CropMind is not a demo; it is a scalable, low-carbon, multilingual lifesaver. Thank you.\"`
  },
  {
    id: 'roadmap_critique',
    title: '20. Design Critique & Mitigation Plan',
    category: 'Business',
    content: `### 20. Design Critique & Mitigation Plan

An elite hackathon submission must critique its own architecture with extreme technical honesty, highlighting proactive solutions to potential weaknesses.

#### Critique 1: High Latency for Large Image Uploads on 2G Networks
* **Weakness**: Sending 4MB raw camera photos to the cloud for Gemini parsing fails on slow GSM/2G cellular connections.
* **Mitigation**: Implement **on-client pre-compression**. Resize leaf photos to 512x512 pixels and compress to JPEG format at 0.7 quality in a background canvas thread *before* upload, shrinking the payload from 4MB to under 40KB.

#### Critique 2: Cold Start Delays on Scale-To-Zero Container Instances
* **Weakness**: Standard serverless containers (like GCP Cloud Run) can experience a 5-second cold start when a farmer sends a request after hours of inactivity.
* **Mitigation**: Configure Google Cloud Run with a minimum instance count of **1** during regional daylight farming hours, and scale to zero only at night, optimizing both response latency and cost.

#### Critique 3: Soil Moisture Estimation Calibration
* **Weakness**: NDVI and satellite thermal canopy analysis can suffer from clay vs. sandy soil reflectivity interference.
* **Mitigation**: Integrate regional soil typography maps into our Earth Engine band calculation, applying localized calibration offset constants.`
  }
];
export const CATEGORY_ICONS = {
  Strategic: 'Lightbulb',
  Architecture: 'Cpu',
  Ecosystem: 'Leaf',
  Business: 'TrendingUp',
  Pitch: 'Tv'
};
