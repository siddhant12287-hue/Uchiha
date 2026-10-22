import type { CharacterProfile } from '../types/character';

export const SHISUI_DATA: CharacterProfile = {
  id: 'shisui',
  name: 'Shisui Uchiha',
  kanji: 'うちは シスイ',
  epithet: 'Shisui of the Body Flicker (瞬身のシスイ)',
  clan: 'Uchiha Clan',
  natureAffinities: ['Fire (Katon)', 'Wind (Futon)', 'Lightning (Raiton)', 'Yin (Inton)'],
  themeColor: '#10b981',
  accentColor: '#00e5a3',
  backgroundQuote:
    'You are my dearest friend... and the only one I can entrust this to. Protect the village... and the honor of the Uchiha name.',
  quoteAuthor: 'Shisui Uchiha to Itachi',
  quoteContext: 'At the precipice of the Naka River before his final leap',
  biographySummary:
    'Renowned across all five great nations as "Shisui of the Body Flicker", Shisui was an elite jonin of the Leaf whose visual prowess and unmatched shunshin speed made enemy shinobi flee on sight. Possessing the supreme genjutsu Kotoamatsukami, he devised a plan to stop the Uchiha coup peacefully without bloodshed. After Danzo Shimura betrayed him and stole his right eye, Shisui entrusted his remaining eye and the village\'s future to Itachi before casting himself into the river.',
  abilities: [
    {
      id: 'kotoamatsukami',
      name: 'Kotoamatsukami',
      kanji: '別天神',
      romaji: 'Kotoamatsukami',
      classification: 'Supreme Ocular Genjutsu (Mangekyo Sharingan)',
      range: 'Direct Line of Sight (No Eye Contact Required)',
      natureAffinity: 'Yin Release (Inton)',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Exclusive to Shisui\'s Eyes',
      wieldersDescription: 'Shisui Uchiha (Right eye stolen by Danzo, Left eye given to Itachi)',
      shortSummary: 'Manipulates the victim\'s mind imperceptibly by implanting false experiences and guiding their will.',
      detailedLore:
        'Named after the primordial Shinto deities of heaven. Regarded as the highest-caliber genjutsu in existence, Kotoamatsukami allows the user to enter the mind of any target within their visual field and instill false memories or thoughts. The victim carries out the implanted directives under the absolute conviction that they are acting on their own free will, rendering the technique completely undetectable even to master sensory ninja.',
      tacticalUsage:
        'Canon Limitations: Possesses an immense cooldown of roughly ten years per eye when used by standard wielders without Hashirama cells (Danzo reduced this to hours via Senju DNA). It is a subtle hypnotic suggestion rather than direct brute-force telekinesis.',
      canonAppearance: 'Used by Itachi\'s crow to overwrite Kabuto\'s Edo Tensei control (Chapter 550).',
      iconName: 'sparkles',
    },
    {
      id: 'shunshin',
      name: 'Shunshin no Shisui (Body Flicker)',
      kanji: '瞬身のシスイ',
      romaji: 'Shunshin no Jutsu',
      classification: 'High-Speed Movement & Afterimage Clones',
      range: 'All Ranges',
      natureAffinity: 'Wind / Fire Accelerated Chakra',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Signature Tactical Mastery',
      wieldersDescription: 'Shisui Uchiha (Legendary battlefield moniker)',
      shortSummary: 'High-speed displacement leaving tangible afterimages that can strike from any angle simultaneously.',
      detailedLore:
        'While Body Flicker is a basic D-rank technique taught to all ninja, Shisui\'s mastery elevated it into an S-rank phantom art. Moving so swiftly through space that his chakra left no detectable trace, Shisui generated multiple tangible "afterimage clones" (Zanzō Bunshin). These afterimages were not mere illusions—they possessed physical substance and could inflict real damage from whichever coordinate Shisui channeled his physical strike into.',
      tacticalUsage:
        'Neutralized entire platoons of enemy shinobi across the Third Shinobi World War without allowing enemies to pin his genuine physical coordinate.',
      canonAppearance: 'Demonstrated in Itachi Shinden and the Great Ninja War chronicles.',
      iconName: 'wind',
    },
    {
      id: 'green_susanoo',
      name: 'Jade Susanoo (Green Chakra Avatar)',
      kanji: '須佐能乎 (翠色)',
      romaji: 'Midori no Susanoo',
      classification: 'Divine Chakra Avatar (Mangekyo Manifestation)',
      range: 'Mid to Long Range',
      natureAffinity: 'Pure Density Chakra (Jade Green)',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Exclusive Canon Design by Kishimoto',
      wieldersDescription: 'Shisui Uchiha (Designed & supervised by Masashi Kishimoto)',
      shortSummary: 'A blazing emerald chakra titan wielding a massive spiral drill-lance and chest magatama barrage.',
      detailedLore:
        'Supervised and authored directly by series creator Masashi Kishimoto for Naruto Shippuden: Ultimate Ninja Storm Revolution and anime animations. Shisui\'s Susanoo manifests as a vibrant jade-green titan. Its defensive ribcage and armored skeletal form wields a colossal drill-like spiral lance in its right hand and can open its chest armor to unleash a rapid-fire barrage of blazing green chakra magatama (Tsukumo).',
      tacticalUsage:
        'Can be manifested even after losing his right eye to Danzo, demonstrating Shisui\'s formidable ocular reserve.',
      canonAppearance: 'Kishimoto canonical design in Storm Revolution and Itachi Shinden animation.',
      iconName: 'shield',
    },
    {
      id: 'katon_shisui',
      name: 'Fire Style: Dragon Fire Technique',
      kanji: '火遁・龍火の術',
      romaji: 'Katon: Ryūka no Jutsu',
      classification: 'High-Velocity Concentrated Fire Ninjutsu',
      range: 'Mid to Long Range',
      natureAffinity: 'Fire Release (Katon)',
      exclusivity: 'clan_shared',
      exclusivityBadge: 'Clan Heritage Technique',
      wieldersDescription: 'Uchiha Clan Fire Ninjutsu',
      shortSummary: 'Expels a focused jet of white-hot dragon flames running along tensioned wire lines.',
      detailedLore:
        'Shisui combined his superlative shurikenjutsu with Fire Style. By pinning adversaries with microscopic steel wires, he directed intense concentrated torrents of fire directly into the target\'s location with instantaneous lethality.',
      tacticalUsage:
        'Required multiple veteran Kirigakure Anbu water style shinobi (led by Ao) to unite their shields to withstand.',
      canonAppearance: 'Ao\'s recollection of confronting Shisui in Kirigakure records (Chapter 459).',
      iconName: 'flame',
    },
  ],
  loreSections: [
    {
      id: 'kotoamatsukami_cooldown',
      title: 'Kotoamatsukami: Rules, Cooldowns & Limitations',
      subtitle: 'The 10-Year Cooldown and the Art of Subtle Suggestion',
      isItachiExclusive: false,
      badge: 'Canon Rulebook',
      content:
        'Unlike aggressive ocular genjutsu such as Tsukuyomi or Demonic Flute, Kotoamatsukami does not announce its presence or trap the victim in a nightmare dimension. Instead, it imperceptibly rewrites the target\'s internal motivations. However, Kishimoto established strict canonical limitations: in a normal wielder, casting Kotoamatsukami once places that eye into a dormant regeneration state that takes roughly 10 years to recharge. Only by infusing the cellular DNA of Hashirama Senju (as Danzo Shimura did on his right arm) can this recharge period be artificially condensed to a few hours.',
      notableFacts: [
        'Right Eye: Stolen by Danzo Shimura at the root compound, later used to influence Mifune at the Five Kage Summit.',
        'Left Eye: Entrusted to Itachi, sealed in a crow, and programmed with the single command "Protect Konoha" to override Sasuke.',
        'Danzo destroyed his stolen right eye with a dying Reverse Four Symbols Sealing to prevent Obito from acquiring it.',
      ],
    },
    {
      id: 'zanzou_bunshin',
      title: 'The Phantom of the Body Flicker (Zanzō Bunshin)',
      subtitle: 'Physical Reality from Transient Speed',
      isItachiExclusive: false,
      badge: 'Legendary Shinobi Moniker',
      content:
        'Shisui\'s speed was so overwhelming that Ao of Kirigakure stated no ninja from the Mist was permitted to engage him alone. When Shisui performed his Body Flicker, he left dozens of afterimages suspended across the battlefield. Because Shisui was moving instantaneously between them, any afterimage that struck an opponent would instantly become a solid physical strike, while any counterattack aimed at an afterimage would strike mere empty air.',
      notableFacts: [
        'His movement left zero chakra distortion in the surrounding atmosphere, confounding sensory types.',
        'Taught Itachi the foundational philosophies of speed, deception, and shadow operations.',
        'His optical prowess was considered superior to any other living Uchiha of his generation.',
      ],
    },
    {
      id: 'naka_river_sacrifice',
      title: 'The Will of Fire Entrusted at Naka River',
      subtitle: 'The Nameless Shinobi who Protected the Leaf',
      isItachiExclusive: false,
      badge: 'Unsung Sacrifice',
      content:
        'Realizing that both the village elders and the clan police were descending into violence, and knowing that Danzo would hunt him for his remaining eye, Shisui met Itachi at the cliff over the Naka River. He plucked out his left eye and placed it into Itachi\'s palm, urging him to prevent civil war. To eliminate his body as a prize of war and prevent clan infighting over his demise, Shisui stepped backwards off the cliff into the rushing river, awakening Itachi\'s Mangekyo Sharingan through the grief of his sacrifice.',
      notableFacts: [
        'Wrote a suicide note pleading with the clan to abandon their narrow coup ambition.',
        'Refused to fight Danzo\'s Foundation to the death to avoid internal Konoha civil strife.',
        'His selfless philosophy shaped Itachi\'s definition of a true shinobi: "A nameless ninja who protects peace from within its shadow."',
      ],
    },
  ],
};
