import { PrismaClient, CocktailDifficulty } from "@prisma/client";

const prisma = new PrismaClient();

// ── Cloudinary asset map ──────────────────────────────────────────────────────
const C = {
  // Brand logos
  hapusaLogo:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/hapusalogo_dkzogh.png",
  sulaLogo:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/sulalogo_p0vtn9.png",
  whistlerLogo:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/whistler_n5mlx3.png",
  luxardoLogo:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/Luxardologo_xfui74.png",
  greaterThanLogo:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/greaterThanFeatured_onn79k.jpg",

  // Carousel
  carousel1:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredHapusa_hbrchu.jpg",
  carousel2:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/greaterThanFeatured_onn79k.jpg",
  carousel3:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/carousel3_draf1u.jpg",
  carousel4:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/Maraschino-Cherries_kbcgys.jpg",

  // Product bottles
  hapusaBottle:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820669/hapusa_odr7kb.png",
  greaterThanBottle:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820669/gt_mdyr5s.png",
  whistlerBottle:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/whistlerbottle_tmoco5.png",
  cheninBlanc:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/cheninBlanc_zlx7mv.png",
  lateHarvest:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/lateharvest_ey1vzi.png",
  shirazCabernet:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/shirazCabernet_fvpbdo.png",
  tropical:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/Tropical_ppxtzy.png",
  brut: "https://res.cloudinary.com/dvhoi2xg1/image/upload/brute_kkksvd.png",
  seco: "https://res.cloudinary.com/dvhoi2xg1/image/upload/seco_spiifp.png",
  sparklingShiraz:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/Sprakling_gsdlph.png",
  zinfRose: "https://res.cloudinary.com/dvhoi2xg1/image/upload/Rose_lzpao5.png",
  zinfRed:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/Zinfadel_a07apw.png",
  maraschCherries:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/Maraschino-Cherries-2_swekvf.jpg",
  maraschOriginale:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_maraschino_originale_tklhqm.png",
  sambuca:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_sambuca-1_qpmyts.png",
  bitterRosso:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_bitter_h4rycz.png",
  aperitivo:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_aperitivo_rhr7wx.png",
  cherryLiqueur:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  tripleSec:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820418/triplesec_jbjalj.png",
  hazelnut:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/angioletto_tzd5nh.png",
  absinthe:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820417/absinthe-la-fata_beqj2b.png",
  rhubarbBitter:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820418/rhubarb_ptcehb.png",
  chamomileBitter:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820417/chamomile_zefg8u.png",
  orangeBitter:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820418/orange_hhcmzm.png",
  coffeeBitter:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820417/coffee_j6jsqm.png",
  merrysIrishCream:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820417/irishcream_ugipjv.png",
  merrysWhiteChocolate:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820418/whitechocolate_hx1qdl.png",
  broCode:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820417/brocodebottle_c4dd3b.png",
  bongaBonga:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1778820417/bongabongab_giwncn.png",

  // Featured / hero images
  featHapusa:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredHapusa_hbrchu.jpg",
  featGreaterThan:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/greaterThanFeatured_onn79k.jpg",
  featWhistler:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1775727766/featured_whistler_rmxvbs.jpg",
  featMaraschino:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  featBitter:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredBitter_djr1y0.png",
  featTropical:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/tropicalFeature_bf6cbd.webp",
  featCheninBlanc:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/cheninFeature_r47hfo.webp",
  featShiraz:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/shirazFeature_xvbze8.jpg",

  // Background / lifestyle
  hapusaBg:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/Hapusa-Gin-lifestyle_deed4m.jpg",

  // Cocktail images
  himalayanNegroni:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/himalyannegroni_s0c5gm.jpg",
  apricotSmash:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/apricot-smash_bqvrcc.jpg",
  gimlet: "https://res.cloudinary.com/dvhoi2xg1/image/upload/gimlet_qu8t53.jpg",
  nySour: "https://res.cloudinary.com/dvhoi2xg1/image/upload/nysour_noqnv3.jpg",
  southside:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/southside_tnjqxv.jpg",
  greaterMartini:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/greatermartini_ygjo1i.png",
  ginBasil:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/ginbasil_euod0s.png",
  saltyDog:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/saltydog_xm8nfa.png",
  aviation:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/aviation_pktxrb.jpg",
  negroni:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/negroni_mh5xj1.jpg",
  shakerato:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/shakerato_bbpcfx.png",
  jungleSamba:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/junglesamba_catz5m.jpg",
  vacanza:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/vacanza_scf946.jpg",
  bicicletta:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/bicicletta_nhfzze.jpg",
  hemingway:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  maratonic:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_maraschino_originale_tklhqm.png",
  morlaccoFizz:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  cherryNegroni:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  luxiStyle:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  whiteLady:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  margarita:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardotriple_eaimmo.jpg",
  boulevardier:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/negroni_mh5xj1.jpg",
  sorrentino:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_aperitivo_rhr7wx.png",
  aperitivoSpritz:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_aperitivo_rhr7wx.png",
  ilSanto:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  angiolettoLime:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/angioletto_tzd5nh.png",

  // Amrit's signature cocktails
  summerScandal: "/signature/summerscandal.jpeg",
  underTheFigTree: "/signature/underthefigtree.jpeg",
  midNightOffering: "/signature/midnightoffering.jpeg",
  ohMami: "/signature/ohmami.jpeg",
  wildSeduction: "/signature/wildseduction.jpeg",
  purpleTease: "/signature/purpletree.jpeg",
  smokeAndDust: "/signature/smokeanddust.jpeg",

  // Unassigned — assign when cocktail recipes are ready
  broCodeSpritz:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1781087516/brocodespritz_dyq5pa.jpg",
  luxardoAperitivoCocktail:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1781087516/luxardoaperitivo_irbpyx.jpg",
  pandorasBox:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1781087516/pandorasbox_xabkpq.jpg",
  velvetEspresso:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1781087517/velvetespresso_d3ywej.jpg",
  whistlersFashioned:
    "https://res.cloudinary.com/dvhoi2xg1/image/upload/v1781087517/whistlersfashioned_gfcwt8.jpg",
} as const;

// ── Brands ────────────────────────────────────────────────────────────────────
const brands = [
  {
    slug: "hapusa",
    name: "Hapusa",
    logo: C.hapusaLogo,
    description:
      "Premium Indian Craft Gin distilled with foraged Himalayan botanicals.",
    country: "India",
  },
  {
    slug: "sula",
    name: "Sula",
    logo: C.sulaLogo,
    description: "India's leading wine brand, crafted in the Nashik Valley.",
    country: "India",
  },
  {
    slug: "the-whistler",
    name: "The Whistler",
    logo: C.whistlerLogo,
    description: "Triple-distilled Irish whiskey from County Louth, Ireland.",
    country: "Ireland",
  },
  {
    slug: "luxardo",
    name: "Luxardo",
    logo: C.luxardoLogo,
    description: "Family-owned Italian liqueur house producing since 1821.",
    country: "Italy",
  },
  {
    slug: "greater-than",
    name: "Greater Than",
    logo: C.greaterThanLogo,
    description: "India's first London Dry Gin, copper pot distilled in Goa.",
    country: "India",
  },
  {
    slug: "merrys",
    name: "Merry's",
    logo: "/home/Merrys_Logo.png",
    description:
      "Robert A. Merry & Co. Ltd — premium Irish cream liqueurs blended with Irish whiskey and fresh dairy cream.",
    country: "Ireland",
  },
  {
    slug: "bro-code",
    name: "Bro Code",
    logo: "/home/brocode.png",
    description:
      "India's boldest high-strength beer — brewed from premium barley malt for those who don't compromise.",
    country: "India",
  },
  {
    slug: "bonga-bonga",
    name: "Bonga Bonga",
    logo: "/home/Bongalogo.png",
    description:
      "A vibrant mystery liqueur with a playful, fruity character that defies easy categorization.",
    country: "India",
  },
];

// ── Products ──────────────────────────────────────────────────────────────────
const products = [
  // ── Hapusa ─────────────────────────────────────────────────────────────────
  {
    slug: "hapusa-himalayan-dry-gin",
    name: "Hapusa Himalayan Dry Gin",
    brandSlug: "hapusa",
    category: "gin",
    description:
      "Hapusa is a premium Himalayan dry gin, distilled with foraged botanicals found close to the snowline. Juniper — known as Hapusa in Sanskrit — gives this gin its name and its wild, piney character. Each bottle is a portrait of the Himalayas.",
    image: C.hapusaBottle,
    featuredImage: C.featHapusa,
    backgroundImage: C.hapusaBg,
    volume: "700ml",
    alcoholPercentage: "43% ABV",
    country: "India",
    region: "Himachal Pradesh & Goa, India",
    flavors:
      "Himalayan Juniper, Coriander Seeds, Raw Mango, Gondhoraj Lime, Ginger, Turmeric, Almonds",
    tastingNotes:
      "Pine forests and wildflowers on the nose with a distinctly earthy Himalayan quality. The palate brings bold juniper, tart raw mango, and a warming ginger heat. Long, delicately spiced finish with lingering piney juniper.",
    servingSuggestion:
      "Best served neat from the freezer to let the botanicals open up slowly. In a G&T, pair with a slice of raw mango, a sprig of rosemary, and quality Indian tonic.",
    awards: ["Gold — India International Spirits Challenge"],
    pairings: [],
    highlights: [
      "Himalayan juniper foraged close to the snowline",
      "Seven botanicals — all sourced within India",
      "Distilled in small batches in Goa",
    ],
    isFeatured: true,
    featuredOrder: 0,
  },

  // ── Greater Than ───────────────────────────────────────────────────────────
  {
    slug: "greater-than-london-dry-gin",
    name: "Greater Than London Dry Gin",
    brandSlug: "greater-than",
    category: "gin",
    description:
      "India's first London Dry Gin, copper pot distilled in Goa with nine botanicals sourced from India and around the world. Clean, classic, and unapologetically bold — built for the Martini glass as much as the highball.",
    image: C.greaterThanBottle,
    featuredImage: C.featGreaterThan,
    volume: "700ml",
    alcoholPercentage: "40% ABV",
    country: "India",
    region: "Goa, India",
    flavors:
      "Juniper Berries, Coriander Seeds, Almond, Angelica Root, Fennel, Lemongrass, Orange Peel, Chamomile, Ginger",
    tastingNotes:
      "Clean juniper and fresh lemon peel on the nose, with a soft floral note from chamomile. Bright citrus and coriander lead on the palate, giving way to a warm, clean ginger finish.",
    servingSuggestion:
      "Ideal in a classic Martini with dry vermouth and a lemon twist. In a G&T, keep it simple — quality Indian tonic and a long strip of lemon peel.",
    awards: [],
    pairings: [],
    highlights: [
      "India's first London Dry Gin",
      "Copper pot distilled in Goa",
      "Nine botanicals from India and around the world",
    ],
    isFeatured: true,
    featuredOrder: 1,
  },

  // ── The Whistler ───────────────────────────────────────────────────────────
  {
    slug: "the-whistler-irish-whiskey",
    name: "The Whistler Irish Whiskey",
    brandSlug: "the-whistler",
    category: "whiskey",
    description:
      "Triple-distilled and aged in ex-bourbon barrels, The Whistler is a blended Irish whiskey built around smoothness. Honey, vanilla, and salted caramel define the character — approachable enough for newcomers, considered enough for the serious drinker.",
    image: C.whistlerBottle,
    featuredImage: C.featWhistler,
    volume: "700ml",
    alcoholPercentage: "40% ABV",
    country: "Ireland",
    region: "County Louth, Ireland",
    flavors: "Honey, Vanilla, Salted Caramel, Toasted Oak, Dried Fruit",
    tastingNotes:
      "Gentle honey and vanilla on the nose with a soft toasted grain quality. Smooth on the palate — caramel sweetness, a touch of oak, and subtle dried fruit. Clean, mellow finish with lingering salted caramel.",
    servingSuggestion:
      "Serve neat or with a single large ice cube to open it up slowly. Exceptional in an Old Fashioned with a good Demerara syrup and a fat orange peel.",
    awards: [],
    pairings: ["Dark chocolate", "Smoked salmon", "Hard aged cheeses"],
    highlights: [
      "Triple distilled for exceptional smoothness",
      "Aged in ex-bourbon barrels",
      "Blended Irish whiskey",
    ],
    isFeatured: true,
    featuredOrder: 2,
  },

  // ── Sula wines ─────────────────────────────────────────────────────────────
  {
    slug: "sula-chenin-blanc",
    name: "Sula Chenin Blanc",
    brandSlug: "sula",
    category: "wine",
    description:
      "India's best-selling white wine. Refreshing and easy-drinking, with slight residual sweetness smartly balanced by bright acidity. Made with genuine respect for the environment under strict sustainable practices.",
    image: C.cheninBlanc,
    featuredImage: C.featCheninBlanc,
    volume: "750ml",
    alcoholPercentage: "12.5% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Ripe Tropical Fruit, Honey, Fresh Citrus, Lychee, Green Apple",
    tastingNotes:
      "Aromas of tropical fruit with hints of honey and beeswax. Off-dry palate with ripe guava and lychee, balanced by refreshing acidity. Clean, fruit-forward finish that lingers gently.",
    servingSuggestion:
      "Serve chilled at 8–10°C. Pairs beautifully with light salads, fried seafood, vegetarian Indian dishes, and Gujarati thali.",
    awards: [],
    grapeVarietal: "100% Chenin Blanc",
    pairings: [
      "Light salads",
      "Gujarati thali",
      "Vegetable quiche",
      "Rawa fried fish",
    ],
    highlights: [
      "India's best-selling white wine",
      "Off-dry style — ideal for first-time wine drinkers",
      "Sustainably farmed grapes",
    ],
  },
  {
    slug: "sula-late-harvest",
    name: "Sula Late Harvest",
    brandSlug: "sula",
    category: "wine",
    description:
      "India's most loved dessert wine — the first Indian wine to win Silver at both the Paris Wine Cup and Decanter World Wine Awards. Concentrated, honeyed, and luxuriously sweet with a defining streak of acidity that keeps it from tipping into excess.",
    image: C.lateHarvest,
    volume: "750ml",
    alcoholPercentage: "11% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Dried Apricot, Mango, Golden Raisins, Honey, Orange Blossom",
    tastingNotes:
      "Intensely aromatic nose of dried apricot, mango, and honeyed richness. Full-bodied palate with concentrated sweetness balanced by vibrant acidity. Long, complex finish with layers of stone fruit.",
    servingSuggestion:
      "Serve well chilled at 6–8°C. A natural match for blue cheese, foie gras, crème brûlée, and gulab jamun.",
    awards: ["Silver — Paris Wine Cup", "Silver — Decanter World Wine Awards"],
    grapeVarietal: "85% Chenin Blanc, 15% Muscat",
    pairings: ["Blue cheese", "Crème brûlée", "Gulab jamun", "Foie gras"],
    highlights: [
      "First Indian wine to win Silver at the Paris Wine Cup",
      "Silver at Decanter World Wine Awards",
      "India's first Late Harvest Chenin Blanc",
    ],
  },
  {
    slug: "sula-shiraz-cabernet",
    name: "Sula Shiraz Cabernet",
    brandSlug: "sula",
    category: "wine",
    description:
      "India's best-selling red wine. Silky and earthy with dark cherries, black pepper, and mocha. A food-friendly structure that works equally well with a spiced curry or a chargrilled steak.",
    image: C.shirazCabernet,
    featuredImage: C.featShiraz,
    volume: "750ml",
    alcoholPercentage: "13% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Blackberry, Dark Cherry, Black Plum, Black Pepper, Mocha, Olive",
    tastingNotes:
      "Deep ruby. Aromas of dark cherry, blackberry, and black pepper with mocha undertones. Medium-full body with silky tannins and an earthy, persistent finish.",
    servingSuggestion:
      "Serve at 16–18°C. An excellent partner for barbecued meats, chicken tikka masala, rajma masala, and aged hard cheeses.",
    awards: [],
    grapeVarietal: "85% Shiraz, 15% Cabernet Sauvignon",
    pairings: [
      "Barbecued meats",
      "Chicken tikka masala",
      "Rajma masala",
      "Aged cheese",
    ],
    highlights: [
      "India's best-selling red wine",
      "Silky, food-friendly tannin structure",
    ],
  },
  {
    slug: "sula-tropical-rose",
    name: "Sula Tropical Rosé",
    brandSlug: "sula",
    category: "wine",
    description:
      "India's first and only Gold winner at the International Wine Challenge. A sparkling rosé that delivers an exuberant burst of tropical fruit — peach, passion fruit, and guava — in a vibrant, celebratory package.",
    image: C.tropical,
    featuredImage: C.featTropical,
    volume: "750ml",
    alcoholPercentage: "12% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Peach, Passion Fruit, Guava, Watermelon, Fresh Citrus",
    tastingNotes:
      "Vibrant salmon-pink with fine bubbles. Exuberant aromas of peach and passion fruit with a hint of guava. Light-bodied with refreshing citrus acidity and a clean, tropical finish.",
    servingSuggestion:
      "Serve very well chilled at 6–8°C. A perfect aperitif. Great with fried seafood, light salads, and spiced appetizers.",
    awards: ["Gold — International Wine Challenge"],
    grapeVarietal: "70% Chenin Blanc, 30% Riesling and Syrah",
    pairings: ["Fried seafood", "Light salads", "Spiced appetizers"],
    highlights: [
      "India's first and only Gold winner at the International Wine Challenge",
      "Special edition sparkling rosé",
    ],
    isFeatured: true,
    featuredOrder: 5,
  },
  {
    slug: "sula-brut",
    name: "Sula Brut",
    brandSlug: "sula",
    category: "wine",
    description:
      "Lively and celebratory. Sula Brut is a Champagne-method sparkling wine offering crisp green apple and pear aromas with a dry, refreshing finish — a medalist at both the Paris Wine Cup and Decanter Awards.",
    image: C.brut,
    volume: "750ml",
    alcoholPercentage: "12% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Green Apple, Ripe Pear, Fresh Citrus, Toasted Brioche",
    tastingNotes:
      "Fine, persistent bubbles. Aromas of crisp green apple and pear with a subtle toasty note. Dry palate with lively citrus acidity and a clean, fresh finish.",
    servingSuggestion:
      "Serve well chilled at 6–8°C as an aperitif. Works beautifully alongside fried chicken, Indian pakoras, and smoked salmon.",
    awards: [
      "Medalist — Paris Wine Cup",
      "Medalist — Decanter World Wine Awards",
    ],
    pairings: [
      "Smoked salmon",
      "Fried chicken",
      "Indian pakoras",
      "French fries",
    ],
    highlights: [
      "Champagne-method sparkling wine",
      "Medalist at Paris Wine Cup and Decanter Awards",
      "Light, dry, and versatile",
    ],
  },
  {
    slug: "sula-seco",
    name: "Sula Seco",
    brandSlug: "sula",
    category: "wine",
    description:
      "Citrusy, delicious, and endearingly versatile. Seco is a semi-sparkling wine made from Chenin Blanc, built for easy drinking and even easier cocktail making.",
    image: C.seco,
    volume: "750ml",
    alcoholPercentage: "12% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Melon, Passion Fruit, Ripe Pear, Citrus Zest",
    tastingNotes:
      "Delicate aromas of ripe melon and passion fruit. Light-bodied with gentle fruitiness, refreshing citrus acidity, and a clean, lingering finish.",
    servingSuggestion:
      "Serve chilled. Ideal as a spritz base — top with tonic and a squeeze of lime. Works as a light aperitif on its own.",
    awards: [],
    grapeVarietal: "100% Chenin Blanc",
    pairings: [
      "South Asian curries",
      "Indian pakoras",
      "Frittata",
      "Aperitifs",
    ],
    highlights: [
      "Semi-sparkling — softer fizz than a full Brut",
      "Ideal for sparkling wine cocktails",
      "100% Chenin Blanc from Nashik",
    ],
  },
  {
    slug: "sula-sparkling-shiraz",
    name: "Sula Sparkling Shiraz",
    brandSlug: "sula",
    category: "wine",
    description:
      "India's first and only sparkling red wine — a Gold Medal winner at the India Wine Awards. Pomegranate, dark berries, and warming spice in an effervescent, celebratory format.",
    image: C.sparklingShiraz,
    volume: "750ml",
    alcoholPercentage: "12.5% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Pomegranate, Dark Berries, Black Pepper, Smoke, Warm Spice",
    tastingNotes:
      "Deep ruby with energetic bubbles. Aromas of pomegranate and dark berries with smoky spice complexity. Full-flavored palate with vibrant fruitiness and a warm, spiced finish.",
    servingSuggestion:
      "Serve lightly chilled at 12–14°C. Pairs boldly with dark chocolate desserts, chili chicken, and dabeli.",
    awards: ["Gold — India Wine Awards"],
    grapeVarietal: "100% Shiraz",
    pairings: [
      "Dark chocolate dessert",
      "Chili chicken",
      "Dabeli",
      "Mutton rahra",
    ],
    highlights: [
      "India's first and only sparkling red wine",
      "Gold Medal at the India Wine Awards",
      "Prosecco method — fruit-forward and vibrant",
    ],
  },
  {
    slug: "sula-zinfandel-rose",
    name: "Sula Zinfandel Rosé",
    brandSlug: "sula",
    category: "wine",
    description:
      "India's first Zinfandel Rosé. Cranberry, citrus, and ripe stone fruit with residual sweetness smartly balanced by refreshing acidity. Light, vibrant, and made for Indian summers.",
    image: C.zinfRose,
    volume: "750ml",
    alcoholPercentage: "12% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Cranberry, Citrus, Strawberry, Ripe Stone Fruit, Watermelon",
    tastingNotes:
      "Bright pink. Fresh cranberry and citrus on the nose. Off-dry palate with juicy strawberry and stone fruit, crisp acidity, and a clean, refreshing finish.",
    servingSuggestion:
      "Serve well chilled. Great with spicy Indian dishes, Chinese appetizers, and as a standalone summer sipper.",
    awards: [],
    grapeVarietal: "100% Zinfandel",
    pairings: [
      "Spiced Indian dishes",
      "Chinese appetizers",
      "Paneer chilli",
      "Light salads",
    ],
    highlights: [
      "India's first ever Zinfandel Rosé",
      "Off-dry — sweet and refreshing",
      "Perfect for Indian summers",
    ],
  },
  {
    slug: "sula-zinfandel-red",
    name: "Sula Zinfandel Red",
    brandSlug: "sula",
    category: "wine",
    description:
      "Generous, fruit-forward, and playful. India's first Zinfandel — unoaked and built to show off the grape's natural exuberance. Red berries, dark plum, and a warm cinnamon spice.",
    image: C.zinfRed,
    volume: "750ml",
    alcoholPercentage: "12.5% ABV",
    country: "India",
    region: "Nashik Valley, Maharashtra, India",
    flavors: "Red Berries, Blackberry, Dark Plum, Cinnamon, Warm Spice",
    tastingNotes:
      "Aromas of red berries, blackberry, and dark plum with hints of cinnamon. Medium-bodied with soft tannins, vibrant fruitiness, and a clean, easy finish.",
    servingSuggestion:
      "Serve at 16°C. Naturally food-friendly — works with spiced curries, cold cuts, teriyaki, and spicy noodles.",
    awards: [],
    grapeVarietal: "100% Zinfandel",
    pairings: ["Spiced curries", "Cold cuts", "Teriyaki", "Spicy noodles"],
    highlights: [
      "India's first Zinfandel",
      "Unoaked — pure, fruit-forward expression",
      "Soft tannins, great food wine",
    ],
  },

  // ── Luxardo ────────────────────────────────────────────────────────────────
  {
    slug: "luxardo-maraschino-cherries",
    name: "Luxardo Maraschino Cherries",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "The cocktail world's most coveted garnish. Candied marasca cherries soaked in Luxardo's own syrup — no artificial colors, no thickening agents, no preservatives. Just the pure, deep flavor of the fruit.",
    image: C.maraschCherries,
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors: "Marasca Cherry, Dark Fruit Syrup, Almond, Vanilla",
    tastingNotes:
      "Intensely sweet dark cherry flavor with a rich, thick syrup. Notes of almond and subtle bitterness from the marasca skin give balance. Concentrated and complex — nothing like a grocery store cherry.",
    servingSuggestion:
      "The essential garnish for Manhattans, Old Fashioneds, and Whiskey Sours. Also extraordinary over vanilla ice cream or folded into a clafoutis.",
    awards: [],
    pairings: [],
    highlights: [
      "No artificial colors, thickeners, or preservatives",
      "All-natural dark red color from the fruit itself",
      "Made from Luxardo's own marasca cherry orchards",
    ],
  },
  {
    slug: "luxardo-maraschino-originale",
    name: "Luxardo Maraschino Originale",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "The original. Produced since 1821, Luxardo Maraschino is crystal clear with a character unlike any other liqueur — marasca cherry distillate, roasted nuttiness, dark chocolate, and a touch of orange marmalade. The backbone of some of history's greatest cocktails.",
    image: C.maraschOriginale,
    featuredImage: C.featMaraschino,
    volume: "700ml",
    alcoholPercentage: "32% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors:
      "Marasca Cherry, Roasted Almond, Dark Chocolate, Vanilla, Orange Marmalade",
    tastingNotes:
      "Crystal clear. Distinctive marasca cherry distillate on the nose with roasted nuttiness and a strong spirit character. Smooth but sharp on the palate — dark chocolate, vanilla, and a bright orange marmalade note. Long, complex finish.",
    servingSuggestion:
      "Essential in the Aviation, Hemingway Daiquiri, and Tuxedo. Can be served straight over ice as a digestif, or used to macerate fruit for dessert.",
    awards: ["Gold — International Spirits Challenge"],
    pairings: [],
    highlights: [
      "Produced continuously since 1821",
      "Made from Luxardo's own marasca cherry orchards in Torreglia",
      "GMO Free · Kosher Certified · Vegan Friendly",
    ],
    isFeatured: true,
    featuredOrder: 3,
  },
  {
    slug: "luxardo-sambuca",
    name: "Luxardo Sambuca dei Cesari",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "A traditional Italian liqueur rooted in star anise, herbs, and pure volcanic water from Luxardo's own springs. The Italian ritual of 'con la mosca' — three coffee beans, a flame, and a shot — was made for this.",
    image: C.sambuca,
    volume: "700ml",
    alcoholPercentage: "38% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors:
      "Star Anise, Liquorice, Fennel Seed, Subtle Coriander, Sweet Herbs",
    tastingNotes:
      "Intensely sweet with a bold, clean anise character on the nose. Syrupy mouthfeel with rich liquorice and fennel. Long, warming herbal finish that lingers.",
    servingSuggestion:
      "The classic ritual: serve neat at room temperature with three coffee beans ('con la mosca'), light briefly, extinguish, swirl, and sip. Also works beautifully in coffee cocktails.",
    awards: [],
    pairings: [],
    highlights: [
      "Made with star anise and pure volcanic spring water",
      "The original Italian 'con la mosca' ritual",
    ],
  },
  {
    slug: "luxardo-bitter-rosso",
    name: "Luxardo Bitter Rosso",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "Vibrant red, intensely herbal, and genuinely complex. Luxardo Bitter is made by separately infusing citrus fruits, bitter herbs, and fragrant plants before blending — a method that preserves the integrity of each botanical. The foundation of a proper Negroni.",
    image: C.bitterRosso,
    featuredImage: C.featBitter,
    volume: "700ml",
    alcoholPercentage: "25% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors: "Gentian Root, Wormwood, Blood Orange Zest, Quinine, Bitter Herbs",
    tastingNotes:
      "Bright red with an intense herbal and citrus aroma. Complex gentian bitterness balanced with blood orange and sweet herbs on the palate. Persistent, gently bitter finish with a clean herbal warmth.",
    servingSuggestion:
      "The foundation of a proper Negroni or Boulevardier. Equally excellent over ice with soda and an orange slice as a standalone aperitif.",
    awards: [],
    pairings: [],
    highlights: [
      "Botanicals infused separately to preserve individual character",
      "Naturally vibrant red — no artificial color",
      "Lower ABV makes it versatile as a Campari alternative",
    ],
    isFeatured: true,
    featuredOrder: 4,
  },
  {
    slug: "luxardo-aperitivo",
    name: "Luxardo Aperitivo",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "A lighter-style Italian aperitivo made from a balanced infusion of citrus fruits, herbs, and roots. Zesty orange, pink grapefruit, and a gentle rhubarb bitterness — built for the Spritz.",
    image: C.aperitivo,
    volume: "700ml",
    alcoholPercentage: "11% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors:
      "Orange Marmalade, Pink Grapefruit, Rhubarb, Gentian, Floral Herbs",
    tastingNotes:
      "Vibrant orange-amber. Zesty orange marmalade and grapefruit on the nose with a floral, herbal lift. Lightly bitter palate with a clean, refreshing finish that invites the next sip.",
    servingSuggestion:
      "Build the classic Aperitivo Spritz: 3 parts Prosecco, 2 parts Luxardo Aperitivo, 1 part soda. Serve over ice with an orange wheel. Lower ABV than Aperol.",
    awards: [],
    pairings: [],
    highlights: [
      "Lower ABV than Aperol — lighter and more refreshing",
      "Made from a balanced infusion of citrus, herbs, and roots",
      "The ideal Spritz base",
    ],
  },
  {
    slug: "luxardo-cherry-liqueur",
    name: "Luxardo Cherry Liqueur",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "Produced since 1821, Luxardo's second speciality after Maraschino Originale. Sangue Morlacco — 'Morlacco Blood' — is a deep, concentrated cherry liqueur with the perfume of freshly squeezed cherry juice and a thick, syrupy body.",
    image: C.cherryLiqueur,
    volume: "700ml",
    alcoholPercentage: "30% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors:
      "Marasca Cherry, Cherry Jam, Black Pepper Spice, Dark Fruit, Tartness",
    tastingNotes:
      "Intense cherry-red. Aroma of freshly squeezed cherry juice with a warming pepper note. Thick and syrupy on the palate — concentrated cherry jam flavor with fruit tartness partially cutting the sweetness. Warm, spiced finish.",
    servingSuggestion:
      "Key ingredient in the Blood & Sand and Singapore Sling. A Cherry Negroni built with this is extraordinary. Also excellent drizzled over vanilla panna cotta.",
    awards: [],
    pairings: [],
    highlights: [
      "Produced since 1821 — Luxardo's second oldest recipe",
      "Made from Luxardo's own marasca cherry orchards",
    ],
  },
  {
    slug: "luxardo-triple-sec",
    name: "Luxardo Triple Sec",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "Produced since the first half of the 1800s, Luxardo Triplum is a traditional triple sec made from the dried and distilled peels of curaçao oranges, sweet oranges, and mandarins. Smooth, rounded, and properly citrusy.",
    image: C.tripleSec,
    volume: "700ml",
    alcoholPercentage: "39% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors: "Curaçao Orange, Sweet Orange, Mandarin, Dried Citrus Peel",
    tastingNotes:
      "Crystal clear with vibrant orange and mandarin aromas. Smooth, rounded citrus flavor on the palate with a natural sweetness and a clean, dry orange finish. More depth than most triple secs.",
    servingSuggestion:
      "Essential in a Margarita, Cosmopolitan, White Lady, and Sidecar. Use anywhere Cointreau is called for — and at a higher ABV it carries further in the glass.",
    awards: [],
    pairings: [],
    highlights: [
      "Made from three varieties of orange peel — curaçao, sweet, and mandarin",
      "Higher ABV than most triple secs — better carry in cocktails",
      "Produced continuously since the 1800s",
    ],
  },
  {
    slug: "luxardo-hazelnut-liqueur",
    name: "Luxardo Hazelnut Liqueur",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "Angioletto is made from a blending process of real hazelnut infusion with natural extracts of cocoa and vanilla. Rich, indulgent, and surprisingly complex — closer to praline in a glass than a simple nut liqueur.",
    image: C.hazelnut,
    volume: "700ml",
    alcoholPercentage: "24% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors: "Toasted Hazelnut, Cocoa, Vanilla, Almond, Walnut, Mocha",
    tastingNotes:
      "Rich, lightly syrupy. Intense toasted hazelnut on the nose with cocoa and warm biscuit. Walnut, almond, and mocha notes on the palate, with hints of vanilla and citrus. Long, indulgent finish.",
    servingSuggestion:
      "Serve neat as a digestif over a single ice cube. Excellent in espresso cocktails and extraordinary poured warm over vanilla gelato.",
    awards: [],
    pairings: [],
    highlights: [
      "Made from real hazelnut infusion with natural cocoa and vanilla",
      "Lower ABV — ideal as a dessert digestif",
    ],
  },
  {
    slug: "luxardo-absinthe-fata-verde",
    name: "Luxardo Absinthe Fata Verde",
    brandSlug: "luxardo",
    category: "liqueur",
    description:
      "The 'Green Fairy.' A classic-style absinthe built from grand wormwood, green anise, and Florence fennel. High in ABV, intensely herbal, and steeped in ritual — the traditional louche is half the experience.",
    image: C.absinthe,
    volume: "700ml",
    alcoholPercentage: "70% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors:
      "Grand Wormwood, Green Anise, Florence Fennel, Swiss Star Anise, Herbs",
    tastingNotes:
      "Brilliant green, going milky white on the louche. Intense herbal and anise aromatics with a distinctly medicinal, complex nose. Bold anise leads the palate with wormwood bitterness, fennel, and a long herbal finish.",
    servingSuggestion:
      "Pour 30ml into a glass. Place a sugar cube on a slotted spoon. Slowly drip 90ml of ice-cold water over the cube to trigger the louche. A few drops in a Sazerac or Corpse Reviver No. 2 are transformative.",
    awards: [],
    pairings: [],
    highlights: [
      "70% ABV — handle with respect",
      "Traditional louche ritual with iced water and a sugar cube",
      "A few drops elevate a Sazerac beyond recognition",
    ],
  },

  // ── Luxardo bitters ────────────────────────────────────────────────────────
  {
    slug: "luxardo-rhubarb-bitter",
    name: "Luxardo Rhubarb Bitter",
    brandSlug: "luxardo",
    category: "bitter",
    description:
      "A bittersweet rhubarb-forward bitter with earthy gentian complexity. Tart, herbal, and intriguing — a distinctive addition to any bitter-forward cocktail or Spritz variation.",
    image: C.rhubarbBitter,
    volume: "700ml",
    alcoholPercentage: "30% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors: "Rhubarb, Gentian Root, Chinese Rhubarb, Earthy Herbs",
    tastingNotes:
      "Tart rhubarb and earthy bitter herbs on the nose. Fresh and slightly sweet on entry, turning drier with gentian bitterness mid-palate. Clean, mildly bitter finish.",
    servingSuggestion:
      "Add a few dashes to a whiskey sour for a tart twist. Works in Negroni variations and Aperol Spritz substitutions. Try it with prosecco and soda.",
    awards: [],
    pairings: [],
    highlights: [
      "Rhubarb-forward profile — distinctive and tart",
      "Versatile in cocktails as a Campari or Aperol alternative",
    ],
  },
  {
    slug: "luxardo-chamomile-bitter",
    name: "Luxardo Chamomile Bitter",
    brandSlug: "luxardo",
    category: "bitter",
    description:
      "A delicate, floral bitter built around chamomile with herbal complexity. Softer than most bitters and uniquely approachable — an unexpected and elegant cocktail ingredient.",
    image: C.chamomileBitter,
    volume: "700ml",
    alcoholPercentage: "30% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors: "Chamomile, Honey, Floral Herbs, Gentle Bitterness",
    tastingNotes:
      "Floral chamomile tea aroma with a light honey sweetness. Soft and approachable on the palate with gentle herbal bitterness. Clean, subtly floral finish.",
    servingSuggestion:
      "Pairs beautifully with gin in a White Negroni variation. Add to gin and tonic for a floral dimension, or sip straight over ice as a gentle aperitif.",
    awards: [],
    pairings: [],
    highlights: [
      "Chamomile-forward — softer and more floral than traditional bitters",
      "Elegant in White Negroni variations",
    ],
  },
  {
    slug: "luxardo-orange-bitter",
    name: "Luxardo Orange Bitter",
    brandSlug: "luxardo",
    category: "bitter",
    description:
      "Vibrant, citrus-forward bitter made from orange peel infusions. Bright and zesty with a dry, herbal backbone — brings immediacy and lift to cocktails that need a citrus edge.",
    image: C.orangeBitter,
    volume: "700ml",
    alcoholPercentage: "30% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors: "Orange Peel, Blood Orange, Citrus Zest, Bitter Herbs",
    tastingNotes:
      "Bright orange peel on the nose with a clean zesty lift. Orange marmalade on the palate balanced by herbal bitterness. Dry, clean, citrus-driven finish.",
    servingSuggestion:
      "Excellent in a Spritz with prosecco and soda. Add to a gin and tonic for citrus depth, or use in any cocktail where you'd reach for a citrus bitter.",
    awards: [],
    pairings: [],
    highlights: [
      "Orange peel forward — bright and immediately citrusy",
      "Versatile aperitif and cocktail component",
    ],
  },
  {
    slug: "luxardo-coffee-bitter",
    name: "Luxardo Coffee Bitter",
    brandSlug: "luxardo",
    category: "bitter",
    description:
      "Rich, dark, and deeply coffee-forward. Made from coffee infusions with complementary herbal bitterness. A serious ingredient for espresso cocktails and after-dinner serves.",
    image: C.coffeeBitter,
    volume: "700ml",
    alcoholPercentage: "30% ABV",
    country: "Italy",
    region: "Torreglia, Padova, Italy",
    flavors: "Roasted Coffee, Dark Chocolate, Espresso, Bitter Herbs",
    tastingNotes:
      "Intense roasted coffee and dark chocolate on the nose. Rich espresso on the palate with herbal bitterness and a hint of cocoa. Long, warming, coffee-driven finish.",
    servingSuggestion:
      "The foundation of a proper Espresso Martini or Coffee Negroni. Excellent poured over vanilla ice cream, or stirred into an Old Fashioned with bourbon.",
    awards: [],
    pairings: [],
    highlights: [
      "Coffee-forward — rich and immediately expressive",
      "Essential for espresso cocktails",
    ],
  },

  // ── Merry's ────────────────────────────────────────────────────────────────
  {
    slug: "merrys-irish-cream",
    name: "Merry's Irish Cream",
    brandSlug: "merrys",
    category: "liqueur",
    description:
      "Smooth, indulgent Irish cream liqueur from Robert A. Merry & Co. Ltd. Blended from Irish whiskey, fresh dairy cream, and natural cocoa — rich enough to sip alone, versatile enough for cocktails.",
    image: C.merrysIrishCream,
    volume: "700ml",
    alcoholPercentage: "17% ABV",
    country: "Ireland",
    region: "Ireland",
    flavors: "Irish Whiskey, Fresh Cream, Cocoa, Vanilla, Toffee",
    tastingNotes:
      "Velvety smooth on the nose with rich cream and cocoa. The palate delivers warm Irish whiskey, chocolate toffee, and a hint of vanilla. Long, luscious finish with lingering cream.",
    servingSuggestion:
      "Serve neat over ice, stirred into coffee, or blended into a Mudslide. Also extraordinary poured over vanilla ice cream as a simple dessert.",
    awards: [],
    pairings: ["Coffee", "Dark chocolate", "Vanilla ice cream"],
    highlights: [
      "Blended from Irish whiskey and fresh dairy cream",
      "Rich cocoa and vanilla character",
      "Versatile — neat, on ice, or in cocktails",
    ],
  },
  {
    slug: "merrys-white-chocolate",
    name: "Merry's White Chocolate Irish Cream",
    brandSlug: "merrys",
    category: "liqueur",
    description:
      "A luxuriously sweet Irish cream liqueur with a white chocolate twist from Robert A. Merry & Co. Ltd. The same smooth, whiskey-cream base as the original — elevated with rich white chocolate and cocoa butter.",
    image: C.merrysWhiteChocolate,
    volume: "700ml",
    alcoholPercentage: "17% ABV",
    country: "Ireland",
    region: "Ireland",
    flavors: "White Chocolate, Fresh Cream, Cocoa Butter, Vanilla, Irish Whiskey",
    tastingNotes:
      "Sweet white chocolate and cream on the nose with a warm whiskey underpinning. Rich and indulgent on the palate — cocoa butter, vanilla, and cream in perfect balance. Long, sweet, creamy finish.",
    servingSuggestion:
      "Serve chilled over ice or use as a base for dessert cocktails. Extraordinary poured over strawberry or vanilla ice cream.",
    awards: [],
    pairings: ["White chocolate desserts", "Vanilla ice cream", "Coffee"],
    highlights: [
      "White chocolate variant of the classic Irish cream",
      "Smooth, indulgent, and dessert-ready",
      "From Robert A. Merry & Co. Ltd — Ireland",
    ],
  },

  // ── Bro Code ───────────────────────────────────────────────────────────────
  {
    slug: "bro-code-beer",
    name: "Bro Code",
    brandSlug: "bro-code",
    category: "beer",
    description:
      "India's boldest high-strength beer — brewed from premium barley malt for a full-bodied, smooth finish that belies its strength. Bro Code is built for those who don't compromise.",
    image: C.broCode,
    volume: "650ml",
    alcoholPercentage: "15% ABV",
    country: "India",
    region: "India",
    flavors: "Barley Malt, Grain, Subtle Hops, Clean Finish",
    tastingNotes:
      "Light golden with a smooth, malt-forward character on the nose. Clean and surprisingly easy-drinking on the palate with subtle hop bitterness and a warm, full-bodied finish.",
    servingSuggestion:
      "Serve well chilled at 4–6°C. Best enjoyed straight from the bottle or poured into a chilled glass with salted snacks.",
    awards: [],
    pairings: ["Spiced street food", "Grilled meats", "Indian snacks"],
    highlights: [
      "15% ABV — India's highest-strength beer",
      "Brewed from premium barley malt",
      "Smooth finish despite high strength",
    ],
  },

  // ── Bonga Bonga ────────────────────────────────────────────────────────────
  {
    slug: "bonga-bonga-mystery-liqueur",
    name: "Bonga Bonga Mystery Liqueur",
    brandSlug: "bonga-bonga",
    category: "liqueur",
    description:
      "The mystery is half the fun. Bonga Bonga is a vibrant, colorful liqueur with a playful character that defies easy categorization — fruity, sweet, and utterly distinctive. Every pour is a conversation starter.",
    image: C.bongaBonga,
    volume: "700ml",
    alcoholPercentage: "14.9% ABV",
    country: "India",
    region: "India",
    flavors: "Tropical Fruit, Sweet Berry, Citrus, Playful Spice",
    tastingNotes:
      "Vibrant and fruit-forward on the nose with a bright tropical sweetness. Light and playful on the palate with juicy fruit character and a clean, refreshing finish.",
    servingSuggestion:
      "Serve over ice or mix with soda for a simple, fun highball. Excellent as a party cocktail base — shake with lime and top with ginger beer.",
    awards: [],
    pairings: ["Light snacks", "Spiced appetizers", "Tropical fruit"],
    highlights: [
      "Mystery liqueur — the flavor is the surprise",
      "Vibrant, fun, and endlessly mixable",
      "A conversation starter in every glass",
    ],
  },
];

// ── Cocktails ─────────────────────────────────────────────────────────────────
// productSlug is resolved to productId at seed time
type IngredientInput = {
  amount: string;
  name: string;
  order: number;
  productSlug?: string;
};

const cocktails: Array<{
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: CocktailDifficulty;
  category: string;
  base: string;
  method: string;
  garnish?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  ingredients: IngredientInput[];
}> = [
  {
    slug: "himalayan-negroni",
    title: "Himalayan Negroni",
    description:
      "A mountain twist on the Italian aperitivo classic, featuring Timbur-infused Hapusa Gin for a subtle Himalayan numbing sensation alongside Campari and sweet vermouth.",
    imageUrl: C.himalayanNegroni,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Hapusa",
    method: "Stir",
    garnish: "Orange peel",
    isFeatured: true,
    featuredOrder: 0,
    ingredients: [
      {
        amount: "30ml",
        name: "Hapusa Gin (Timbur-infused)",
        productSlug: "hapusa-himalayan-dry-gin",
        order: 0,
      },
      { amount: "15ml", name: "Sweet Vermouth", order: 1 },
      { amount: "15ml", name: "Campari", order: 2 },
    ],
  },
  {
    slug: "apricot-smash",
    title: "Apricot Smash",
    description:
      "A fruity, refreshing smash that pairs Hapusa Gin with apricot jam, fresh apple juice, and lime for a boldly seasonal serve.",
    imageUrl: C.apricotSmash,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Hapusa",
    method: "Shake",
    garnish: "Dried apricot, mint sprig",
    isFeatured: true,
    featuredOrder: 1,
    ingredients: [
      {
        amount: "50ml",
        name: "Hapusa Gin",
        productSlug: "hapusa-himalayan-dry-gin",
        order: 0,
      },
      { amount: "2 bar spoons", name: "Apricot jam", order: 1 },
      { amount: "30ml", name: "Apple juice", order: 2 },
      { amount: "15ml", name: "Lime juice", order: 3 },
      { amount: "5–7 leaves", name: "Fresh mint", order: 4 },
    ],
  },
  {
    slug: "himalayan-gimlet",
    title: "Himalayan Gimlet",
    description:
      "A crisp, citrusy classic reinvented with Hapusa Gin — perfect balance of sweet and sour with the gin's wild botanicals at the center.",
    imageUrl: C.gimlet,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Hapusa",
    method: "Shake, fine strain",
    garnish: "Lime wheel",
    isFeatured: true,
    featuredOrder: 2,
    ingredients: [
      {
        amount: "60ml",
        name: "Hapusa Gin",
        productSlug: "hapusa-himalayan-dry-gin",
        order: 0,
      },
      { amount: "20ml", name: "Simple syrup", order: 1 },
      { amount: "20ml", name: "Fresh lime juice", order: 2 },
    ],
  },
  {
    slug: "ny-sour",
    title: "NY Sour",
    description:
      "A sophisticated gin sour with Hapusa at the base, finished with a red wine float for a striking two-tone visual and a complex flavour profile.",
    imageUrl: C.nySour,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Hapusa",
    method: "Shake",
    garnish: "Red wine float",
    isFeatured: true,
    featuredOrder: 3,
    ingredients: [
      {
        amount: "50ml",
        name: "Hapusa Gin",
        productSlug: "hapusa-himalayan-dry-gin",
        order: 0,
      },
      { amount: "20ml", name: "Simple syrup", order: 1 },
      { amount: "20ml", name: "Fresh lemon juice", order: 2 },
      { amount: "Float", name: "Red wine", order: 3 },
    ],
  },
  {
    slug: "southside",
    title: "Southside",
    description:
      "Often called a mojito for gin lovers. Fresh mint, lime, and Greater Than Gin — simple, clean, and endlessly refreshing.",
    imageUrl: C.southside,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Greater Than",
    method: "Shake and fine strain",
    garnish: "Mint leaf",
    isFeatured: true,
    featuredOrder: 4,
    ingredients: [
      {
        amount: "50ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      { amount: "20ml", name: "Fresh lime juice", order: 1 },
      { amount: "15ml", name: "Simple syrup", order: 2 },
      { amount: "6–8 leaves", name: "Fresh mint", order: 3 },
    ],
  },
  {
    slug: "greater-martini",
    title: "Greater Martini",
    description:
      "The quintessential gin cocktail — clean and elegant. Greater Than's botanicals shine with just a touch of dry vermouth and a lemon twist.",
    imageUrl: C.greaterMartini,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Greater Than",
    method: "Stir",
    garnish: "Lemon peel",
    ingredients: [
      {
        amount: "60ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      { amount: "10ml", name: "Dry vermouth", order: 1 },
    ],
  },
  {
    slug: "greater-gin-basil-smash",
    title: "Greater Gin Basil Smash",
    description:
      "Vibrant and herbal. Muddled fresh basil releases a peppery aroma that complements the clean juniper and citrus notes of Greater Than perfectly.",
    imageUrl: C.ginBasil,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Greater Than",
    method: "Shake",
    garnish: "Basil sprig",
    ingredients: [
      {
        amount: "60ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      { amount: "15ml", name: "Fresh lime juice", order: 1 },
      { amount: "15ml", name: "Simple syrup", order: 2 },
      { amount: "8–10 leaves", name: "Fresh basil", order: 3 },
    ],
  },
  {
    slug: "greater-salty-dog",
    title: "Greater Salty Dog",
    description:
      "Tangy and savory — grapefruit juice, hibiscus syrup, and Greater Than Gin in a salt-rimmed glass. One of the most underrated gin serves.",
    imageUrl: C.saltyDog,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Greater Than",
    method: "Shake",
    garnish: "Grapefruit slice, salt rim",
    ingredients: [
      {
        amount: "45ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      { amount: "90ml", name: "Fresh grapefruit juice", order: 1 },
      { amount: "20ml", name: "Hibiscus syrup", order: 2 },
    ],
  },
  {
    slug: "hemingway-special",
    title: "Hemingway Special",
    description:
      "A daiquiri variation created for Ernest Hemingway himself — tart and complex with maraschino and grapefruit, no sugar added.",
    imageUrl: C.hemingway,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Maraschino Originale",
    method: "Shake and double strain",
    garnish: "Lime zest",
    ingredients: [
      { amount: "60ml", name: "White rum", order: 0 },
      { amount: "30ml", name: "Fresh pink grapefruit juice", order: 1 },
      {
        amount: "15ml",
        name: "Luxardo Maraschino Originale",
        productSlug: "luxardo-maraschino-originale",
        order: 2,
      },
      { amount: "15ml", name: "Fresh lime juice", order: 3 },
      { amount: "7.5ml", name: "Simple syrup", order: 4 },
    ],
  },
  {
    slug: "maratonic",
    title: "Maratonic",
    description:
      "A simple, elegant highball showcasing the nutty cherry notes of Maraschino Originale, lengthened with tonic and lifted with absinthe.",
    imageUrl: C.maratonic,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Maraschino Originale",
    method: "Build",
    garnish: "Rosemary sprig, cucumber slice",
    ingredients: [
      {
        amount: "45ml",
        name: "Luxardo Maraschino Originale",
        productSlug: "luxardo-maraschino-originale",
        order: 0,
      },
      { amount: "7.5ml", name: "Fresh lemon juice", order: 1 },
      { amount: "Top with", name: "Tonic water", order: 2 },
      {
        amount: "Spray of",
        name: "Luxardo Absinthe",
        productSlug: "luxardo-absinthe-fata-verde",
        order: 3,
      },
    ],
  },
  {
    slug: "aviation",
    title: "Aviation",
    description:
      "A pre-Prohibition classic with a pale sky-blue hue. Gin, maraschino, and lemon — floral, complex, and effortlessly beautiful in the glass.",
    imageUrl: C.aviation,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Maraschino Originale",
    method: "Shake and double strain",
    garnish: "Lemon zest, Luxardo cherry",
    ingredients: [
      {
        amount: "45ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      {
        amount: "30ml",
        name: "Luxardo Maraschino Originale",
        productSlug: "luxardo-maraschino-originale",
        order: 1,
      },
      { amount: "15ml", name: "Fresh lemon juice", order: 2 },
    ],
  },
  {
    slug: "morlacco-fizz",
    title: "Morlacco Fizz",
    description:
      "A lively, blood-red fizz built around the intense cherry character of Sangue Morlacco, brightened with lemon and gin.",
    imageUrl: C.morlaccoFizz,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Cherry Liqueur",
    method: "Shake and fine strain",
    garnish: "Luxardo cherry",
    ingredients: [
      {
        amount: "45ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      { amount: "20ml", name: "Fresh lemon juice", order: 1 },
      { amount: "20ml", name: "Maraschino cherry juice", order: 2 },
      {
        amount: "15ml",
        name: "Luxardo Cherry Liqueur",
        productSlug: "luxardo-cherry-liqueur",
        order: 3,
      },
    ],
  },
  {
    slug: "cherry-negroni",
    title: "Cherry Negroni",
    description:
      "A rich, deeply fruited twist on the Negroni — Sangue Morlacco stands in for Campari, adding a concentrated cherry sweetness alongside the vermouth.",
    imageUrl: C.cherryNegroni,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Cherry Liqueur",
    method: "Stir",
    garnish: "Lemon zest, Luxardo cherry",
    ingredients: [
      {
        amount: "45ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      {
        amount: "25ml",
        name: "Luxardo Cherry Liqueur",
        productSlug: "luxardo-cherry-liqueur",
        order: 1,
      },
      { amount: "25ml", name: "Sweet vermouth", order: 2 },
    ],
  },
  {
    slug: "luxi-style",
    title: "Luxi Style",
    description:
      "A breezy, cherry-forward highball — gin and Sangue Morlacco lengthened with soda. A perfect long drink for a warm evening.",
    imageUrl: C.luxiStyle,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Cherry Liqueur",
    method: "Build",
    garnish: "Rosemary, lemon zest",
    ingredients: [
      {
        amount: "45ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      {
        amount: "15ml",
        name: "Luxardo Cherry Liqueur",
        productSlug: "luxardo-cherry-liqueur",
        order: 1,
      },
      { amount: "Top with", name: "Soda water", order: 2 },
    ],
  },
  {
    slug: "vacanza",
    title: "Vacanza",
    description:
      "Holiday in a glass. Luxardo Aperitivo and Triple Sec shake together with fresh pink grapefruit for a bright, bittersweet serve.",
    imageUrl: C.vacanza,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Triple Sec",
    method: "Shake and strain",
    garnish: "Grapefruit zest",
    ingredients: [
      {
        amount: "40ml",
        name: "Luxardo Aperitivo",
        productSlug: "luxardo-aperitivo",
        order: 0,
      },
      { amount: "40ml", name: "Fresh pink grapefruit juice", order: 1 },
      {
        amount: "20ml",
        name: "Luxardo Triple Sec",
        productSlug: "luxardo-triple-sec",
        order: 2,
      },
    ],
  },
  {
    slug: "white-lady",
    title: "White Lady",
    description:
      "A silky, sharp pre-Prohibition classic. Gin, triple sec, and fresh lemon — elegant in its simplicity and properly citrusy.",
    imageUrl: C.whiteLady,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Triple Sec",
    method: "Shake and strain",
    garnish: "Lemon zest",
    ingredients: [
      {
        amount: "60ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      {
        amount: "30ml",
        name: "Luxardo Triple Sec",
        productSlug: "luxardo-triple-sec",
        order: 1,
      },
      { amount: "10ml", name: "Fresh lemon juice", order: 2 },
    ],
  },
  {
    slug: "margarita",
    title: "Margarita",
    description:
      "The world's most ordered cocktail. Earthy tequila, bright lime, and orange liqueur — deceptively simple, deceptively hard to get right.",
    imageUrl: C.margarita,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Triple Sec",
    method: "Shake and double strain",
    garnish: "Lime zest, salt rim",
    ingredients: [
      { amount: "60ml", name: "Tequila Blanco", order: 0 },
      {
        amount: "10ml",
        name: "Luxardo Triple Sec",
        productSlug: "luxardo-triple-sec",
        order: 1,
      },
      { amount: "10ml", name: "Fresh lime juice", order: 2 },
    ],
  },
  {
    slug: "negroni",
    title: "Negroni",
    description:
      "The iconic Italian aperitivo. Equal parts gin, vermouth, and bitter — perfectly balanced, bittersweet, and impossible to improve upon.",
    imageUrl: C.negroni,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Bitter",
    method: "Build over ice",
    garnish: "Orange peel",
    ingredients: [
      {
        amount: "40ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      {
        amount: "40ml",
        name: "Luxardo Bitter Rosso",
        productSlug: "luxardo-bitter-rosso",
        order: 1,
      },
      { amount: "40ml", name: "Sweet vermouth", order: 2 },
    ],
  },
  {
    slug: "bitter-shakerato",
    title: "Bitter Shakerato",
    description:
      "An Italian institution. Luxardo Bitter shaken hard with ice until cold and frothy, strained into a coupe — intensely herbal and refreshing.",
    imageUrl: C.shakerato,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Bitter",
    method: "Shake hard and double strain",
    garnish: "Lemon zest",
    ingredients: [
      {
        amount: "60ml",
        name: "Luxardo Bitter Rosso",
        productSlug: "luxardo-bitter-rosso",
        order: 0,
      },
    ],
  },
  {
    slug: "boulevardier",
    title: "Boulevardier",
    description:
      "The Negroni's autumnal cousin — rye whisky replaces gin, adding a spicy warmth that pairs beautifully with Luxardo Bitter and sweet vermouth.",
    imageUrl: C.boulevardier,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Bitter",
    method: "Stir",
    garnish: "Orange peel",
    ingredients: [
      { amount: "45ml", name: "Rye whisky", order: 0 },
      {
        amount: "30ml",
        name: "Luxardo Bitter Rosso",
        productSlug: "luxardo-bitter-rosso",
        order: 1,
      },
      { amount: "30ml", name: "Sweet vermouth", order: 2 },
    ],
  },
  {
    slug: "sorrentino",
    title: "Sorrentino",
    description:
      "A Spritz-style serve layering Limoncello, Luxardo Bitter, and sweet vermouth — bright, complex, and topped with soda for lift.",
    imageUrl: C.sorrentino,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Bitter",
    method: "Build over ice",
    garnish: "Orange peel",
    ingredients: [
      { amount: "30ml", name: "Luxardo Limoncello", order: 0 },
      {
        amount: "30ml",
        name: "Luxardo Bitter Rosso",
        productSlug: "luxardo-bitter-rosso",
        order: 1,
      },
      { amount: "30ml", name: "Sweet vermouth", order: 2 },
      { amount: "Top with", name: "Soda water", order: 3 },
    ],
  },
  {
    slug: "jungle-samba",
    title: "Jungle Samba",
    description:
      "A tropical explosion of rum, pineapple, and lime with the anise punch of Sambuca and the herbal edge of Luxardo Bitter.",
    imageUrl: C.jungleSamba,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Sambuca",
    method: "Shake and strain",
    garnish: "Orange peel",
    ingredients: [
      { amount: "35ml", name: "White rum", order: 0 },
      {
        amount: "15ml",
        name: "Luxardo Bitter Rosso",
        productSlug: "luxardo-bitter-rosso",
        order: 1,
      },
      {
        amount: "10ml",
        name: "Luxardo Sambuca dei Cesari",
        productSlug: "luxardo-sambuca",
        order: 2,
      },
      { amount: "45ml", name: "Fresh pineapple juice", order: 3 },
      { amount: "15ml", name: "Fresh lime juice", order: 4 },
      { amount: "1 bar spoon", name: "Demerara sugar", order: 5 },
    ],
  },
  {
    slug: "aperitivo-spritz",
    title: "Aperitivo Spritz",
    description:
      "The quintessential sunset drink. Luxardo Aperitivo and Prosecco with soda — light, bubbly, and bittersweet. Named after the city, made for the moment.",
    imageUrl: C.aperitivoSpritz,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Aperitivo",
    method: "Build over ice",
    garnish: "Orange wheel",
    ingredients: [
      {
        amount: "60ml",
        name: "Luxardo Aperitivo",
        productSlug: "luxardo-aperitivo",
        order: 0,
      },
      { amount: "50ml", name: "Prosecco", order: 1 },
      { amount: "Top with", name: "Soda water", order: 2 },
    ],
  },
  {
    slug: "bicicletta",
    title: "Bicicletta",
    description:
      "Drier and more bitter than the Spritz — Luxardo Aperitivo with Aranciata Amara, named after the wobbly bicycle rides home.",
    imageUrl: C.bicicletta,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Aperitivo",
    method: "Build over ice",
    garnish: "Orange zest",
    ingredients: [
      {
        amount: "50ml",
        name: "Luxardo Aperitivo",
        productSlug: "luxardo-aperitivo",
        order: 0,
      },
      {
        amount: "Top with",
        name: "Aranciata Amara (or fresh orange juice)",
        order: 1,
      },
    ],
  },
  {
    slug: "il-santo",
    title: "Il Santo",
    description:
      "Complex and layered — gin, aperitivo, and maraschino with lime. A house cocktail that shows what Luxardo's range can do together.",
    imageUrl: C.ilSanto,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Aperitivo",
    method: "Shake and strain",
    garnish: "Orange zest",
    ingredients: [
      {
        amount: "45ml",
        name: "Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      {
        amount: "15ml",
        name: "Luxardo Aperitivo",
        productSlug: "luxardo-aperitivo",
        order: 1,
      },
      { amount: "15ml", name: "Fresh lime juice", order: 2 },
      {
        amount: "10ml",
        name: "Luxardo Maraschino Originale",
        productSlug: "luxardo-maraschino-originale",
        order: 3,
      },
    ],
  },
  {
    slug: "angioletto-and-lime",
    title: "Angioletto & Lime",
    description:
      "Simple and indulgent — Luxardo's hazelnut liqueur with fresh lime. The citrus cuts the sweetness and makes it unexpectedly easy to drink.",
    imageUrl: C.angiolettoLime,
    difficulty: CocktailDifficulty.Easy,
    category: "Classic",
    base: "Luxardo Angioletto",
    method: "Stir over ice",
    garnish: "Lime wedges",
    ingredients: [
      {
        amount: "60ml",
        name: "Luxardo Hazelnut Liqueur",
        productSlug: "luxardo-hazelnut-liqueur",
        order: 0,
      },
      { amount: "15ml", name: "Fresh lime juice", order: 1 },
    ],
  },
];

// ── Bartenders ────────────────────────────────────────────────────────────────
// TODO: move to admin UI once the Bartender model is fully established
const bartenders = [
  {
    // TODO: confirm full legal name spelling
    name: "Amrit Tamang Waiba",
    slug: "amrit-tamang-waiba",
    role: "Brand Ambassador",
    // TODO: replace with real bio
    bio: "Brand Ambassador for Drink It Nepal. A passionate cocktail creator known for boundary-pushing, flavour-forward signature serves across Kathmandu.",
    // TODO: replace with real quote
    quote: "Every great cocktail tells a story — I just help you find yours.",
    // TODO: add real Instagram handle
    instagramHandle: null as string | null,
    photoUrl: "/home/bartender.jpg",
  },
];

// ── Amrit's signature cocktails ───────────────────────────────────────────────
// TODO: add real cocktail photography to Cloudinary and replace all imageUrl placeholders
type AmritCocktailInput = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: CocktailDifficulty;
  category: string;
  base: string;
  method: string;
  garnish?: string;
  ingredients: IngredientInput[];
};

const amritCocktails: AmritCocktailInput[] = [
  {
    slug: "summer-scandal",
    title: "Summer Scandal",
    base: "Greater Than",
    method: "Shake and double strain",
    garnish: "3 drops basil oil",
    difficulty: CocktailDifficulty.Easy,
    category: "Signature",
    description:
      "A smoky, tangy twist featuring strawberry infused gin with smoked tomato water and dry vermouth.",
    imageUrl: C.summerScandal,
    ingredients: [
      {
        amount: "45ml",
        name: "Strawberry Infused Greater Than Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      { amount: "20ml", name: "Dry Vermouth", order: 1 },
      { amount: "20ml", name: "Smoked Tomato Water Cordial", order: 2 },
      { amount: "15ml", name: "Lime Juice", order: 3 },
    ],
  },
  {
    slug: "under-the-fig-tree",
    title: "Under The Fig Tree",
    base: "Hapusa",
    method: "Batched & stirred",
    garnish: "Fig leaf circle & orange zest",
    difficulty: CocktailDifficulty.Medium,
    category: "Signature",
    description:
      "Fig leaf infused Hapusa meets toasted coconut Luxardo Bitter Rosso — a deeply aromatic, contemplative serve.",
    imageUrl: C.underTheFigTree,
    ingredients: [
      {
        amount: "45ml",
        name: "Fig Leaf Infused Hapusa Himalayan Dry Gin",
        productSlug: "hapusa-himalayan-dry-gin",
        order: 0,
      },
      {
        amount: "20ml",
        name: "Toasted Coconut Infused Luxardo Bitter Rosso",
        productSlug: "luxardo-bitter-rosso",
        order: 1,
      },
      {
        amount: "10ml",
        name: "Luxardo Angioletto Hazelnut Liqueur",
        productSlug: "luxardo-hazelnut-liqueur",
        order: 2,
      },
      { amount: "10ml", name: "Dry Vermouth", order: 3 },
      { amount: "1 drop", name: "Saline Solution", order: 4 },
    ],
  },
  {
    slug: "mid-night-offering",
    title: "Mid Night Offering",
    base: "The Whistler",
    method: "Batched and stirred",
    garnish: "Dates & orange zest",
    difficulty: CocktailDifficulty.Advanced,
    category: "Signature",
    description:
      "Whistler's Triple Oak Whiskey intensified with black garlic and coffee — a dark, complex ritual in a glass.",
    imageUrl: C.midNightOffering,
    ingredients: [
      {
        amount: "60ml",
        name: "Whistler's Triple Oak Whiskey",
        productSlug: "the-whistler-irish-whiskey",
        order: 0,
      },
      { amount: "10ml", name: "Black Garlic & Coffee Cordial", order: 1 },
      { amount: "2 dsh", name: "Saline Solution", order: 2 },
      {
        amount: "3 dsh",
        name: "Coffee Bitter",
        productSlug: "luxardo-coffee-bitter",
        order: 3,
      },
      {
        amount: "2 dsh",
        name: "Orange Bitter",
        productSlug: "luxardo-orange-bitter",
        order: 4,
      },
    ],
  },
  {
    slug: "oh-mami",
    title: "Oh Mami",
    base: "Hapusa",
    method: "Batched and stirred",
    garnish: "Burnt cherry tomatoes",
    difficulty: CocktailDifficulty.Advanced,
    category: "Signature",
    description:
      "A clarified, umami-forward cocktail — Hapusa meets tomato, fig, timmur and milk for an unforgettable savoury serve.",
    imageUrl: C.ohMami,
    ingredients: [
      {
        amount: "50ml",
        name: "Hapusa Himalayan Dry Gin",
        productSlug: "hapusa-himalayan-dry-gin",
        order: 0,
      },
      { amount: "22.5ml", name: "Fig & Timmur Cordial", order: 1 },
      { amount: "22.5ml", name: "Lime Juice", order: 2 },
      { amount: "22.5ml", name: "Tomato Juice", order: 3 },
      { amount: "3 dsh", name: "Tabasco Sauce", order: 4 },
      { amount: "3 dsh", name: "Worcestershire Sauce", order: 5 },
      { amount: "25ml", name: "Milk", order: 6 },
    ],
  },
  {
    slug: "wild-seduction",
    title: "Wild Seduction",
    base: "The Whistler",
    method: "Stir",
    garnish: "Mushroom",
    difficulty: CocktailDifficulty.Medium,
    category: "Signature",
    description:
      "Whiskey stirred with shiitake cordial and MSG — deeply savoury, umami-rich, and utterly unexpected.",
    imageUrl: C.wildSeduction,
    ingredients: [
      {
        amount: "60ml",
        name: "Whistler's Triple Oak Whiskey",
        productSlug: "the-whistler-irish-whiskey",
        order: 0,
      },
      { amount: "10ml", name: "Shiitake Cordial", order: 1 },
      { amount: "4 drops", name: "MSG Solution", order: 2 },
      {
        amount: "2 dsh",
        name: "Rhubarb Bitters",
        productSlug: "luxardo-rhubarb-bitter",
        order: 3,
      },
    ],
  },
  {
    slug: "purple-tease",
    title: "Purple Tease",
    base: "Greater Than",
    method: "Shake",
    garnish: "Lavender",
    difficulty: CocktailDifficulty.Easy,
    category: "Signature",
    description:
      "Lavender infused gin shaken with tropical fruits and strawberry foam — vibrant, playful and aromatic.",
    imageUrl: C.purpleTease,
    ingredients: [
      {
        amount: "60ml",
        name: "Lavender Infused Greater Than London Dry Gin",
        productSlug: "greater-than-london-dry-gin",
        order: 0,
      },
      { amount: "20ml", name: "Orange Oleo Saccharum", order: 1 },
      { amount: "20ml", name: "Lime Juice", order: 2 },
      { amount: "20ml", name: "Pineapple Juice", order: 3 },
      { amount: "30ml", name: "Mango Puree", order: 4 },
      { amount: "top", name: "Strawberry Foam", order: 5 },
    ],
  },
  {
    slug: "smoke-and-dust",
    title: "Smoke & Dust",
    base: "Hapusa",
    method: "Shake and strain",
    garnish: "Smoked orange peel",
    difficulty: CocktailDifficulty.Advanced,
    category: "Signature",
    description:
      "Hapusa and Sangue Morlacco lifted with liquid smoke and orange — a theatrical, complex cocktail with depth.",
    imageUrl: C.smokeAndDust,
    ingredients: [
      {
        amount: "20ml",
        name: "Hapusa Himalayan Dry Gin",
        productSlug: "hapusa-himalayan-dry-gin",
        order: 0,
      },
      {
        amount: "20ml",
        name: "Luxardo Sangue Morlacco",
        productSlug: "luxardo-cherry-liqueur",
        order: 1,
      },
      { amount: "2 drops", name: "Liquid Smoke", order: 2 },
      { amount: "20ml", name: "Orange Juice", order: 3 },
      {
        amount: "20ml",
        name: "Luxardo Maraschino Originale",
        productSlug: "luxardo-maraschino-originale",
        order: 4,
      },
      {
        amount: "2 dash",
        name: "Luxardo Orange Bitters",
        productSlug: "luxardo-orange-bitter",
        order: 5,
      },
      { amount: "10ml", name: "Lime Juice", order: 6 },
    ],
  },
];

// ── Carousel slides ───────────────────────────────────────────────────────────
const carouselSlides = [
  {
    image: C.carousel1,
    altText: "Premium spirits collection",
    order: 0,
    isActive: true,
  },
  {
    image: C.carousel2,
    altText: "Luxury drinks experience",
    order: 1,
    isActive: true,
  },
  {
    image: C.carousel3,
    altText: "Fine wines and gins",
    order: 2,
    isActive: true,
  },
  {
    image: C.carousel4,
    altText: "Luxardo Maraschino",
    order: 3,
    isActive: true,
  },
];

// ── Company stats ─────────────────────────────────────────────────────────────
const companyStats = [
  { value: "27+", label: "Premium Spirits", icon: "Wine", order: 0 },
  { value: "3+", label: "Years Operating", icon: "Award", order: 1 },
  { value: "1000+", label: "Happy Clients", icon: "Users", order: 2 },
  { value: "50+", label: "Expert Reviews", icon: "Star", order: 3 },
];

// ── Contact info ──────────────────────────────────────────────────────────────
const contactInfo = [
  {
    type: "address",
    title: "Our Location",
    value: "Baluwatar, Kathmandu",
    subValue: null,
  },
  {
    type: "email",
    title: "Email Us",
    value: "Drinkitimportandexport@gmail.com",
    subValue: null,
  },
  {
    type: "phone",
    title: "Call Us",
    value: "+977 9819810683",
    subValue: "Mon–Fri, 9am – 6pm",
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Seeding database…");

  // ── Brands ────────────────────────────────────────────────────────────────
  console.log("  → Brands");
  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
  }

  // ── Products ──────────────────────────────────────────────────────────────
  console.log("  → Products");
  for (const { brandSlug, ...product } of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...product, brand: { connect: { slug: brandSlug } } },
      create: { ...product, brand: { connect: { slug: brandSlug } } },
    });
  }

  // Build product slug → id map for wiring cocktail ingredient productIds
  const productRows = await prisma.product.findMany({
    select: { id: true, slug: true },
  });
  const productIdBySlug = new Map(productRows.map((p) => [p.slug, p.id]));

  // ── Cocktails ─────────────────────────────────────────────────────────────
  console.log("  → Cocktails");
  for (const { ingredients, ...cocktail } of cocktails) {
    const existing = await prisma.cocktail.findUnique({
      where: { slug: cocktail.slug },
      select: { id: true },
    });
    if (existing) {
      await prisma.cocktailIngredient.deleteMany({
        where: { cocktailId: existing.id },
      });
    }

    const resolvedIngredients = ingredients.map(({ productSlug, ...rest }) => ({
      ...rest,
      ...(productSlug && productIdBySlug.has(productSlug)
        ? { productId: productIdBySlug.get(productSlug) }
        : {}),
    }));

    await prisma.cocktail.upsert({
      where: { slug: cocktail.slug },
      update: { ...cocktail, ingredients: { create: resolvedIngredients } },
      create: { ...cocktail, ingredients: { create: resolvedIngredients } },
    });
  }

  // ── Bartenders ────────────────────────────────────────────────────────────
  console.log("  → Bartenders");
  for (const bartender of bartenders) {
    await prisma.bartender.upsert({
      where: { slug: bartender.slug },
      update: bartender,
      create: bartender,
    });
  }

  const bartenderRows = await prisma.bartender.findMany({
    select: { id: true, slug: true },
  });
  const bartenderIdBySlug = new Map(bartenderRows.map((b) => [b.slug, b.id]));

  // ── Amrit's signature cocktails ───────────────────────────────────────────
  console.log("  → Amrit's signature cocktails");
  const amritId = bartenderIdBySlug.get("amrit-tamang-waiba")!;
  for (const { ingredients, ...cocktail } of amritCocktails) {
    const existing = await prisma.cocktail.findUnique({
      where: { slug: cocktail.slug },
      select: { id: true },
    });
    if (existing) {
      await prisma.cocktailIngredient.deleteMany({
        where: { cocktailId: existing.id },
      });
    }
    const resolvedIngredients = ingredients.map(({ productSlug, ...rest }) => ({
      ...rest,
      ...(productSlug && productIdBySlug.has(productSlug)
        ? { productId: productIdBySlug.get(productSlug) }
        : {}),
    }));
    await prisma.cocktail.upsert({
      where: { slug: cocktail.slug },
      update: {
        ...cocktail,
        bartenderId: amritId,
        ingredients: { create: resolvedIngredients },
      },
      create: {
        ...cocktail,
        bartenderId: amritId,
        ingredients: { create: resolvedIngredients },
      },
    });
  }

  // ── Carousel ──────────────────────────────────────────────────────────────
  console.log("  → Carousel slides");
  await prisma.carouselSlide.deleteMany();
  await prisma.carouselSlide.createMany({ data: carouselSlides });

  // ── Company stats ─────────────────────────────────────────────────────────
  console.log("  → Company stats");
  await prisma.companyStat.deleteMany();
  await prisma.companyStat.createMany({ data: companyStats });

  // ── Contact info ──────────────────────────────────────────────────────────
  console.log("  → Contact info");
  await prisma.contactInfo.deleteMany();
  await prisma.contactInfo.createMany({ data: contactInfo });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
