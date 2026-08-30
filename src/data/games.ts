export type GameGenre =
  | "Action"
  | "RPG"
  | "Shooter"
  | "Racing"
  | "Strategy"
  | "Adventure"
  | "Indie"
  | "Simulation"
  | "Sports"

export type GameRequirements = {
  os: string
  cpu: string
  gpu: string
  ram: string
  storage: string
}

export type Game = {
  slug: string
  title: string
  developer: string
  releaseYear: number
  genres: GameGenre[]
  rating: number
  description: string
  multiplayer: boolean
  featured?: boolean
  isNew?: boolean
  steamAppId: number
  cover: { from: string; to: string }
  requirements: GameRequirements
}

const recommended: GameRequirements = {
  os: "Windows 10 64-bit",
  cpu: "Quad-core 3.2 GHz",
  gpu: "GTX 1070 class",
  ram: "16 GB",
  storage: "60 GB",
}

const highEnd: GameRequirements = {
  os: "Windows 11 64-bit",
  cpu: "Octa-core 3.8 GHz",
  gpu: "RTX 3080 class",
  ram: "32 GB",
  storage: "120 GB",
}

const midTier: GameRequirements = {
  os: "Windows 10 64-bit",
  cpu: "Hexa-core 3.4 GHz",
  gpu: "RTX 2060 class",
  ram: "16 GB",
  storage: "75 GB",
}

export const games: Game[] = [
  {
    slug: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    developer: "CD Projekt Red",
    releaseYear: 2020,
    genres: ["RPG", "Action"],
    rating: 86,
    description:
      "Night City: a megalopolis obsessed with power, glamour and body modification. Play V, a mercenary outlaw chasing a one-of-a-kind implant — the key to immortality.",
    multiplayer: false,
    featured: true,
    steamAppId: 1091500,
    cover: { from: "#facc15", to: "#0c2340" },
    requirements: highEnd,
  },
  {
    slug: "elden-ring",
    title: "Elden Ring",
    developer: "FromSoftware",
    releaseYear: 2022,
    genres: ["RPG", "Adventure"],
    rating: 94,
    description:
      "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring in the Lands Between. A vast fantasy world of peril and wonder from Hidetaka Miyazaki and George R. R. Martin.",
    multiplayer: true,
    featured: true,
    steamAppId: 1245620,
    cover: { from: "#d4af37", to: "#17130b" },
    requirements: recommended,
  },
  {
    slug: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    developer: "Larian Studios",
    releaseYear: 2023,
    genres: ["RPG"],
    rating: 96,
    description:
      "Gather your party and return to the Forgotten Realms in a story of fellowship, betrayal and untold power. Your choices shape the fate of the Sword Coast — online or at the table.",
    multiplayer: true,
    featured: true,
    steamAppId: 1086940,
    cover: { from: "#b91c1c", to: "#1c1917" },
    requirements: highEnd,
  },
  {
    slug: "counter-strike-2",
    title: "Counter-Strike 2",
    developer: "Valve",
    releaseYear: 2023,
    genres: ["Shooter", "Action"],
    rating: 83,
    description:
      "The largest technical leap in Counter-Strike history: sub-tick updates, rebuilt maps and a new volumetric smoke. The world's premier competitive shooter, free for everyone.",
    multiplayer: true,
    featured: true,
    steamAppId: 730,
    cover: { from: "#f97316", to: "#0f172a" },
    requirements: midTier,
  },
  {
    slug: "forza-horizon-5",
    title: "Forza Horizon 5",
    developer: "Playground Games",
    releaseYear: 2021,
    genres: ["Racing", "Sports"],
    rating: 92,
    description:
      "Lead breathtaking expeditions across Mexico's living deserts, jungles and cities in the world's greatest open-world racing festival.",
    multiplayer: true,
    featured: true,
    steamAppId: 1551360,
    cover: { from: "#fb7185", to: "#7c2d12" },
    requirements: highEnd,
  },
  {
    slug: "helldivers-2",
    title: "Helldivers 2",
    developer: "Arrowhead Game Studios",
    releaseYear: 2024,
    genres: ["Shooter", "Action"],
    rating: 82,
    description:
      "Join the fight for freedom in a galactic war where teamwork, stratagems and friendly fire all come standard. Managed democracy needs you, Helldiver.",
    multiplayer: true,
    featured: true,
    isNew: true,
    steamAppId: 553850,
    cover: { from: "#facc15", to: "#18181b" },
    requirements: midTier,
  },
  {
    slug: "doom-eternal",
    title: "DOOM Eternal",
    developer: "id Software",
    releaseYear: 2020,
    genres: ["Shooter", "Action"],
    rating: 88,
    description:
      "Hell's armies have invaded Earth. Become the Slayer and rip and tear with an arsenal of outrageous weaponry in the award-winning single-player campaign.",
    multiplayer: true,
    steamAppId: 782330,
    cover: { from: "#ef4444", to: "#450a0a" },
    requirements: recommended,
  },
  {
    slug: "hades",
    title: "Hades",
    developer: "Supergiant Games",
    releaseYear: 2020,
    genres: ["Indie", "RPG"],
    rating: 93,
    description:
      "Defy the god of the dead in an award-winning rogue-like dungeon crawler where death is only the beginning. Battle out of Hell again and again, growing stronger with every escape.",
    multiplayer: false,
    steamAppId: 1145360,
    cover: { from: "#dc2626", to: "#312e81" },
    requirements: midTier,
  },
  {
    slug: "hollow-knight",
    title: "Hollow Knight",
    developer: "Team Cherry",
    releaseYear: 2017,
    genres: ["Indie", "Adventure"],
    rating: 90,
    description:
      "Forge your own path in a vast ruined kingdom of insects and heroes. Explore twisting caverns, ancient cities and deadly wastes in this haunting hand-drawn epic.",
    multiplayer: false,
    steamAppId: 367520,
    cover: { from: "#38bdf8", to: "#0c4a6e" },
    requirements: midTier,
  },
  {
    slug: "stardew-valley",
    title: "Stardew Valley",
    developer: "ConcernedApe",
    releaseYear: 2016,
    genres: ["Indie", "Simulation"],
    rating: 89,
    description:
      "Inherit your grandfather's old farm plot and build the life you always wanted. Farm, fish, mine, brew — or settle down and start a family, alone or with friends.",
    multiplayer: true,
    steamAppId: 413150,
    cover: { from: "#22c55e", to: "#365314" },
    requirements: recommended,
  },
  {
    slug: "civilization-vi",
    title: "Sid Meier's Civilization VI",
    developer: "Firaxis Games",
    releaseYear: 2016,
    genres: ["Strategy", "Simulation"],
    rating: 88,
    description:
      "Build an empire to stand the test of time. Expand across the map, advance your culture and compete against history's greatest leaders in the definitive 4X strategy game.",
    multiplayer: true,
    steamAppId: 289070,
    cover: { from: "#d97706", to: "#431407" },
    requirements: recommended,
  },
  {
    slug: "total-war-warhammer-3",
    title: "Total War: WARHAMMER III",
    developer: "Creative Assembly",
    releaseYear: 2022,
    genres: ["Strategy"],
    rating: 86,
    description:
      "Command colossal armies across the Realm of Chaos in a grand campaign of conquest and cataclysm. The cataclysmic finale to the Total War: WARHAMMER trilogy.",
    multiplayer: true,
    steamAppId: 1142710,
    cover: { from: "#b91c1c", to: "#0c0a09" },
    requirements: highEnd,
  },
  {
    slug: "it-takes-two",
    title: "It Takes Two",
    developer: "Hazelight Studios",
    releaseYear: 2021,
    genres: ["Adventure", "Action"],
    rating: 88,
    description:
      "Embark on the wildest co-op adventure of your life as Cody and May, a couple turned into dolls by a magic spell. Winner of Game of the Year 2021 — strictly two players.",
    multiplayer: true,
    steamAppId: 1426210,
    cover: { from: "#f472b6", to: "#312e81" },
    requirements: recommended,
  },
  {
    slug: "red-dead-redemption-2",
    title: "Red Dead Redemption 2",
    developer: "Rockstar Games",
    releaseYear: 2019,
    genres: ["Action", "Adventure"],
    rating: 93,
    description:
      "America, 1899. Arthur Morgan and the Van der Linde gang are on the run in a sprawling, unforgiving open world — the highest-rated game of its generation.",
    multiplayer: true,
    steamAppId: 1174180,
    cover: { from: "#ea580c", to: "#1c1917" },
    requirements: highEnd,
  },
  {
    slug: "black-myth-wukong",
    title: "Black Myth: Wukong",
    developer: "Game Science",
    releaseYear: 2024,
    genres: ["Action", "RPG"],
    rating: 81,
    description:
      "Play the Destined One in this action RPG rooted in Chinese mythology. Confront legends and rivals across a gorgeously brutal journey to the West.",
    multiplayer: false,
    isNew: true,
    steamAppId: 2358720,
    cover: { from: "#f59e0b", to: "#292524" },
    requirements: highEnd,
  },
  {
    slug: "monster-hunter-wilds",
    title: "Monster Hunter Wilds",
    developer: "Capcom",
    releaseYear: 2025,
    genres: ["Action", "Adventure"],
    rating: 85,
    description:
      "Hunt ferocious beasts in dynamic, ever-changing wildernesses solo or with your squad. The newest generation of the genre-defining hunting action series.",
    multiplayer: true,
    isNew: true,
    steamAppId: 2246340,
    cover: { from: "#ea580c", to: "#052e16" },
    requirements: highEnd,
  },
]

export const genres: GameGenre[] = [
  "Action",
  "RPG",
  "Shooter",
  "Racing",
  "Strategy",
  "Adventure",
  "Indie",
  "Simulation",
  "Sports",
]

export function gameImage(game: Game) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamAppId}/library_600x900.jpg`
}

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug)
}

export function featuredGames() {
  return games.filter((g) => g.featured)
}

export function relatedGames(game: Game, count = 4) {
  return games
    .filter(
      (g) => g.slug !== game.slug && g.genres.some((x) => game.genres.includes(x))
    )
    .slice(0, count)
}
