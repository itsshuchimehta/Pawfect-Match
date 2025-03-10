"use client";

import { useEffect } from "react";

interface DynamicMetadataProps {
  title?: string;
  description?: string;
  image?: string;
}

const ROOT_METADATA = {
  title: "Pawfect Match",
  description: "Find your perfect furry friend and give them a forever home.",
  content: "default",
  ogTitle: "Pawfect Match",
  ogDescription: "Find your perfect furry friend and give them a forever home.",
  ogImage: "",
};

export default function DynamicMetadata({ title, description, image }: DynamicMetadataProps) {
  useEffect(() => {
    // Store current metadata
    const currentMetadata = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "",
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "",
    };

    // Update metadata (same as before)
    if (title) document.title = title;

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute("content", image);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:image");
        meta.content = image;
        document.head.appendChild(meta);
      }
    }

    if (title) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", title);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:title");
        meta.content = title;
        document.head.appendChild(meta);
      }
    }

    if (description) {
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute("content", description);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:description");
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    // Clean up next-size-adjust tags
    const cleanUpNextSizeAdjust = () => {
      const metaTags = document.querySelectorAll('meta[name="next-size-adjust"]');
      metaTags.forEach((tag) => {
        const content = tag.getAttribute("content");
        if (!content || content === "null" || content === "") {
          tag.remove(); // Remove if content is null, empty, or "null"
        }
      });

      // Ensure a valid next-size-adjust tag exists
      if (!document.querySelector('meta[name="next-size-adjust"][content]')) {
        const meta = document.createElement("meta");
        meta.name = "next-size-adjust";
        meta.content = "default";
        document.head.appendChild(meta);
      }
    };

    cleanUpNextSizeAdjust();

    // Watch for dynamic injections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          cleanUpNextSizeAdjust();
        }
      });
    });

    const head = document.querySelector("head");
    if (head) {
      observer.observe(head, { childList: true, subtree: true });
    }

    // Cleanup on unmount
    return () => {
      document.title = ROOT_METADATA.title;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", ROOT_METADATA.description);
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && ROOT_METADATA.ogImage) {
        ogImage.setAttribute("content", ROOT_METADATA.ogImage);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", ROOT_METADATA.ogTitle);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute("content", ROOT_METADATA.ogDescription);
      }

      cleanUpNextSizeAdjust();
      observer.disconnect();
    };
  }, [title, description, image]);

  return null;
}