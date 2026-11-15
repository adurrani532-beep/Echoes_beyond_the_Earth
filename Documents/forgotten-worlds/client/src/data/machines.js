// Echoes Beyond the Earth - machine data
// Every fact below was checked against the sources listed in each entry's `sources`.
// `verify` lists items that still need a primary NASA page before publishing.
// Photo captions for Spirit, Opportunity, Dawn and the rover family were written from the
// picture content. Replace the credit with the exact NASA image ID when you have it.
// Add photos from https://images.nasa.gov/ to client/public/images and set imageUrl + imageCredit.

export const machines = [
  {
    id: "apollo-lm-descent-stage",
    name: "Apollo 11 Lunar Module Eagle: Descent Stage",
    destination: "Moon",
    type: "Crewed lander (descent stage)",
    location: "Tranquility Base, Mare Tranquillitatis (southwest corner)",
    coordinates: { lat: 0.6875, lon: 23.43333, label: "approximate site coordinates" },
    launchDate: "1969-07-16",
    arrivalDate: "1969-07-20",
    status: "Left on the lunar surface at Tranquility Base. Eagle's ascent stage was abandoned in lunar orbit and its current location is unknown.",
    hook: "The launch pad that stayed behind.",
    story: {
      why: "Apollo 11 was the first mission to land humans on the Moon. The lunar module had two parts: a descent stage with the engine to slow the landing, and an ascent stage to carry the crew back up.",
      journey: "Armstrong and Aldrin landed Eagle on July 20, 1969 and radioed 'Houston, Tranquility Base here. The Eagle has landed.'",
      did: "After a stay of about 21 hours, the ascent stage engine fired and lifted the crew off the Moon, using the descent stage as a launch pad.",
      afterward: "The descent stage stayed where it landed. NASA's Lunar Reconnaissance Orbiter photographed it in 2012 together with a laser retroreflector and the experiment package.",
      legacy: "It marks the exact spot of humanity's first landing on another world."
    },
    timeline: [
      { date: "1969-07-16", event: "Apollo 11 launches on a Saturn V from Kennedy Space Center" },
      { date: "1969-07-20", event: "Eagle lands at Tranquility Base" },
      { date: "1969-07-21", event: "Ascent stage lifts off, using the descent stage as a launch pad" },
      { date: "2012-03-07", event: "LRO photographs the descent stage, retroreflector and experiment package" }
    ],
    verify: [
      "Exact landing time (one source gives 20:17:40 UTC) - confirm on a NASA Apollo 11 page",
      "Final fate of the ascent stage - sources disagree; present as 'unknown'"
    ],
    sources: [
      { title: "NASA: 50 Years Ago, Apollo 11 - The Journey Home", url: "https://www.nasa.gov/history/50-years-ago-apollo-11-the-journey-home" },
      { title: "Smithsonian NASM: Apollo 11 Lunar Module", url: "https://airandspace.si.edu/amp-stories/lunar-module" },
      { title: "Tranquility Base (coordinates, LRO image)", url: "https://en.wikipedia.org/wiki/Tranquility_Base" }
    ],
    poster: "/posters/apollo-lm-descent-stage.png",
    model: { type: "glb", src: "/models/apollo-lm.glb", credit: "NASA 3D Resources (Apollo Lunar Module)", size: 2.8 }
  },
  {
    id: "lunar-roving-vehicle",
    name: "Lunar Roving Vehicle (Moon Buggy)",
    destination: "Moon",
    type: "Electric crewed rover",
    location: "Apollo 15, 16 and 17 landing sites (one rover at each)",
    coordinates: null,
    launchDate: "1971-07-26 (Apollo 15, first use)",
    arrivalDate: "1971-07-31 (first drive)",
    status: "All three rovers that flew were left on the Moon's surface.",
    hook: "The first wheeled vehicle driven on another world.",
    story: {
      why: "Astronauts on foot could only go a short walk from their lander. A rover let them reach more distant sites and bring back more samples.",
      journey: "The rover was folded up and carried to the Moon on Apollo 15, 16 and 17. It was developed in only 17 months, and it was built by Boeing with General Motors.",
      did: "Apollo 15's rover drove 27.8 km, Apollo 16's 26.7 km and Apollo 17's 35.9 km (per NSSDC).",
      afterward: "At the end of each mission the rover was parked and left behind. Apollo 15's rover carried a TV camera that filmed the first lunar liftoff.",
      legacy: "Apollo 17's Harrison Schmitt said the major discoveries of Apollo 15, 16 and 17 would not have been possible without it."
    },
    timeline: [
      { date: "1971-03-15", event: "First flight-ready rover delivered to NASA" },
      { date: "1971-07-31", event: "Apollo 15: first drive on the Moon (David Scott)" },
      { date: "1972-04", event: "Apollo 16 rover used" },
      { date: "1972-12", event: "Apollo 17 rover drives the longest total distance (35.9 km)" }
    ],
    verify: [
      "Combined distance: sources give 56.2 mi and 57.5 mi - use per-mission NSSDC figures instead",
      "Exact Apollo 16/17 dates - confirm on NASA pages",
      "Delivery date (March 15, 1971) is from PopSci, not NASA - confirm"
    ],
    sources: [
      { title: "NSSDC: The Apollo Lunar Roving Vehicle", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html" },
      { title: "NASA: First Apollo astronauts to drive on the Moon took final cruise", url: "https://www.nasa.gov/history/50-years-ago-first-apollo-astronauts-to-drive-on-the-moon-took-final-cruise" },
      { title: "US National Archives: Apollo 15 and the Lunar Roving Vehicle", url: "https://visit.archives.gov/whats-on/explore-exhibits/50th-anniversary-apollo-15-and-lunar-roving-vehicle" }
    ],
    imageUrl: "/images/as15-88-11901.jpg",
    imageCredit: "NASA (Apollo 15, AS15-88-11901)",
    gallery: [
      { src: "/images/as15-88-11901.jpg", caption: "A Lunar Roving Vehicle parked on the Moon (AS15-88-11901).", credit: "NASA" },
      { src: "/images/as16-107-17436.jpg", caption: "Lunar module and Lunar Roving Vehicle at an Apollo landing site (AS16-107-17436).", credit: "NASA" },
      { src: "/images/as17-134-20476.jpg", caption: "An astronaut at the Lunar Roving Vehicle during Apollo 17 (AS17-134-20476).", credit: "NASA" }
    ]
  },
  {
    id: "sojourner",
    name: "Sojourner Rover",
    destination: "Mars",
    type: "Robotic rover (Mars Pathfinder)",
    location: "Ares Vallis, Chryse Planitia",
    coordinates: { lat: 19.13, lon: -33.22, label: "approximate" },
    launchDate: "1996-12-04",
    arrivalDate: "1997-07-04",
    status: "Silent on Mars. Pathfinder's final data transmission was Sept. 27, 1997; NASA ended recovery efforts on March 10, 1998.",
    hook: "The first rover to roll on Mars.",
    story: {
      why: "Pathfinder was designed to show a new, low-cost way to land safely on Mars and to deliver the first rover to the surface.",
      journey: "Launched Dec. 4, 1996 on a Delta II, it landed July 4, 1997 using a heat shield, a parachute and rockets.",
      did: "Sojourner covered about 100 m (330 ft) over roughly 83 sols, studying rocks and soil near the lander.",
      afterward: "Sojourner talked to Earth through the Pathfinder base station, which sent its last transmission on Sept. 27, 1997. NASA tried for five more months before calling the mission complete.",
      legacy: "Pathfinder and Sojourner were designed to last about 30 days but worked about three times as long, and paved the way for Spirit, Opportunity and Curiosity."
    },
    timeline: [
      { date: "1996-12-04", event: "Mars Pathfinder launches" },
      { date: "1997-07-04", event: "Landing at Ares Vallis" },
      { date: "1997-09-27", event: "Final data transmission from Pathfinder" },
      { date: "1998-03-10", event: "NASA ends the mission" }
    ],
    verify: [
      "Sojourner mass (10.6 kg) and drive distance - confirm on NASA Pathfinder page",
      "Wikipedia says the last rover signal was Oct. 7, 1997 - confirm before using"
    ],
    sources: [
      { title: "NASA Science: Mars Pathfinder", url: "https://science.nasa.gov/mission/mars-pathfinder" },
      { title: "NASA: NASA's First Rover on the Red Planet", url: "https://www.nasa.gov/?p=429872" },
      { title: "Space.com: Sojourner, the first successful Mars rover", url: "https://www.space.com/17745-mars-pathfinder-sojourner-rover.html" }
    ],
    imageUrl: "/images/pia01122.jpg",
    imageCredit: "NASA/JPL (PIA01122)",
    gallery: [
      { src: "/images/pia01122.jpg", caption: "Sojourner on the surface of Mars (PIA01122).", credit: "NASA/JPL" },
      { src: "/images/pia00632.jpg", caption: "The Pathfinder lander deck and surroundings, where Sojourner began its drive (PIA00632).", credit: "NASA/JPL" },
      { src: "/images/pia00664.jpg", caption: "A view of the Pathfinder landing site with airbags (PIA00664).", credit: "NASA/JPL" },
      { src: "/images/pia00968.jpg", caption: "Sojourner among Martian rocks (PIA00968).", credit: "NASA/JPL" },
      { src: "/images/rover-family.jpg", caption: "Test models of three Mars rovers: a Mars Exploration Rover (left), Sojourner (small, centre) and Curiosity (right).", credit: "NASA/JPL (exact image ID to confirm)" }
    ]
  },
  {
    id: "spirit",
    name: "Spirit Rover",
    destination: "Mars",
    type: "Robotic rover (Mars Exploration Rover A)",
    location: "'Troy', west side of Home Plate, Gusev Crater",
    coordinates: null,
    launchDate: "2003-06-10",
    arrivalDate: "2004-01-04 (UTC)",
    status: "Stuck in soft soil from 2009. Last contact March 22, 2010; NASA ended recovery attempts May 25, 2011.",
    hook: "The rover that kept working while stuck.",
    story: {
      why: "Gusev Crater was suspected to be an ancient lakebed. Spirit was sent to study rocks and soil for evidence of past water.",
      journey: "Launched June 10, 2003 from Cape Canaveral, it landed in Gusev Crater on Jan. 4, 2004 (UTC).",
      did: "It drove about 7.7 km (4.8 mi) across Gusev's plains and climbed the Columbia Hills.",
      afterward: "In 2009 it broke through a crust into soft sand at 'Troy' and could not get free. After March 22, 2010, it never called back, probably after a low-power fault in the cold winter.",
      legacy: "Spirit found that an ancient volcano erupted at 'Home Plate', with steam from heated underground water. It lasted over 2,200 sols against a 90-sol plan."
    },
    timeline: [
      { date: "2003-06-10", event: "Launch" },
      { date: "2004-01-04", event: "Landing in Gusev Crater" },
      { date: "2009-05", event: "Becomes embedded at 'Troy'" },
      { date: "2010-03-22", event: "Last communication" },
      { date: "2011-05-25", event: "NASA ends attempts to regain contact" }
    ],
    verify: [
      "Day count of stuck period and exact embedded date - confirm on NASA MER page",
      "Home Plate volcanic finding wording - confirm on a NASA page"
    ],
    sources: [
      { title: "Space.com: NASA's Spirit Rover", url: "https://www.space.com/18766-spirit-rover.html" },
      { title: "Smithsonian: Mars Exploration Rovers", url: "https://sites.google.com/si.edu/ai-mars/mission-to-mars/rovers/mars-exploration-rover" },
      { title: "Spaceflight Now: Spirit's silence", url: "https://spaceflightnow.com/news/n1003/31spirit" }
    ],
    poster: "/posters/spirit.png",
    model: { type: "glb", src: "/models/mer.glb", size: 3.2, credit: "NASA 3D Resources: Mars Exploration Rover (24883). Spirit and Opportunity were twin rovers" }
  },
  {
    id: "opportunity",
    name: "Opportunity Rover",
    destination: "Mars",
    type: "Robotic rover (Mars Exploration Rover B)",
    location: "Perseverance Valley, western rim of Endeavour Crater, Meridiani Planum",
    coordinates: null,
    launchDate: "2003-07-07",
    arrivalDate: "2004-01-25 (UTC)",
    status: "Silent since June 10, 2018. NASA declared the mission over on Feb. 13, 2019 after more than 1,000 recovery attempts.",
    hook: "Designed for 90 days. Worked for almost 15 years.",
    story: {
      why: "Orbiters had spotted the mineral hematite at Meridiani Planum. On Earth, hematite often forms in water, so NASA sent Opportunity to look for signs of past water.",
      journey: "It launched July 7, 2003 and landed Jan. 25, 2004, three weeks after twin Spirit.",
      did: "It drove more than 45 km (28 miles) and explored craters including Eagle, Endurance and Endeavour.",
      afterward: "A planet-wide dust storm in 2018 blocked the sunlight its solar panels needed. It last communicated June 10, 2018 and remains parked in Perseverance Valley.",
      legacy: "It found hematite 'blueberries' and clay minerals formed in near-neutral water, evidence of a wetter past. It lasted about 60 times its planned lifetime."
    },
    timeline: [
      { date: "2003-07-07", event: "Launch" },
      { date: "2004-01-25", event: "Landing in Eagle Crater" },
      { date: "2018-06-10", event: "Last communication, during a global dust storm" },
      { date: "2019-02-13", event: "NASA declares the mission complete" }
    ],
    verify: [
      "Launch date is July 7 (local) vs July 8 (UTC) in different sources - use July 7 and say so",
      "'Blueberries' and clay-mineral claims - confirm on a NASA MER page"
    ],
    sources: [
      { title: "NASA JPL: Opportunity Rover Mission on Mars Comes to End", url: "https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/" },
      { title: "NASA Science archive: Mars Exploration Rover - Opportunity", url: "https://webarchive.library.unt.edu/web/20201219070427/https://science.nasa.gov/missions/mars-rovers" },
      { title: "Space.com: Opportunity rover", url: "https://www.space.com/18289-opportunity-rover.html" }
    ],
    poster: "/posters/opportunity.png",
    model: { type: "glb", src: "/models/mer.glb", size: 3.2, credit: "NASA 3D Resources: Mars Exploration Rover (24883). Spirit and Opportunity were twin rovers" }
  },
  {
    id: "ingenuity",
    name: "Ingenuity Mars Helicopter",
    destination: "Mars",
    type: "Robotic helicopter (technology demonstration)",
    location: "Jezero Crater (Wright Brothers Field area)",
    coordinates: null,
    launchDate: "2020-07-20 (with Perseverance)",
    arrivalDate: "2021-02 (landed attached to Perseverance)",
    status: "Upright on the surface and in contact, but unable to fly. Mission ended Jan. 25, 2024 after rotor damage on Flight 72.",
    hook: "The first aircraft to fly on another planet.",
    story: {
      why: "It was a technology demonstration to prove powered, controlled flight is possible in Mars' thin atmosphere.",
      journey: "It rode to Mars attached to the Perseverance rover, which launched July 20, 2020. It was dropped to the surface and made its first flight April 19, 2021.",
      did: "It was planned for up to five flights. It flew 72 times, covering about 17 km in about 129 minutes, and later scouted terrain for Perseverance.",
      afterward: "After an emergency landing on Flight 71, Flight 72 on Jan. 18, 2024 was a short hop to check its position. Images showed damaged rotor blades, so it could no longer fly.",
      legacy: "It proved aerial exploration works on another world. Its first flight site is named Wright Brothers Field, and it carried a swatch of fabric from the 1903 Wright Flyer."
    },
    timeline: [
      { date: "2020-07-20", event: "Launch with Perseverance" },
      { date: "2021-04-19", event: "Flight 1: first powered, controlled flight on another planet" },
      { date: "2024-01-18", event: "Flight 72: final flight, rotor damage" },
      { date: "2024-01-25", event: "NASA announces the end of the mission" }
    ],
    verify: [
      "Landing date with Perseverance (Feb 18, 2021) - confirm on NASA page; not in sources read",
      "Deployment date: sources say April 3 vs April 6 - confirm",
      "Flight time: 128.8 vs 129 min vs 'over 2 hours 8 min' - all consistent, quote one",
      "A Yahoo article gives April 30, 2021 for the first flight - this is wrong; NASA says April 19"
    ],
    sources: [
      { title: "NASA JPL: Ingenuity first flight", url: "https://www.nasa.gov/press-release/nasa-s-ingenuity-mars-helicopter-succeeds-in-historic-first-flight" },
      { title: "NASASpaceflight: Ingenuity's mission ends after 72 flights", url: "https://nasaspaceflight.com/2024/01/ingenuity-final-flight" },
      { title: "Live Science: Ingenuity ends its mission", url: "https://www.livescience.com/space/mars/nasas-historic-ingenuity-helicopter-ends-its-3-year-mars-mission-suffering-rotor-damage-on-72nd-flight" }
    ],
    poster: "/posters/ingenuity.png",
    model: { type: "glb", src: "/models/ingenuity.glb", credit: "NASA 3D Resources (Ingenuity Mars Helicopter)", size: 4.4 }
  },
  {
    id: "dawn",
    name: "Dawn Spacecraft (optional)",
    destination: "Deep Space",
    type: "Orbiter",
    location: "Orbit around Ceres",
    coordinates: null,
    launchDate: "2007-09-27",
    arrivalDate: "2011 (Vesta); 2015-03-06 (Ceres)",
    status: "Out of fuel and silent since late Oct. 2018; remains in orbit around Ceres for decades.",
    hook: "The first spacecraft to orbit two different worlds.",
    story: {
      why: "Vesta and Ceres are the two largest bodies in the asteroid belt and very different from each other.",
      journey: "Launched in 2007, it orbited Vesta in 2011 and Ceres from March 6, 2015.",
      did: "It sent back images and data of both worlds, ending as low as 35 km above Ceres.",
      afterward: "It ran out of hydrazine, which controls its pointing. It missed contacts on Oct. 31 and Nov. 1, 2018, and NASA ended the mission.",
      legacy: "It was the first spacecraft to orbit two different objects in the solar system."
    },
    timeline: [
      { date: "2007-09-27", event: "Launch" },
      { date: "2011", event: "Arrives at Vesta" },
      { date: "2015-03-06", event: "Enters orbit at Ceres" },
      { date: "2018-11-01", event: "NASA announces end of mission" }
    ],
    verify: ["Vesta arrival month (July 2011) - confirm on NASA page"],
    sources: [
      { title: "NASA Science: Dawn - End of Mission", url: "https://science.nasa.gov/mission/dawn/toolkit/end-of-mission/" },
      { title: "DLR: Dawn falls silent", url: "https://www.dlr.de/en/latest/news/2018/4/20181105_dawn-silent-end-succesful-mission" }
    ],
    imageUrl: "/images/dawn-2.jpg",
    imageCredit: "NASA/JPL (exact image ID to confirm)",
    gallery: [
      { src: "/images/dawn-1.jpg", caption: "Dawn being prepared for launch on Earth.", credit: "NASA/JPL (exact image ID to confirm)" },
      { src: "/images/dawn-2.jpg", caption: "Dawn inside a test chamber on Earth.", credit: "NASA/JPL (exact image ID to confirm)" },
      { src: "/images/dawn-3.jpg", caption: "Technicians uncovering the Dawn spacecraft on Earth.", credit: "NASA/JPL (exact image ID to confirm)" }
    ]
  }
];

export const destinations = ["Moon", "Mars", "Deep Space"];
