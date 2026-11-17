'use client'

import PageWrapper from '../components/PageWrapper'

export default function AboutPage() {
  return (
    <PageWrapper size={8} title="About Us">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <section className="mb-12 mt-12">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Welcome to SOFTEC
            </h2>
            <p className="text-dark/75 text-lg leading-relaxed">
              SOFTEC is Pakistan&apos;s largest and most prestigious international IT event,
              organized annually by the students of FAST National University, Lahore. Since
              its inception, SOFTEC has grown into a three-day festival that attracts
              thousands of participants, industry professionals, and tech enthusiasts. Our
              vision, &ldquo;Beyond Limits,&rdquo; reflects our commitment to pushing
              technological boundaries and fostering innovation.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl border border-secondary/15 shadow-sm">
            <h3 className="text-2xl font-bold text-secondary mb-3">
              Our Mission
            </h3>
            <p className="text-dark/75">
              To create a bridge between academia and industry by providing students with
              opportunities to showcase their technical expertise, connect with
              professionals, and stay updated with emerging trends.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-secondary/15 shadow-sm">
            <h3 className="text-2xl font-bold text-secondary mb-3">
              Our Vision
            </h3>
            <p className="text-dark/75">
              To be the leading IT event that nurtures talent, encourages innovation, and
              establishes meaningful industry-academia collaborations.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white p-8 rounded-2xl border border-secondary/15 shadow-sm">
            <h3 className="text-2xl font-bold text-secondary mb-3">
              Our History
            </h3>
            <p className="text-dark/75">
              Established in 1995, SOFTEC has grown from a small-scale student initiative
              to an internationally recognized tech extravaganza. Over the years, it has
              hosted thousands of participants from universities across Pakistan and
              beyond, offering unparalleled opportunities for students to compete,
              innovate, and network.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white p-8 rounded-2xl border border-secondary/15 shadow-sm">
            <h3 className="text-2xl font-bold text-secondary mb-6">
              What We Do
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-light">
                <h4 className="text-xl font-bold text-secondary mb-2">Competitions</h4>
                <p className="text-dark/75">
                  We organize various competitions, including both technical and
                  non-technical challenges such as hackathons, coding competitions,
                  robotics challenges, and more.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-light">
                <h4 className="text-xl font-bold text-secondary mb-2">Workshops &amp; Seminars</h4>
                <p className="text-dark/75">
                  Industry experts conduct workshops and seminars to share knowledge and
                  latest trends in technology.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-light">
                <h4 className="text-xl font-bold text-secondary mb-2">Networking</h4>
                <p className="text-dark/75">
                  We create opportunities for students to connect with industry
                  professionals and potential employers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-secondary text-light p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Our Impact
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-tertiary mb-2">Student Development</h4>
                <p className="text-light/85">
                  Through our events, students develop practical skills, gain industry
                  exposure, and build their professional network.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-tertiary mb-2">Industry Connection</h4>
                <p className="text-light/85">
                  We facilitate meaningful interactions between tech companies and emerging
                  talent, fostering recruitment and collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}
