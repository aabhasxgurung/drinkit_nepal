type Difficulty = "Easy" | "Medium" | "Advanced";
export interface CocktailDataProps {
  id: string;
  title: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  difficulty: Difficulty;
  category: string;
  base: string;
}

export const cocktailsData: CocktailDataProps[] = [
  {
    id: "1",
    title: "Himalyan Negroni",
    name: "Negroni",
    description: "A timeless cocktail made with Gin, and sugar.",
    ingredients: [
      "2 oz Bourbon or Rye Whiskey",
      "1 Sugar Cube",
      "2-3 dashes Angostura Bitters",
      "Orange Peel for garnish",
      "Ice Cubes",
    ],
    instructions: [
      "Place a sugar cube in an Old Fashioned glass",
      "Add 2-3 dashes of Angostura bitters onto the sugar cube",
      "Add a small splash of water and muddle until the sugar is dissolved",
      "Add ice cubes to the glass",
      "Pour bourbon or rye whiskey over the ice",
      "Gently stir to combine",
      "Garnish with an orange peel, expressing the oils over the drink before adding",
    ],
    imageUrl: "/sula/featuredHapusa.jpg",
    difficulty: "Easy",
    category: "Classic",
    base: "Whiskey",
  },
  {
    id: "2",
    title: "Apricot Smash",
    name: "Negroni",
    description: "A timeless cocktail made with Gin, and sugar.",
    ingredients: [
      "2 oz Bourbon or Rye Whiskey",
      "1 Sugar Cube",
      "2-3 dashes Angostura Bitters",
      "Orange Peel for garnish",
      "Ice Cubes",
    ],
    instructions: [
      "Place a sugar cube in an Old Fashioned glass",
      "Add 2-3 dashes of Angostura bitters onto the sugar cube",
      "Add a small splash of water and muddle until the sugar is dissolved",
      "Add ice cubes to the glass",
      "Pour bourbon or rye whiskey over the ice",
      "Gently stir to combine",
      "Garnish with an orange peel, expressing the oils over the drink before adding",
    ],
    imageUrl: "/cocktails/apricot-smash.jpg",
    difficulty: "Easy",
    category: "Classic",
    base: "Whiskey",
  },
  {
    id: "3",
    title: "Himalyan Gimlet",
    name: "Negroni",
    description: "A timeless cocktail made with Gin, and sugar.",
    ingredients: [
      "2 oz Bourbon or Rye Whiskey",
      "1 Sugar Cube",
      "2-3 dashes Angostura Bitters",
      "Orange Peel for garnish",
      "Ice Cubes",
    ],
    instructions: [
      "Place a sugar cube in an Old Fashioned glass",
      "Add 2-3 dashes of Angostura bitters onto the sugar cube",
      "Add a small splash of water and muddle until the sugar is dissolved",
      "Add ice cubes to the glass",
      "Pour bourbon or rye whiskey over the ice",
      "Gently stir to combine",
      "Garnish with an orange peel, expressing the oils over the drink before adding",
    ],
    imageUrl: "/sula/featuredHapusa.jpg",
    difficulty: "Easy",
    category: "Classic",
    base: "Whiskey",
  },
  {
    id: "4",
    title: "NY Sour",
    name: "Negroni",
    description: "A timeless cocktail made with Gin, and sugar.",
    ingredients: [
      "2 oz Bourbon or Rye Whiskey",
      "1 Sugar Cube",
      "2-3 dashes Angostura Bitters",
      "Orange Peel for garnish",
      "Ice Cubes",
    ],
    instructions: [
      "Place a sugar cube in an Old Fashioned glass",
      "Add 2-3 dashes of Angostura bitters onto the sugar cube",
      "Add a small splash of water and muddle until the sugar is dissolved",
      "Add ice cubes to the glass",
      "Pour bourbon or rye whiskey over the ice",
      "Gently stir to combine",
      "Garnish with an orange peel, expressing the oils over the drink before adding",
    ],
    imageUrl: "/sula/featuredHapusa.jpg",
    difficulty: "Easy",
    category: "Classic",
    base: "Whiskey",
  },
  {
    id: "5",
    title: "",
    name: "Negroni",
    description: "A timeless cocktail made with Gin, and sugar.",
    ingredients: [
      "2 oz Bourbon or Rye Whiskey",
      "1 Sugar Cube",
      "2-3 dashes Angostura Bitters",
      "Orange Peel for garnish",
      "Ice Cubes",
    ],
    instructions: [
      "Place a sugar cube in an Old Fashioned glass",
      "Add 2-3 dashes of Angostura bitters onto the sugar cube",
      "Add a small splash of water and muddle until the sugar is dissolved",
      "Add ice cubes to the glass",
      "Pour bourbon or rye whiskey over the ice",
      "Gently stir to combine",
      "Garnish with an orange peel, expressing the oils over the drink before adding",
    ],
    imageUrl: "/sula/featuredHapusa.jpg",
    difficulty: "Easy",
    category: "Classic",
    base: "Whiskey",
  },
];
