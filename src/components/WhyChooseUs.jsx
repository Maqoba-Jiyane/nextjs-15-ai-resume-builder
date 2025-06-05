import { CheckCircle } from 'lucide-react'

const benefits = [
  {
    title: '🎯 SMART Skills & Summaries',
    description: 'We don’t guess your skills—our AI uses Specific, Measurable, Achievable, Relevant, and Time-bound logic based on your real experience.',
  },
  {
    title: '⚡ Instant, On-Demand Resumes',
    description: 'Pay only for what you need. No subscriptions. Get one resume for R60 or multiple with flexible plans.',
  },
  {
    title: '🧠 Tailored to Job Descriptions',
    description: 'Paste any job post and we’ll match your skills and summary to what the employer is looking for.',
  },
  {
    title: '📄 ATS-Friendly Designs',
    description: 'Professional templates built for applicant tracking systems. Clean, structured, and margin-perfect exports.',
  },
  {
    title: '🚀 Start Without an Account',
    description: 'No long sign-up process. Start building and only pay when you’re ready to download.',
  },
  {
    title: '🌍 Built for South Africans',
    description: 'Affordable, local pricing with resume styles that resonate in the SA job market.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 px-6 sm:px-12 lg:px-24 shadow-lg rounded-lg ">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
          Why Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle className="text-blue-600/90 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
