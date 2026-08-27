/**
 * Orbital Editorial data layer: credible polar-science records with compact,
 * factual metadata so every portal reads like one connected research observatory.
 */
export type ResearchStatus = "published" | "pending" | "revision";
export type Region = "Arctic" | "Antarctica" | "Southern Ocean" | "Both Poles";
export type ExpeditionStatus = "active" | "upcoming" | "completed";
export type MediaType = "Image" | "Video" | "Infographic";

export interface ResearchResource {
  id: string;
  title: string;
  region: Region;
  topic: string;
  authors: string;
  institution: string;
  year: number;
  description: string;
  tags: string[];
  status: ResearchStatus;
  submittedAt: string;
  views: number;
}

export interface Expedition {
  id: string;
  name: string;
  region: Region;
  location: string;
  coordinates: string;
  objective: string;
  team: string;
  dates: string;
  status: ExpeditionStatus;
  marker: { x: number; y: number };
  researchIds: string[];
  mediaIds: string[];
}

export interface MediaAsset {
  id: string;
  title: string;
  type: MediaType;
  region: Region;
  tags: string[];
  credit: string;
  date: string;
  hue: string;
  caption: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  simple: string;
  scientific: string;
  facts: string[];
  relatedResearchId: string;
  relatedMediaId: string;
  icon: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
}

export interface DirectoryPerson {
  id: string;
  name: string;
  email: string;
  role: "Explorer" | "Researcher" | "Educator" | "Editor";
  status: "Active" | "Disabled";
  joined: string;
  affiliation: string;
}

export const initialResearch: ResearchResource[] = [
  { id: "cry-241", title: "Antarctic Ice Sheet Dynamics and Mass Balance", region: "Antarctica", topic: "Glaciology", authors: "Dr. Meera Nair, Dr. S. R. Iyer", institution: "National Centre for Polar & Ocean Research", year: 2025, description: "Satellite altimetry, gravity and field observations reveal contrasting mass-balance signals across East Antarctica.", tags: ["Ice sheets", "Altimetry", "Mass balance"], status: "published", submittedAt: "12 Apr 2025", views: 18240 },
  { id: "arc-118", title: "Satellite-Based Monitoring of Arctic Sea Ice", region: "Arctic", topic: "Earth Observation", authors: "Dr. Aditi Kapur, Prof. Lars Nielsen", institution: "Indian Institute of Remote Sensing", year: 2026, description: "A seasonal record of sea-ice concentration, lead formation and coastal change derived from multi-sensor imagery.", tags: ["Sea ice", "Satellites", "Climate"], status: "published", submittedAt: "04 Feb 2026", views: 16650 },
  { id: "soc-067", title: "Southern Ocean Temperature Variability", region: "Southern Ocean", topic: "Oceanography", authors: "Dr. Kabir Sen, Dr. Hannah Wright", institution: "National Institute of Ocean Technology", year: 2024, description: "Drifting instruments describe how the Southern Ocean stores and transfers heat around the Antarctic margin.", tags: ["Ocean heat", "Argo", "Climate"], status: "published", submittedAt: "19 Nov 2024", views: 12810 },
  { id: "atm-309", title: "Katabatic Wind Corridors at Bharati Station", region: "Antarctica", topic: "Atmospheric Science", authors: "Dr. Ritu Malhotra", institution: "Indian Meteorological Department", year: 2025, description: "High-resolution station observations identify persistent wind corridors affecting logistics and local snow transport.", tags: ["Winds", "Field stations", "Snow"], status: "published", submittedAt: "28 Aug 2025", views: 7240 },
  { id: "eco-155", title: "Arctic Tundra Greening Across Svalbard", region: "Arctic", topic: "Ecosystems", authors: "Dr. Karan Bhatt, Dr. Freya Olsen", institution: "Norwegian Polar Institute", year: 2024, description: "A decade of spectral observations links earlier snowmelt with changing plant productivity in high Arctic valleys.", tags: ["Tundra", "Vegetation", "Snowmelt"], status: "published", submittedAt: "07 Jun 2024", views: 6910 },
  { id: "geo-212", title: "Mapping Subglacial Lakes in East Antarctica", region: "Antarctica", topic: "Geophysics", authors: "Dr. Ishita Rao", institution: "British Antarctic Survey", year: 2023, description: "Radar transects refine the boundaries and drainage connections of several buried East Antarctic lakes.", tags: ["Radar", "Subglacial", "Geophysics"], status: "published", submittedAt: "15 Sep 2023", views: 9920 },
  { id: "bio-441", title: "Krill Distribution at the Seasonal Ice Edge", region: "Southern Ocean", topic: "Marine Biology", authors: "Dr. Sanjana Menon, Dr. Diego Alvarez", institution: "Australian Antarctic Division", year: 2025, description: "Acoustic transects trace krill aggregation patterns where retreating seasonal sea ice meets open water.", tags: ["Krill", "Food webs", "Sea ice"], status: "published", submittedAt: "22 Jan 2025", views: 11050 },
  { id: "cli-188", title: "Permafrost Temperature Signals in Ny-Ålesund", region: "Arctic", topic: "Climate", authors: "Dr. Noor Ahmad", institution: "University Centre in Svalbard", year: 2026, description: "Borehole temperature records show how winter warming is altering shallow permafrost response.", tags: ["Permafrost", "Temperature", "Arctic"], status: "published", submittedAt: "30 Mar 2026", views: 5810 },
  { id: "orb-057", title: "Cloud-Screened Albedo Retrievals over the Ross Ice Shelf", region: "Antarctica", topic: "Earth Observation", authors: "Dr. Aditya Sharma", institution: "Space Applications Centre", year: 2024, description: "A cloud-screening workflow improves daily albedo estimates across a persistently cloudy ice-shelf environment.", tags: ["Albedo", "Remote sensing", "Ross"], status: "published", submittedAt: "10 Oct 2024", views: 8450 },
  { id: "oce-801", title: "Carbon Uptake in the Weddell Gyre", region: "Southern Ocean", topic: "Oceanography", authors: "Dr. Leena D’Souza, Prof. Mark Chen", institution: "Indian National Centre for Ocean Information Services", year: 2025, description: "Autonomous floats document strong seasonal variability in carbon uptake within the Weddell Gyre.", tags: ["Carbon", "Weddell Sea", "Floats"], status: "published", submittedAt: "02 May 2025", views: 10430 },
  { id: "wil-095", title: "Polar Bear Habitat Connectivity in Baffin Bay", region: "Arctic", topic: "Wildlife", authors: "Dr. Elena Kovacs", institution: "Greenland Institute of Natural Resources", year: 2023, description: "Movement pathways suggest that fragmented spring ice is changing access between feeding and denning areas.", tags: ["Wildlife", "Sea ice", "Baffin Bay"], status: "published", submittedAt: "16 Feb 2023", views: 13740 },
  { id: "ice-626", title: "Meltwater Routing on the Larsen C Ice Shelf", region: "Antarctica", topic: "Glaciology", authors: "Dr. Priya Venkataraman", institution: "National Centre for Polar & Ocean Research", year: 2026, description: "Surface hydrology mapping identifies recurring meltwater pathways and their relation to crevasse fields.", tags: ["Meltwater", "Larsen C", "Ice shelf"], status: "published", submittedAt: "14 May 2026", views: 3870 },
  { id: "atm-411", title: "Ozone Recovery Signals over Maitri", region: "Antarctica", topic: "Atmospheric Science", authors: "Dr. Aisha Rahman", institution: "Indian Meteorological Department", year: 2024, description: "Balloon and spectrometer observations examine springtime ozone recovery signals over coastal Dronning Maud Land.", tags: ["Ozone", "Atmosphere", "Maitri"], status: "published", submittedAt: "08 Dec 2024", views: 6010 },
  { id: "arc-702", title: "Wave–Ice Interaction in the Fram Strait", region: "Arctic", topic: "Oceanography", authors: "Dr. Naveen Pillai, Dr. Ingrid Solheim", institution: "Norwegian Polar Institute", year: 2025, description: "Buoy observations capture how open-water waves propagate into a rapidly evolving marginal ice zone.", tags: ["Waves", "Fram Strait", "Buoys"], status: "published", submittedAt: "21 Jul 2025", views: 9160 },
  { id: "gen-236", title: "Genomic Diversity of Antarctic Moss Beds", region: "Antarctica", topic: "Ecosystems", authors: "Dr. Jaya Pillai", institution: "National Centre for Cell Science", year: 2023, description: "Genetic sequencing characterises drought-tolerant moss communities in Antarctic coastal oases.", tags: ["Moss", "Genomics", "Ecosystems"], status: "published", submittedAt: "04 Apr 2023", views: 4130 },
  { id: "sci-084", title: "Sea-Ice Thickness from L-Band Radiometry", region: "Both Poles", topic: "Earth Observation", authors: "Dr. Anil Deshmukh, Prof. Yuki Tanaka", institution: "Space Applications Centre", year: 2026, description: "A comparative retrieval approach evaluates L-band observations against field thickness surveys in both hemispheres.", tags: ["Radiometry", "Sea ice", "Sensors"], status: "published", submittedAt: "01 Apr 2026", views: 7740 },
  { id: "soc-315", title: "Nutrient Pathways Along the Kerguelen Plateau", region: "Southern Ocean", topic: "Marine Biology", authors: "Dr. Shruti Vaid", institution: "National Institute of Ocean Technology", year: 2024, description: "Water-column sampling reveals how topographic mixing shapes seasonal nutrient supply to surface ecosystems.", tags: ["Nutrients", "Kerguelen", "Plankton"], status: "published", submittedAt: "12 Jan 2024", views: 5880 },
  { id: "cli-522", title: "Rain-on-Snow Events in Coastal Antarctica", region: "Antarctica", topic: "Climate", authors: "Dr. Vivek Chandra", institution: "Indian Institute of Tropical Meteorology", year: 2025, description: "Event analysis links unusual winter rain episodes to short-lived intrusions of warm maritime air.", tags: ["Rain on snow", "Extremes", "Coast"], status: "published", submittedAt: "17 Sep 2025", views: 6560 },
  { id: "arc-903", title: "Indigenous Observations of Changing Sea Ice Routes", region: "Arctic", topic: "Community Knowledge", authors: "Dr. Maya Verma, Aputi Nattiaq", institution: "Arctic Community Research Network", year: 2024, description: "Community interviews and route mapping document changes to local sea-ice travel knowledge in Nunavut.", tags: ["Community", "Sea ice", "Routes"], status: "published", submittedAt: "11 May 2024", views: 12180 },
  { id: "sub-031", title: "Winter Sea-Ice Fracture Patterns near Princess Astrid Coast", region: "Antarctica", topic: "Glaciology", authors: "Dr. Arjun Mehta, Dr. Nila Bose", institution: "National Centre for Polar & Ocean Research", year: 2026, description: "A proposed analysis of winter fracture propagation that combines synthetic-aperture radar sequences with coastal field logs.", tags: ["Sea ice", "SAR", "Fractures"], status: "pending", submittedAt: "18 Aug 2026", views: 0 },
];

export const initialExpeditions: Expedition[] = [
  { id: "xli-ant", name: "XLI Indian Antarctic Expedition", region: "Antarctica", location: "Prydz Bay", coordinates: "69.40°S, 76.19°E", objective: "Monitor coastal ice-sheet change and sustain station observations.", team: "34 researchers · 11 logistics staff", dates: "Nov 2025 — Mar 2026", status: "active", marker: { x: 57, y: 58 }, researchIds: ["cry-241", "atm-309"], mediaIds: ["med-01", "med-08"] },
  { id: "arc-sval", name: "Himalayan Arctic Programme", region: "Arctic", location: "Ny-Ålesund, Svalbard", coordinates: "78.92°N, 11.93°E", objective: "Track snow, permafrost and ecosystem response through the Arctic summer.", team: "12 researchers · 5 students", dates: "Jun 2026 — Sep 2026", status: "upcoming", marker: { x: 34, y: 24 }, researchIds: ["cli-188", "eco-155"], mediaIds: ["med-03", "med-12"] },
  { id: "wed-south", name: "Weddell Gyre Mooring Recovery", region: "Southern Ocean", location: "Weddell Sea", coordinates: "68.50°S, 30.00°W", objective: "Recover deep-ocean moorings and service autonomous float deployments.", team: "18 ocean scientists", dates: "Jan 2026 — Feb 2026", status: "completed", marker: { x: 43, y: 64 }, researchIds: ["oce-801", "soc-067"], mediaIds: ["med-02", "med-11"] },
  { id: "ross-shelf", name: "Ross Ice Shelf Traverse", region: "Antarctica", location: "Ross Ice Shelf", coordinates: "82.00°S, 170.00°W", objective: "Validate satellite albedo products along a ground-survey traverse.", team: "9 glaciologists", dates: "Oct 2026 — Dec 2026", status: "upcoming", marker: { x: 27, y: 70 }, researchIds: ["orb-057"], mediaIds: ["med-04"] },
  { id: "fram-wave", name: "Fram Strait Ice–Wave Survey", region: "Arctic", location: "Fram Strait", coordinates: "79.50°N, 4.00°W", objective: "Deploy wave buoys across the marginal ice zone.", team: "16 oceanographers", dates: "Apr 2026 — May 2026", status: "active", marker: { x: 45, y: 20 }, researchIds: ["arc-702"], mediaIds: ["med-06", "med-09"] },
  { id: "kerg-plateau", name: "Kerguelen Plateau Biogeochemistry", region: "Southern Ocean", location: "Kerguelen Plateau", coordinates: "49.40°S, 69.20°E", objective: "Sample seasonal nutrient pathways over ocean ridge topography.", team: "22 marine scientists", dates: "Feb 2025 — Apr 2025", status: "completed", marker: { x: 68, y: 79 }, researchIds: ["soc-315"], mediaIds: ["med-13"] },
  { id: "baffin-connect", name: "Baffin Bay Habitat Survey", region: "Arctic", location: "Baffin Bay", coordinates: "72.00°N, 66.00°W", objective: "Document wildlife habitat connectivity during spring breakup.", team: "8 wildlife scientists", dates: "Mar 2026 — Jun 2026", status: "active", marker: { x: 18, y: 29 }, researchIds: ["wil-095"], mediaIds: ["med-07"] },
  { id: "larsen-melt", name: "Larsen C Surface Hydrology Camp", region: "Antarctica", location: "Larsen C Ice Shelf", coordinates: "67.50°S, 62.00°W", objective: "Map seasonal meltwater routing and crevasse interaction.", team: "14 glaciologists", dates: "Dec 2025 — Feb 2026", status: "completed", marker: { x: 39, y: 62 }, researchIds: ["ice-626"], mediaIds: ["med-15"] },
  { id: "maitri-ozone", name: "Maitri Atmospheric Watch", region: "Antarctica", location: "Schirmacher Oasis", coordinates: "70.77°S, 11.73°E", objective: "Continue vertical atmospheric composition and ozone observations.", team: "7 atmospheric scientists", dates: "All year 2026", status: "active", marker: { x: 52, y: 65 }, researchIds: ["atm-411"], mediaIds: ["med-17"] },
  { id: "nunavut-routes", name: "Nunavut Sea-Ice Routes Exchange", region: "Arctic", location: "Pond Inlet", coordinates: "72.70°N, 77.97°W", objective: "Bring community route knowledge and satellite observations into dialogue.", team: "10 community partners", dates: "Aug 2025 — Sep 2025", status: "completed", marker: { x: 15, y: 23 }, researchIds: ["arc-903"], mediaIds: ["med-19"] },
];

const mediaTitles: Array<[string, MediaType, Region, string[], string, string]> = [
  ["Blue shadows across a pressure ridge", "Image", "Arctic", ["Sea ice", "Fieldwork"], "POLARIS Field Archive", "A late-afternoon transect reveals the geometry of multi-year ice."],
  ["Under the Weddell ice edge", "Video", "Southern Ocean", ["Ocean", "Expedition"], "RV Sagar Nidhi Visual Log", "Sub-surface imagery collected during mooring recovery."],
  ["Seasonal pulse: Arctic ice extent", "Infographic", "Arctic", ["Climate", "Satellites"], "POLARIS Data Studio", "A visual guide to seasonal sea-ice change."],
  ["White horizon, Ross Ice Shelf", "Image", "Antarctica", ["Ice shelf", "Traverse"], "Ross Traverse Archive", "A survey team crosses a vast, wind-carved shelf."],
  ["How radar sees through cloud", "Infographic", "Both Poles", ["Earth observation", "Radar"], "POLARIS Learning Lab", "A diagram of satellite radar over snow and ice."],
  ["Wave buoy deployment in Fram Strait", "Video", "Arctic", ["Ocean", "Expedition"], "Fram Strait Survey", "A buoy is released at the shifting ice edge."],
  ["A quiet bear track on coastal ice", "Image", "Arctic", ["Wildlife", "Sea ice"], "Baffin Bay Survey", "Field documentation of polar bear habitat use."],
  ["Aurora over Bharati station", "Image", "Antarctica", ["Station", "Atmosphere"], "Bharati Observatory", "A winter sky sequence from the station perimeter."],
  ["When waves meet ice", "Infographic", "Arctic", ["Waves", "Sea ice"], "POLARIS Data Studio", "A simple explainer of an energetic marginal ice zone."],
  ["Learning from changing routes", "Video", "Arctic", ["Community", "Knowledge"], "Arctic Community Research Network", "Community researchers map an evolving travel landscape."],
  ["Float 839: an ocean profile", "Infographic", "Southern Ocean", ["Argo", "Ocean heat"], "Southern Ocean Array", "Temperature and salinity layers from a drifting float."],
  ["Midnight sun over Ny-Ålesund", "Image", "Arctic", ["Field station", "Summer"], "Himalayan Arctic Programme", "A long daylight field day at the Arctic observatory."],
  ["Plankton bloom over Kerguelen", "Image", "Southern Ocean", ["Biology", "Ocean"], "Kerguelen Survey", "Colour-bearing water signals a changing biological season."],
  ["The life of an ice-core sample", "Video", "Antarctica", ["Glaciology", "Education"], "POLARIS Learning Lab", "From field drilling to laboratory analysis."],
  ["Meltwater channels on Larsen C", "Image", "Antarctica", ["Meltwater", "Ice shelf"], "Larsen C Camp", "Aerial documentation of blue surface-water pathways."],
  ["Polar orbit, polar insight", "Infographic", "Both Poles", ["Satellites", "Orbit"], "POLARIS Data Studio", "How repeated satellite passes become a climate record."],
  ["Launching a weather balloon at Maitri", "Video", "Antarctica", ["Atmosphere", "Station"], "Maitri Atmospheric Watch", "A short field log from a spring balloon launch."],
  ["Antarctic moss under a hand lens", "Image", "Antarctica", ["Ecosystems", "Biology"], "Coastal Oasis Study", "Tiny moss beds thrive in an exposed coastal oasis."],
  ["Sea-ice routes: oral history atlas", "Infographic", "Arctic", ["Community", "Routes"], "Arctic Community Research Network", "Stories and mapped knowledge travel together."],
  ["Southern Ocean, one connected system", "Video", "Southern Ocean", ["Climate", "Ocean"], "POLARIS Learning Lab", "An introduction to the circulation surrounding Antarctica."],
];

export const mediaAssets: MediaAsset[] = mediaTitles.map(([title, type, region, tags, credit, caption], index) => ({
  id: `med-${String(index + 1).padStart(2, "0")}`,
  title, type, region, tags, credit, date: `${String((index % 12) + 1).padStart(2, "0")} ${2026 - (index % 3)}`, hue: ["#175a77", "#0b385b", "#397287", "#194b63", "#5a8190"][index % 5], caption,
}));

export const learningTopics: LearningTopic[] = [
  { id: "why-antarctica", title: "Why is Antarctica important?", simple: "Antarctica is a vast icy continent at the bottom of the world. Its ice, ocean and atmosphere affect weather and sea level far beyond its coast.", scientific: "The Antarctic Ice Sheet holds a large volume of land ice, while the Southern Ocean around it absorbs heat and carbon. Changes there can influence global ocean circulation and sea level.", facts: ["Antarctica is the coldest continent.", "It is surrounded by the Southern Ocean.", "Its ice sheet stores water that would raise global sea level if melted."], relatedResearchId: "cry-241", relatedMediaId: "med-20", icon: "◒" },
  { id: "ice-sheets", title: "How do ice sheets change?", simple: "Ice sheets gain snow and lose ice. When the balance changes for many years, the ice sheet can grow or shrink.", scientific: "Mass balance describes the difference between snowfall accumulation, surface melt, iceberg calving and ice flow into the ocean.", facts: ["Ice moves slowly under its own weight.", "Satellites can measure elevation change.", "The edge of an ice shelf floats on the ocean."], relatedResearchId: "ice-626", relatedMediaId: "med-15", icon: "◐" },
  { id: "sea-level", title: "What causes sea-level rise?", simple: "Warmer water expands, and land ice adds new water to the ocean as it melts. Both make sea level rise.", scientific: "Thermosteric expansion and land-ice mass loss are major contributors to global mean sea-level change.", facts: ["Sea ice already floats in the ocean.", "Land ice adds water when it melts.", "Sea level can change differently from place to place."], relatedResearchId: "cry-241", relatedMediaId: "med-03", icon: "◑" },
  { id: "satellites", title: "How do satellites monitor polar regions?", simple: "Satellites pass over the poles again and again, taking measurements that help researchers see change across huge, remote areas.", scientific: "Sensors measure reflected light, microwave radiation, elevation, gravity and surface temperature under different atmospheric conditions.", facts: ["Polar orbits pass near both poles.", "Radar can observe through cloud.", "Repeated images create a time series."], relatedResearchId: "arc-118", relatedMediaId: "med-16", icon: "◉" },
  { id: "arctic-ice", title: "Why is Arctic sea ice important?", simple: "Bright sea ice reflects sunlight. When it melts, darker ocean water absorbs more heat.", scientific: "The ice–albedo feedback can amplify regional warming, while sea-ice loss reshapes ecosystems and ocean–atmosphere exchange.", facts: ["Sea ice forms when ocean water freezes.", "It expands in winter and retreats in summer.", "Thickness matters as well as area."], relatedResearchId: "arc-118", relatedMediaId: "med-09", icon: "◌" },
  { id: "expedition", title: "What is a polar expedition?", simple: "A polar expedition is a carefully planned journey that lets scientists collect observations in some of Earth’s most remote places.", scientific: "Expeditions combine logistics, safety planning, instruments, sampling protocols and remote communications to support reproducible field science.", facts: ["Teams work with strict safety procedures.", "Observations are shared with wider research networks.", "Fieldwork often checks satellite findings."], relatedResearchId: "atm-309", relatedMediaId: "med-08", icon: "⌁" },
  { id: "southern-ocean", title: "How does the Southern Ocean move heat?", simple: "The ocean around Antarctica connects water from many parts of the world and carries heat through deep currents.", scientific: "Winds and density differences drive upwelling, deep-water formation and exchanges between the atmosphere, sea ice and ocean interior.", facts: ["It circles Antarctica without continental barriers.", "It absorbs heat and carbon.", "Floating instruments profile its waters."], relatedResearchId: "soc-067", relatedMediaId: "med-11", icon: "≈" },
  { id: "permafrost", title: "What is permafrost?", simple: "Permafrost is ground that stays frozen for at least two years. It can contain ice, soil and old plant material.", scientific: "Warming may deepen the active layer above permafrost and release stored carbon through physical and biological processes.", facts: ["Permafrost is common in Arctic regions.", "Snow cover can insulate the ground.", "Boreholes help measure underground temperatures."], relatedResearchId: "cli-188", relatedMediaId: "med-12", icon: "◇" },
  { id: "wildlife", title: "How does sea ice support wildlife?", simple: "Sea ice is a platform for feeding, resting and travelling. Many polar animals depend on it at different times of year.", scientific: "Sea ice structures food webs from algae to marine mammals by altering habitat, light, nutrient cycling and access to prey.", facts: ["Ice algae can feed tiny animals.", "Species use ice in different ways.", "Changing ice can reshape habitat connections."], relatedResearchId: "wil-095", relatedMediaId: "med-07", icon: "✦" },
  { id: "community", title: "Why does community knowledge matter?", simple: "People who live and travel in polar regions notice changes over years and generations. Their observations add essential context to scientific records.", scientific: "Co-produced research can connect local observations, ethical data governance, satellite records and targeted field measurements.", facts: ["Knowledge is tied to place and practice.", "Partnerships require trust and consent.", "Multiple evidence sources can be more informative together."], relatedResearchId: "arc-903", relatedMediaId: "med-19", icon: "⊹" },
];

export const quizQuestions: QuizQuestion[] = [
  { id: "q1", question: "Which polar feature most strongly reflects incoming sunlight?", options: ["Dark ocean water", "Sea ice and snow", "Rocky coastlines", "Cloud shadows"], correct: 1, explanation: "Bright snow and sea ice reflect a large share of incoming sunlight, an effect called albedo.", topic: "Arctic sea ice" },
  { id: "q2", question: "What does a polar-orbiting satellite do especially well?", options: ["Stay above one city", "Measure only weather", "Repeatedly observe high latitudes", "Collect samples from the sea floor"], correct: 2, explanation: "Polar orbits repeatedly pass near both poles, helping instruments build long observation records.", topic: "Satellites" },
  { id: "q3", question: "Which change adds new water to the ocean?", options: ["Melting land ice", "Melting floating sea ice", "Cloud formation", "Snowfall on an ice sheet"], correct: 0, explanation: "Land ice raises sea level when it melts into the ocean; floating sea ice already displaces water.", topic: "Sea level" },
  { id: "q4", question: "What is an ice sheet?", options: ["Frozen ocean water", "A large mass of land ice", "A thin layer of frost", "A type of cloud"], correct: 1, explanation: "Ice sheets are huge, long-lived masses of glacier ice resting on land.", topic: "Ice sheets" },
  { id: "q5", question: "Why do scientists use field expeditions alongside satellites?", options: ["To replace all remote sensing", "To validate and add local observations", "To avoid collecting data", "To make maps less accurate"], correct: 1, explanation: "Field data helps interpret and validate large-scale satellite measurements.", topic: "Expeditions" },
  { id: "q6", question: "What is permafrost?", options: ["Ocean water below zero", "Ground frozen for at least two years", "A seasonal snow layer", "A type of iceberg"], correct: 1, explanation: "Permafrost is ground that remains frozen for two years or more.", topic: "Permafrost" },
  { id: "q7", question: "The Southern Ocean surrounds which continent?", options: ["Asia", "North America", "Antarctica", "Europe"], correct: 2, explanation: "The Southern Ocean forms a continuous ring around Antarctica.", topic: "Southern Ocean" },
  { id: "q8", question: "What kind of instrument can profile ocean temperature and salinity as it drifts?", options: ["An Argo float", "A mountain camera", "A weather vane", "A snow shovel"], correct: 0, explanation: "Argo floats repeatedly descend and rise, sending ocean profiles by satellite.", topic: "Ocean observations" },
  { id: "q9", question: "How can radar help polar observation?", options: ["It can only work in sunshine", "It often sees through cloud", "It melts ice directly", "It predicts wildlife behavior perfectly"], correct: 1, explanation: "Radar actively sends microwave signals and can often observe the surface through cloud and darkness.", topic: "Earth observation" },
  { id: "q10", question: "Why is community knowledge valuable in polar research?", options: ["It is unrelated to observations", "It provides long-term, place-based context", "It replaces scientific methods", "It is only useful in cities"], correct: 1, explanation: "Community observations provide detailed, place-based evidence that can complement scientific records.", topic: "Community knowledge" },
];

const researcherNames = ["Dr. Meera Nair", "Dr. Aditi Kapur", "Dr. Kabir Sen", "Dr. Ritu Malhotra", "Dr. Ishita Rao", "Dr. Sanjana Menon", "Dr. Noor Ahmad", "Dr. Aditya Sharma", "Dr. Leena D’Souza", "Dr. Arjun Mehta"];
const explorerNames = ["Aarav Kulkarni", "Ishani Das", "Vikram Joshi", "Nandini Shah", "Rohan Bedi", "Fatima Ali", "Devika Rao", "Samar Gupta", "Kavya Nair", "Reyansh Kapoor", "Mira Thomas", "Arjun Patel", "Ananya Bose", "Zoya Khan", "Neil Fernandes", "Priyanka Sethi", "Tara Menon", "Kunal Verma", "Ayesha Mir", "Vihaan Roy"];

export const directoryPeople: DirectoryPerson[] = [
  ...researcherNames.map((name, index) => ({ id: `res-${index + 1}`, name, email: `${name.toLowerCase().replace(/[.’\s]/g, "").replace("d", "")}${index + 1}@polaris.in`, role: "Researcher" as const, status: "Active" as const, joined: `${String(index + 2).padStart(2, "0")} Feb 202${index % 3 + 3}`, affiliation: ["NCPOR", "IIRS", "NIOT", "IMD", "BAS"][index % 5] })),
  ...explorerNames.map((name, index) => ({ id: `usr-${index + 1}`, name, email: `${name.toLowerCase().replace(/\s/g, ".")}@mail.com`, role: index === 6 || index === 15 ? "Educator" as const : "Explorer" as const, status: index === 17 ? "Disabled" as const : "Active" as const, joined: `${String(index + 1).padStart(2, "0")} ${["Jan", "Mar", "May", "Jul", "Sep"][index % 5]} 2026`, affiliation: "POLARIS Explorer Network" })),
];
