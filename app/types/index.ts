export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
  city?: string
  state?: string
}

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

export interface Coordinates {
  lat: number
  lon: number
}

export interface SearchParams {
  breeds?: string[]
  zipCodes?: string[]
  ageMin?: number
  ageMax?: number
  size?: number
  from?: string
  sort?: string
}

export interface SearchResponse {
  resultIds: string[]
  total: number
  next?: string
  prev?: string
}

export interface LocationSearchParams {
  city?: string
  states?: string[]
  geoBoundingBox?: {
    top?: Coordinates
    left?: Coordinates
    bottom?: Coordinates
    right?: Coordinates
    bottom_left?: Coordinates
    top_right?: Coordinates
    bottom_right?: Coordinates
    top_left?: Coordinates
  }
  size?: number
  from?: number
}

export interface LocationSearchResponse {
  results: Location[]
  total: number
}

export interface LocationSearchResult {
  zipCodes: string[]
  displayName: string
}

