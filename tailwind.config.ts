import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#000000",
        },
        secondary: {
          400: "#FFFFFF",
        },
        accent: {
          400: "#eaebec99",
        },
        grey: {
          200: "#f3f3f4",
          250: "#e4e7eb",
          300: "#737882c9",
          400: "#9ba3af",
          500: "#6A7280",
        },
      },
      fontSize: {
        tiny: "0.625rem", // 10px
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "4rem", // 64px
        "7xl": "5rem", // 80px
      },
      screens: {
        tanasobe: "360px",
        vsm: "480px", // Default
        sm: "640px", // Default
        md: "768px", // Default
        lg: "1024px", // Default
        xl: "1280px", // Default
        "2xl": "1536px", // Default
        "3xl": "1800px", // Default
        "4xl": "2300px", // Default
        // Custom breakpoints
        tablet: "640px", // Custom tablet breakpoint
        desktop: "1024px", // Custom desktop breakpoint
        widescreen: "1440px", // Custom widescreen breakpoint
      },
      backgroundImage: {
        "custom-radial": "radial-gradient(#0000006c 1px, #fff 0)",
      },

      boxShadow: {
        customsm: [
          "var(--tw-ring-offset-shadow, 0 0 #0000)",
          "var(--tw-ring-shadow, 0 0 #0000)",
          "var(--tw-shadow)",
        ].join(", "),
        custom: "4px 3.5px 0px 0px #000", // Custom shadow using black
        "custom-colored": "4px 3.5px 0px 0px var(--tw-shadow-color)", // If you need a colored shadow
        shadowlg:
          "0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)",
        "shadowlg-colored":
          "--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [],
};
export default config;
