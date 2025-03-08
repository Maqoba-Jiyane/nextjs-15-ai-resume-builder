import { ATSAnalysisProps } from "./Interfaces";

const ATSAnalysis = ({
  ats_compatibility,
  education_match,
  experience_match,
  keywords_match,
  skills_match,
  overall_score,
}: ATSAnalysisProps) => {

  // Helper function to get background color based on score
  // const getBackgroundColor = (score: number) => {
  //   if (score > 80) return "bg-green-50"; // Green for good
  //   if (score > 60) return "bg-yellow-50"; // Yellow for neutral
  //   return "bg-red-50"; // Red for bad
  // };

  // Helper function to get text color based on score
  const getTextColor = (score: number) => {
    if (score > 80) return "text-green-600";
    if (score > 60) return "text-yellow-500";
    return "text-red-700";
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white text-black shadow-xl p-2">
        {/* Hero Section */}
        {overall_score === 120 && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">ATS Analysis</h1>
            <p className="text-lg text-gray-600">Find out how your resume performs with ATS systems.</p>
          </div>
        )}

        {/* If analysis has started, show results */}
        {overall_score !== 120 && (
          <>

            {/* Overall Score Section */}
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Overall Score</h2>
              <p
                className={`text-5xl font-bold ${getTextColor(overall_score)}`}
              >
                {overall_score}
              </p>
              <div className="w-full h-2 bg-gray-200 mt-2">
                <div
                  className={`h-2 ${
                    overall_score > 80
                      ? "bg-green-600"
                      : overall_score > 60
                      ? "bg-yellow-500"
                      : "bg-red-700"
                  }`}
                  style={{ width: `${overall_score}%` }}
                />
              </div>
            </div>

            {/* Match Sections */}
            {[{
              title: "Keyword Match",
              score: keywords_match.score,
              analysis: keywords_match.analysis,
              improvements: keywords_match.improvements,
            }, {
              title: "Experience Match",
              score: experience_match.score,
              analysis: experience_match.analysis,
              improvements: experience_match.improvements,
            }, {
              title: "Education Match",
              score: education_match.score,
              analysis: education_match.analysis,
              improvements: education_match.improvements,
            }, {
              title: "Skills Match",
              score: skills_match.score,
              analysis: skills_match.analysis,
              improvements: skills_match.improvements,
            }, {
              title: "ATS Compatibility",
              score: ats_compatibility.score,
              analysis: ats_compatibility.analysis,
              improvements: ats_compatibility.improvements,
            }].map((section, idx) => (
              <div key={idx} className={`mb-6 p-6 rounded-md`}>
                <h3 className={`text-2xl font-semibold ${getTextColor(section.score)}`}>{section.title}</h3>
                <p className="text-lg text-gray-600">{section.analysis}</p>
                <p
                  className={`text-lg font-semibold ${getTextColor(section.score)}`}
                >
                  Score: {section.score}
                </p>
                <ul className="list-disc pl-6 mt-3 text-lg">
                  {section.improvements.length > 0 ? (
                    section.improvements.map((improvement, index) => (
                      <li key={index} className="text-gray-700">{improvement}</li>
                    ))
                  ) : (
                    <li className="text-gray-500">No improvements needed</li>
                  )}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ATSAnalysis;
