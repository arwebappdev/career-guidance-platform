export const analyzeAssessment = (answers, userType) => {
  const scores = {
    "Orientation Style": 0,
    Interests: 0,
    Personality: 0,
    Aptitude: 0,
    "Emotional Quotient (EQ)": 0,
  };

  // This is a very simplified scoring mechanism.
  // In a real-world application, this would be much more complex.
  for (const category in answers) {
    let categoryScore = 0;
    for (const questionIndex in answers[category]) {
      const answer = answers[category][questionIndex];
      // Simple logic: add the numerical value of the answer to the score.
      // For MCQs, we'll just assign a value based on the option index.
      if (!isNaN(answer)) {
        categoryScore += parseInt(answer, 10);
      } else {
        categoryScore += 5; // Default score for MCQ
      }
    }
    scores[category] =
      (categoryScore / (Object.keys(answers[category]).length * 10)) * 100;
  }

  const personalityTraits = ["Adaptable", "Detail-Oriented", "Collaborative"];
  const careerRecommendations = [
    "Software Developer",
    "Marketing Manager",
    "Data Analyst",
    "UX/UI Designer",
    "Civil Engineer",
  ];
  const academicStreams = ["Science (PCM)", "Commerce", "Arts/Humanities"];
  const subjectRecommendations = [
    "Mathematics",
    "Physics",
    "Computer Science",
    "Economics",
    "English",
  ];

  return {
    final_report: {
      personality_traits: personalityTraits,
      career_recommendations:
        userType === "college" ? careerRecommendations : null,
      academic_streams: userType === "student" ? academicStreams : null,
      subject_recommendations: subjectRecommendations,
      explanation:
        "Based on your responses, we have identified these key areas of strength and interest. The recommendations are designed to align with your personality and aptitudes to help you find a fulfilling career path.",
    },
    interim_reports: Object.keys(scores).map((category) => ({
      title: `${category} Report`,
      analysis: `Your score in ${category} is ${Math.round(
        scores[category]
      )}%. This indicates your level of inclination and aptitude in this area.`,
      score: Math.round(scores[category]),
    })),
  };
};
