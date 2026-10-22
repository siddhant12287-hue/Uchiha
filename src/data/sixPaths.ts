export interface PathDetail {
  id: string;
  name: string;
  kanji: string;
  romaji: string;
  vessel: string;
  classification: string;
  accentColor: string;
  summary: string;
  coreAbilities: string[];
  strategicRole: string;
  canonLore: string;
}

export const SIX_PATHS_DATA: PathDetail[] = [
  {
    id: 'deva',
    name: 'Deva Path',
    kanji: '天道',
    romaji: 'Tendō',
    vessel: "Yahiko (Nagato's childhood friend and founder of early Akatsuki)",
    classification: 'Gravitational Mastery & Frontline Vanguard',
    accentColor: '#a855f7',
    summary:
      'The primary avatar of Pain and the outward face of "God". Commands absolute control over gravitational repulsion and attraction.',
    coreAbilities: [
      'Shinra Tensei (Almighty Push): Deflects all matter, ninjutsu, and attacks with violent repulsive force.',
      'Bansho Ten\'in (Universal Pull): Irresistibly pulls targets or physical objects toward the user.',
      'Chibaku Tensei (Catastrophic Planetary Devastation): Generates a black gravitational singularity to compact entire landmasses.',
    ],
    strategicRole:
      'Leader and supreme combatant. Intervenes directly in existential battles and coordinates the synchronized movements of all five other paths.',
    canonLore:
      "Nagato preserved Yahiko's deceased body following his forced suicide, piercing it with black receivers so Yahiko would forever stand as the undisputed voice and arbiter of divine peace.",
  },
  {
    id: 'asura',
    name: 'Asura Path',
    kanji: '修羅道',
    romaji: 'Shuradō',
    vessel: 'A wandering puppeteer shinobi who fought during the Second Great War',
    classification: 'Biomechanical Mechanization & Heavy Ballistics',
    accentColor: '#ef4444',
    summary:
      'Transforms the human body into an advanced cybernetic arsenal with ballistic missiles, segmented bladed tails, and chakra cannons.',
    coreAbilities: [
      'Flaming Arrow Missiles: High-explosive homing projectiles fired from detached arms.',
      'Chakra Propulsion Cannon: Fires a devastating beam of concentrated chakra from the cranium.',
      'Multiform Mechanical Appendages: Manifests six arms and three distinct faces with revolving combat stances.',
    ],
    strategicRole:
      'Heavy suppression fire, brute physical shock, and surprise ballistic strikes to overwhelm defensive barriers.',
    canonLore:
      'Mechanizes organic anatomy into impossible futurist weaponry, evoking the warring deities of Buddhist mythology who seek eternal combat.',
  },
  {
    id: 'human',
    name: 'Human Path',
    kanji: '人間道',
    romaji: 'Ningendō',
    vessel: 'A Takigakure shinobi known for diplomatic negotiation',
    classification: 'Mental Telepathy & Soul Extraction',
    accentColor: '#38bdf8',
    summary:
      "Extracts thoughts and secrets in seconds through direct physical contact with the victim's head, followed by immediate soul removal.",
    coreAbilities: [
      'Kyūkon no Jutsu (Soul Extraction): Directly rips the victim\'s metaphysical chakra/soul from their body, causing instant death.',
      'Instantaneous Mind Reading: Bypasses genjutsu mental defenses to extract all confidential intel within seconds.',
      'High-Speed Taijutsu Interception: Agile hand-to-hand combat to secure head contact.',
    ],
    strategicRole:
      'Espionage, intelligence extraction, and silent point-blank assassinations without leaving structural destruction.',
    canonLore:
      "Extracted Shizune's soul to ascertain Naruto's whereabouts at Mount Myōboku during the assault on Konohagakure.",
  },
  {
    id: 'animal',
    name: 'Animal Path',
    kanji: '畜生道',
    romaji: 'Chikushōdō',
    vessel: 'Initially a Fūma clan shinobi; later replaced by a young kunoichi named Ajisai',
    classification: 'Pactless Multi-Summoning & Spatial Infiltration',
    accentColor: '#f59e0b',
    summary:
      'Summons colossal, monstrous beasts without blood contracts or hand seals. All beasts possess Rinnegan eyes and shared sight.',
    coreAbilities: [
      'Multi-Headed Giant Hound: Multiplies its heads and divides into separate beasts each time it suffers physical damage.',
      'Giant Drill-Beaked Bird & Giant Chameleon: Aerial bombardments and complete optical cloaking camouflage.',
      'Reverse Summoning of Pain Bodies: Transports the other five Pain avatars anywhere instantaneously.',
    ],
    strategicRole:
      'Versatile battlefield chaos, multi-vector aerial strikes, stealth infiltration, and mobility transport for the collective unit.',
    canonLore:
      "Every summoned beast is pierced with black chakra receivers, creating a vast distributed radar network feeding into Nagato's central vision.",
  },
  {
    id: 'preta',
    name: 'Preta Path',
    kanji: '餓鬼道',
    romaji: 'Gakidō',
    vessel: 'A Kusagakure shinobi who struggled with endless poverty and hunger',
    classification: 'Total Chakra Absorption & Ninjutsu Nullification',
    accentColor: '#10b981',
    summary:
      'Absorbs all forms of ninjutsu and chakra regardless of elemental affinity, rendering energy-based attacks completely powerless.',
    coreAbilities: [
      'Fūjutsu Kyūin (Blocking Technique Absorption Seal): Forms an omnidirectional spherical barrier that devours incoming chakra attacks.',
      'Direct Physical Chakra Draining: Empties an enemy\'s internal chakra reserves upon physical contact.',
      'Kinjutsu Nullification: Effortlessly absorbed Jiraiya\'s Sage Art: Ultra-Big Ball Rasengan.',
    ],
    strategicRole:
      'The ultimate shield against long-range elemental ninjutsu and high-yield chakra bursts, protecting fragile paths from devastation.',
    canonLore:
      'While immune to ninjutsu, Preta Path cannot balance raw natural energy (senjutsu) on its own; absorbing too much transforms it into stone.',
  },
  {
    id: 'naraka',
    name: 'Naraka Path',
    kanji: '地獄道',
    romaji: 'Jigokudō',
    vessel: 'A religious elder and spiritual priest from an unnamed war-torn hamlet',
    classification: 'King of Hell Interrogation & Total Reconstruction',
    accentColor: '#818cf8',
    summary:
      'Summons the King of Hell to discern absolute truth or resurrect destroyed Pain bodies, conferring near-immortality upon the unit.',
    coreAbilities: [
      'King of Hell (Meifu no Ō): An otherworldly entity visible only to victims and Rinnegan wielders.',
      'Judgment of Truth: Grasps the victim\'s tongue; if they lie, their soul is devoured, killing them instantly.',
      'Complete Avatar Reconstruction: Damaged or destroyed Pain bodies placed inside the King\'s mouth emerge completely restored in seconds.',
    ],
    strategicRole:
      'The indispensable medic and anchor of the Six Paths. As long as Naraka survives, all other fallen bodies can be perpetually reborn.',
    canonLore:
      'Konohamaru and Jiraiya realized that isolating and incapacitating the Naraka Path was mandatory before any permanent victory could be achieved.',
  },
];
