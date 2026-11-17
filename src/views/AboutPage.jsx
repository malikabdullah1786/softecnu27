'use client'

import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'

export default function AboutPage() {
  return (
    <PageWrapper size={7} title="About Us">
      <div className="px-2 sm:px-4 max-w-6xl mx-auto">
        <Heading
          badge="Since 1995"
          text="Welcome to SOFTEC"
          subtitle={'SOFTEC is Pakistan\'s largest and most prestigious international IT event, organized annually by the students of FAST National University, Lahore. Our vision, "Beyond Limits," reflects our commitment to pushing technological boundaries and fostering innovation.'}
        />

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
