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

const formatPKR = new Intl.NumberFormat('ur-PK', {
  style: 'currency',
  currency: 'PKR',
  minimumFractionDigits: 0,
}).format

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
        Leave your email to be notified as soon as registrations reopen for SOFTEC&apos;27,
        or explore our competitions in the meantime.
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
    if (form.phone.length !== 11)
      nextErrors.phone = 'Phone must be 11 digits (e.g. 03001234567).'
    if (form.cnic.length !== 13)
      nextErrors.cnic = 'CNIC must be 13 digits without dashes.'
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
        const msg =
          err?.response?.data?.message || 'Registration Failed. Please check all fields.'
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
          <form
            className="px-6 bg-white p-8 rounded-2xl border border-secondary/15 shadow-sm"
            onSubmit={onSubmit}
          >
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
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { isOpen, isLoading } = useRegistrationConfig('officer')
  const { data: departments } = useApiQuery('departments/')
  const { data: batches } = useApiQuery('batches/')
  const { data: disciplines } = useApiQuery('disciplines/')

  const onChange = (e) => {
    setFormError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleDept = (id) => {
    setFormError('')
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
      setFormError('Phone number must be 11 digits (e.g. 03001234567).')
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
      setFormError('Please fill all required fields and select at least one department.')
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
      .catch((err) => {
        const msg = err?.response?.data?.message || 'Registration Failed!'
        setFormError(msg)
        toast.error(msg)
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <PageWrapper size={6} title="Officer Registration">
      <Heading text="Officer Registration" />
      <Loader isLoading={isLoading}>
        {!isLoading && isOpen ? (
          <form className="flex flex-col items-center justify-center w-full px-4 sm:px-6" onSubmit={onSubmit}>
            <section className="md:w-4/6 inputs w-full bg-white p-6 sm:p-8 rounded-2xl border border-secondary/15 shadow-sm">
              {formError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                  {formError}
                </div>
              )}
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

const emptyMember = () => ({
  name: '',
  email: '',
  cnic: '',
  phone: '',
  gender: '',
  food: false,
  accommodation: false,
  github: '',
  resume: null,
})

const citiesList = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Other',
].map((c, idx) => ({ id: c, name: c, value: c, key: idx }))

export function CompetitionRegistrationPage() {
  const [step, setStep] = useState(0)
  const [competitionId, setCompetitionId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [institute, setInstitute] = useState('')
  const [city, setCity] = useState('')
  const [ambassadorCode, setAmbassadorCode] = useState('')
  const [members, setMembers] = useState([emptyMember()])
  const [agreeAccuracy, setAgreeAccuracy] = useState(false)
  const [agreeConduct, setAgreeConduct] = useState(false)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { data: registrable = [], isLoading: regLoading } = useApiQuery('/competitions_registrable/')
  const { data: listable = [], isLoading: listLoading } = useApiQuery('/competitions_listable/')
  const { isOpen, config, isLoading } = useRegistrationConfig('team')

  const competitions = registrable?.length > 0 ? registrable : listable || []
  const selectedComp = competitions.find((c) => String(c.id) === String(competitionId)) || null

  const needsTechProfile = Boolean(
    selectedComp?.name &&
      /app|web|software|ai|ml|cyber|code|programming|data|game/i.test(selectedComp.name)
  )

  const maxSize = selectedComp?.max_team_size || 3
  const foodFee = config?.foodFee ?? 2500
  const accommodationFee = config?.accommodationFee ?? 1500
  const baseFee = selectedComp?.fees ?? 0

  const totalEstimate =
    baseFee +
    members.reduce(
      (sum, m) =>
        sum + (m.food ? foodFee : 0) + (m.accommodation ? accommodationFee : 0),
      0
    )

  useEffect(() => {
    if (selectedComp && members.length > maxSize) {
      setMembers((prev) => prev.slice(0, maxSize))
    }
  }, [maxSize, selectedComp, members.length])

  const updateMember = (idx, field, val) => {
    setFormError('')
    setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: val } : m)))
  }

  const handleNextStep1 = (e) => {
    e.preventDefault()
    if (!competitionId) {
      setFormError('Please select a competition to continue.')
      return
    }
    setFormError('')
    setStep(1)
  }

  const handleNextStep2 = (e) => {
    e.preventDefault()
    if (!teamName.trim() || !institute.trim() || !city) {
      setFormError('Team Name, Institute, and City are required.')
      return
    }
    setFormError('')
    setStep(2)
  }

  const handleSubmitFinal = async (e) => {
    e.preventDefault()
    const lead = members[0]
    if (!lead.name || !lead.email || !lead.cnic || !lead.phone || !lead.gender) {
      setFormError('Member 1 (Team Lead) details are required.')
      return
    }
    if (lead.cnic.length !== 13) {
      setFormError('Member 1 CNIC must be exactly 13 digits (without dashes).')
      return
    }
    if (lead.phone.length !== 11) {
      setFormError('Member 1 Phone must be exactly 11 digits (e.g. 03001234567).')
      return
    }
    if (!agreeAccuracy || !agreeConduct) {
      setFormError('Please accept both the accuracy certification and Code of Conduct.')
      return
    }

    setFormError('')
    setSubmitting(true)
    try {
      const payload = {
        competition: competitionId,
        team_name: teamName,
        institute,
        city,
        ambassador_code: ambassadorCode,
        members,
      }
      await api.post('/registration/team/', payload)
      toast.success('Team registration submitted! Proceed to Payment Verification.')
      setStep(0)
      setCompetitionId('')
      setTeamName('')
      setInstitute('')
      setCity('')
      setAmbassadorCode('')
      setMembers([emptyMember()])
      setAgreeAccuracy(false)
      setAgreeConduct(false)
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        'Registration failed. Please check all fields and try again.'
      setFormError(msg)
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageWrapper size={4} title="Competition Registration">
      <Heading
        text="Competition Registration"
        subtitle="For detailed rules and prizes, visit the Competitions page or contact harmain@softec.org.pk."
      />
      <Loader isLoading={isLoading || regLoading || listLoading}>
        {isOpen ? (
          <div className="bg-white rounded-2xl border border-secondary/15 shadow-sm p-6 sm:p-8 mx-auto">
            {/* Step Progress */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {['Competition', 'Team Details', 'Members'].map((label, idx) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                      step >= idx
                        ? 'bg-secondary text-primary'
                        : 'bg-light text-dark/50 border border-secondary/20'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className={`hidden sm:inline text-xs font-bold ${
                      step === idx ? 'text-secondary' : 'text-dark/50'
                    }`}
                  >
                    {label}
                  </span>
                  {idx < 2 && <span className="w-6 h-0.5 bg-secondary/20" />}
                </div>
              ))}
            </div>

            {formError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {formError}
              </div>
            )}

            {/* STEP 1 */}
            {step === 0 && (
              <form onSubmit={handleNextStep1} className="space-y-6">
                <FormInput
                  type="select"
                  text="Competition"
                  value={competitionId}
                  name="competition"
                  list={competitions}
                  onChange={(e) => {
                    setFormError('')
                    setCompetitionId(e.target.value)
                  }}
                  required
                />

                {selectedComp && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-light border border-secondary/15">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-dark/60 block">
                        Registration Fee
                      </span>
                      <span className="text-base font-extrabold text-secondary">
                        {formatPKR(selectedComp.fees)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-dark/60 block">
                        Max Team Size
                      </span>
                      <span className="text-base font-extrabold text-secondary">
                        {selectedComp.max_team_size} Members
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-dark/60 block">
                        Winner Prize
                      </span>
                      <span className="text-base font-extrabold text-secondary">
                        {formatPKR(selectedComp.winner_Prize)}
                      </span>
                    </div>
                  </div>
                )}

                <Button text="Next" type="submit" />
              </form>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <form onSubmit={handleNextStep2} className="space-y-4">
                <div className="p-4 rounded-xl bg-secondary text-light flex flex-wrap justify-between gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-primary font-bold block">Base Fee: {formatPKR(baseFee)}</span>
                    <span>Food: {formatPKR(foodFee)}/person • Accommodation: {formatPKR(accommodationFee)}/person</span>
                  </div>
                  <div className="text-right">
                    <span className="text-tertiary text-[10px] uppercase font-bold block">
                      Estimated Total
                    </span>
                    <span className="text-lg font-extrabold text-primary">
                      {formatPKR(totalEstimate)}
                    </span>
                  </div>
                </div>

                <FormInput
                  text="Team Name"
                  value={teamName}
                  name="teamName"
                  placeholder="Enter Team Name"
                  onChange={(e) => {
                    setFormError('')
                    setTeamName(e.target.value)
                  }}
                  required
                />
                <FormInput
                  text="Institute"
                  value={institute}
                  name="institute"
                  placeholder="FAST NUCES, Lahore"
                  onChange={(e) => {
                    setFormError('')
                    setInstitute(e.target.value)
                  }}
                  required
                />
                <FormInput
                  type="select"
                  text="City"
                  value={city}
                  name="city"
                  list={citiesList}
                  onChange={(e) => {
                    setFormError('')
                    setCity(e.target.value)
                  }}
                  required
                />
                <FormInput
                  text="Ambassador / Discount Code"
                  value={ambassadorCode}
                  name="ambassadorCode"
                  placeholder="e.g. SF0000 (Optional)"
                  onChange={(e) => setAmbassadorCode(e.target.value)}
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex-1 py-3.5 rounded-xl border-2 border-secondary text-secondary font-bold uppercase text-sm hover:bg-light"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-dark text-primary font-bold uppercase text-sm hover:bg-secondary"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <form onSubmit={handleSubmitFinal} className="space-y-6">
                <div className="flex items-center justify-between bg-light p-4 rounded-xl border border-secondary/15">
                  <span className="text-sm font-bold text-secondary">
                    Members ({members.length} / {maxSize} max)
                  </span>
                  <span className="text-sm font-extrabold text-dark">
                    Total: {formatPKR(totalEstimate)}
                  </span>
                </div>

                {members.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-secondary/20 bg-light/40 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-secondary">
                        Member {idx + 1} {idx === 0 ? '(Team Lead — Required)' : '(Optional)'}
                      </h4>
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setMembers((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="text-xs font-bold text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        text={`Member ${idx + 1} Name`}
                        value={m.name}
                        onChange={(e) => updateMember(idx, 'name', e.target.value)}
                        required={idx === 0}
                      />
                      <FormInput
                        text={`Member ${idx + 1} Email`}
                        type="email"
                        value={m.email}
                        onChange={(e) => updateMember(idx, 'email', e.target.value)}
                        required={idx === 0}
                      />
                      <FormInput
                        text={`Member ${idx + 1} CNIC`}
                        value={m.cnic}
                        placeholder="13 digits without dashes"
                        onChange={(e) => updateMember(idx, 'cnic', e.target.value)}
                        required={idx === 0}
                      />
                      <FormInput
                        text={`Member ${idx + 1} Phone`}
                        value={m.phone}
                        placeholder="03001234567"
                        onChange={(e) => updateMember(idx, 'phone', e.target.value)}
                        required={idx === 0}
                      />
                    </div>

                    <FormInput
                      type="select-gender"
                      text={`Member ${idx + 1} Gender`}
                      value={m.gender}
                      onChange={(e) => updateMember(idx, 'gender', e.target.value)}
                      required={idx === 0}
                      list={[
                        { id: 1, name: 'Male', value: 'male' },
                        { id: 2, name: 'Female', value: 'female' },
                      ]}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormInput
                        type="checkbox"
                        text={`Food (+${formatPKR(foodFee)})`}
                        checked={m.food}
                        onChange={(e) => updateMember(idx, 'food', e.target.checked)}
                      />
                      <FormInput
                        type="checkbox"
                        text={`Accommodation (+${formatPKR(accommodationFee)})`}
                        checked={m.accommodation}
                        onChange={(e) =>
                          updateMember(idx, 'accommodation', e.target.checked)
                        }
                      />
                    </div>

                    {needsTechProfile && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                          text="GitHub Link"
                          value={m.github}
                          placeholder="https://github.com/username"
                          onChange={(e) => updateMember(idx, 'github', e.target.value)}
                        />
                        <div>
                          <label className="block mb-2 text-sm font-bold text-gray-700">
                            Resume (PDF)
                          </label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              updateMember(idx, 'resume', e.target.files?.[0] || null)
                            }
                            className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-400 rounded-lg p-2.5"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {members.length < maxSize && (
                  <button
                    type="button"
                    onClick={() => setMembers((prev) => [...prev, emptyMember()])}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-secondary/40 text-secondary font-bold text-sm hover:bg-light"
                  >
                    + Add Another Team Member
                  </button>
                )}

                <div className="space-y-2 pt-2">
                  <FormInput
                    type="checkbox"
                    text="I hereby certify that the information provided herein is correct."
                    checked={agreeAccuracy}
                    onChange={(e) => setAgreeAccuracy(e.target.checked)}
                    required
                  />
                  <FormInput
                    type="checkbox"
                    text="I have read, understood, and agree to abide by the Code of Conduct."
                    checked={agreeConduct}
                    onChange={(e) => setAgreeConduct(e.target.checked)}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-xl border-2 border-secondary text-secondary font-bold uppercase text-sm hover:bg-light"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3.5 rounded-xl bg-dark text-primary font-bold uppercase text-sm hover:bg-secondary disabled:opacity-60"
                  >
                    {submitting ? 'Registering...' : 'Register Team'}
                  </button>
                </div>
              </form>
            )}
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
    screenshot: null,
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
      toast.error('Please fill all required fields and upload payment screenshot')
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
          <form
            className="px-6 bg-white p-8 rounded-2xl border border-secondary/15 shadow-sm"
            onSubmit={onSubmit}
          >
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
              <a
                href="mailto:harmain@softec.org.pk"
                className="text-secondary font-semibold underline"
              >
                harmain@softec.org.pk
              </a>
              .
            </p>
            <div className="md:grid-cols-2 md:gap-6 grid">
              <FormInput text="Transaction ID" value={form.transaction_id} name="transaction_id" placeholder="Enter Transaction ID" onChange={onChange} required />
              <FormInput text="Amount" value={form.amount} name="amount" type="number" placeholder="Enter Amount" onChange={onChange} required />
            </div>
            <div className="md:grid-cols-2 md:gap-6 grid">
              <FormInput text="IBAN / Account Number" value={form.iban} name="iban" placeholder="Enter IBAN / Account Number" onChange={onChange} required />
              <FormInput text="Payment Date" type="date" value={form.payment_date} name="payment_date" onChange={onChange} required />
            </div>
            <div className="md:grid-cols-2 md:gap-6 grid">
              <FormInput text="Account Holder Name" value={form.holder_name} name="holder_name" placeholder="John Doe" onChange={onChange} required />
              <FormInput text="Bank Name" value={form.bank_name} name="bank_name" placeholder="Faysal Bank" onChange={onChange} required />
            </div>
            <div className="md:grid-cols-2 md:gap-6 grid">
              <FormInput text="Team RRN Number" value={form.team_rrn} name="team_rrn" placeholder="PC-0000" onChange={onChange} />
              <FormInput text="Team Name" value={form.team_name} name="team_name" placeholder="Enter Team Name" onChange={onChange} required />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Screenshot <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, screenshot: e.target.files?.[0] || null }))
                }
                className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-400 rounded-lg p-3"
              />
              <p className="mt-1 text-xs text-secondary/75">
                Make sure the screenshot clearly shows transaction date, time, and amount.
              </p>
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
