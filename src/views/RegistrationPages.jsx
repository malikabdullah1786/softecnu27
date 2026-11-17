'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import Loader from '../components/Loader'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import { api, useApiQuery, useRegistrationConfig } from '../services/api'

function ClosedNotice({ roleLabel = 'Registration' }) {
  const [notifyEmail, setNotifyEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNotify = (e) => {
    e.preventDefault()
    if (!notifyEmail.trim()) {
      toast.error('Please enter your email address')
      return
    }
    setSubscribed(true)
    toast.success("You're on the list! We'll notify you when registrations reopen.")
    setNotifyEmail('')
  }

  return (
    <div className="max-w-xl mx-auto my-6 bg-white border border-secondary/15 rounded-2xl p-8 text-center shadow-sm">
      <span className="inline-block px-3 py-1 rounded-full bg-tertiary/30 text-secondary text-xs font-bold uppercase tracking-wider">
        Closed for Current Edition
      </span>
      <h2 className="md:text-2xl mt-4 text-xl font-bold text-secondary">
        {roleLabel} is Currently Closed
      </h2>
      <p className="text-dark/70 mt-2 text-sm md:text-base">
        Leave your email to be notified as soon as registrations reopen for the next
        edition, or explore our competitions in the meantime.
      </p>

      {subscribed ? (
        <div className="mt-6 p-4 rounded-xl bg-primary/30 text-secondary font-semibold text-sm">
          Notification registered! We&apos;ll email you when registrations open.
        </div>
      ) : (
        <form onSubmit={handleNotify} className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            placeholder="you@university.edu.pk"
            required
            className="flex-1 bg-light border border-secondary/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-primary text-dark font-bold hover:bg-secondary hover:text-primary transition-all text-sm"
          >
            Notify Me
          </button>
        </form>
      )}

      <div className="mt-6 pt-5 border-t border-secondary/10 flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <Link href="/competitions" className="text-secondary underline hover:text-tertiary">
          Browse Competitions
        </Link>
        <Link href="/contact" className="text-secondary underline hover:text-tertiary">
          Contact Organisers
        </Link>
      </div>
    </div>
  )
}

export function AmbassadorRegistrationPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    discipline: '',
    batch: '',
    mailing_address: '',
    cnic: '',
    gender: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { isOpen, isLoading } = useRegistrationConfig('ambassador')
  const { data: batches } = useApiQuery('batches/')

  const onChange = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (form.phone.length !== 11) nextErrors.phone = 'Phone must be 11 digits (e.g. 03001234567).'
    if (form.cnic.length !== 13) nextErrors.cnic = 'CNIC must be 13 digits without dashes.'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    api
      .post('/registration/ambassador/', form)
      .then(() => {
        toast.success('Registration Successful, Our team will get in contact with you soon!')
        setForm({
          name: '',
          email: '',
          phone: '',
          university: '',
          discipline: '',
          batch: '',
          mailing_address: '',
          cnic: '',
          gender: '',
        })
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || 'Registration Failed. Please check all fields.'
        setErrors({ form: msg })
        toast.error(msg)
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <PageWrapper size={3} title="Ambassador Registration">
      <Heading text="Ambassador Registration" />
      <Loader isLoading={isLoading}>
        {!isLoading && isOpen ? (
          <form className="px-6 bg-white p-8 rounded-2xl border border-secondary/15" onSubmit={onSubmit}>
            {errors.form && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {errors.form}
              </div>
            )}
            <FormInput text="Full Name" value={form.name} name="name" placeholder="John Doe" onChange={onChange} required />
            <FormInput
              type="select-gender"
              text="Gender"
              value={form.gender}
              name="gender"
              required
              onChange={onChange}
              list={[
                { id: 1, name: 'Male', value: 'male' },
                { id: 2, name: 'Female', value: 'female' },
              ]}
            />
            <FormInput text="CNIC" value={form.cnic} name="cnic" placeholder="1234512345671" pattern="[0-9]{13}" onChange={onChange} helperText={errors.cnic} required />
            <FormInput text="Email Address" type="email" name="email" value={form.email} placeholder="john@mail.com" onChange={onChange} required />
            <FormInput text="Phone Number" value={form.phone} name="phone" placeholder="03001234567" pattern="[0-9]{11}" onChange={onChange} helperText={errors.phone} required />
            <FormInput text="University" value={form.university} name="university" placeholder="FAST NUCES, Lahore" onChange={onChange} required />
            <FormInput text="Discipline" value={form.discipline} name="discipline" placeholder="BS Computer Science" onChange={onChange} required />
            <FormInput type="select" text="Batch" value={form.batch} name="batch" list={batches || []} onChange={onChange} required />
            <FormInput type="textarea" text="Mailing Address" value={form.mailing_address} name="mailing_address" placeholder="Your mailing address..." onChange={onChange} required />
            <Button loading={submitting} text="Submit" />
          </form>
        ) : (
          <ClosedNotice roleLabel="Ambassador Registration" />
        )}
      </Loader>
    </PageWrapper>
  )
}

export function OfficerRegistrationPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: '',
    batch: '',
    roll_no: '',
    departments: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const { isOpen, isLoading } = useRegistrationConfig('officer')
  const { data: departments } = useApiQuery('departments/')
  const { data: batches } = useApiQuery('batches/')
  const { data: disciplines } = useApiQuery('disciplines/')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const toggleDept = (id) => {
    setForm((prev) => ({
      ...prev,
      departments: prev.departments.includes(id)
        ? prev.departments.filter((d) => d !== id)
        : [...prev.departments, id],
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (form.phone.length !== 11) {
      toast.error('Phone number must be 11 digits!')
      return
    }
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.batch ||
      !form.discipline ||
      !form.roll_no ||
      form.departments.length === 0
    ) {
      toast.error('Please fill all the fields')
      return
    }
    setSubmitting(true)
    api
      .post('/registration/volunteer/', form)
      .then(() => {
        toast.success('Registration Successful, Our team will get in contact with you soon!')
        setForm({
          name: '',
          email: '',
          phone: '',
          batch: '',
          discipline: '',
          roll_no: '',
          departments: [],
        })
      })
      .catch(() => toast.error('Registration Failed!'))
      .finally(() => setSubmitting(false))
  }

  return (
    <PageWrapper size={6} title="Officer Registration">
      <Heading text="Officer Registration" />
      <Loader isLoading={isLoading}>
        {!isLoading && isOpen ? (
          <form className="flex flex-col items-center justify-center w-full px-6" onSubmit={onSubmit}>
            <section className="md:w-4/6 inputs w-full bg-white p-8 rounded-2xl border border-secondary/15">
              <FormInput text="Full Name" value={form.name} name="name" placeholder="John Doe" onChange={onChange} required />
              <FormInput text="Email Address" type="email" value={form.email} name="email" placeholder="john@mail.com" onChange={onChange} required />
              <FormInput text="Phone Number" value={form.phone} name="phone" placeholder="03001234567" pattern="[0-9]{11}" onChange={onChange} required />
              <FormInput text="Discipline" type="select" value={form.discipline} name="discipline" list={disciplines || []} onChange={onChange} required />
              <div className="md:grid-cols-2 md:gap-6 grid">
                <FormInput text="Batch" type="select" value={form.batch} name="batch" list={batches || []} onChange={onChange} required />
                <FormInput text="Roll Number" value={form.roll_no} name="roll_no" placeholder="20L-1234" pattern="[0-9]{2}[A-Za-z]{1}-[0-9]{4}" onChange={onChange} required />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Departments <span className="text-red-500">*</span>
                </label>
                <ul className="deps flex flex-wrap gap-2">
                  {departments?.map((dept) => {
                    const checked = form.departments.includes(dept.id)
                    return (
                      <li key={dept.id}>
                        <input type="checkbox" id={`dept-${dept.id}`} className="hidden" checked={checked} onChange={() => toggleDept(dept.id)} />
                        <label
                          htmlFor={`dept-${dept.id}`}
                          className={`inline-block cursor-pointer px-4 py-2 rounded-full border text-sm font-medium ${
                            checked
                              ? 'bg-secondary text-primary border-secondary'
                              : 'bg-light text-dark border-secondary/20'
                          }`}
                        >
                          {dept.name}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <Button loading={submitting} text="Submit" />
            </section>
          </form>
        ) : (
          <ClosedNotice roleLabel="Officer Registration" />
        )}
      </Loader>
    </PageWrapper>
  )
}

export function CompetitionRegistrationPage() {
  const [form, setForm] = useState({
    step: 0,
    competitionId: '',
    selectedCompetition: {},
    teamName: '',
    institute: '',
    ambassador: '',
    accommodation: '',
    food: '',
    teamMembers: [],
    config: {},
  })
  const { data: competitions = [], isLoading: compsLoading } = useApiQuery('/competitions_registrable/')
  const { isOpen, config, isLoading } = useRegistrationConfig('team')

  useEffect(() => {
    setForm((prev) => ({ ...prev, config }))
  }, [config])

  return (
    <PageWrapper size={3} title="Competition Registration">
      <Heading text="Competition Registration" />
      <Loader isLoading={isLoading || compsLoading}>
        {isOpen ? (
          <div className="px-6">
            <p className="my-1 text-center">
              Competitions registration form is active for {competitions.length} competitions.
            </p>
          </div>
        ) : (
          <ClosedNotice roleLabel="Competition Registration" />
        )}
      </Loader>
    </PageWrapper>
  )
}

export function VerifyRegistrationPage() {
  const [form, setForm] = useState({
    transaction_id: '',
    amount: '',
    iban: '',
    holder_name: '',
    bank_name: '',
    team_name: '',
    payment_date: '',
    team_rrn: '',
    screenshot: '',
  })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { isOpen, isLoading } = useRegistrationConfig('team')

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (
      !form.transaction_id ||
      !form.amount ||
      !form.iban ||
      !form.holder_name ||
      !form.bank_name ||
      !form.team_name ||
      !form.payment_date ||
      !form.screenshot
    ) {
      toast.error('Please fill all the fields')
      return
    }
    const dt = new Date(form.payment_date)
    const formattedDate = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`
    const fd = new FormData()
    fd.append('transaction_id', form.transaction_id)
    fd.append('amount', form.amount)
    fd.append('iban', form.iban)
    fd.append('holder_name', form.holder_name)
    fd.append('bank_name', form.bank_name)
    fd.append('team_name', form.team_name)
    fd.append('team_rrn', form.team_rrn)
    fd.append('payment_date', formattedDate)
    fd.append('screenshot', form.screenshot)
    setSubmitting(true)
    try {
      const res = await api.post('/verify/', fd)
      if (res.status === 200) {
        setStatus('Pending')
        toast.success(
          "Request received! You'll be notified via email once your payment is verified."
        )
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageWrapper size={3} title="Payment Verification">
      <Heading text="Payment Verification" />
      <Loader isLoading={isLoading}>
        {!isLoading && isOpen ? (
          <form className="px-6 bg-white p-8 rounded-2xl border border-secondary/15" onSubmit={onSubmit}>
            {status && (
              <div className="mb-6 p-4 rounded-xl bg-primary/30 border border-secondary/20 flex items-center justify-between">
                <span className="font-semibold text-secondary">Verification Status:</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold uppercase">
                  {status}
                </span>
              </div>
            )}
            <p className="mb-8 text-center text-sm text-dark/75">
              It usually takes 5 to 7 working days to verify the payment. For payment
              related issues, reach out to{' '}
              <a href="mailto:harmain@softec.org.pk" className="text-secondary font-semibold underline">
                harmain@softec.org.pk
              </a>
              .
            </p>
            <div className="md:grid-cols-2 md:gap-6 grid">
              <FormInput text="Transaction ID" value={form.transaction_id} name="transaction_id" placeholder="Enter Transaction ID" onChange={onChange} required />
              <FormInput text="Amount" value={form.amount} name="amount" type="number" placeholder="Enter Amount" onChange={onChange} required />
            </div>
            <div className="md:grid-cols-2 md:gap-6 grid">
              <FormInput text="IBAN" value={form.iban} name="iban" placeholder="Enter IBAN" onChange={onChange} required />
              <FormInput text="Account Holder Name" value={form.holder_name} name="holder_name" placeholder="Enter Holder Name" onChange={onChange} required />
            </div>
            <div className="md:grid-cols-2 md:gap-6 grid">
              <FormInput text="Bank Name" value={form.bank_name} name="bank_name" placeholder="Enter Bank Name" onChange={onChange} required />
              <FormInput text="Team Name" value={form.team_name} name="team_name" placeholder="Enter Team Name" onChange={onChange} required />
            </div>
            <div className="md:grid-cols-2 md:gap-6 grid">
              <FormInput text="Team RRN" value={form.team_rrn} name="team_rrn" placeholder="Enter Team RRN" onChange={onChange} />
              <FormInput text="Payment Date" type="date" value={form.payment_date} name="payment_date" onChange={onChange} required />
            </div>
            <Button loading={submitting} text="Submit" />
          </form>
        ) : (
          <ClosedNotice roleLabel="Payment Verification" />
        )}
      </Loader>
    </PageWrapper>
  )
}
