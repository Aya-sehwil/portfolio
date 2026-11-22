/** Palette lives here – change a value and the whole site follows. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF9F6",   // page background
        sand: "#EFEAE0",    // warm beige surfaces
        line: "#E4DFD5",    // warm gray borders
        ink: "#1F2937",     // soft charcoal text
        mute: "#6B7280",    // secondary text
        sage: "#8FA595",    // primary accent
        slate: "#64748B",   // secondary accent
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"] },
      boxShadow: { soft: "0 20px 50px -20px rgba(31,41,55,.18)" },
    },
  },
  plugins: [],
};
