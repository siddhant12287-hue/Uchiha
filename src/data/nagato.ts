import type { CharacterProfile } from '../types/character';

export const NAGATO_DATA: CharacterProfile = {
  id: 'nagato',
  name: 'Nagato / Pain',
  kanji: 'うずまき 長門 / ペイン',
  epithet: 'The God of the Six Paths & Leader of the Akatsuki',
  clan: 'Uzumaki Clan (Transplanted Rinnegan of Madara Uchiha)',
  natureAffinities: [
    'Deva (Gravity)',
    'Fire (Katon)',
    'Wind (Fūton)',
    'Lightning (Raiton)',
    'Earth (Doton)',
    'Water (Suiton)',
    'Yang (Yōton)',
  ],
  themeColor: '#8b5cf6', // Electric violet
  accentColor: '#cbd5e1', // Metallic silver
  backgroundQuote:
    'Feel pain, contemplate pain, accept pain, know pain. Those who do not know pain will never understand true peace. I will show the world true pain.',
  quoteAuthor: 'Nagato / Deva Path',
  quoteContext: 'Before unleashing the Massive Shinra Tensei over the village of Konohagakure',
  biographySummary:
    'A war orphan from the Hidden Rain Village (Amegakure) and descendant of the resilient Uzumaki clan. Unbeknownst to him as an infant, Madara Uchiha transplanted his own awakened Rinnegan into Nagato to serve as the vessel for his future resurrection. Following the tragic betrayal by Hanzō that resulted in Yahiko\'s suicide, Nagato took the mantle of "Pain", piloting six corpse puppets through black chakra receivers to enforce peace through the deterrence of absolute devastation.',
  abilities: [
    {
      id: 'shinra_tensei',
      name: 'Shinra Tensei',
      kanji: '神羅天征',
      romaji: 'Heavenly Subjugation of the Omnipresent God',
      classification: 'Ocular Dōjutsu / Gravitational Repulsion',
      range: 'Short to Extreme Long-Range',
      natureAffinity: 'Deva Path / Gravitational Force',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Deva Path Signature',
      wieldersDescription:
        'Wielded by Nagato via the Deva Path (Yahiko\'s body) and original Rinnegan wielders.',
      shortSummary:
        'Manipulates gravitational repulsion to violently push all physical matter, chakra, and ninjutsu away from the user.',
      detailedLore:
        'By focusing Rinnegan chakra through the hands or body, Shinra Tensei generates an invisible, concussive repelling wave. Standard releases operate on a mandatory 5-second recharge window during which the Deva Path cannot employ gravitational techniques. When amplified by channeling all six paths\' chakra exclusively into Deva (shortening Nagato\'s lifespan), it can expand into a village-level cataclysm that flattened the entirety of Konoha into a crater.',
      tacticalUsage:
        'Absolute defense against physical assault and high-tier ninjutsu. Deflects incoming projectiles, disperses Amaterasu flames, and shatters opposing formations.',
      canonAppearance: 'Episode 162: Konoha Obliteration; Chapter 429',
      iconName: 'wind',
    },
    {
      id: 'bansho_tenin',
      name: 'Bansho Ten\'in',
      kanji: '万象天引',
      romaji: 'Heavenly Attraction of All Creation',
      classification: 'Ocular Dōjutsu / Gravitational Attraction',
      range: 'Short to Mid-Range',
      natureAffinity: 'Deva Path / Gravitational Force',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Deva Path Signature',
      wieldersDescription:
        'The inverse gravitational vector of Shinra Tensei, drawing objects toward the caster.',
      shortSummary:
        'Generates an irresistible gravitational pull that pulls targeted matter or opponents directly toward the user\'s grasp.',
      detailedLore:
        'Operating on the polar opposite polarity of Shinra Tensei, Bansho Ten\'in designates an exact spatial locus or target and accelerates it toward the wielder. Nagato frequently combined this pull with the Asura Path\'s bladed weaponry or his own black chakra disruption receivers to impale targets as they arrived at point-blank range, leaving zero possibility for evasion.',
      tacticalUsage:
        'Disrupts enemy zoning, pulls airborne combatants to the earth, and forces lethal close-quarters encounters on the user\'s terms.',
      canonAppearance: 'Battle against Kakashi Hatake; Chapter 423',
      iconName: 'eye',
    },
    {
      id: 'chibaku_tensei',
      name: 'Chibaku Tensei',
      kanji: '地爆天星',
      romaji: 'Catastrophic Planetary Construction',
      classification: 'Forbidden Ocular Kinjutsu / Sealing Singularity',
      range: 'Extreme Long-Range',
      natureAffinity: 'Deva Path / Gravity Singularity',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Ultimate Rinnegan Sealing',
      wieldersDescription:
        'Originally conceived by the Sage of the Six Paths to create the Moon and seal the Ten-Tails.',
      shortSummary:
        'Condenses a super-dense black gravity sphere that ascends into the sky, pulling continents of earth and targets into a floating celestial prison.',
      detailedLore:
        'Nagato claps his hands to formulate a concentrated black gravity singularity, releasing it into the upper atmosphere. The sphere generates an immense gravitational field that rips bedrock, mountain ranges, forests, and living beings from the earth, compacting them into a massive floating planetoid. Nagato successfully captured the Eight-Tails form of Naruto within this technique until Kurama reached near full manifestation.',
      tacticalUsage:
        'The supreme capture and sealing technique of the Rinnegan. Requires a coordinated strike of massive long-range jutsu against the central gravity core before compaction to neutralize.',
      canonAppearance: 'Pain vs. Six-Tails/Eight-Tails Naruto; Chapter 439',
      iconName: 'moon',
    },
    {
      id: 'six_paths_technique',
      name: 'Six Paths of Pain',
      kanji: 'ペイン六道',
      romaji: 'Pein Rikudō',
      classification: 'Corpse Teleoperation & Shared Vision',
      range: 'All Ranges',
      natureAffinity: 'All Elemental & Spiritual Transformations',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Nagato Avatar Matrix',
      wieldersDescription:
        'Nagato synchronizing six fallen shinobi through black receivers, sharing unified visual telemetry.',
      shortSummary:
        'Distributes the divine abilities of the Rinnegan across six corpse vessels, coordinated with omnidirectional 360-degree shared sight.',
      detailedLore:
        'Nagato embeds black chakra receivers (Kuroki Kuimono) into six corpses, transmitting his high-frequency chakra signals from his central Gedo seat. Because every corpse possesses a pair of Rinnegan eyes, their optical feeds are instantly cross-linked in Nagato\'s mind. An attack observed by one body is simultaneously witnessed and reacted to by all five others, eliminating any blind spots in combat.',
      tacticalUsage:
        'Omnipresent visual network; specialization of combat roles into vanguard, long-range bombardment, soul extraction, summoner, ninjutsu absorption, and medic.',
      canonAppearance: 'Infiltration of Amegakure by Jiraiya; Chapters 377–383',
      iconName: 'shield',
    },
    {
      id: 'gedo_mazo_rinne_rebirth',
      name: 'Outer Path: Gedō Mazō & Rinne Rebirth',
      kanji: '外道・輪廻天生之術 / 外道魔像',
      romaji: 'Gedō: Rinne Tensei no Jutsu & Gedō Mazō',
      classification: 'Outer Path (7th Domain) / Divine Resurrection',
      range: 'Village-Wide / Dimensional',
      natureAffinity: 'Life Force / Yang Release & Ten-Tails Husk',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Outer Path Sovereign',
      wieldersDescription:
        'Wielded solely by Nagato himself from his hidden throne; entirely independent of the six Pain bodies.',
      shortSummary:
        'Summons the towering Ten-Tails shell to rip souls, or sacrifices the wielder\'s remaining vitality to resurrect the deceased from the King of Hell.',
      detailedLore:
        'The Outer Path (外道, Gedō) is the master domain of the 7th path, wielded only by the living owner of the Rinnegan. Through it, Nagato summons the Demonic Statue of the Outer Path (Gedō Mazō), releasing chakra soul dragons that instantly consume the life force of whoever they touch. Conversely, the Outer Path can invoke Rinne Rebirth (Gedō: Rinne Tensei no Jutsu), commanding the King of Hell to open its gates and breathe life back into hundreds of dead souls across an entire province at the cost of the caster\'s life.',
      tacticalUsage:
        'Mass battlefield resurrection or ultimate chakra-draining summon. Represents the divine arbitration between total mortality and miraculous rebirth.',
      canonAppearance: 'Nagato\'s redemption sacrifice to resurrect Konoha; Chapter 449',
      iconName: 'sparkles',
    },
  ],
  loreSections: [
    {
      id: 'amegakure_tragedy',
      title: 'Tears of Amegakure: The Orphan of Fate',
      subtitle: 'From War Orphan to the Incarnation of God',
      badge: 'Tragic Origin',
      isItachiExclusive: false,
      content:
        'Born in the rain-drenched buffer state of Amegakure during the Second Shinobi World War, Nagato suffered the trauma of witnessing his parents killed before his eyes by Konoha shinobi who mistook them for enemy combatants. Joining fellow orphans Yahiko and Konan, they formed the early Akatsuki under Jiraiya\'s mentorship, seeking peace through understanding. However, the paranoia of Amegakure\'s leader Hanzō the Salamander and Danzō Shimura forced Yahiko to impale himself upon Nagato\'s kunai, fracturing Nagato\'s worldview forever and birthing "Pain".',
      notableFacts: [
        'Yahiko\'s dying words entrusted the dream of true peace to Nagato.',
        'Nagato preserved Yahiko\'s body as the Deva Path, making Yahiko the eternal face and voice of God.',
        'The trauma awakened Nagato\'s latent Rinnegan powers, instantly summoning the Gedō Mazō.',
        'Black receivers pierced Nagato\'s back during the statue summon, emaciating his legs and confining him to a mobile mechanical walker.',
      ],
    },
    {
      id: 'six_paths_mechanics',
      title: 'The Six Paths Architecture & Telemetry',
      subtitle: 'The Distributed Neural Network of Pain',
      badge: 'Combat Matrix',
      isItachiExclusive: false,
      content:
        'The Six Paths of Pain represents the ultimate telepresence ninjutsu. Nagato acts as the central server, processing simultaneous visual and sensory feeds from six proxy bodies across long distances through high-frequency chakra transmission towers and rain sensors. Each corpse is retrofitted with black rods that act as antennas, allowing Nagato to route specific Rinnegan aspects into each body.',
      notableFacts: [
        'Shared vision eliminates blind spots: the 6 bodies cover 360 degrees of panoramic battlefield sight.',
        'Naraka Path ensures infinite stamina by reconstructing destroyed paths inside the King of Hell.',
        'Preta Path nullifies all ninjutsu, rendering standard elemental defenses ineffective.',
        'Deva Path serves as the tactical anchor, coordinating pincher movements with gravitational pushes and pulls.',
      ],
    },
    {
      id: 'madara_transplantation',
      title: 'The Stolen Eyes: Madara\'s Master Blueprint',
      subtitle: 'The Unwitting Pawn of the Eye of the Moon',
      badge: 'Ocular Revelation',
      isItachiExclusive: false,
      content:
        'For decades, Nagato believed his Rinnegan was a miraculous mutation gifted to him by destiny. In reality, Madara Uchiha awakened the Rinnegan shortly before his natural death by combining Hashirama Senju\'s cells with his own Indra chakra. Lacking the remaining years to execute the Eye of the Moon himself, Madara transplanted the eyes into baby Nagato—chosen specifically because Nagato\'s potent Uzumaki life force and chakra pool were great enough to bear the crushing physical drain of both Rinnegan eyes.',
      notableFacts: [
        'Madara intended for Nagato to eventually cast Gedō: Rinne Tensei no Jutsu to resurrect Madara\'s true living body.',
        'Obito Uchiha manipulated Nagato from the shadows under the guise of Madara Uchiha.',
        'Nagato\'s Uzumaki lineage granted him the red hair and massive chakra reserve essential to pilot six corpses simultaneously.',
        'Upon Nagato\'s death, Obito invaded Amegakure, killed Konan, and reclaimed the Rinnegan from Nagato\'s shrine.',
      ],
    },
  ],
  artifacts: [
    {
      id: 'gedo_mazo',
      name: 'Demonic Statue of the Outer Path',
      kanji: '外道魔像',
      type: 'Summoned Divine Husk',
      wielder: 'Nagato / Madara / Obito',
      description:
        'The petrified, lifeless husk of the Ten-Tails (Jūbi). Summoned from the moon by unlocking Rinnegan chakra, it absorbs and seals the nine Tailed Beasts inside its torso.',
      mythologicalOrigin:
        'Created by Hagoromo Otsutsuki when he separated the Ten-Tails\' chakra into the nine bijū and sealed the empty carapace within the celestial body of the Moon.',
    },
    {
      id: 'kuroki_kuimono',
      name: 'Black Chakra Receivers',
      kanji: '黒魂の杭',
      type: 'Yin-Yang Resonance Conductors',
      wielder: 'Nagato Uzumaki',
      description:
        'Dense black rods forged from Yin-Yang Release that transmit and receive chakra across vast distances. Contact with an opponent\'s flesh disrupts and paralyzes their internal chakra network.',
      mythologicalOrigin:
        'Physical manifestations of the Sage of the Six Paths\' Yin-Yang Release, acting as harmonic rods to channel divine spiritual energy.',
    },
  ],
};
