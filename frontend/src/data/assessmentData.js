export const assessmentQuestions10th = {
  Interests: [
    {
      type: "mcq",
      question: "Which of these subjects do you enjoy the most in school?",
      options: ["Science", "Mathematics", "Social Studies", "Languages"],
      trait: {
        Science: "Investigative",
        Mathematics: "Investigative",
        "Social Studies": "Social",
        Languages: "Artistic",
      },
    },
    {
      type: "mcq",
      question: "If you had a free afternoon, you would prefer to:",
      options: [
        "Build something with your hands",
        "Read a book or watch a documentary",
        "Spend time with friends",
        "Draw or write stories",
      ],
      trait: {
        "Build something with your hands": "Realistic",
        "Read a book or watch a documentary": "Investigative",
        "Spend time with friends": "Social",
        "Draw or write stories": "Artistic",
      },
    },
    {
      type: "mcq",
      question: "You are most interested in understanding:",
      options: [
        "How machines work",
        "The laws of the universe",
        "Why people behave the way they do",
        "How to express ideas through art",
      ],
      trait: {
        "How machines work": "Realistic",
        "The laws of the universe": "Investigative",
        "Why people behave the way they do": "Social",
        "How to express ideas through art": "Artistic",
      },
    },
  ],
  Aptitude: [
    {
      type: "mcq",
      question: "You are good at:",
      options: [
        "Solving puzzles",
        "Remembering facts",
        "Understanding people's feelings",
        "Leading a group",
      ],
      trait: {
        "Solving puzzles": "Investigative",
        "Remembering facts": "Conventional",
        "Understanding people's feelings": "Social",
        "Leading a group": "Enterprising",
      },
    },
    {
      type: "slider",
      question: "How much do you enjoy working with numbers and data?",
      min: 1,
      max: 10,
      label: "Not at all to Very Much",
      trait: "Conventional",
    },
    {
      type: "mcq",
      question: "When you have to learn something new, you prefer to:",
      options: [
        "Read the instructions carefully",
        "Experiment and learn by doing",
        "Ask someone to show you",
        "Watch a video tutorial",
      ],
      trait: {
        "Read the instructions carefully": "Conventional",
        "Experiment and learn by doing": "Realistic",
        "Ask someone to show you": "Social",
        "Watch a video tutorial": "Artistic",
      },
    },
  ],
  Personality: [
    {
      type: "mcq",
      question: "When working on a group project, you are the one who:",
      options: [
        "Comes up with the creative ideas",
        "Organizes the work and deadlines",
        "Makes sure everyone is getting along",
        "Focuses on the technical details",
      ],
      trait: {
        "Comes up with the creative ideas": "Artistic",
        "Organizes the work and deadlines": "Conventional",
        "Makes sure everyone is getting along": "Social",
        "Focuses on the technical details": "Investigative",
      },
    },
    {
      type: "slider",
      question: "How comfortable are you with public speaking?",
      min: 1,
      max: 10,
      label: "Not comfortable to Very comfortable",
      trait: "Enterprising",
    },
  ],
};

export const assessmentQuestions12th = {
  "Academic Strength": [
    {
      type: "mcq",
      question: "Which stream have you chosen for your 11th and 12th grade?",
      options: [
        "Science (PCM)",
        "Science (PCB)",
        "Commerce",
        "Arts/Humanities",
      ],
      trait: {
        "Science (PCM)": "Investigative",
        "Science (PCB)": "Investigative",
        Commerce: "Conventional",
        "Arts/Humanities": "Artistic",
      },
    },
    {
      type: "slider",
      question: "How confident are you in your chosen stream?",
      min: 1,
      max: 10,
      label: "Not confident to Very confident",
      trait: "Conventional",
    },
    {
      type: "mcq",
      question: "Which subject in your stream do you find most engaging?",
      options: [
        "Physics/Chemistry",
        "Biology/Biotechnology",
        "Accountancy/Business Studies",
        "History/Political Science",
      ],
      trait: {
        "Physics/Chemistry": "Investigative",
        "Biology/Biotechnology": "Investigative",
        "Accountancy/Business Studies": "Conventional",
        "History/Political Science": "Social",
      },
    },
  ],
  "Career Interests": [
    {
      type: "mcq",
      question: "What kind of work environment do you imagine for yourself?",
      options: [
        "A busy office",
        "A laboratory or research center",
        "A creative studio",
        "Outdoors",
      ],
      trait: {
        "A busy office": "Enterprising",
        "A laboratory or research center": "Investigative",
        "A creative studio": "Artistic",
        Outdoors: "Realistic",
      },
    },
    {
      type: "mcq",
      question: "Are you more interested in:",
      options: [
        "A job with a high salary",
        "A job that helps others",
        "A job that is creative and innovative",
        "A job that offers stability and security",
      ],
      trait: {
        "A job with a high salary": "Enterprising",
        "A job that helps others": "Social",
        "A job that is creative and innovative": "Artistic",
        "A job that offers stability and security": "Conventional",
      },
    },
    {
      type: "slider",
      question:
        "How important is it for you to have a leadership role in your career?",
      min: 1,
      max: 10,
      label: "Not important to Very important",
      trait: "Enterprising",
    },
  ],
  "Work Style": [
    {
      type: "mcq",
      question: "You prefer a job that involves:",
      options: [
        "Working with clear instructions",
        "Solving complex and unstructured problems",
        "Interacting with a lot of people",
        "Creating new things",
      ],
      trait: {
        "Working with clear instructions": "Conventional",
        "Solving complex and unstructured problems": "Investigative",
        "Interacting with a lot of people": "Social",
        "Creating new things": "Artistic",
      },
    },
    {
      type: "slider",
      question: "How much do you enjoy taking risks in your work?",
      min: 1,
      max: 10,
      label: "Not at all to Very much",
      trait: "Enterprising",
    },
  ],
};

export const assessmentQuestionsUG = {
  "Field of Study": [
    {
      type: "mcq",
      question:
        "What is your current or intended field of undergraduate study?",
      options: [
        "Engineering/Technology",
        "Medicine/Healthcare",
        "Business/Management",
        "Arts/Humanities/Social Sciences",
      ],
      trait: {
        "Engineering/Technology": "Investigative",
        "Medicine/Healthcare": "Investigative",
        "Business/Management": "Enterprising",
        "Arts/Humanities/Social Sciences": "Artistic",
      },
    },
    {
      type: "slider",
      question: "How satisfied are you with your chosen field of study?",
      min: 1,
      max: 10,
      label: "Not satisfied to Very satisfied",
      trait: "Conventional",
    },
    {
      type: "mcq",
      question: "What aspect of your field interests you the most?",
      options: [
        "The technical challenges",
        "The potential to innovate",
        "The business and commercial applications",
        "The impact on society",
      ],
      trait: {
        "The technical challenges": "Investigative",
        "The potential to innovate": "Artistic",
        "The business and commercial applications": "Enterprising",
        "The impact on society": "Social",
      },
    },
  ],
  "Career Goals": [
    {
      type: "mcq",
      question: "What is your long-term career goal?",
      options: [
        "To become an expert in a specialized field",
        "To start your own business",
        "To work for a social cause",
        "To achieve a high-level corporate position",
      ],
      trait: {
        "To become an expert in a specialized field": "Investigative",
        "To start your own business": "Enterprising",
        "To work for a social cause": "Social",
        "To achieve a high-level corporate position": "Enterprising",
      },
    },
    {
      type: "mcq",
      question: "Which of the following is most important to you in a job?",
      options: [
        "Intellectual challenge",
        "Financial reward",
        "Helping others",
        "Creative expression",
      ],
      trait: {
        "Intellectual challenge": "Investigative",
        "Financial reward": "Enterprising",
        "Helping others": "Social",
        "Creative expression": "Artistic",
      },
    },
    {
      type: "slider",
      question:
        "How important is continuous learning and upskilling in your career choice?",
      min: 1,
      max: 10,
      label: "Not important to Very important",
      trait: "Investigative",
    },
  ],
  "Skills and Abilities": [
    {
      type: "mcq",
      question: "Which of these skills do you consider your strongest?",
      options: [
        "Analytical and problem-solving skills",
        "Communication and interpersonal skills",
        "Creative and design skills",
        "Organizational and planning skills",
      ],
      trait: {
        "Analytical and problem-solving skills": "Investigative",
        "Communication and interpersonal skills": "Social",
        "Creative and design skills": "Artistic",
        "Organizational and planning skills": "Conventional",
      },
    },
    {
      type: "slider",
      question:
        "How comfortable are you with adapting to new technologies and tools?",
      min: 1,
      max: 10,
      label: "Not comfortable to Very comfortable",
      trait: "Realistic",
    },
  ],
};
