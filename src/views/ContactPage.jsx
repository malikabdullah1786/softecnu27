'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import { api } from '../services/api'

const contactsList = [
  {
    id: 1,
    title: 'Ambassadors Info',
    name: 'Muhammad Harmain Waleed',
    position: 'Assistant Vice President',
    email: 'harmain@softec.org.pk',
    office: 'SOFTEC Office, FAST NUCES Lahore',
  },
  {
    id: 2,
    title: 'Sponsor Info',
    name: 'Iman Khan',
    position: 'Assistant Vice President',
    email: 'iman@softec.org.pk',
    office: 'Marketing & Sponsorship Desk',
  },
  {
    id: 3,
    title: 'Competitions Info',
    name: 'Anas Rahim',
    position: 'Competitions Coordinator',
    email: 'anas@softec.org.pk',
    office: 'Competitions Desk, FAST NUCES Lahore',
  },
]

function ContactCard({ contact }) {
  return (
    <div className="p-6 sm:p-8 md:min-h-[220px] flex-1 w-full md:min-w-[260px] bg-white rounded-2xl text-[15px] relative overflow-hidden border border-secondary/15 shadow-sm">
      <h3 className="md:text-2xl mb-4 text-xl font-bold text-secondary">{contact.title}</h3>
      <p className="mb-1">
        <b className="text-dark">Name: </b>
        {contact.name}
      </p>
      <p className="mb-1">
        <b className="text-dark">Position: </b>
        {contact.position}
      </p>
      <p className="mb-1">
        <b className="text-dark">Desk: </b>
        {contact.office}
      </p>
      <p>
        <b className="text-dark">Email: </b>
        <a
          className="font-semibold text-secondary underline hover:text-tertiary"
          href={`mailto:${contact.email}`}
        >
          {contact.email}
        </a>
      </p>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.first_name || !form.last_name || !form.email || !form.subject || !form.message) {
      setFormError('Please fill all required fields before sending.')
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      const res = await api.post('/contact/', form)
      if (res?.status === 200 || res?.status === 304) {
        toast.success('Message Sent Successfully')
        setForm({
          first_name: '',
          last_name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        setFormError('Unable to send message right now. Please email info@softec.org.pk.')
      }
    } catch {
      setFormError('Unable to send message right now. Please email info@softec.org.pk.')
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageWrapper size={6} title="Contact">
        <Heading text="Contact Information" />
        <div className="md:flex-row md:px-2 lg:justify-between md:gap-4 flex flex-col flex-wrap justify-center gap-6 px-6">
          {contactsList.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>

        <Heading className="my-5" text="Have Something to Say?" />
        <form className="px-6 bg-white p-8 rounded-2xl border border-secondary/15 shadow-sm mx-4" onSubmit={handleSubmit}>
          {formError && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {formError}
            </div>
          )}
          <div className="md:grid-cols-2 md:gap-6 grid">
            <FormInput
              text="First Name"
              value={form.first_name}
              name="first_name"
              placeholder="John"
              onChange={handleChange}
              required
            />
            <FormInput
              text="Last Name"
              value={form.last_name}
              name="last_name"
              placeholder="Doe"
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:grid-cols-2 md:gap-6 grid">
            <FormInput
              text="Subject"
              value={form.subject}
              name="subject"
              placeholder="Query about SOFTEC"
              onChange={handleChange}
              required
            />
            <FormInput
              text="Email"
              type="email"
              value={form.email}
              name="email"
              placeholder="john@mail.com"
              onChange={handleChange}
              required
            />
          </div>
          <FormInput
            text="Message"
            type="textarea"
            value={form.message}
            name="message"
            placeholder="Your message..."
            onChange={handleChange}
            required
          />
          <div className="my-6">
            <Button loading={loading} text="Send Message" />
          </div>
        </form>
      </PageWrapper>

      <div className="my-10 px-4 md:px-0">
        <iframe
          title="FAST NUCES Lahore Campus Map"
          className="w-full h-[320px] md:h-[480px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13607.668560810213!2d74.27661824911654!3d31.498961304052212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore%20Campus!5e0!3m2!1sen!2s!4v1580080747006!5m2!1sen!2s"
        />
      </div>
    </>
  )
}
