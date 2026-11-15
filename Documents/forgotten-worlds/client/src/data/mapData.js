// Marker positions for the 3D globes. Longitudes are east-positive, latitudes north-positive.
// `approx: true` means the position is placed roughly on the globe.
export const worlds = {
  Moon: {
    title: "The Moon",
    model: "/models/moon.glb",
    rotY: 0,
    note: "3D globe from NASA 3D Resources. Markers sit at each landing site's real latitude and longitude on a sphere; the model's surface texture is not georeferenced, so treat positions as approximate.",
    markers: [
      { machine: "apollo-lm-descent-stage", label: "Tranquility Base (Apollo 11)", lat: 0.69, lon: 23.43, approx: false },
      { machine: "lunar-roving-vehicle", label: "Apollo 15 rover (Hadley-Apennine)", lat: 26.1, lon: 3.6, approx: true },
      { machine: "lunar-roving-vehicle", label: "Apollo 16 rover (Descartes)", lat: -9.0, lon: 15.5, approx: true },
      { machine: "lunar-roving-vehicle", label: "Apollo 17 rover (Taurus-Littrow)", lat: 20.2, lon: 30.8, approx: true }
    ]
  },
  Mars: {
    title: "Mars",
    model: "/models/mars.glb",
    rotY: 0,
    note: "3D globe from NASA 3D Resources. Markers sit at each landing site's real latitude and longitude on a sphere; the model's surface texture is not georeferenced, so treat positions as approximate.",
    markers: [
      { machine: "sojourner", label: "Sojourner / Pathfinder (Ares Vallis)", lat: 19.13, lon: -33.22, approx: false },
      { machine: "spirit", label: "Spirit (Gusev Crater)", lat: -14.57, lon: 175.47, approx: false },
      { machine: "opportunity", label: "Opportunity (Meridiani Planum)", lat: -1.95, lon: -5.53, approx: false },
      { machine: "ingenuity", label: "Ingenuity (Jezero Crater)", lat: 18.4, lon: 77.5, approx: true }
    ]
  }
};
