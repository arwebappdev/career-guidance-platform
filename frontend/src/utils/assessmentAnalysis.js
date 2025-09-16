import { getRecommendations } from "./assessmentLogic";

export const analyzeAssessment = (answers, userType, assessmentQuestions) => {
  const recommendations = getRecommendations(
    answers,
    userType,
    assessmentQuestions
  );
  const { traitScores, ...finalRecommendations } = recommendations;

  return {
    final_report: {
      ...finalRecommendations,
      explanation:
        "Based on your responses, we have identified these key areas of strength and interest. The recommendations are designed to align with your personality and aptitudes to help you find a fulfilling career path.",
    },
    interim_reports: Object.keys(traitScores).map((trait) => ({
      title: `${trait} Report`,
      analysis: `Your score in ${trait} is ${Math.round(
        traitScores[trait]
      )}%. This indicates your level of inclination and aptitude in this area.`,
      score: traitScores[trait],
    })),
  };
};
