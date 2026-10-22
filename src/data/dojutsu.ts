export type DojutsuCategory =
  | 'three-great'
  | 'uchiha-lineage'
  | 'transcendent'
  | 'otsutsuki'
  | 'boruto-era';

export interface DojutsuEntry {
  id: string;
  name: string;
  kanji: string;
  romaji: string;
  category: DojutsuCategory;
  categoryBadge: string;
  isBorutoEra?: boolean;
  associatedCharacters: string[];
  canonicalCapabilities: string[];
  shortLore: string;
  limitations: string[];
  eyeComponentId:
    | 'sharingan'
    | 'mangekyo'
    | 'ems'
    | 'rinnegan'
    | 'rinnesharingan'
    | 'byakugan'
    | 'tenseigan'
    | 'jogan';
  themeColor: string;
}

export const DOJUTSU_ENTRIES: DojutsuEntry[] = [
  {
    id: 'sharingan',
    name: 'Sharingan',
    kanji: '写輪眼',
    romaji: 'Copy Wheel Eye',
    category: 'three-great',
    categoryBadge: 'Three Great Dōjutsu &bull; Uchiha Kekkei Genkai',
    associatedCharacters: [
      'Sasuke Uchiha',
      'Itachi Uchiha',
      'Madara Uchiha',
      'Kakashi Hatake',
      'Obito Uchiha',
      'Shisui Uchiha',
    ],
    canonicalCapabilities: [
      'Eye of Insight (Dōsatsugan): Hypnotic kinetic vision, tracking high-speed movement and deciphering chakra pathways down to millimeter precision.',
      'Eye of Hypnotism (Saimingan): High-grade ocular genjutsu cast simply by making eye contact.',
      'Technique Duplication: Capable of analyzing and instantly copying any non-Kekkei Genkai ninjutsu, genjutsu, or taijutsu sequence.',
    ],
    shortLore:
      'The foundational dōjutsu of the Uchiha clan, descended from Indra Otsutsuki. Awakens when an Uchiha experiences a surge of powerful negative emotion or love-induced grief, causing their optic nerves to release a specialized chakra into the eyes.',
    limitations: [
      'Gradual evolution through 1, 2, and 3 tomoe stages; cannot duplicate bloodline limits (Kekkei Genkai).',
      'Non-Uchiha transplants (such as Kakashi Hatake) cannot deactivate the eye, imposing constant stamina and chakra drainage.',
    ],
    eyeComponentId: 'sharingan',
    themeColor: '#ef4444',
  },
  {
    id: 'mangekyo_sharingan',
    name: 'Mangekyō Sharingan',
    kanji: '万華鏡写輪眼',
    romaji: 'Kaleidoscope Copy Wheel Eye',
    category: 'uchiha-lineage',
    categoryBadge: 'Advanced Awakening &bull; Singular PINNACLE',
    associatedCharacters: [
      'Itachi Uchiha',
      'Shisui Uchiha',
      'Sasuke Uchiha',
      'Madara Uchiha',
      'Obito Uchiha',
      'Izuna Uchiha',
    ],
    canonicalCapabilities: [
      'Unique Deific Techniques: Grants bespoke god-tier abilities tailored to the wielder (e.g. Tsukuyomi, Amaterasu, Kamui, Kotoamatsukami).',
      'Susanoo Manifestation: Materializes a colossal, spectral chakra warrior avatar around the user once both Mangekyō eyes are awakened.',
      'Forbidden Kinjutsu: Unlocks execution of reality-warping sacrifice jutsu: Izanagi (fate rewriting) and Izanami (loop entrapment).',
    ],
    shortLore:
      'An advanced manifestation triggered by the devastating trauma of witnessing the death of one\'s closest bond or friend. Transforms the tomoe into intricate geometric pinwheel designs unique to each wielder.',
    limitations: [
      'Continuous usage bleeds the eye and progressively destroys ocular nerves, resulting in permanent, irreversible blindness.',
      'Severe physical strain and agony throughout the user\'s musculature upon summoning Susanoo.',
    ],
    eyeComponentId: 'mangekyo',
    themeColor: '#dc2626',
  },
  {
    id: 'eternal_mangekyo',
    name: 'Eternal Mangekyō Sharingan',
    kanji: '永遠の万華鏡写輪眼',
    romaji: 'Eien no Mangekyō Sharingan',
    category: 'uchiha-lineage',
    categoryBadge: 'Transplanted Synthesis &bull; Imperishable Vision',
    associatedCharacters: ['Madara Uchiha', 'Sasuke Uchiha'],
    canonicalCapabilities: [
      'Perpetual Light: Complete immunity to blindness; the eye can be used indefinitely without loss of optical clarity.',
      'Perfect Susanoo: Full stabilization of the Susanoo into an armored, winged titan capable of cleaving mountain ranges with a single blade swing.',
      'Fluid Chakra Flow: Massively reduced chakra exhaustion compared to the base Mangekyō.',
    ],
    shortLore:
      'Achieved only when an awakened Mangekyō user transplants the Mangekyō eyes of an Uchiha with blood ties (historically a sibling). The ocular patterns fuse into a master composite insignia of eternal light.',
    limitations: [
      'Extremely rare prerequisite: requires both compatible sibling donor eyes and previous traumatic awakenings.',
      'Does not confer natural immunity to external genjutsu or direct physical trauma.',
    ],
    eyeComponentId: 'ems',
    themeColor: '#2563eb',
  },
  {
    id: 'rinnegan',
    name: 'Rinnegan',
    kanji: '輪廻眼',
    romaji: 'Saṃsāra Eye',
    category: 'three-great',
    categoryBadge: 'Three Great Dōjutsu &bull; Eye of the Sage',
    associatedCharacters: [
      'Hagoromo Otsutsuki',
      'Madara Uchiha',
      'Nagato Uzumaki',
      'Sasuke Uchiha',
      'Obito Uchiha',
    ],
    canonicalCapabilities: [
      'Six Paths Technique (Rikudō): Mastery of Deva (gravity), Asura (ballistics), Human (soul), Animal (summons), Preta (absorption), and Naraka (resurrection).',
      'Outer Path (Gedō): Control over life and death via Gedō: Rinne Tensei no Jutsu and summoning the Demonic Statue of the Outer Path.',
      'Universal Elemental Mastery: Grants immediate mastery over all five basic elemental chakra transformations plus Yin-Yang Release.',
    ],
    shortLore:
      'The most exalted of the Three Great Dōjutsu, characterized by ripple-like concentric rings across a violet iris. First manifested by Hagoromo Otsutsuki (Sage of the Six Paths), it is praised as either the tool of creation that brings peace or the weapon of annihilation that returns reality to nothingness.',
    limitations: [
      'Immense chakra tax: Non-natural wielders require colossal Uzumaki-level vitality or risk rapid physical emaciation.',
      'Techniques like Chibaku Tensei and village-scale Shinra Tensei enforce extensive recovery intervals.',
    ],
    eyeComponentId: 'rinnegan',
    themeColor: '#8b5cf6',
  },
  {
    id: 'rinne_sharingan',
    name: 'Rinne Sharingan',
    kanji: '輪廻写輪眼',
    romaji: 'Saṃsāra Copy Wheel Eye',
    category: 'transcendent',
    categoryBadge: 'Primordial Origin &bull; Eye of the Progenitor',
    associatedCharacters: ['Kaguya Otsutsuki', 'Madara Uchiha'],
    canonicalCapabilities: [
      'Infinite Tsukuyomi (Mugen Tsukuyomi): Casts an inescapable worldwide ocular genjutsu onto the surface of the moon, trapping all living beings in perpetual dream state.',
      'Amenominaka: Instantaneously shifts the wielder and all targets into alternate dimensions (Lava, Ice, Acid, Desert, Pyramid, and Core).',
      'God: Nativity of a World of Trees: Binds immobilized victims to the Divine Tree to absorb their chakra and transform them into White Zetsu.',
    ],
    shortLore:
      'The primordial ancestor of both the Sharingan and Rinnegan, manifested as a third eye upon the forehead. Features a blood-red sclera and iris inscribed with nine tomoe arranged along three concentric ripples. Awakened by consuming the Fruit of the God Tree.',
    limitations: [
      'Exclusive to the Ten-Tails Jinchūriki wielding both Rinnegan and possessing Otsutsuki divine chakra.',
      'Susceptible to being disrupted or undone if both Indra and Ashura reincarnates combine their chakra alongside the Rinnegan.',
    ],
    eyeComponentId: 'rinnesharingan',
    themeColor: '#e11d48',
  },
  {
    id: 'byakugan',
    name: 'Byakugan',
    kanji: '白眼',
    romaji: 'All-Seeing White Eye',
    category: 'three-great',
    categoryBadge: 'Three Great Dōjutsu &bull; Hyūga & Otsutsuki Heritage',
    associatedCharacters: [
      'Hinata Hyūga',
      'Neji Hyūga',
      'Kaguya Otsutsuki',
      'Hamura Otsutsuki',
      'Hiashi Hyūga',
    ],
    canonicalCapabilities: [
      'Near 360-Degree Vision: Panoramic spherical visual field with only a microscopic blind spot at the upper thoracic vertebra.',
      'X-Ray & Tenketsu Penetration: Sees through solid matter, detects chakra pathways, and pinpoints all 361 chakra nodes for the Gentle Fist (Jūken).',
      'Extreme Long-Range Telescopic Sight: Capable of resolving details miles away through mist, darkness, and obstructions.',
    ],
    shortLore:
      'Inherited directly from Kaguya Otsutsuki through Hamura and passed down through the Hyūga Clan. The eye appears milky lavender-white and causes temporal veins to bulge intensely when activated. Celebrated as the ultimate tracking and internal diagnostic eye.',
    limitations: [
      'Blind spot: A tiny conical vector radiating behind the first thoracic vertebra that enemies can exploit.',
      'Does not natively grant copy abilities or reality-warping genjutsu.',
    ],
    eyeComponentId: 'byakugan',
    themeColor: '#93c5fd',
  },
  {
    id: 'tenseigan',
    name: 'Tenseigan',
    kanji: '転生眼',
    romaji: 'Reincarnation Eye',
    category: 'otsutsuki',
    categoryBadge: 'Otsutsuki Evolution &bull; Lunar Genesis',
    associatedCharacters: ['Toneri Otsutsuki', 'Hamura Otsutsuki'],
    canonicalCapabilities: [
      'Tenseigan Chakra Mode: Envelops the user in a radiant cyan mantle of chakra with floating Truth-Seeking Orbs (Gudōdama).',
      'Golden Wheel Reincarnation Explosion: Generates a planet-slicing golden beam of pure chakra capable of cleaving the entire Moon in half.',
      'Silver Wheel Reincarnation Explosion: Summons colossal hurricane vortexes and manipulates lunar gravitation.',
    ],
    shortLore:
      'The highest evolution of the Byakugan, manifested when an Otsutsuki descendant of Hamura is transplanted with a pure, high-grade Hyūga Byakugan. Radiates a brilliant solar floral pattern within a glowing cerulean iris.',
    limitations: [
      'Requires prolonged pulsation and agonizing ocular incubation before full stabilization.',
      'Reverts back into standard Byakugan eyes if the user is knocked unconscious or their chakra is depleted.',
    ],
    eyeComponentId: 'tenseigan',
    themeColor: '#0284c7',
  },
  {
    id: 'jogan',
    name: 'Jōgan',
    kanji: '浄眼',
    romaji: 'Pure Eye',
    category: 'boruto-era',
    categoryBadge: 'Boruto Era &bull; Otsutsuki Primordial Mystery',
    isBorutoEra: true,
    associatedCharacters: ['Boruto Uzumaki'],
    canonicalCapabilities: [
      'Negative Emotion & Dark Chakra Sight: Detects anomalous, invisible, and extra-dimensional chakra flows unseen by standard dōjutsu.',
      'Inter-Dimensional Barrier Penetration: Tracks and visualizes dimensional rifts (such as Nue\'s pocket realm and Otsutsuki space-time gates).',
      'Chakra Circulatory Weak-Point Perception: Discerns the core nexus and precise fatal pressure points of monstrous targets.',
    ],
    shortLore:
      'An enigmatic, ancient dōjutsu exclusive to Boruto Uzumaki. Features a pitch-black sclera paired with a luminous cyan-white pupil. Acknowledged by Toneri Otsutsuki and Momoshiki Otsutsuki as an ancient star that shoulders the fate of the universe.',
    limitations: [
      'Initially activates involuntarily in response to spatial anomalies and malevolent chakra spikes.',
      'Canonical full mechanics, origin, and limits remain partially unrevealed in contemporary lore.',
    ],
    eyeComponentId: 'jogan',
    themeColor: '#06b6d4',
  },
];
