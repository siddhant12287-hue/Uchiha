import type { CharacterProfile } from '../types/character';

export const MADARA_DATA: CharacterProfile = {
  id: 'madara',
  name: 'Madara Uchiha',
  kanji: 'うちは マダラ',
  epithet: 'Ghost of the Uchiha / Second Sage of Six Paths',
  clan: 'Uchiha Clan',
  natureAffinities: [
    'Fire (Katon)',
    'Wind (Futon)',
    'Lightning (Raiton)',
    'Earth (Doton)',
    'Water (Suiton)',
    'Wood (Mokuton - via Hashirama Cells)',
    'Yin-Yang (Onmyoton)',
  ],
  themeColor: '#3b82f6',
  accentColor: '#1d4ed8',
  backgroundQuote:
    'Wake up to reality. Nothing ever goes as planned in this accursed world. Wherever there is light, there are always shadows to be found as well.',
  quoteAuthor: 'Madara Uchiha to Obito',
  quoteContext: 'Underground Gedo Mazo sanctum',
  biographySummary:
    'Co-founder of the Hidden Leaf Village alongside Hashirama Senju and legendary patriarch of the Uchiha clan. Dissatisfied with the fragile peace and manipulated by the altered Naka Shrine tablet, Madara faked his death at the Valley of the End, cultivated Hashirama\'s flesh to unlock the Rinnegan, and orchestrated the Eye of the Moon Plan (Tsuki no Me Keikaku) across nearly a century to cast Infinite Tsukuyomi upon the globe.',
  abilities: [
    {
      id: 'perfect_susanoo',
      name: 'Perfect Susanoo (Complete Body)',
      kanji: '完成体 須佐能乎',
      romaji: 'Kanseitai — Susanoo',
      classification: 'Supreme Divine Chakra Construct',
      range: 'Colossal Battlefield Scale',
      natureAffinity: 'Dense Blue Yin-Yang Chakra',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Madara Signature Titan',
      wieldersDescription: 'Madara Uchiha (Stabilized Mountain-Cleaving Colossus)',
      shortSummary: 'Manifests a mountain-sized winged samurai titan capable of altering geography with a single sword stroke.',
      detailedLore:
        'Madara\'s stabilized Susanoo stands hundreds of meters tall, clad in elaborate tengu armor with massive wings that double as shields. Its chakra density rivals that of a Tailed Beast. Armed with dual colossal crystalline chokuto swords, a single casual sheath-swing unleashes shockwaves capable of slicing mountain ranges in half miles away.',
      tacticalUsage:
        'Overwhelmed the Five Kage simultaneously, effortlessly slicing two mountain peaks while challenging them to find an answer to a god\'s power.',
      canonAppearance: 'Unleashed against the Five Kage (Chapter 588–589).',
      iconName: 'shield',
    },
    {
      id: 'tengai_shinsei',
      name: 'Tengai Shinsei (Heaven Concealed)',
      kanji: '天涯彗星 / 天碍震星',
      romaji: 'Tengai Shinsei',
      classification: 'Ocular Gravitational Cataclysm (Rinnegan)',
      range: 'Stratospheric to Continental Impact',
      natureAffinity: 'Deva Path Gravitational Manipulation',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Exclusive to Madara\'s Rinnegan',
      wieldersDescription: 'Madara Uchiha (Synchronized seals with Susanoo hands)',
      shortSummary: 'Draws massive celestial meteors down from the upper stratosphere in devastating succession.',
      detailedLore:
        'Utilizing the Deva Path of his awakened Rinnegan while Susanoo weaves three simultaneous hand seals, Madara exerts immense gravitational pull into outer orbit. He draws a colossal meteor plummeting down directly upon the battlefield. If the first meteor is arrested or destroyed by opposing forces, a second, even larger meteor descends immediately behind it to obliterate all resistance.',
      tacticalUsage:
        'Decimated the Fourth Division of the Allied Shinobi Forces and crushed the combined earth defense of Onoki and Gaara.',
      canonAppearance: 'Reanimation battle in the Lightning Country desert (Chapter 560–561).',
      iconName: 'moon',
    },
    {
      id: 'limbo_hengoku',
      name: 'Limbo: Border Jail',
      kanji: '輪墓・辺獄',
      romaji: 'Rimbo: Hengoku',
      classification: 'Dimensional Rinnegan Technique',
      range: 'Coexisting Inter-Dimensional Reach',
      natureAffinity: 'Rinnegan Spatial Chakra',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Exclusive to Madara\'s Rinnegan',
      wieldersDescription: 'Madara Uchiha (Unlocked only with true Rinnegan)',
      shortSummary: 'Projects invisible shadow clones that reside in a parallel coexisting dimension called Limbo.',
      detailedLore:
        'Madara projects up to four corporeal shadows into the invisible realm of "Limbo" (Hengoku), a dimension that coexists alongside the physical plane. These clones are completely imperceptible to standard vision, sensory ninjutsu, and normal Byakugan or Sharingan. They can execute physical strikes, deflect Tailed Beast attacks, or act as an absolute barrier without revealing their presence. Only those wielding the Rinnegan can see Limbo shadows, and only Six Paths senjutsu chakra can physically damage them.',
      tacticalUsage:
        'Instantly knocked back all nine Tailed Beasts simultaneously with a single unseen swipe, sealing them within minutes.',
      canonAppearance: 'First deployed against the Tailed Beasts (Chapter 659).',
      iconName: 'repeat',
    },
    {
      id: 'wood_style_madara',
      name: 'Wood Style: Deep Forest Emergence',
      kanji: '木遁・樹界降誕',
      romaji: 'Mokuton: Jukai Kōtan',
      classification: 'Kekkei Genkai via Hashirama Cell Grafting',
      range: 'Continental Ecosystem Scale',
      natureAffinity: 'Earth + Water = Wood Release (Mokuton)',
      exclusivity: 'non_exclusive',
      exclusivityBadge: 'Acquired via Hashirama Cells',
      wieldersDescription: 'Originally Hashirama Senju; acquired by Madara via cell graft',
      shortSummary: 'Creates a sprawling, living forest that traps foes and absorbs their chakra at Madara\'s command.',
      detailedLore:
        'At the climax of their legendary clash at the Valley of the End, Madara bit off a chunk of Hashirama\'s flesh before falling. He regurgitated the tissue and grafted it onto his body inside his hideout. Decades of cultivating these Senju cells allowed Madara to manifest Hashirama\'s Wood Release, summon the Wood Dragon, and ultimately combine Indra and Asura chakra to awaken the Rinnegan in both eyes before his natural passing.',
      tacticalUsage:
        'Swallowed the Fourth Division in a tidal wave of instant primordial flora and poisonous pollen blossoms.',
      canonAppearance: 'Summoned against the Allied Shinobi Forces (Chapter 561).',
      iconName: 'wind',
    },
    {
      id: 'infinite_tsukuyomi_madara',
      name: 'Infinite Tsukuyomi',
      kanji: '無限月読',
      romaji: 'Mugen Tsukuyomi',
      classification: 'Planetary Genjutsu (Rinne Sharingan)',
      range: 'Planetary Worldwide Coverage',
      natureAffinity: 'Primordial Yin-Yang Chakra',
      exclusivity: 'exclusive',
      exclusivityBadge: 'Planetary Divine Jutsu',
      wieldersDescription: 'Madara Uchiha & Kaguya Otsutsuki',
      shortSummary: 'Reflects the third eye off the moon to plunge all living beings into an eternal customized dream.',
      detailedLore:
        'By awakening the Rinne Sharingan on his forehead as the Ten-Tails jinchuriki and flying into the stratosphere, Madara projected his ocular reflection onto the moon\'s face. The radiant light pierced all physical shadows across the globe, immobilizing every living creature in a dream state where their deepest desires were fulfilled, while the God Tree bound their bodies into White Zetsu.',
      tacticalUsage:
        'Successfully completed the Eye of the Moon plan, enveloping the entire planet before Black Zetsu\'s betrayal.',
      canonAppearance: 'Cast upon the night sky in the Fourth Shinobi World War (Chapter 676–677).',
      iconName: 'eye',
    },
  ],
  loreSections: [
    {
      id: 'hashirama_cells',
      title: 'The Valley of the End & The Cellular Union',
      subtitle: 'How Hashirama\'s Flesh Awakened the Rinnegan',
      isItachiExclusive: false,
      badge: 'Chakra Synthesis Lore',
      content:
        'Madara did not awaken the Rinnegan through training or hatred alone. By taking Hashirama\'s flesh at the Valley of the End and grafting it into his body, he merged the chakra of Indra\'s reincarnate (himself) with the chakra of Asura\'s reincarnate (Hashirama). Decades later, at the very end of his natural lifespan, this genetic harmony recreated the chakra of the Sage of Six Paths (Hagoromo), triggering the biological awakening of the Rinnegan in both eyes.',
      notableFacts: [
        'Used a time-delayed Izanagi programmed into his right eye to rewrite his death three days after Hashirama buried him.',
        'A face resembling Hashirama\'s likeness manifested over Madara\'s left pectoral where the tissue was grafted.',
        'Summoned the empty vessel of the Ten-Tails (Gedo Mazo) from the moon to sustain his life until Obito was trained.',
      ],
    },
    {
      id: 'limbo_dimension',
      title: 'The Unseen World: Mechanics of Limbo (Hengoku)',
      subtitle: 'A Coexisting Plane Outside Normal Reality',
      isItachiExclusive: false,
      badge: 'Rinnegan Physics',
      content:
        'Limbo exists in parallel with our world, occupying the same spatial coordinates without physical collision until Madara wills it. Madara can switch places with his Limbo shadows instantaneously. Because Limbo clones share all of Madara\'s physical strength and jutsu capacity, they can deliver concussive blows that appear to enemies as telekinetic force. Naruto could only sense their positions through Six Paths Sage Mode, and Sasuke could only track their movements using his Rinnegan.',
      notableFacts: [
        'With one Rinnegan, Madara could manifest one Limbo shadow; with two Rinnegan, he commanded four shadows.',
        'Limbo shadows must return to Madara\'s body after a set period to recharge their dimensional tether.',
        'Sealing jutsu infused with Six Paths chakra can temporarily pin a Limbo shadow to the physical earth.',
      ],
    },
    {
      id: 'dojutsu_evolution_chain',
      title: 'The Four Ocular Epochs of Madara Uchiha',
      subtitle: 'From the Warring States to the Divine Moon',
      isItachiExclusive: false,
      badge: 'Evolutionary Lineage',
      content:
        'No shinobi in history progressed through as many ocular stages as Madara Uchiha. Starting with the 3-Tomoe Sharingan in the Warring States period, he and Izuna became the first brothers to awaken the Mangekyo. After Izuna was mortally wounded, Madara accepted his brother\'s eyes to forge the Eternal Mangekyo. Decades later, Hashirama\'s cells awakened the Rinnegan. Finally, upon absorbing the God Tree and Ten-Tails, the divine Rinne Sharingan opened on his forehead.',
      notableFacts: [
        '1. Sharingan: Awakening precognition and fire copying in brutal youth combat.',
        '2. Eternal Mangekyo: Permanent immunity to optical blindness; unlocks the mountain-sized Perfect Susanoo.',
        '3. Rinnegan: Command over gravitational deva forces, meteor drops, and Limbo clones.',
        '4. Rinne Sharingan: Nine-tomoe ocular aperture enabling planetary Infinite Tsukuyomi.',
      ],
    },
  ],
};
