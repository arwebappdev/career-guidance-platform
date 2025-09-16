import { mockCollegesData } from "../data/mockCollegesData"; // Import college data

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
    relevant_courses: ["B.E Mechanical", "B.E Civil"],
    course_recommendations: {
      UG: [
        "B.E/B.Tech in Mechanical Engineering",
        "B.E/B.Tech in Civil Engineering",
        "Diploma in Electrical Engineering",
      ],
      PG: [
        "M.E/M.Tech in Mechanical Engineering",
        "M.E/M.Tech in Structural Engineering",
      ],
    },
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
    relevant_courses: [
      "B.Sc Computer Science",
      "B.E Computer Science",
      "M.Sc Physics",
      "B.Sc Mathematics",
    ],
    course_recommendations: {
      UG: [
        "MBBS",
        "B.Sc in Physics/Chemistry/Mathematics",
        "B.E/B.Tech in Computer Science",
      ],
      PG: [
        "MD",
        "M.Sc in Physics/Chemistry/Mathematics",
        "M.Tech in Computer Science",
      ],
    },
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
    relevant_courses: ["B.A Journalism", "B.A English", "B.A History"],
    course_recommendations: {
      UG: [
        "Bachelor of Fine Arts (BFA)",
        "B.A. in English Literature",
        "B.Des in Graphic Design",
      ],
      PG: [
        "Master of Fine Arts (MFA)",
        "M.A. in English Literature",
        "M.Des in Graphic Design",
      ],
    },
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
    relevant_courses: ["B.A Political Science", "M.A Sociology", "M.A English"],
    course_recommendations: {
      UG: [
        "B.A. in Psychology",
        "Bachelor of Social Work (BSW)",
        "B.A. in Sociology",
      ],
      PG: [
        "M.A. in Psychology",
        "Master of Social Work (MSW)",
        "M.A. in Sociology",
      ],
    },
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
    relevant_courses: ["MBA", "B.Com", "B.A Economics"],
    course_recommendations: {
      UG: [
        "Bachelor of Business Administration (BBA)",
        "B.Com",
        "B.A. in Economics",
      ],
      PG: [
        "Master of Business Administration (MBA)",
        "M.Com",
        "M.A. in Economics",
      ],
    },
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
    relevant_courses: ["B.Com", "M.Com"],
    course_recommendations: {
      UG: ["B.Com in Accountancy", "Bachelor of Financial Markets (BFM)"],
      PG: ["M.Com in Accountancy", "Chartered Accountant (CA)"],
    },
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
    recommendations.college_recommendations = null;
    recommendations.course_recommendations = null;
  } else if (userType === "12th") {
    recommendations.academic_streams = null;
    recommendations.college_recommendations = mockCollegesData
      .filter((college) =>
        college.courses.some((course) =>
          recommendations.relevant_courses.includes(course.name)
        )
      )
      .slice(0, 3);
    recommendations.course_recommendations =
      recommendations.course_recommendations.UG;
  } else if (userType === "ug") {
    recommendations.academic_streams = null;
    recommendations.subject_recommendations = null;
    recommendations.college_recommendations = mockCollegesData
      .filter((college) =>
        college.courses.some((course) =>
          recommendations.relevant_courses.includes(course.name)
        )
      )
      .slice(0, 3);
    recommendations.course_recommendations =
      recommendations.course_recommendations.PG;
  }

  return { ...recommendations, traitScores };
};
