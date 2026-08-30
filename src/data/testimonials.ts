export type Testimonial = {
  name: string
  handle: string
  quote: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Mara Voss",
    handle: "@maraplays",
    quote:
      "I sold my gaming PC three months after subscribing. Playing Cyberpunk with everything maxed on a five-year-old laptop still feels like cheating.",
    initials: "MV",
  },
  {
    name: "Deniz Aksoy",
    handle: "@denizgg",
    quote:
      "Nine milliseconds to Frankfurt. My friends with local rigs still get in the Counter-Strike lobby after I do. The tech is genuinely witchcraft.",
    initials: "DA",
  },
  {
    name: "Priya Nair",
    handle: "@priya.gg",
    quote:
      "The library alone pays for Pro — I've finished eleven included games this year and my Elden Ring save followed me from phone to TV mid-playthrough.",
    initials: "PN",
  },
  {
    name: "Jonas Berg",
    handle: "@bergstorm",
    quote:
      "Set it up on the hotel TV, paired a controller, was racing through Forza Horizon 5's Mexico within two minutes. This is what gaming should have always been.",
    initials: "JB",
  },
]
