import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const categories =  [
            {
                "id": "682ad898260c87a04ec81ca9",
                "name": "Technology"
            },
            {
                "id": "68a5dcb1dd8054e6b5e1a934",
                "name": "Food"
            },
            {
                "id": "68a5dcdfdd8054e6b5e1a936",
                "name": "Automobile"
            },
            {
                "id": "68a5dcebdd8054e6b5e1a938",
                "name": "Space"
            },
            {
                "id": "68a5dd28dd8054e6b5e1a93c",
                "name": "AI"
            }
        ]