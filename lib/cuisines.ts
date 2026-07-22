export interface Cuisine {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  mealdbAreas: string[];
  searchTerm: string;
}

export const CUISINES: Cuisine[] = [
  {
    name: "Leftovers",
    slug: "leftovers",
    emoji: "🍱",
    description:
      "Last night's masterpiece, tonight's clever remix. Leftovers night is about creativity — transform yesterday's ingredients into something new, reduce food waste, and spend zero time at the grocery store. Fried rice, frittatas, grain bowls, and soups are your best friends here.",
    mealdbAreas: [],
    searchTerm: "leftover recipe ideas",
  },
  {
    name: "Balkan",
    slug: "balkan",
    emoji: "🥩",
    description:
      "Balkan cuisine spans the crossroads of Eastern Europe and the Mediterranean, drawing from Ottoman, Greek, and Slavic traditions. Expect grilled meats like ćevapi and pljeskavica, flaky burek pastry, stuffed peppers, and thick stews rich with paprika and garlic.",
    mealdbAreas: ["Croatian"],
    searchTerm: "Balkan",
  },
  {
    name: "Turkish",
    slug: "turkish",
    emoji: "🫕",
    description:
      "Turkish cuisine is one of the world's great culinary traditions, built over centuries of Ottoman influence. From slow-cooked lamb kebabs and creamy mezes to silky baklava and pide flatbreads, it balances smoky, tangy, and sweet in every meal.",
    mealdbAreas: ["Turkish"],
    searchTerm: "Turkish",
  },
  {
    name: "Mexican",
    slug: "mexican",
    emoji: "🌮",
    description:
      "Mexican cuisine is a UNESCO-recognized culinary heritage blending indigenous Aztec and Mayan traditions with Spanish influence. Tacos, tamales, mole sauces, fresh salsas, and the holy trinity of corn, beans, and chile define its soul.",
    mealdbAreas: ["Mexican"],
    searchTerm: "Mexican",
  },
  {
    name: "Roadkill/Survival",
    slug: "roadkill-survival",
    emoji: "🏕️",
    description:
      "Wild game, foraged ingredients, and campfire cooking — this is eating at its most primal. Think venison stew, pan-fried rabbit, smoked trout straight from the river, and anything you'd find on a hunting trip or survival challenge. No grocery store required.",
    mealdbAreas: [],
    searchTerm: "wild game recipes",
  },
  {
    name: "Colombian",
    slug: "colombian",
    emoji: "🫘",
    description:
      "Colombian cuisine reflects the country's dramatic geography: coastal seafood, Andean mountain stews, and Amazon jungle ingredients all coexist. Bandeja paisa, arepas de chócolo, sancocho soup, and empanadas are beloved staples that warm any table.",
    mealdbAreas: [],
    searchTerm: "Colombian",
  },
  {
    name: "Spanish",
    slug: "spanish",
    emoji: "🥘",
    description:
      "Spanish cuisine is defined by its fierce regionality — Catalonia, Basque Country, Andalusia, and Castile each have distinct identities. Tapas culture, jamón ibérico, paella valenciana, and patatas bravas are icons of this Mediterranean-meets-Atlantic tradition.",
    mealdbAreas: ["Spanish"],
    searchTerm: "Spanish",
  },
  {
    name: "Japanese",
    slug: "japanese",
    emoji: "🍣",
    description:
      "Japanese cuisine is built on precision, seasonal ingredients, and umami depth. From sushi and ramen to tonkatsu, takoyaki, and izakaya small plates, every dish reflects the Japanese philosophy of respecting the ingredient above all else.",
    mealdbAreas: ["Japanese"],
    searchTerm: "Japanese",
  },
  {
    name: "Cajun",
    slug: "cajun",
    emoji: "🦞",
    description:
      "Cajun cooking is Louisiana's rustic French-Creole heritage: bold, spicy, and deeply satisfying. Jambalaya, gumbo, crawfish étouffée, and andouille sausage are the stars, all built on the 'holy trinity' of onion, celery, and bell pepper.",
    mealdbAreas: [],
    searchTerm: "Cajun",
  },
  {
    name: "Caribbean",
    slug: "caribbean",
    emoji: "🌴",
    description:
      "Caribbean cuisine fuses African, indigenous Taíno, and European influences into something vibrant and tropical. Jamaican jerk chicken, rice and peas, curry goat, fried plantains, and fresh seafood define the island table in all its sun-soaked glory.",
    mealdbAreas: ["Jamaican"],
    searchTerm: "Caribbean",
  },
  {
    name: "Chinese",
    slug: "chinese",
    emoji: "🥟",
    description:
      "Chinese cuisine encompasses dozens of regional traditions — Cantonese dim sum, Sichuan fire and numbness, Shanghainese braised pork belly, and Peking duck. It's one of the world's oldest culinary cultures with over 5,000 years of recorded history.",
    mealdbAreas: ["Chinese"],
    searchTerm: "Chinese",
  },
  {
    name: "Italian",
    slug: "italian",
    emoji: "🍝",
    description:
      "Italian cuisine is the world's most beloved: fresh pasta, wood-fired pizza, risotto, and simple dishes where quality ingredients do all the work. Regional identity is everything — a Roman carbonara and a Milanese osso buco live in completely different worlds.",
    mealdbAreas: ["Italian"],
    searchTerm: "Italian",
  },
  {
    name: "BBQ",
    slug: "bbq",
    emoji: "🔥",
    description:
      "BBQ is America's great slow-food tradition. Texas brisket, Carolina pulled pork, Memphis ribs, and Kansas City burnt ends each have fiercely loyal local identities. The only rule: low heat, long time, and smoke is the only seasoning you'll ever need.",
    mealdbAreas: [],
    searchTerm: "BBQ barbecue",
  },
  {
    name: "New York/Chicago",
    slug: "new-york-chicago",
    emoji: "🍕",
    description:
      "Two cities, one obsession: pizza. New York's paper-thin foldable slices and Chicago's deep-dish butter crust are the headliners, but both cities also claim iconic deli culture, hot dog traditions, and a sandwich scene worth flying across the country for.",
    mealdbAreas: [],
    searchTerm: "New York pizza",
  },
  {
    name: "Californian",
    slug: "californian",
    emoji: "🥑",
    description:
      "California cuisine pioneered the farm-to-table movement and gave the world fresh fusion and year-round farmers market cooking. Light, produce-forward, and internationally influenced — it's healthy eating that never tastes like a compromise or a punishment.",
    mealdbAreas: [],
    searchTerm: "California cuisine",
  },
  {
    name: "African",
    slug: "african",
    emoji: "🍲",
    description:
      "African cuisine is one of the world's most diverse — from North Africa's spiced tagines and couscous to West Africa's jollof rice, East Africa's injera platters, and South Africa's braai culture. Rich stews, fermented ingredients, and communal eating define the experience.",
    mealdbAreas: ["Moroccan", "Kenyan"],
    searchTerm: "African",
  },
  {
    name: "Vietnamese/Thai",
    slug: "vietnamese-thai",
    emoji: "🍜",
    description:
      "Two of Southeast Asia's brightest culinary stars. Vietnamese food is bright and herbaceous — pho, bánh mì, bún chả. Thai cuisine is bolder with coconut milk, fish sauce, and fresh chili: pad thai, green curry, and mango sticky rice are global favorites.",
    mealdbAreas: ["Vietnamese", "Thai"],
    searchTerm: "Vietnamese Thai",
  },
  {
    name: "Southern/Soul",
    slug: "southern-soul",
    emoji: "🍗",
    description:
      "Southern and Soul food is American comfort cooking at its most honest: slow-fried chicken, smothered pork chops, collard greens, mac and cheese, and skillet cornbread. Rooted in African American culinary tradition and the rural American South.",
    mealdbAreas: [],
    searchTerm: "Southern soul food",
  },
  {
    name: "Indian",
    slug: "indian",
    emoji: "🍛",
    description:
      "Indian cuisine is a continent-spanning universe of spice. Northern India's rich butter-based gravies contrast with South India's coconut, tamarind, and mustard-seed-forward cooking. Dal, biryani, dosa, and tandoori chicken are touchstones of a 4,000-year tradition.",
    mealdbAreas: ["Indian"],
    searchTerm: "Indian",
  },
  {
    name: "Korean",
    slug: "korean",
    emoji: "🥗",
    description:
      "Korean cuisine is having a global moment for good reason. Fermented kimchi, sizzling Korean BBQ, bibimbap, tteokbokki, and crispy Korean fried chicken bring bold, layered flavor — alongside the concept of banchan, the small shared side dishes that fill the table.",
    mealdbAreas: ["Korean"],
    searchTerm: "Korean",
  },
  {
    name: "European",
    slug: "european",
    emoji: "🥖",
    description:
      "European cuisine is centuries of tradition across dozens of nations. British Sunday roast, French bistro classics, German sausage culture, Dutch herring, and Scandinavian smoked fish — the continent's culinary breadth is truly staggering and endlessly explorable.",
    mealdbAreas: ["British", "Dutch", "Irish", "French"],
    searchTerm: "European",
  },
  {
    name: "Mediterranean",
    slug: "mediterranean",
    emoji: "🫒",
    description:
      "The Mediterranean diet is consistently ranked the world's healthiest. Greek moussaka and spanakopita, Italian seafood, Spanish gazpacho, Lebanese mezze, and Turkish dishes all share a foundation of olive oil, legumes, fresh vegetables, and grilled proteins.",
    mealdbAreas: ["Greek"],
    searchTerm: "Mediterranean",
  },
  {
    name: "Ethiopian",
    slug: "ethiopian",
    emoji: "🫓",
    description:
      "Ethiopian food is an experience as much as a meal. Injera — a sour, spongy flatbread — serves as both plate and utensil. On top: berbere-spiced lamb tibs, lentil wats, chickpea stews, and gored gored raw beef. Eating is communal, always shared from one platter.",
    mealdbAreas: [],
    searchTerm: "Ethiopian",
  },
  {
    name: "French",
    slug: "french",
    emoji: "🥐",
    description:
      "French cuisine established the rules of Western fine dining. Beurre blanc, béarnaise, coq au vin, bouillabaisse, croque monsieur — and always, good bread. Technique is everything: the French cook with precision, season with patience, and rest with wine.",
    mealdbAreas: ["French"],
    searchTerm: "French",
  },
  {
    name: "Mix It Up",
    slug: "mix-it-up",
    emoji: "🎲",
    description:
      "A happy accident. Two cuisines, one plate — anything is possible when you let fate decide. Korean-Cajun, Italian-Ethiopian, Japanese-Mexican: some of the world's best fusion dishes started with someone just trying something unexpected and going with it.",
    mealdbAreas: [],
    searchTerm: "fusion cuisine",
  },
];

export function getCuisineBySlug(slug: string): Cuisine | undefined {
  return CUISINES.find((c) => c.slug === slug);
}
