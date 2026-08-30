export type Region = {
  id: string
  name: string
  location: string
  pingMs: number
}

export const regions: Region[] = [
  { id: "us-east", name: "US East", location: "Virginia, USA", pingMs: 14 },
  { id: "us-west", name: "US West", location: "Oregon, USA", pingMs: 18 },
  { id: "eu-central", name: "EU Central", location: "Frankfurt, DE", pingMs: 9 },
  { id: "eu-west", name: "EU West", location: "London, UK", pingMs: 11 },
  { id: "eu-north", name: "EU North", location: "Stockholm, SE", pingMs: 15 },
  { id: "ap-south", name: "AP South", location: "Mumbai, IN", pingMs: 22 },
  { id: "ap-east", name: "AP East", location: "Tokyo, JP", pingMs: 19 },
  { id: "sa-east", name: "SA East", location: "São Paulo, BR", pingMs: 26 },
]

export function getRegion(id: string) {
  return regions.find((r) => r.id === id)
}
