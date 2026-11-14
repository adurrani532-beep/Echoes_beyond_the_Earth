// Quiz questions are based only on facts used in machines.js.
export const quizPool = [
  {
    id: "q-sojourner",
    q: "Which rover was delivered to Mars by the Pathfinder mission in 1997?",
    options: ["Opportunity", "Sojourner", "Spirit", "Ingenuity"],
    answer: 1,
    why: "Sojourner rode to Mars on Mars Pathfinder, which landed on July 4, 1997. It was NASA's first rover on Mars.",
    machine: "sojourner"
  },
  {
    id: "q-ingenuity-flights",
    q: "Ingenuity was planned for up to five flights. How many did it complete?",
    options: ["12", "30", "72", "150"],
    answer: 2,
    why: "Ingenuity flew 72 times over about three years, covering around 17 km.",
    machine: "ingenuity"
  },
  {
    id: "q-opportunity-storm",
    q: "What silenced the Opportunity rover in June 2018?",
    options: ["A rock fall", "A planet-wide dust storm", "A software update", "A meteor hit"],
    answer: 1,
    why: "A global dust storm blocked sunlight from its solar panels. Its last signal came June 10, 2018, and NASA ended the mission on Feb. 13, 2019.",
    machine: "opportunity"
  },
  {
    id: "q-eagle",
    q: "What happened to the descent stage of Apollo 11's lunar module Eagle?",
    options: [
      "It flew back to Earth",
      "It was left on the Moon at Tranquility Base",
      "It was sent to Mars",
      "It burned up in the atmosphere"
    ],
    answer: 1,
    why: "The ascent stage lifted the astronauts off using the descent stage as a launch pad. The descent stage stayed on the Moon.",
    machine: "apollo-lm-descent-stage"
  },
  {
    id: "q-dawn",
    q: "Why did NASA's Dawn mission end in 2018?",
    options: [
      "It crashed into Ceres",
      "It ran out of hydrazine fuel",
      "It reached its destination",
      "Its camera broke"
    ],
    answer: 1,
    why: "Dawn used up the hydrazine that controls its pointing. It stays in orbit around Ceres, and is expected to for decades.",
    machine: "dawn"
  },
  {
    id: "q-spirit",
    q: "Where did Spirit get stuck in 2009?",
    options: ["A sand trap called Troy", "A deep crevasse", "A frozen lake", "A lava tube"],
    answer: 0,
    why: "Spirit became embedded in soft soil at a spot called Troy. It last communicated on March 22, 2010.",
    machine: "spirit"
  },
  {
    id: "q-lrv",
    q: "How many Lunar Roving Vehicles were driven on the Moon?",
    options: ["One", "Three", "Five", "Ten"],
    answer: 1,
    why: "One rover was used on each of Apollo 15, 16 and 17, and all three were left on the Moon.",
    machine: "lunar-roving-vehicle"
  },
  {
    id: "q-ingenuity-first",
    q: "Where does Ingenuity's first flight site get its name?",
    options: ["Armstrong Field", "Wright Brothers Field", "Kitty Hawk Crater", "Jezero Airport"],
    answer: 1,
    why: "NASA named it Wright Brothers Field. Ingenuity carried a small piece of fabric from the 1903 Wright Flyer.",
    machine: "ingenuity"
  }
];

export function pickQuiz(n = 5) {
  const pool = [...quizPool].sort(() => Math.random() - 0.5).slice(0, n);
  return pool.map((item) => {
    const correct = item.options[item.answer];
    const options = [...item.options].sort(() => Math.random() - 0.5);
    return { ...item, options, answer: options.indexOf(correct) };
  });
}
