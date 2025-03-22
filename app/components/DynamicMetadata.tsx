/**
 * Component for dynamically updating page metadata
 * Handles title, description, and Open Graph tags
 * Restores original metadata on unmount
 */
"use client"

import { useEffect } from "react"

interface DynamicMetadataProps {
  title?: string
  description?: string
  image?: string
}

// Define the original metadata from layout.tsx
const ROOT_METADATA = {
  title: "Pawfect Match",
  description: "Find your perfect furry friend and give them a forever home.",
  ogTitle: "Pawfect Match",
  ogDescription: "Find your perfect furry friend and give them a forever home.",
  ogImage: "",
}

export default function DynamicMetadata({ title, description, image }: DynamicMetadataProps) {
 
  useEffect(() => {
    // Store the current metadata before changing it
    const currentMetadata = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "",
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "",
    }
    // Update metadata
    if (title) {
      document.title = title
    }
    
    
    const modifiedElements: HTMLMetaElement[] = []

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription instanceof HTMLMetaElement) {
        metaDescription.setAttribute("content", description)
        modifiedElements.push(metaDescription)
      } else {
        const meta = document.createElement("meta")
        meta.name = "description"
        meta.content = description
        document.head.appendChild(meta)
        modifiedElements.push(meta)
      }
    }

    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage instanceof HTMLMetaElement) {
        ogImage.setAttribute("content", image)
        modifiedElements.push(ogImage)
      } else {
        const meta = document.createElement("meta")
        meta.setAttribute("property", "og:image")
        meta.content = image
        document.head.appendChild(meta)
        modifiedElements.push(meta)
      }
    }
    if (title) {
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle instanceof HTMLMetaElement) {
        ogTitle.setAttribute("content", title)
        modifiedElements.push(ogTitle)
      } else {
        const meta = document.createElement("meta")
        meta.setAttribute("property", "og:title")
        meta.content = title
        document.head.appendChild(meta)
        modifiedElements.push(meta)
      }
    }

    if (description) {
      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription instanceof HTMLMetaElement) {
        ogDescription.setAttribute("content", description)
        modifiedElements.push(ogDescription)
      } else {
        const meta = document.createElement("meta")
        meta.setAttribute("property", "og:description")
        meta.content = description
        document.head.appendChild(meta)
        modifiedElements.push(meta)
      }
    }

    // Cleanup function to restore original metadata when component unmounts
    return () => {
      document.title = ROOT_METADATA.title
      modifiedElements.forEach((element) => {
        try {
          if (element && element.parentNode) {
            if (element.getAttribute("name") === "description") {
              element.setAttribute("content", ROOT_METADATA.description)
            } else if (element.getAttribute("property") === "og:image" && ROOT_METADATA.ogImage) {
              element.setAttribute("content", ROOT_METADATA.ogImage)
            } else if (element.getAttribute("property") === "og:title") {
              element.setAttribute("content", ROOT_METADATA.ogTitle)
            } else if (element.getAttribute("property") === "og:description") {
              element.setAttribute("content", ROOT_METADATA.ogDescription)
            }
          }
        } catch (e) {
          console.error("Error cleaning up meta tag:", e)
        }
      })
    }
  }, [title, description, image])

  return null
}