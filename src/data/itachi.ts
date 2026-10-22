import type { CharacterProfile } from '../types/character';

export const ITACHI_DATA: CharacterProfile = {
  id: 'itachi',
  name: 'Itachi Uchiha',
  kanji: 'うちは イタチ',
  epithet: 'The Shadow Shinobi / Martyr of the Leaf',
  clan: 'Uchiha Clan',
  natureAffinities: ['Fire (Katon)', 'Water (Suiton)', 'Wind (Futon)', 'Yin (Inton)', 'Yang (Yoton)'],
  themeColor: '#e61919',
  accentColor: '#b31217',
  backgroundQuote:
    'Those who cannot acknowledge themselves will eventually fail. Being accepted by everyone is what makes you a true Hokage.',
  quoteAuthor: 'Itachi Uchiha to Naruto Uzumaki',
  quoteContext: 'Fourth Shinobi World War',
  biographySummary:
    'Prodigy of the Uchiha clan and captain in the Konohagakure Anbu. To prevent an insurrection that would spark a catastrophic Fifth Great Ninja War, Itachi accepted the mission to annihilate his clan, bearing the mantle of rogue traitor while protecting his younger brother Sasuke and safeguarding the village from the shadows of Akatsuki.',
  abilities: [
    {
      id: 'tsukuyomi',
      name: 'Tsukuyomi',
      kanji: '月読',
      romaji: 'Tsukuyomi',
      classification: 'Ocular Genjutsu (Mangekyo Sharingan)',
      range: 'Short to Mid Range (Direct Line of Sight)',
      natureAffinity: 'Yin Release (Inton)',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Exclusive to Itachi',
      wieldersDescription: 'Itachi Uchiha (Right Eye focus / Left Eye trigger)',
      shortSummary: 'Commands complete sovereignty over mass, distance, and subjective time within a red-moon illusion realm.',
      detailedLore:
        'Named after the Shinto god of the moon, Tsukuyomi traps the adversary in a psychic void governed by a crimson moon and monochrome inverted palette. Within this domain, Itachi commands infinite control over the victim\'s perception of time: 72 hours of agonizing psychological torture can unfold in less than one-thousandth of a second in the physical world, overwhelming the target\'s central nervous system and inducing comatose collapse without physical contact.',
      tacticalUsage:
        'Incapacitated Kakashi Hatake in an instant during the invasion of the Leaf, and subjected Sasuke to the psychological trial that catalyzed his quest for power.',
      canonAppearance: 'First manifested against Kakashi Hatake (Part I, Chapter 142).',
      iconName: 'moon',
    },
    {
      id: 'amaterasu',
      name: 'Amaterasu',
      kanji: '天照',
      romaji: 'Amaterasu',
      classification: 'Highest-Tier Fire Style / Enton (Blaze)',
      range: 'Direct Focal Point of Sight',
      natureAffinity: 'Fire Release (Katon) / Blaze (Enton)',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Exclusive to Itachi (Inherited by Sasuke)',
      wieldersDescription: 'Itachi Uchiha (Right Eye) & Sasuke Uchiha (Flame Control)',
      shortSummary: 'Ignites inextinguishable black flames at the exact focal point of the caster\'s optical gaze.',
      detailedLore:
        'Named after the Shinto sun goddess, Amaterasu produces jet-black flames that burn as fiercely as the sun itself. Once ignited at the user\'s focal line of sight, the flames cannot be extinguished by water, standard ninjutsu, or earthly elements, burning unceasingly for seven days and seven nights until the fuel is reduced to nothingness. The technique places extreme vascular strain on the eye, causing blood to stream from the tear duct.',
      tacticalUsage:
        'Pierced the impenetrable esophagus of the Great Toad Mountain Sage and incinerated Orochimaru\'s Yamata-no-Orochi (Eight Branches Technique).',
      canonAppearance: 'Used to escape Jiraiya\'s Toad Mouth Trap (Part I, Chapter 148).',
      iconName: 'flame',
    },
    {
      id: 'susanoo',
      name: 'Susanoo (Armored Skeletal Avatar)',
      kanji: '須佐能乎',
      romaji: 'Susanoo',
      classification: 'Divine Chakra Avatar (Mangekyo Manifestation)',
      range: 'All Ranges',
      natureAffinity: 'Pure Density Yin-Yang Chakra',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Exclusive Manifestation & Sacred Relics',
      wieldersDescription: 'Itachi Uchiha (Fiery Orange/Red Chakra)',
      shortSummary: 'Materializes a spectral armored titan wielding the legendary Totsuka Blade and Yata Mirror.',
      detailedLore:
        'Awakened only by wielding the Mangekyo Sharingan in both eyes, Susanoo materializes as an enormous skeletal avatar of concentrated chakra that acts as both absolute defense and unrivaled offensive titan. Itachi\'s Susanoo burns with a distinctive fiery vermilion and crimson aura. Uniquely, Itachi outfitted his Susanoo with ethereal spiritual treasures long considered mythological: the sealing sword of Totsuka and the omni-directional defensive shield of Yata.',
      tacticalUsage:
        'Sealed Orochimaru upon emergence from Sasuke\'s cursed seal, and pierced Nagato\'s planetary core in the Fourth Shinobi World War.',
      canonAppearance: 'Summoned during the fateful climax against Sasuke (Chapter 391).',
      iconName: 'shield',
    },
    {
      id: 'izanami',
      name: 'Izanami',
      kanji: 'イザナミ',
      romaji: 'Izanami',
      classification: 'Forbidden Ocular Kinjutsu (Uchiha Secret)',
      range: 'Physical & Sensory Sensation Loop',
      natureAffinity: 'Yin Release (Inton)',
      exclusivity: 'forbidden_kinjutsu',
      exclusivityBadge: 'Forbidden Kinjutsu · Itachi Canon User',
      wieldersDescription: 'Created by ancient Uchiha to redeem Izanagi users; utilized by Itachi vs. Kabuto',
      shortSummary: 'Traps the opponent\'s consciousness in an infinite temporal loop until they accept their genuine fate.',
      detailedLore:
        'The counterpart and ultimate countermeasure to Izanagi. While Izanagi alters destiny to change real events, Izanami dictates destiny by binding shared physical sensations (touch, sound, smell) into an infinite recursive time loop. The target is trapped reliving an unalterable sequence of events in their psyche until they cease attempting to forge an artificial reality, acknowledge their genuine self, and accept the consequences of their deeds. The price of activation is total blindness in the casting eye.',
      tacticalUsage:
        'Deployed by reincarnated Itachi against Sage Mode Kabuto Yakushi, neutralizing the Dragon Sage and forcing him to undo the Edo Tensei reanimation seals.',
      canonAppearance: 'Executed during the cave confrontation with Kabuto (Chapter 585–587).',
      iconName: 'repeat',
    },
    {
      id: 'izanagi',
      name: 'Izanagi',
      kanji: 'イザナギ',
      romaji: 'Izanagi',
      classification: 'Forbidden Reality-Bending Kinjutsu',
      range: 'Self-Targeted Reality Warp',
      natureAffinity: 'Yin-Yang Release (Onmyoton)',
      exclusivity: 'non_exclusive',
      exclusivityBadge: 'Not Exclusive to Itachi · Clan Kinjutsu',
      wieldersDescription: 'Danzo Shimura, Obito Uchiha, Madara Uchiha (NOT Itachi)',
      shortSummary: 'Bends reality itself for a brief duration, transforming fatal wounds and demise into mere illusions.',
      detailedLore:
        'The ultimate reality-defying ocular kinjutsu. Derived from the Creation of All Things technique utilized by the Sage of Six Paths, Izanagi applies a genjutsu upon the fabric of reality itself. For the duration of the technique, any injury, incapacitation, or even fatal death suffered by the user is converted into a momentary illusion, while any beneficial actions they performed remain physical reality. In exchange for rewriting fate, the Sharingan used to cast Izanagi loses its sight forever.',
      tacticalUsage:
        'NOT wielded by Itachi. Most famously abused by Danzo Shimura via his arm of grafted Sharingan against Sasuke, and by Obito Uchiha to survive Konan\'s 600-billion paper bomb ocean.',
      canonAppearance: 'Explained by Itachi as the tragic catalyst that necessitated the creation of Izanami.',
      iconName: 'eye',
    },
    {
      id: 'katon_goukakyuu',
      name: 'Fire Style: Great Fireball Technique',
      kanji: '火遁・豪火球の術',
      romaji: 'Katon: Gōkakyū no Jutsu',
      classification: 'Uchiha Clan Traditional Ninjutsu',
      range: 'Short to Mid Range',
      natureAffinity: 'Fire Release (Katon)',
      exclusivity: 'clan_shared',
      exclusivityBadge: 'Not Exclusive to Itachi · Clan Heritage',
      wieldersDescription: 'Universal rite of passage for all Uchiha clan members',
      shortSummary: 'Kneads chakra in the stomach and expels a colossal sphere of roaring crimson flame.',
      detailedLore:
        'The signature ninjutsu of the Uchiha clan. A young shinobi of the clan is not recognized as a true adult until they successfully master and manifest this jutsu. Itachi mastered the Great Fireball at the unprecedented age of eight on his very first attempt after watching his father Fugaku demonstrate the hand seals once, blowing a sphere that dwarfed his own height.',
      tacticalUsage:
        'Used as a standard suppressing firebomb and tactical smokescreen throughout Itachi\'s battles.',
      canonAppearance: 'Mastered during childhood flash-backs (Chapter 220).',
      iconName: 'flame',
    },
    {
      id: 'crow_clone',
      name: 'Crow Clone Technique & Ephemeral Genjutsu',
      kanji: '烏分身の術 / 泡沫',
      romaji: 'Karasu Bunshin / Utakata',
      classification: 'Specialized Shurikenjutsu & Deception',
      range: 'Short to Long Range',
      natureAffinity: 'Yin Release (Inton)',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Exclusive Signature Style',
      wieldersDescription: 'Itachi Uchiha signature genjutsu & tactical feints',
      shortSummary: 'Disperses clones into swarms of cawing black ravens, casting illusions through simple gestures.',
      detailedLore:
        'Itachi\'s genius in deception allowed him to cast profound genjutsu without eye contact—initiating illusions simply by pointing his index finger (Utakata). He combined this with clone techniques that dissolve into scores of flocking black ravens that obscure sight lines, fly through weapon barrages, and reform at will.',
      tacticalUsage:
        'Used against Naruto Uzumaki and Kakashi Hatake to communicate and test their resolve while deflecting physical strikes.',
      canonAppearance: 'Encounter with Naruto in the woods (Part II, Chapter 366).',
      iconName: 'sparkles',
    },
  ],
  loreSections: [
    {
      id: 'mangekyo_trio',
      title: 'The Trinity of Heavenly Eyes',
      subtitle: 'Tsukuyomi, Amaterasu, and Susanoo',
      isItachiExclusive: true,
      badge: 'Itachi Mangekyo Trinity',
      content:
        'In Japanese mythology, the god Izanagi washed his face after escaping the underworld: washing his left eye gave birth to Amaterasu, his right eye birthed Tsukuyomi, and his nose birthed Susanoo. Masashi Kishimoto structured Itachi\'s ocular repertoire precisely upon this trinity. Tsukuyomi represents absolute psychological dominance over the temporal plane; Amaterasu represents absolute physical destruction; and Susanoo represents the supreme spiritual barrier holding sacred divine artifacts.',
      notableFacts: [
        'Tsukuyomi was tied to Itachi\'s right eye in earlier chapters and left eye in data books; Amaterasu fired from the opposing eye.',
        'Continuous usage caused rapid ocular degeneration, leaving Itachi near-blind during his final duel with Sasuke.',
        'Both techniques placed immense vascular strain, symbolized by the blood streaming down his face upon ignition.',
      ],
    },
    {
      id: 'izanami_vs_izanagi',
      title: 'The Duality of Kinjutsu: Izanami & Izanagi',
      subtitle: 'The Cycle of Arrogance and Redemption',
      isItachiExclusive: false,
      badge: 'Forbidden Ocular Duality',
      content:
        'In the ancient era of the clan, Uchiha warriors became intoxicated with Izanagi, abusing it to rewrite defeats in battle and claim glory. To curb this internal hubris, Izanami was created. Where Izanagi was born from pride and the refusal to accept one\'s mistakes, Izanami was engineered as salvation: an inescapable loop from which a soul can only emerge once they stop deceiving themselves and accept reality. Itachi used Izanami not as an attack of wrath, but as an act of compassion to save Kabuto Yakushi from walking the same path of denial.',
      notableFacts: [
        'Izanami requires a physical sensation loop (A -> B -> C -> A) mapped through both combatants\' sensory perceptions.',
        'Izanagi was NOT Itachi\'s technique; it was used by Danzo Shimura, Obito Uchiha, and ancient Uchiha rivals.',
        'Both techniques consume the light of the Sharingan permanently upon casting.',
      ],
    },
    {
      id: 'truth_of_massacre',
      title: 'The Truth of the Midnight Tragedy',
      subtitle: 'The Burden of the Unsung Hero',
      isItachiExclusive: true,
      badge: 'Canon Clan Chronicle',
      content:
        'For years, the world knew Itachi as a cold-blooded traitor who extinguished his own flesh and blood to test his capacity. In truth, the Uchiha clan under Fugaku had planned an armed coup d\'état against the Leaf village following years of ostracization after the Nine-Tails incident. Recognizing that a civil war would inevitably invite foreign invasion and reignite a global shinobi holocaust, Itachi accepted Danzo\'s impossible ultimatum: destroy his clan in secret, spare only his beloved younger brother Sasuke, and spend the remainder of his life in the criminal underworld while shielding Konoha from afar.',
      notableFacts: [
        'Third Hokage Hiruzen Sarutobi sought diplomatic resolution, but Danzo secretly forced the timeline.',
        'Itachi joined Akatsuki primarily to monitor the clandestine organization and warn Konoha of any moves toward the Nine-Tails.',
        'He died smiling, touching Sasuke\'s forehead with the iconic two-finger tap: "Forgive me, Sasuke... this is the last time."',
      ],
    },
  ],
  artifacts: [
    {
      id: 'totsuka',
      name: 'Sword of Totsuka (Totsuka no Tsurugi)',
      kanji: '十拳剣 (酒刈太刀)',
      type: 'Ethereal Sealing Blade',
      wielder: 'Itachi\'s Susanoo',
      description:
        'A sheathless blade carried in an enchanted sake gourd held by Susanoo. Rather than a physical blade of steel, it manifests as liquid fire. Anyone or anything pierced by the blade is drawn into the sake jar and sealed into an eternal genjutsu dream world for all eternity.',
      mythologicalOrigin: 'Named after the legendary sword used by Susanoo to slay the eight-headed serpent Yamata-no-Orochi in Japanese myth.',
    },
    {
      id: 'yata',
      name: 'Yata Mirror (Yata no Kagami)',
      kanji: '八咫鏡',
      type: 'Absolute Reflective Shield',
      wielder: 'Itachi\'s Susanoo',
      description:
        'An ethereal shield held in Susanoo\'s left hand. Endowed with all five basic chakra natures (Fire, Water, Earth, Wind, Lightning), the mirror alters its chakra properties instantaneously to match any incoming attack, rendering all physical and spiritual ninjutsu completely ineffective.',
      mythologicalOrigin: 'Named after one of the Three Sacred Imperial Regalia of Japan, representing wisdom and pure reflection.',
    },
  ],
};
