/**
 * API utilities for interacting with the dog adoption service
 * Handles authentication, dog searching, and location services
 */
import type {
  Dog,
  SearchParams,
  SearchResponse,
  LocationSearchResponse,
  Location,
  LocationSearchParams,
} from "../types"

const BASE_URL = "https://frontend-take-home-service.fetch.com"

const breedCache = new Map()

async function customFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  })
  if (response.status === 401) {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("authExpiration")
    localStorage.removeItem("userName")
    window.location.href = '/';
    throw new Error("Unauthorized, redirecting to Login!")
  }
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Request failed: ${response.status} ${errorText}`)
    
  }
  return response
}

export async function searchDogs(params: SearchParams | string): Promise<SearchResponse> {
  let url: string
  if (typeof params === "string") {
    url = params.startsWith(BASE_URL) ? params : `${BASE_URL}${params}`
  } else {
    const queryParams = new URLSearchParams()
    if (params.from) queryParams.set("from", params.from)
    if (params.size) queryParams.set("size", params.size.toString())
    if (params.ageMin !== undefined) queryParams.set("ageMin", params.ageMin.toString())
    if (params.ageMax !== undefined) queryParams.set("ageMax", params.ageMax.toString())

    if (params.breeds && params.breeds.length > 0) {
      params.breeds.forEach((breed) => queryParams.append("breeds", breed))
    }
    if (params.zipCodes && params.zipCodes.length > 0) {
      params.zipCodes.forEach((zipCode) => queryParams.append("zipCodes", zipCode))
    }
    if (params.sort) queryParams.set("sort", params.sort)
    url = `${BASE_URL}/dogs/search?${queryParams}`
  }

  const response = await customFetch(url)
  return response.json()
}

export async function fetchDogs(dogIds: string[]): Promise<Dog[]> {
  const response = await customFetch(`${BASE_URL}/dogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dogIds),
  })
  return response.json()
}

export async function getBreeds(): Promise<string[]> {
  if (breedCache.has("breeds")) {
    return breedCache.get("breeds")
  }
  try {
    const response = await fetch(`${BASE_URL}/dogs/breeds`, {
      credentials: "include",
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const breeds = await response.json()
    breedCache.set("breeds", breeds)
    return breeds
  } catch (error) {
    console.error("Failed to fetch breeds:", error)
    return []
  }
}

export async function searchLocations(params: LocationSearchParams): Promise<LocationSearchResponse> {
  const response = await customFetch(`${BASE_URL}/locations/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  return response.json()
}

export async function getLocationsByZipCodes(zipCodes: string[]): Promise<Location[]> {
  if (!zipCodes.length) return []

  const response = await customFetch(`${BASE_URL}/locations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(zipCodes),
  })
  return response.json()
}

export async function generateMatch(dogIds: string[]): Promise<string> {
  const response = await customFetch(`${BASE_URL}/dogs/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dogIds),
  })
  const { match } = await response.json()
  return match
}

export async function login(name: string, email: string): Promise<boolean> {
  await customFetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  })

  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("authExpiration", (Date.now() + 3600000).toString()) // 1 hour expiration
  localStorage.setItem("userName", name)
  localStorage.setItem("loginTimestamp", Date.now().toString())
  
  const response = await getBreeds()
  if (response.length == 0) {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("authExpiration")
    localStorage.removeItem("userName")
    return false
  }else{
    return true
  }
}

export async function logout(): Promise<void> {
  try {
    await customFetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
    })
  } catch (error) {
    console.error("Error during logout:", error)
  } finally {
    localStorage.clear()
  }
}

export function checkAuthStatus(): { isAuthenticated: boolean; userName: string | null } {
  try {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const authExpiration = localStorage.getItem("authExpiration")
    const userName = localStorage.getItem("userName")

    if (isAuthenticated && authExpiration) {
      if (Date.now() < Number(authExpiration)) {
        return { isAuthenticated: true, userName: userName }
      } else {
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("authExpiration")
        localStorage.removeItem("userName")
        localStorage.removeItem("favorites")
        localStorage.removeItem("searchFilters")
        localStorage.removeItem("selectedLocation")
      }
    }
  } catch (error) {
    console.error("Error checking auth status:", error)
  }

  return { isAuthenticated: false, userName: null }
}

