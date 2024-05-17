// tailwind config is required for editor support

import type { Config } from "tailwindcss"
import sharedConfig from "@repo/tailwind-config"

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
  theme: {
    fontFamily: {
      sukhumvit: ["var(--sukhumvit-set-font)", "sans-serif"],
    },
    extend: {
      colors: {
        intania: "#5E1018",
        red: "#C22231",
        lightpink: "#FFF0F0",
        pink: "#E59DA4",
      },
      backgroundImage: {
        "gradient-red": "linear-gradient(180deg, #5E1018 0%, #C22231 100%)",
        "gradient-pink": "linear-gradient(180deg, #E59DA4 0%, #FFF0F0 100%)",
      },
      padding: {
        15: "3.75rem",
      },
    },
  },
}

export default config
