export const assessmentQuestions = {
  "Orientation Style": [
    {
      type: "mcq",
      question: "I am most motivated by:",
      options: [
        "Job stability and security",
        "Opportunities for high achievement",
        "A strong sense of personal freedom",
        "Making a significant impact on others",
      ],
    },
    {
      type: "slider",
      question: "I prefer to work with a team rather than alone.",
      min: 1,
      max: 10,
      label: "Strongly Disagree to Strongly Agree",
    },
    {
      type: "mcq",
      question:
        "I prioritize work-life balance over a high-paying, demanding career.",
      options: [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree",
      ],
    },
  ],
  Interests: [
    {
      type: "mcq",
      question: "I prefer to read about:",
      options: [
        "How to build new things",
        "Scientific breakthroughs and discoveries",
        "Historical events and figures",
        "Human behavior and psychology",
      ],
    },
    {
      type: "mcq",
      question: "My ideal hobby involves:",
      options: [
        "Creating art or music",
        "Solving complex puzzles or coding",
        "Volunteering for a cause",
        "Repairing or building physical objects",
      ],
    },
    {
      type: "mcq",
      question: "I am drawn to jobs that involve:",
      options: [
        "Working with my hands",
        "Analyzing data and trends",
        "Helping and teaching others",
        "Designing new products or concepts",
      ],
    },
  ],
  Personality: [
    {
      type: "mcq",
      question: "At a party, I am more likely to:",
      options: [
        "Talk to many different people",
        "Stick to a few close friends",
        "Spend time observing others",
        "Leave early",
      ],
    },
    {
      type: "slider",
      question:
        "I prefer to have a detailed plan rather than being spontaneous.",
      min: 1,
      max: 10,
      label: "Strongly Disagree to Strongly Agree",
    },
    {
      type: "mcq",
      question: "When faced with a new task, I tend to:",
      options: [
        "Jump right in and figure it out as I go",
        "Research and plan every step beforehand",
        "Ask others for their opinions first",
        "Wait for someone else to take the lead",
      ],
    },
  ],
  Aptitude: [
    {
      type: "mcq",
      question: "Which number is next in the sequence: 2, 4, 8, 16...?",
      options: ["24", "30", "32", "36"],
      answer: "32",
    },
    {
      type: "slider",
      question: "I can quickly learn new software programs.",
      min: 1,
      max: 10,
      label: "Not at all to Very Much",
    },
    {
      type: "mcq",
      question: "Which word is the odd one out?",
      options: ["Apple", "Orange", "Banana", "Carrot"],
      answer: "Carrot",
    },
  ],
  "Emotional Quotient (EQ)": [
    {
      type: "mcq",
      question: "When a colleague is upset, I am most likely to:",
      options: [
        "Ask them if they want to talk about it",
        "Give them space and let them calm down",
        "Change the subject to cheer them up",
        "Feel uncomfortable and leave",
      ],
    },
    {
      type: "slider",
      question: "I can easily identify my own emotions and what triggers them.",
      min: 1,
      max: 10,
      label: "Not at all to Very Much",
    },
    {
      type: "mcq",
      question: "I handle criticism well and use it to improve.",
      options: [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree",
      ],
    },
  ],
};
