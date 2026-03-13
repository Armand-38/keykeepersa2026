/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kkPrimary: "#2E4036",
        kkAccent: "#CC5833",
        kkCream: "#F2F0E9",
        kkDark: "#1A1A1A",
      },
      borderRadius: {
        "rounded-page": "2.75rem",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        drama: ["Cormorant Garamond", "Georgia", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        magnetic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
};
