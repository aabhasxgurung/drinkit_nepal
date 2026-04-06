import { PrismaClient, CocktailDifficulty } from "@prisma/client"

const prisma = new PrismaClient()

// ---------------------------------------------------------------------------
// Cloudinary asset map — keyed by logical name, values are live delivery URLs.
// Extension included so browsers get correct content-type headers.
// ---------------------------------------------------------------------------
const C = {
  // ── Brand logos ────────────────────────────────────────────────────────
  hapusaLogo:        "https://res.cloudinary.com/dvhoi2xg1/image/upload/hapusalogo_dkzogh.png",
  sulaLogo:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/sulalogo_p0vtn9.png",
  whistlerLogo:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/whistler_n5mlx3.png",
  luxardoLogo:       "https://res.cloudinary.com/dvhoi2xg1/image/upload/Luxardologo_xfui74.png",
  // Greater Than logo not uploaded — using the product shot as fallback
  greaterThanLogo:   "https://res.cloudinary.com/dvhoi2xg1/image/upload/greaterThanFeatured_onn79k.jpg",

  // ── Carousel ───────────────────────────────────────────────────────────
  // carousel1 & carousel2 not uploaded — substituting atmospheric product shots
  carousel1:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredHapusa_hbrchu.jpg",
  carousel2:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/greaterThanFeatured_onn79k.jpg",
  carousel3:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/carousel3_draf1u.jpg",
  carousel4:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/Maraschino-Cherries_kbcgys.jpg",

  // ── Product bottles ────────────────────────────────────────────────────
  // Plain hapusa & greaterThan bottles not uploaded — using featured shots
  hapusaBottle:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredHapusa_hbrchu.jpg",
  greaterThanBottle: "https://res.cloudinary.com/dvhoi2xg1/image/upload/greaterThanFeatured_onn79k.jpg",
  whistlerBottle:    "https://res.cloudinary.com/dvhoi2xg1/image/upload/whistlerbottle_tmoco5.png",
  cheninBlanc:       "https://res.cloudinary.com/dvhoi2xg1/image/upload/cheninBlanc_zlx7mv.png",
  lateHarvest:       "https://res.cloudinary.com/dvhoi2xg1/image/upload/lateharvest_ey1vzi.png",
  shirazCabernet:    "https://res.cloudinary.com/dvhoi2xg1/image/upload/shirazCabernet_fvpbdo.png",
  tropical:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/Tropical_ppxtzy.png",
  brut:              "https://res.cloudinary.com/dvhoi2xg1/image/upload/brute_kkksvd.png",
  seco:              "https://res.cloudinary.com/dvhoi2xg1/image/upload/seco_spiifp.png",
  sparklingShiraz:   "https://res.cloudinary.com/dvhoi2xg1/image/upload/Sprakling_gsdlph.png",
  zinfRose:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/Rose_lzpao5.png",
  zinfRed:           "https://res.cloudinary.com/dvhoi2xg1/image/upload/Zinfadel_a07apw.png",
  maraschCherries:   "https://res.cloudinary.com/dvhoi2xg1/image/upload/Maraschino-Cherries-2_swekvf.jpg",
  maraschOriginale:  "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_maraschino_originale_tklhqm.png",
  sambuca:           "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_sambuca-1_qpmyts.png",
  bitterRosso:       "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_bitter_h4rycz.png",
  aperitivo:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_aperitivo_rhr7wx.png",
  cherryLiqueur:     "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  tripleSec:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardotriple_eaimmo.jpg",
  hazelnut:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/angioletto_tzd5nh.png",
  absinthe:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/absinthe_cab1vj.jpg",
  rhubarbBitter:     "https://res.cloudinary.com/dvhoi2xg1/image/upload/rhubarb_tqyjmk.jpg",
  chamomileBitter:   "https://res.cloudinary.com/dvhoi2xg1/image/upload/chamolie_v0lssi.jpg",
  orangeBitter:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/orange_lszg3x.jpg",
  coffeeBitter:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/coffee_amkvht.jpg",

  // ── Featured product images (homepage carousel) ────────────────────────
  featHapusa:        "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredHapusa_hbrchu.jpg",
  featGreaterThan:   "https://res.cloudinary.com/dvhoi2xg1/image/upload/greaterThanFeatured_onn79k.jpg",
  featWhistler:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/whistler_n5mlx3.png",
  featMaraschino:    "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  featBitter:        "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredBitter_djr1y0.png",
  featTropical:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/tropicalFeature_bf6cbd.webp",
  featCheninBlanc:   "https://res.cloudinary.com/dvhoi2xg1/image/upload/cheninFeature_r47hfo.webp",
  featShiraz:        "https://res.cloudinary.com/dvhoi2xg1/image/upload/shirazFeature_xvbze8.jpg",

  // ── Background / lifestyle images ─────────────────────────────────────
  hapusaBg:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/Hapusa-Gin-lifestyle_deed4m.jpg",
  // Other backgrounds not uploaded — omitted (null in DB)

  // ── Cocktail images ────────────────────────────────────────────────────
  himalayanNegroni:  "https://res.cloudinary.com/dvhoi2xg1/image/upload/himalyannegroni_s0c5gm.jpg",
  apricotSmash:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/apricot-smash_bqvrcc.jpg",
  gimlet:            "https://res.cloudinary.com/dvhoi2xg1/image/upload/gimlet_qu8t53.jpg",
  nySour:            "https://res.cloudinary.com/dvhoi2xg1/image/upload/nysour_noqnv3.jpg",
  southside:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/southside_tnjqxv.jpg",
  greaterMartini:    "https://res.cloudinary.com/dvhoi2xg1/image/upload/greatermartini_ygjo1i.png",
  ginBasil:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/ginbasil_euod0s.png",
  saltyDog:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/saltydog_xm8nfa.png",
  aviation:          "https://res.cloudinary.com/dvhoi2xg1/image/upload/aviation_pktxrb.jpg",
  negroni:           "https://res.cloudinary.com/dvhoi2xg1/image/upload/negroni_mh5xj1.jpg",
  shakerato:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/shakerato_bbpcfx.png",
  jungleSamba:       "https://res.cloudinary.com/dvhoi2xg1/image/upload/junglesamba_catz5m.jpg",
  vacanza:           "https://res.cloudinary.com/dvhoi2xg1/image/upload/vacanza_scf946.jpg",
  bicicletta:        "https://res.cloudinary.com/dvhoi2xg1/image/upload/bicicletta_nhfzze.jpg",
  // Cocktails without dedicated shots — using nearest product image
  hemingway:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  maratonic:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_maraschino_originale_tklhqm.png",
  morlaccoFizz:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  cherryNegroni:     "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  luxiStyle:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  whiteLady:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  margarita:         "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardotriple_eaimmo.jpg",
  boulevardier:      "https://res.cloudinary.com/dvhoi2xg1/image/upload/negroni_mh5xj1.jpg",
  sorrentino:        "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_aperitivo_rhr7wx.png",
  aperitivoSpritz:   "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_aperitivo_rhr7wx.png",
  ilSanto:           "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  angiolettoLime:    "https://res.cloudinary.com/dvhoi2xg1/image/upload/angioletto_tzd5nh.png",
} as const

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

const brands = [
  { slug: "hapusa",      name: "Hapusa",       logo: C.hapusaLogo,     description: "Premium Indian Craft Gin",     country: "India"   },
  { slug: "sula",        name: "Sula",          logo: C.sulaLogo,       description: "India's Leading Wine Brand",   country: "India"   },
  { slug: "the-whistler",name: "The Whistler",  logo: C.whistlerLogo,   description: "Irish Whiskey Excellence",     country: "Ireland" },
  { slug: "luxardo",     name: "Luxardo",       logo: C.luxardoLogo,    description: "Italian Liqueur Excellence",   country: "Italy"   },
  { slug: "greater-than",name: "Greater Than",  logo: C.greaterThanLogo,description: "India's Premium Gin",         country: "India"   },
]

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

const products = [
  // ── Hapusa ───────────────────────────────────────────────────────────────
  {
    slug: "hapusa-himalayan-dry-gin",
    name: "Hapusa Himalayan Dry Gin",
    brandSlug: "hapusa",
    category: "gin",
    description: "Hapusa is a premium Himalayan dry gin, distilled with foraged botanicals from the region, creating a bold and aromatic spirit. Juniper, known as Hapusa in Sanskrit, is what gives their gin its name as well as its wild smell and scent. This scarce juniper berry, which grows close to the Himalayan snow line, offers a lovely framework around which the other botanicals are thoughtfully placed.",
    image: C.hapusaBottle,
    featuredImage: C.featHapusa,
    backgroundImage: C.hapusaBg,
    volume: "750ml", alcoholPercentage: "70CL 43% ABV", country: "India",
    flavors: "Hapusa is a sipping Gin best appreciated straight from the freezer. Expect pine forests and wildflowers on the nose with a bold earthiness on the palate and a long, delicately spiced, finish",
    pairings: [],
    highlights: ["Made with Juniper from the Himalayas", "Along with Coriander Seeds, Turmeric, Ginger, Gondhoraj, Mango", "And Almonds"],
    isFeatured: true, featuredOrder: 0,
  },

  // ── Greater Than ─────────────────────────────────────────────────────────
  {
    slug: "greater-than-london-dry-gin",
    name: "Greater Than London Dry Gin",
    brandSlug: "greater-than",
    category: "gin",
    description: "GIN, BUT GREATER! The first-ever London Dry Gin made in India. Copper pot distilled with botanicals sourced from India and around the world. This gin has clean juniper and fresh lemon peel on the nose and a zing of ginger on the finish. Distilled in Goa with nine unique botanicals: Juniper berries, Coriander seeds, Almond, Angelica root, Fennel, Lemongrass, Orange peel, Chamomile & Ginger.",
    image: C.greaterThanBottle,
    featuredImage: C.featGreaterThan,
    volume: "750ml", alcoholPercentage: "70cl 40% abv", country: "India",
    flavors: "Clean Juniper with Fresh Lemon Peel on the nose and a zing of ginger on the finish",
    pairings: [],
    highlights: ["India's first London Dry Gin"],
    isFeatured: true, featuredOrder: 1,
  },

  // ── The Whistler ─────────────────────────────────────────────────────────
  {
    slug: "the-whistler-irish-whiskey",
    name: "The Whistler Irish Whiskey",
    brandSlug: "the-whistler",
    category: "whiskey",
    description: "The Whistler Irish Whiskey is a premium triple-distilled blend, aged in bourbon barrels for a smooth, rich character with notes of honey, vanilla, and salted caramel.",
    image: C.whistlerBottle,
    featuredImage: C.featWhistler,
    volume: "750ml", alcoholPercentage: "40% alc. by vol", country: "Ireland",
    flavors: "Sweet honey, vanilla, salted caramel, with a smooth oak finish.",
    pairings: ["Dark chocolate", "Smoked salmon", "Hard cheeses"],
    highlights: ["Triple Distilled", "Aged in Bourbon Barrels"],
    isFeatured: true, featuredOrder: 2,
  },

  // ── Sula wines ───────────────────────────────────────────────────────────
  {
    slug: "sula-chenin-blanc",
    name: "Sula Chenin Blanc",
    brandSlug: "sula",
    category: "wines",
    description: "A refreshing and easy-drinking white wine, with some residual sugar, which gives it a slight sweetness, smartly balanced by its delightful acidity. A beautiful Chenin Blanc made with the most ultimate respect for the environment, following strict sustainable practices.",
    image: C.cheninBlanc,
    featuredImage: C.featCheninBlanc,
    volume: "750ml", country: "India",
    flavors: "Ripe Tropical Fruit and Hints of Honey",
    pairings: ["Salad, Gujarati Thali", "Vegetable Quiche, Rawa Fried Fish"],
    highlights: ["India's Best Selling White Wine", "An easy drinking off-dry white wine", "Great to offer to first time wine drinkers"],
    grapeVarietal: "100% Chenin Blanc",
  },
  {
    slug: "sula-late-harvest",
    name: "Sula Late Harvest",
    brandSlug: "sula",
    category: "wines",
    description: "Bask in Sula's Late Harvest Chenin Blanc, the first Indian wine to win Silver at the Paris Wine Cup and Decanter World Wine Awards. Sweet and rich, with notes of honey, this wine is a true delight for the palate.",
    image: C.lateHarvest,
    volume: "750ml", country: "India",
    flavors: "Rich aromas of apricot, mango, raisins with luscious acidity.",
    pairings: ["Cheese cake, panna cotta", "Gubani-ka-meetha", "Gulab jamun, blue cheese"],
    highlights: ["India's most loved dessert wine", "Very aromatic and the first ever Late Harvest Chenin Blanc of India"],
    grapeVarietal: "85% Chenin Blanc, 15% Muscat",
  },
  {
    slug: "sula-shiraz-cabernet",
    name: "Sula Shiraz Cabernet",
    brandSlug: "sula",
    category: "wines",
    description: "Silky and earthy, this Shiraz Cabernet is packed with dark cherries, pepper and mocha notes. A super food-friendly wine and India's favorite red wine.",
    image: C.shirazCabernet,
    featuredImage: C.featShiraz,
    volume: "750ml", country: "India",
    flavors: "Blackberry, black plum, ripe cherry, olives, pepper, mocha with hints of spices.",
    pairings: ["Barbecued meats, medium spicy curries like chicken tikka masala", "Rajma masala, mutton roganjosh"],
    highlights: ["India's best-selling red wine!"],
    grapeVarietal: "85% Shiraz, 15% Cabernet Sauvignon.",
  },
  {
    slug: "sula-tropical-rose",
    name: "Sula Tropical Rose",
    brandSlug: "sula",
    category: "wines",
    description: "Experience Sula's Tropicale Rosé, India's first and only Gold winner at the International Wine Challenge. A refreshing burst of tropical fruit and berry flavours, perfect for any celebration.",
    image: C.tropical,
    featuredImage: C.featTropical,
    volume: "750ml", country: "India",
    flavors: "Aromas of peach and passion fruit with hints of guava at the finish.",
    pairings: ["Aperitif, salads", "Fried seafood appetizers, anda masala, white sauce pasta"],
    highlights: ["Special edition sparkling rosé."],
    grapeVarietal: "70% Chenin Blanc, 30% Riesling and Syrah",
    isFeatured: true, featuredOrder: 5,
  },
  {
    slug: "sula-brut",
    name: "Sula Brut",
    brandSlug: "sula",
    category: "wines",
    description: "Celebrate with Sula Brut, a lively sparkling wine and medalist at the Paris Wine Cup and Decanter Awards. Crisp, refreshing, with citrus and green apple notes.",
    image: C.brut,
    volume: "750ml", country: "India",
    flavors: "Aromas of apples & pears.",
    pairings: ["Salad, French fries", "Smoked salmon, fried chicken", "Indian pakoras", "Hara bhara kebab"],
    highlights: ["Light Sparkling Fruity Wine", "Versatile wine perfect for everyday"],
  },
  {
    slug: "sula-seco",
    name: "Sula Seco",
    brandSlug: "sula",
    category: "wines",
    description: "Citrusy, delicious and versatile; this is what you can expect from Seco, an endearing sparkling wine made from Chenin Blanc.",
    image: C.seco,
    volume: "750ml", country: "India",
    flavors: "Hints of ripe fruit, melon & passion fruit on the palate and a citrusy, lingering finish.",
    pairings: ["Aperitifs, frittata", "South Asian curries (yellow curry)", "Indian pakoras"],
    highlights: ["Light sparkling fruity wine", "Ideal for sparkling wine cocktails", "Perfect for everyday celebrations"],
    grapeVarietal: "100% Chenin Blanc",
  },
  {
    slug: "sula-sparkling-shiraz",
    name: "Sula Sparkling Shiraz",
    brandSlug: "sula",
    category: "wines",
    description: "Uncork Sula's Sparkling Shiraz, India's first and only sparkling red wine and a Gold Medal winner at the India Wine Awards.",
    image: C.sparklingShiraz,
    volume: "750ml", country: "India",
    flavors: "Pomegranate, dark berries, spices, smoke.",
    pairings: ["Dark chocolate dessert, chili chicken", "Dabeli, mutton rahra"],
    highlights: ["Prosecco method for a fruit-forward wine!"],
    grapeVarietal: "100% Shiraz",
  },
  {
    slug: "sula-zinfandel-rose",
    name: "Sula Zinfandel Rosé",
    brandSlug: "sula",
    category: "wines",
    description: "Citrus, cranberries and ripe fruits notes; this rosé wine has so much to offer. Beautifully made from Zinfandel, its residual sugar is nicely balanced by its refreshing acidity.",
    image: C.zinfRose,
    volume: "750ml", country: "India",
    flavors: "Intense notes of citrus, cranberry & ripe fruit.",
    pairings: ["Salad, Chinese appetizers", "Indian pakoras, chicken/paneer chilli"],
    highlights: ["India's first ever Zinfandel Rosé", "Light, refreshing wine with a great mouthfeel", "Perfect for Indian Summers", "Value for money"],
    grapeVarietal: "100% Zinfandel.",
  },
  {
    slug: "sula-zinfandel-red",
    name: "Sula Zinfandel Red",
    brandSlug: "sula",
    category: "wines",
    description: "Generous, fruit-forward and playful, this Zinfandel is a structured and balanced red wine, supported by its delightful plum and dark berries notes.",
    image: C.zinfRed,
    volume: "750ml", country: "India",
    flavors: "Aromas of red berries, blackberries, plums & hints of cinnamon",
    pairings: ["Curries, cold cuts", "Spicy noodles", "Teriyaki."],
    highlights: ["India's first Zinfandel.", "Not aged in barrels."],
    grapeVarietal: "100% Zinfandel.",
  },

  // ── Luxardo liqueurs ─────────────────────────────────────────────────────
  {
    slug: "luxardo-maraschino-cherries",
    name: "Luxardo Maraschino Cherries",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "These are candied cherries soaked in Luxardo marasca cherry syrup. No thickening agents of any type and no preservatives are used and the dark red color is all natural.",
    image: C.maraschCherries,
    country: "Italy",
    pairings: [], highlights: [],
  },
  {
    slug: "luxardo-maraschino-originale",
    name: "Luxardo Maraschino Originale",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "Crystal clear in colour, the aroma is typical of marasca cherry distillate with strong alcohol spirit and roasted nuttiness, while the taste results smooth but sharp at the same time with hints of dark chocolate, vanilla and orange marmalade.",
    image: C.maraschOriginale,
    featuredImage: C.featMaraschino,
    volume: "750ml", alcoholPercentage: "32% alc. by vol.", country: "Italy",
    flavors: "Spiritous sweet cherry with hints of dark chocolate, vanilla and a touch of orange marmalade",
    pairings: [],
    highlights: ["GMO Free", "Kosher Certified", "Vegan friendly"],
    isFeatured: true, featuredOrder: 3,
  },
  {
    slug: "luxardo-sambuca",
    name: "Luxardo Sambuca",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "A traditional Italian liqueur, Luxardo Sambuca dei Cesari. The main components are star anise, sugar, alcohol, herbs and spices, and pure volcanic water from Luxardo's own springs.",
    image: C.sambuca,
    volume: "750ml", alcoholPercentage: "38% alc. by vol.", country: "Italy",
    flavors: "Syrupy mouth feel, very sweet, clean rich aniseed and liquorice with subtle coriander",
    pairings: [],
    highlights: ["Star anise, herbs and spices, alcohol, sugar", "And pure volcanic water from Luxardo's own springs", "Are the key ingredients"],
  },
  {
    slug: "luxardo-bitter-rosso",
    name: "Luxardo Bitter Rosso",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "Luxardo Bitter is made by separately infusing citrus fruits, bitter herbs, and fragrant plants with alcohol and water. Distinguished by its bright red colour, unique gentian and wormwood flavours, and herbal and citrussy scents.",
    image: C.bitterRosso,
    featuredImage: C.featBitter,
    volume: "750ml", alcoholPercentage: "25% alc. by vol.", country: "Italy",
    flavors: "Herbaceous quinine bitterness balanced with syrupy sweetness flavoured with blood orange zest. Gently bitter and persistent",
    pairings: [], highlights: [],
    isFeatured: true, featuredOrder: 4,
  },
  {
    slug: "luxardo-aperitivo",
    name: "Luxardo Aperitivo",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "The outcome of a well balanced infusion of different citrus fruits, herbs, and roots. For the ideal Spritz, combine it with soda and Prosecco.",
    image: C.aperitivo,
    volume: "750ml", alcoholPercentage: "11% or 15% alc. by vol.", country: "Italy",
    flavors: "Slightly bitter, with flavours of zesty orange marmalade and pink grapefruit. Rhubarb and gentian notes.",
    pairings: [], highlights: [],
  },
  {
    slug: "luxardo-cherry-liqueur",
    name: "Luxardo Cherry Liqueur",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "Produced since 1821, Luxardo's second speciality after Maraschino Originale. Intense cherry colour, the perfume of freshly squeezed cherry juice.",
    image: C.cherryLiqueur,
    volume: "750ml", alcoholPercentage: "30% alc. by vol.", country: "Italy",
    flavors: "Intense, thick and syrupy with sweetness partially offset by fruit tartness. Concentrated cherry juice and cherry jam with black pepper spice.",
    pairings: [], highlights: [],
  },
  {
    slug: "luxardo-triple-sec",
    name: "Luxardo Triple Sec",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "Luxardo has been producing Triplum, a traditional 'triple sec', since the first half of the 1800s. Made from the dried and distilled peels of curaçao, sweet oranges, and mandarins.",
    image: C.tripleSec,
    volume: "750ml", alcoholPercentage: "39% alc. by vol", country: "Italy",
    flavors: "Smooth enveloping flavour of citrus fruits, a very well rounded and mature taste.",
    pairings: [], highlights: [],
  },
  {
    slug: "luxardo-hazelnut-liqueur",
    name: "Luxardo Hazelnut Liqueur",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "Luxardo Angioletto Hazelnut Liqueur is obtained from a blending process of real hazelnut infusion with a number of natural extracts, including cocoa and vanilla.",
    image: C.hazelnut,
    volume: "750ml", alcoholPercentage: "24% alc. by vol", country: "Italy",
    flavors: "Lightly syrupy. Rich toasted hazelnut with biscuit, walnut, almond and hints of mocha coffee, citrus, vanilla and cocoa powder.",
    pairings: [], highlights: [],
  },
  {
    slug: "luxardo-absinthe-fata-verde",
    name: "Luxardo Absinthe Fata Verde",
    brandSlug: "luxardo",
    category: "liqueur",
    description: "A classic absinthe with a strong anise and herbal profile.",
    image: C.absinthe,
    volume: "750ml", country: "Italy",
    pairings: [], highlights: [],
  },

  // ── Luxardo bitters ───────────────────────────────────────────────────────
  {
    slug: "luxardo-rhubarb-bitter",
    name: "Luxardo Rhubarb Bitter",
    brandSlug: "luxardo",
    category: "bitter",
    description: "A bittersweet rhubarb-based bitter for unique cocktails.",
    image: C.rhubarbBitter,
    volume: "750ml", country: "Italy",
    pairings: [], highlights: [],
  },
  {
    slug: "luxardo-chamomile-bitter",
    name: "Luxardo Chamomile Bitter",
    brandSlug: "luxardo",
    category: "bitter",
    description: "A delicate chamomile-based bitter for unique cocktails.",
    image: C.chamomileBitter,
    volume: "750ml", country: "Italy",
    pairings: [], highlights: [],
  },
  {
    slug: "luxardo-orange-bitter",
    name: "Luxardo Orange Bitter",
    brandSlug: "luxardo",
    category: "bitter",
    description: "A vibrant orange-based bitter for cocktails and digestifs.",
    image: C.orangeBitter,
    volume: "750ml", country: "Italy",
    pairings: [], highlights: [],
  },
  {
    slug: "luxardo-coffee-bitter",
    name: "Luxardo Coffee Bitter",
    brandSlug: "luxardo",
    category: "bitter",
    description: "A rich coffee-based bitter for complex cocktails.",
    image: C.coffeeBitter,
    volume: "750ml", country: "Italy",
    pairings: [], highlights: [],
  },
]

// ---------------------------------------------------------------------------
// Cocktails — 26 recipes, first 5 featured on homepage
// ---------------------------------------------------------------------------

const cocktails = [
  {
    slug: "himalayan-negroni",
    title: "Himalayan Negroni",
    description: "A mountain twist on the classic Italian aperitivo, featuring Timbur-infused Hapusa Gin for a unique numbing sensation paired with the bitterness of Campari and Vermouth.",
    imageUrl: C.himalayanNegroni,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Hapusa",
    method: "Stir all ingredients with ice and strain into a chilled glass.", garnish: "Orange peel",
    isFeatured: true, featuredOrder: 0,
    ingredients: [
      { amount: "30ml",    name: "Hapusa Gin", order: 0 },
      { amount: "",        name: "Timbur (Himalayan Sichuan Pepper) Infused", order: 1 },
      { amount: "15ml",    name: "Vermouth", order: 2 },
      { amount: "15ml",    name: "Campari", order: 3 },
    ],
  },
  {
    slug: "apricot-smash",
    title: "Apricot Smash",
    description: "A fruity and refreshing concoction enhancing Hapusa Gin with the sweetness of apricot jam and fresh apple juice, balanced by a zesty lime kick.",
    imageUrl: C.apricotSmash,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Hapusa",
    method: "Shake", garnish: "Dry Apricot, Mint Sprig",
    isFeatured: true, featuredOrder: 1,
    ingredients: [
      { amount: "50ml",        name: "Hapusa Gin", order: 0 },
      { amount: "2 Bar Spoons", name: "Apricot Jam", order: 1 },
      { amount: "30ml",        name: "Apple Juice", order: 2 },
      { amount: "15ml",        name: "Lime Juice", order: 3 },
      { amount: "5–7 pcs",     name: "Mint", order: 4 },
    ],
  },
  {
    slug: "himalayan-gimlet",
    title: "Himalayan Gimlet",
    description: "A crisp and citrusy classic reinvented with Himalayan Gin, offering a perfect balance of sweet and sour notes.",
    imageUrl: C.gimlet,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Hapusa",
    method: "Shake, fine strain", garnish: "Lime wheel (Peel)",
    isFeatured: true, featuredOrder: 2,
    ingredients: [
      { amount: "60ml", name: "Hapusa Gin", order: 0 },
      { amount: "20ml", name: "Sugar syrup", order: 1 },
      { amount: "20ml", name: "Lime juice", order: 2 },
    ],
  },
  {
    slug: "ny-sour",
    title: "NY Sour",
    description: "A sophisticated whiskey sour variation using Hapusa Gin as the base, topped with a red wine float for a stunning visual and complex flavor profile.",
    imageUrl: C.nySour,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Hapusa",
    method: "Shake", garnish: "",
    isFeatured: true, featuredOrder: 3,
    ingredients: [
      { amount: "50ml", name: "Hapusa Gin", order: 0 },
      { amount: "20ml", name: "Simple syrup", order: 1 },
      { amount: "20ml", name: "Lemon Juice", order: 2 },
    ],
  },
  {
    slug: "southside",
    title: "Southside",
    description: "A refreshing gin-based cocktail often described as a mojito for gin lovers, featuring fresh mint and lime.",
    imageUrl: C.southside,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Greater Than",
    method: "Shake and fine strain", garnish: "Mint Leaf",
    isFeatured: true, featuredOrder: 4,
    ingredients: [
      { amount: "50ml",  name: "Greater Than Gin", order: 0 },
      { amount: "20ml",  name: "Lime Juice", order: 1 },
      { amount: "15ml",  name: "Simple syrup", order: 2 },
      { amount: "6–8",   name: "Mint leaves", order: 3 },
    ],
  },
  {
    slug: "greater-martini",
    title: "Greater Martini",
    description: "The quintessential gin cocktail, clean and elegant, highlighting the botanicals of Greater Than Gin with a touch of dry vermouth.",
    imageUrl: C.greaterMartini,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Greater Than",
    method: "Stir", garnish: "Lemon Peel",
    ingredients: [
      { amount: "60ml", name: "Greater Than", order: 0 },
      { amount: "10ml", name: "Dry vermouth", order: 1 },
    ],
  },
  {
    slug: "greater-gin-basil-smash",
    title: "Greater Gin Basil Smash",
    description: "A modern classic that's vibrant and herbal, muddling fresh basil to release a peppery aroma that complements the gin perfectly.",
    imageUrl: C.ginBasil,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Greater Than",
    method: "Build", garnish: "Basil sprig",
    ingredients: [
      { amount: "60ml", name: "Greater Than Gin", order: 0 },
      { amount: "15ml", name: "Fresh Lime juice", order: 1 },
      { amount: "15ml", name: "Simple syrup", order: 2 },
      { amount: "8–10", name: "Basil leaves", order: 3 },
    ],
  },
  {
    slug: "greater-salty-dog",
    title: "Greater Salty Dog",
    description: "A tangy and savory delight combining gin and grapefruit juice with a hint of hibiscus, served in a salt-rimmed glass.",
    imageUrl: C.saltyDog,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Greater Than",
    method: "Shake", garnish: "Grapefruit",
    ingredients: [
      { amount: "45ml", name: "Greater Than Gin", order: 0 },
      { amount: "90ml", name: "Grapefruit Super Juice", order: 1 },
      { amount: "20ml", name: "Hibiscus syrup", order: 2 },
    ],
  },
  {
    slug: "hemingway-special",
    title: "Hemingway Special",
    description: "A daiquiri variation created for Ernest Hemingway, featuring maraschino liqueur and grapefruit juice for a tart, complex finish without sugar.",
    imageUrl: C.hemingway,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Maraschino Originale",
    method: "Shake & Double strain", garnish: "Lime Zest",
    ingredients: [
      { amount: "60ml",   name: "White Rum", order: 0 },
      { amount: "30ml",   name: "Fresh pink grapefruit juice", order: 1 },
      { amount: "15ml",   name: "Luxardo Maraschino Originale", order: 2 },
      { amount: "15ml",   name: "Fresh Lime Juice", order: 3 },
      { amount: "7.5ml",  name: "Sugar syrup", order: 4 },
    ],
  },
  {
    slug: "maratonic",
    title: "Maratonic",
    description: "A simple yet unique highball refreshing the palate with the nutty, cherry notes of Maraschino liqueur and tonic water.",
    imageUrl: C.maratonic,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Maraschino Originale",
    method: "Build", garnish: "Rosemary sprig & cucumber slice",
    ingredients: [
      { amount: "45ml",     name: "Luxardo Maraschino Originale", order: 0 },
      { amount: "7.5ml",    name: "Fresh Lemon Juice", order: 1 },
      { amount: "Top with", name: "Tonic water", order: 2 },
      { amount: "Spray of", name: "Luxardo Absinthe", order: 3 },
    ],
  },
  {
    slug: "aviation",
    title: "Aviation",
    description: "A pre-prohibition classic with a lovely pale sky-blue hue, offering floral and citrus notes from the gin, maraschino, and lemon.",
    imageUrl: C.aviation,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Maraschino Originale",
    method: "Shake & Double strain", garnish: "Lemon zest & Luxardo Original Maraschino Cherry",
    ingredients: [
      { amount: "45ml", name: "Greater Than London Dry Gin", order: 0 },
      { amount: "30ml", name: "Luxardo Maraschino Originale Liqueur", order: 1 },
      { amount: "15ml", name: "Fresh lemon juice", order: 2 },
    ],
  },
  {
    slug: "morlacco-fizz",
    title: "Morlacco Fizz",
    description: "A lively fizz showcasing the rich, blood-red cherry flavors of Sangue Morlacco, brightened with lemon and cherry juice.",
    imageUrl: C.morlaccoFizz,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Cherry Liqueur",
    method: "Stir all ingredients with ice and strain into a chilled glass.", garnish: "Luxardo Original Maraschino Cherry",
    ingredients: [
      { amount: "45ml", name: "Greater Than London Dry Gin", order: 0 },
      { amount: "20ml", name: "Fresh lemon juice", order: 1 },
      { amount: "20ml", name: "Luxardo Original Maraschino Cherry Juice", order: 2 },
      { amount: "15ml", name: 'Luxardo Cherry Liqueur "Sangue Morlacco"', order: 3 },
    ],
  },
  {
    slug: "cherry-negroni",
    title: "Cherry Negroni",
    description: "A rich twist on the Negroni, swapping Campari for the deep, intense cherry flavor of Sangue Morlacco liqueur.",
    imageUrl: C.cherryNegroni,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Cherry Liqueur",
    method: "Stir", garnish: "Lemon zest & Luxardo Original Maraschino Cherry",
    ingredients: [
      { amount: "45ml", name: "Luxardo London Dry Gin", order: 0 },
      { amount: "25ml", name: 'Luxardo Cherry Liqueur "Sangue Morlacco"', order: 1 },
      { amount: "25ml", name: "Sweet Vermouth", order: 2 },
    ],
  },
  {
    slug: "luxi-style",
    title: "Luxi Style",
    description: "A breezy highball combining gin and cherry liqueur, lengthened with soda for an easy-drinking, refreshing serve.",
    imageUrl: C.luxiStyle,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Cherry Liqueur",
    method: "Build", garnish: "Rosemary & lemon zest",
    ingredients: [
      { amount: "45ml",     name: "Luxardo London Dry Gin", order: 0 },
      { amount: "15ml",     name: 'Luxardo Cherry Liqueur "Sangue Morlacco"', order: 1 },
      { amount: "Top with", name: "Soda", order: 2 },
    ],
  },
  {
    slug: "vacanza",
    title: "Vacanza",
    description: "A holiday in a glass, blending bitter Aperitivo warmth with zesty red grapefruit and triple sec.",
    imageUrl: C.vacanza,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Triple Sec",
    method: "Shake & Strain", garnish: "Grapefruit Zest",
    ingredients: [
      { amount: "40ml", name: "Luxardo Aperitivo", order: 0 },
      { amount: "40ml", name: "Fresh pink grapefruit juice", order: 1 },
      { amount: "20ml", name: "Luxardo Triplum – Triple Sec", order: 2 },
    ],
  },
  {
    slug: "white-lady",
    title: "White Lady",
    description: "A silky, sour classic combining the botanical punch of gin with the sweet orange notes of Triple Sec and fresh lemon.",
    imageUrl: C.whiteLady,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Triple Sec",
    method: "Shake & Strain", garnish: "Lemon Zest",
    ingredients: [
      { amount: "60ml", name: "Luxardo London Dry Gin", order: 0 },
      { amount: "30ml", name: "Luxardo Triplum Triple Sec", order: 1 },
      { amount: "10ml", name: "Fresh lemon juice", order: 2 },
    ],
  },
  {
    slug: "margarita",
    title: "Margarita",
    description: "The world's most popular tequila cocktail, balancing earthy agave notes with bright lime and sweet orange liqueur.",
    imageUrl: C.margarita,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Triple Sec",
    method: "Shake & Double strain", garnish: "Lime zest & rim of salt",
    ingredients: [
      { amount: "60ml", name: "Tequila Blanco", order: 0 },
      { amount: "10ml", name: "Luxardo Triplum Triple Sec", order: 1 },
      { amount: "10ml", name: "Fresh lime juice", order: 2 },
    ],
  },
  {
    slug: "negroni",
    title: "Negroni",
    description: "The iconic Italian aperitif. Equal parts gin, vermouth, and bitters create a perfectly balanced, bittersweet masterpiece.",
    imageUrl: C.negroni,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Bitter",
    method: "Build", garnish: "Lemon Zest",
    ingredients: [
      { amount: "40ml",     name: "Luxardo Bitter", order: 0 },
      { amount: "40ml",     name: "Greater Than London Dry Gin", order: 1 },
      { amount: "40ml",     name: "Sweet Vermouth", order: 2 },
      { amount: "2 dashes", name: "Angostura Bitters", order: 3 },
    ],
  },
  {
    slug: "bitter-shakerato",
    title: "Bitter Shakerato",
    description: "A simple Italian favorite, shaking Luxardo Bitter vigorously with ice to create a cold, frothy, and intensely herbal drink.",
    imageUrl: C.shakerato,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Bitter",
    method: "Shake & double strain", garnish: "Lemon zest",
    ingredients: [
      { amount: "60ml", name: "Luxardo Bitter", order: 0 },
    ],
  },
  {
    slug: "boulevardier",
    title: "Boulevardier",
    description: "The Negroni's autumnal cousin, substituting gin for the rich, spicy warmth of Rye Whisky.",
    imageUrl: C.boulevardier,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Bitter",
    method: "Build", garnish: "Lemon Zest",
    ingredients: [
      { amount: "45ml", name: "Rye Whisky", order: 0 },
      { amount: "30ml", name: "Luxardo Bitter", order: 1 },
      { amount: "30ml", name: "Sweet Vermouth", order: 2 },
    ],
  },
  {
    slug: "sorrentino",
    title: "Sorrentino",
    description: "A refreshing spritz-style drink marrying the zest of Limoncello with the depth of bitter and vermouth.",
    imageUrl: C.sorrentino,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Bitter",
    method: "Stir all ingredients with ice and strain into a chilled glass.", garnish: "Orange peel",
    ingredients: [
      { amount: "30ml",     name: "Luxardo Limoncello", order: 0 },
      { amount: "30ml",     name: "Luxardo Bitter", order: 1 },
      { amount: "30ml",     name: "Sweet Vermouth", order: 2 },
      { amount: "Top with", name: "Soda water", order: 3 },
    ],
  },
  {
    slug: "jungle-samba",
    title: "Jungle Samba",
    description: "A tropical explosion of flavors featuring rum, pineapple, and lime, with a kick of Sambuca and bitter.",
    imageUrl: C.jungleSamba,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Bitter",
    method: "Stir all ingredients with ice and strain into a chilled glass.", garnish: "Orange peel",
    ingredients: [
      { amount: "35ml",       name: "Rum", order: 0 },
      { amount: "15ml",       name: "Luxardo Bitter", order: 1 },
      { amount: "10ml",       name: "Luxardo Sambuca dei Cesari", order: 2 },
      { amount: "45ml",       name: "Fresh pineapple juice", order: 3 },
      { amount: "15ml",       name: "Fresh lime juice", order: 4 },
      { amount: "1 bar spoon",name: "Demerara sugar", order: 5 },
    ],
  },
  {
    slug: "aperitivo-spritz",
    title: "Aperitivo Spritz",
    description: "The quintessential sunset drink. Light, bubbly, and bittersweet, featuring Luxardo Aperitivo and Prosecco.",
    imageUrl: C.aperitivoSpritz,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Aperitivo",
    method: "Build", garnish: "Orange Zest",
    ingredients: [
      { amount: "60ml",     name: "Luxardo Aperitivo", order: 0 },
      { amount: "50ml",     name: "Prosecco", order: 1 },
      { amount: "Top with", name: "Soda", order: 2 },
    ],
  },
  {
    slug: "bicicletta",
    title: "Bicicletta",
    description: "A drier, more bitter alternative to the Spritz, named after the wobbly bike rides home after a few of these.",
    imageUrl: C.bicicletta,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Aperitivo",
    method: "Build", garnish: "Orange Zest",
    ingredients: [
      { amount: "50ml",     name: "Luxardo Aperitivo", order: 0 },
      { amount: "Top with", name: "Aranciata Amara / Fresh orange juice", order: 1 },
    ],
  },
  {
    slug: "il-santo",
    title: "Il Santo",
    description: "A complex and herbal cocktail layering gin, aperitivo, and maraschino with a touch of citrus.",
    imageUrl: C.ilSanto,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Aperitivo",
    method: "Shake & Strain", garnish: "Orange Zest",
    ingredients: [
      { amount: "45ml", name: "Luxardo London Dry Gin", order: 0 },
      { amount: "15ml", name: "Luxardo Aperitivo", order: 1 },
      { amount: "15ml", name: "Lime juice", order: 2 },
      { amount: "10ml", name: "Luxardo Liquore Sant'Antonio", order: 3 },
      { amount: "10ml", name: "Luxardo Maraschino Originale", order: 4 },
    ],
  },
  {
    slug: "angioletto-and-lime",
    title: "Angioletto & Lime",
    description: "A simple and sweet hazelnut-herb liqueur served with fresh lime for a balanced, digestible sip.",
    imageUrl: C.angiolettoLime,
    difficulty: CocktailDifficulty.Easy, category: "Classic", base: "Luxardo Angioletto",
    method: "Stir", garnish: "4 Lime Wedges",
    ingredients: [
      { amount: "60ml", name: "Luxardo Angioletto", order: 0 },
      { amount: "15ml", name: "Fresh lime juice", order: 1 },
    ],
  },
]

// ---------------------------------------------------------------------------
// Carousel slides — 4 slides, all using real uploaded images
// ---------------------------------------------------------------------------

const carouselSlides = [
  { image: C.carousel1, altText: "Premium spirits collection",  order: 0, isActive: true },
  { image: C.carousel2, altText: "Luxury drinks experience",    order: 1, isActive: true },
  { image: C.carousel3, altText: "Fine wines and gins",         order: 2, isActive: true },
  { image: C.carousel4, altText: "Luxardo Maraschino",          order: 3, isActive: true },
]

// ---------------------------------------------------------------------------
// Company stats
// ---------------------------------------------------------------------------

const companyStats = [
  { value: "27+",   label: "Premium Liquor",  icon: "Wine",  order: 0 },
  { value: "3+",    label: "Years Experience", icon: "Award", order: 1 },
  { value: "1000+", label: "Happy Clients",    icon: "Users", order: 2 },
  { value: "50+",   label: "Expert Reviews",   icon: "Star",  order: 3 },
]

// ---------------------------------------------------------------------------
// Contact info
// ---------------------------------------------------------------------------

const contactInfo = [
  { type: "address", title: "Our Location", value: "Baluwatar, Kathmandu", subValue: null },
  { type: "email",   title: "Email Us",     value: "Drinkitimportandexport@gmail.com", subValue: null },
  { type: "phone",   title: "Call Us",      value: "+977 9819810683", subValue: "Mon–Fri from 9am to 6pm" },
]

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱 Seeding database…")

  console.log("  → Brands")
  for (const brand of brands) {
    await prisma.brand.upsert({ where: { slug: brand.slug }, update: brand, create: brand })
  }

  console.log("  → Products")
  for (const { brandSlug, ...product } of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...product, brand: { connect: { slug: brandSlug } } },
      create: { ...product, brand: { connect: { slug: brandSlug } } },
    })
  }

  console.log("  → Cocktails")
  for (const { ingredients, ...cocktail } of cocktails) {
    const existing = await prisma.cocktail.findUnique({
      where: { slug: cocktail.slug },
      select: { id: true },
    })
    if (existing) {
      await prisma.cocktailIngredient.deleteMany({ where: { cocktailId: existing.id } })
    }
    await prisma.cocktail.upsert({
      where: { slug: cocktail.slug },
      update: { ...cocktail, ingredients: { create: ingredients } },
      create: { ...cocktail, ingredients: { create: ingredients } },
    })
  }

  console.log("  → Carousel slides")
  await prisma.carouselSlide.deleteMany()
  await prisma.carouselSlide.createMany({ data: carouselSlides })

  console.log("  → Company stats")
  await prisma.companyStat.deleteMany()
  await prisma.companyStat.createMany({ data: companyStats })

  console.log("  → Contact info")
  await prisma.contactInfo.deleteMany()
  await prisma.contactInfo.createMany({ data: contactInfo })

  console.log("✅ Seed complete")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
