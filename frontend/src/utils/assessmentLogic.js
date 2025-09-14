const RIASEC_TRAITS = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional",
};

const recommendationsByTrait = {
  Realistic: {
    personality_traits: ["Practical", "Mechanical", "Hands-on"],
    academic_streams: ["Science (PCM/PCMB)", "Vocational Courses"],
    subject_recommendations: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Engineering Graphics",
    ],
    career_recommendations: [
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrician",
      "Pilot",
    ],
  },
  Investigative: {
    personality_traits: ["Analytical", "Curious", "Problem-solver"],
    academic_streams: ["Science (PCM/PCMB)"],
    subject_recommendations: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Biology",
      "Computer Science",
    ],
    career_recommendations: [
      "Doctor",
      "Scientist",
      "Data Analyst",
      "Software Developer",
    ],
  },
  Artistic: {
    personality_traits: ["Creative", "Imaginative", "Expressive"],
    academic_streams: ["Humanities/Arts", "Fine Arts"],
    subject_recommendations: [
      "Literature",
      "History",
      "Art",
      "Music",
      "Psychology",
    ],
    career_recommendations: [
      "Graphic Designer",
      "Writer",
      "Musician",
      "Actor",
      "Architect",
    ],
  },
  Social: {
    personality_traits: ["Helpful", "Cooperative", "Empathetic"],
    academic_streams: ["Humanities/Arts", "Commerce"],
    subject_recommendations: [
      "Psychology",
      "Sociology",
      "History",
      "Political Science",
    ],
    career_recommendations: [
      "Teacher",
      "Counselor",
      "Social Worker",
      "Nurse",
      "HR Manager",
    ],
  },
  Enterprising: {
    personality_traits: ["Ambitious", "Assertive", "Persuasive"],
    academic_streams: ["Commerce", "Management (BBA)"],
    subject_recommendations: [
      "Business Studies",
      "Economics",
      "Accountancy",
      "Mathematics",
    ],
    career_recommendations: [
      "Entrepreneur",
      "Manager",
      "Salesperson",
      "Lawyer",
      "Politician",
    ],
  },
  Conventional: {
    personality_traits: ["Organized", "Efficient", "Detail-oriented"],
    academic_streams: ["Commerce"],
    subject_recommendations: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Mathematics",
    ],
    career_recommendations: [
      "Accountant",
      "Banker",
      "Financial Analyst",
      "Librarian",
      "Administrative Assistant",
    ],
  },
};

export const getRecommendations = (answers, userType, assessmentQuestions) => {
  const traitScores = {
    Realistic: 0,
    Investigative: 0,
    Artistic: 0,
    Social: 0,
    Enterprising: 0,
    Conventional: 0,
  };

  if (!assessmentQuestions) {
    return { ...recommendationsByTrait.Realistic, traitScores };
  }

  for (const category in assessmentQuestions) {
    for (const question of assessmentQuestions[category]) {
      const userAnswer =
        answers[category]?.[assessmentQuestions[category].indexOf(question)];
      if (userAnswer && question.trait) {
        if (question.type === "slider") {
          const score = parseInt(userAnswer, 10);
          if (question.trait) {
            traitScores[question.trait] += score;
          }
        } else if (question.type === "mcq") {
          if (typeof question.trait === "string") {
            traitScores[question.trait] += 5;
          } else if (typeof question.trait === "object") {
            const trait = question.trait[userAnswer];
            if (trait) {
              traitScores[trait] += 5;
            }
          }
        }
      }
    }
  }

  const sortedTraits = Object.keys(traitScores).sort(
    (a, b) => traitScores[b] - traitScores[a]
  );
  const topTrait = sortedTraits[0];

  const recommendations = { ...recommendationsByTrait[topTrait] };

  if (userType === "10th") {
    recommendations.career_recommendations = null;
  } else if (userType === "12th") {
    recommendations.academic_streams = null;
  } else if (userType === "ug") {
    recommendations.academic_streams = null;
    recommendations.subject_recommendations = null;
  }

  return { ...recommendations, traitScores };
};
