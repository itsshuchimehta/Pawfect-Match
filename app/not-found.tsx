import type { Metadata } from "next";
import NotFoundClient from "./NotFoundClient"; 

// Define metadata for the 404 page
export const metadata: Metadata = {
  title: "Page Not Found | Pawfect Match",
  description:
    "Oops! The page you're looking for can't be found on Pawfect Match. Don't worry, we'll help you get back to finding your perfect furry companion.",
  openGraph: {
    title: "Page Not Found | Pawfect Match",
    description:
      "Oops! The page you're looking for can't be found on Pawfect Match. Don't worry, we'll help you get back to finding your perfect furry companion.",
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}