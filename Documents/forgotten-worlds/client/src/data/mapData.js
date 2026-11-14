// Marker positions for the illustrated maps. Longitudes are east-positive, latitudes north-positive.
// `approx: true` means the position is shown approximately on a simplified illustration.
export const worlds = {
  Moon: {
    title: "The Moon",
    note: "Illustrated, simplified map. Positions are approximate.",
    markers: [
      { machine: "apollo-lm-descent-stage", label: "Tranquility Base (Apollo 11)", lat: 0.69, lon: 23.43, approx: false },
      { machine: "lunar-roving-vehicle", label: "Apollo 15 rover (Hadley-Apennine)", lat: 26.1, lon: 3.6, approx: true },
      { machine: "lunar-roving-vehicle", label: "Apollo 16 rover (Descartes)", lat: -9.0, lon: 15.5, approx: true },
      { machine: "lunar-roving-vehicle", label: "Apollo 17 rover (Taurus-Littrow)", lat: 20.2, lon: 30.8, approx: true }
    ]
  },
  Mars: {
    title: "Mars",
    note: "Illustrated, simplified map. Positions are approximate.",
    markers: [
      { machine: "sojourner", label: "Sojourner / Pathfinder (Ares Vallis)", lat: 19.13, lon: -33.22, approx: false },
      { machine: "spirit", label: "Spirit (Gusev Crater)", lat: -14.57, lon: 175.47, approx: false },
      { machine: "opportunity", label: "Opportunity (Meridiani Planum)", lat: -1.95, lon: -5.53, approx: false },
      { machine: "ingenuity", label: "Ingenuity (Jezero Crater)", lat: 18.4, lon: 77.5, approx: true }
    ]
  }
};
