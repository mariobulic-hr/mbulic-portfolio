'use client'

import { useState } from 'react'
import { useForm as useReactForm } from 'react-hook-form'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { useRouter } from 'next/navigation'
import styles from './QuoteForm.module.css'

interface QuoteFormData {
  firstName: string
  lastName: string
  email: string
  company?: string
  projectType: string
  budget: string
  timeline: string
  description: string
}

const MIN_STEP = 0
const MAX_STEP = 6 // Number of steps - 1

const QuoteForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useReactForm<QuoteFormData>()

  const firstName = watch('firstName')
  const lastName = watch('lastName')
  const email = watch('email')
  const company = watch('company')
  const projectType = watch('projectType')
  const budget = watch('budget')
  const timeline = watch('timeline')
  const description = watch('description')

  const prompts = [
    {
      title: 'Name and Email',
      description:
        "Thanks for reaching out! Let's get started. Can you tell me your name and email?",
    },
    {
      title: 'Company',
      description: `Thanks ${firstName || 'there'}! Just one more question, do you own a company? This is optional of course feel free to skip it.`,
    },
    {
      title: 'Project Type',
      description: `Thanks ${firstName || 'there'}! Now, let's talk about your project. What type of project do you have in mind?`,
    },
    {
      title: "Let's Determine Your Budget",
      description: `Awesome ${firstName || 'there'}! To help you estimate your maximum budget, I've provided a slider for a rough approximation. Please keep in mind that this is just an initial estimate—the final pricing will be determined after we discuss the full scope of your project. I believe in delivering value while optimizing costs, so I always take the time to thoroughly review project requirements and identify areas where we can streamline features without compromising quality. Once we go through the details, I'll be happy to suggest ways to refine the project and ensure you get the best possible outcome within your budget. Let's connect and build something great together!`,
    },
    {
      title: 'Defining Your Project Timeline',
      description: `Now that we've established the budget, let's determine your desired timeline. Delivering projects within a dedicated timeframe is a priority for me, and I understand that it's just as important for you. I always strive to complete projects as efficiently as possible without compromising quality. Once we finalize the project scope, we'll assess the necessary time to ensure a smooth and timely delivery. My goal is to optimize the process and get your project completed in the shortest time possible while maintaining high standards. Let's align on a timeline that works best for your needs!`,
    },
    {
      title: 'Project Description',
      description: `Great, ${firstName || 'there'}! Now that we've covered the basics, please provide some key details about your project. This will help me gain a better understanding of your requirements, allowing me to offer a more accurate quote and tailored recommendations.`,
    },
    {
      title: 'Review and Submit',
      description: `Thank you, ${firstName || 'there'}! Let's review the details you've provided. If everything looks correct, please click submit, and I will get back to you as soon as possible.`,
    },
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0])
  const [loading, setLoading] = useState(false)

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 0:
        return await trigger(['firstName', 'lastName', 'email'])
      case 1:
        return true
      case 2:
        return await trigger(['projectType'])
      case 3:
        return await trigger(['budget'])
      case 4:
        return await trigger(['timeline'])
      case 5:
        return await trigger(['description'])
      case 6:
        return true
      default:
        return false
    }
  }

  const handleNextStep = async () => {
    if (currentStep < MAX_STEP) {
      const isValid = await validateStep(currentStep)
      if (isValid) {
        setCurrentStep(currentStep + 1)
        setCurrentPrompt(prompts[currentStep + 1])
      }
    }
  }

  const handlePreviousStep = async () => {
    if (currentStep > MIN_STEP) {
      const isValid = await validateStep(currentStep)
      if (isValid) {
        setCurrentStep(currentStep - 1)
        setCurrentPrompt(prompts[currentStep - 1])
      }
    }
  }

  const onSubmit = async () => {
    setLoading(true)

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'mbulic@proton.me',
        from: email,
        subject: `Website Quote Request from ${firstName} ${lastName}`,
        html: `<p>
          <strong>Name:</strong> ${firstName} ${lastName}<br>
          <strong>Email:</strong> ${email}<br>
          <strong>Company:</strong> ${company}<br>
          <strong>Project Type:</strong> ${projectType}<br>
          <strong>Budget:</strong> ${budget}<br>
          <strong>Timeline:</strong> ${timeline}<br>
          <strong>Description:</strong> ${description}<br>
        </p>`,
      }),
    })

    const data = await response.json()
    setLoading(false)

    if (!data.error) {
      router.push(`/thank-you?name=${encodeURIComponent(firstName || '')}`)
    }
  }

  return (
    <>
      <div className={styles.formPrompt}>{currentPrompt.description}</div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {currentStep === 0 && (
          <>
            <div className={styles.nameFields}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName', { required: 'First name is required' })}
                  className={errors.firstName ? styles.errorInput : ''}
                />
                {errors.firstName && (
                  <span className={styles.errorMessage}>{errors.firstName.message}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName', { required: 'Last name is required' })}
                  className={errors.lastName ? styles.errorInput : ''}
                />
                {errors.lastName && (
                  <span className={styles.errorMessage}>{errors.lastName.message}</span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={errors.email ? styles.errorInput : ''}
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            </div>
          </>
        )}

        {currentStep === 1 && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="company">Company (Optional)</label>
              <input type="text" id="company" {...register('company')} />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="projectType">Project Type</label>
              <select
                id="projectType"
                {...register('projectType', { required: 'Please select a project type' })}
                className={errors.projectType ? styles.errorInput : ''}
              >
                <option value="">Select a project type</option>
                <option value="Website Development">Website Development</option>
                <option value="Web Application">Web Application</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Other">Other</option>
              </select>
              {errors.projectType && (
                <span className={styles.errorMessage}>{errors.projectType.message}</span>
              )}
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="budget">Budget Range</label>
              <select
                id="budget"
                {...register('budget', { required: 'Please select a budget range' })}
                className={errors.budget ? styles.errorInput : ''}
              >
                <option value="">Select a budget range</option>
                <option value="$0 - $1,000">0 - $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000+">$50,000+</option>
              </select>
              {errors.budget && (
                <span className={styles.errorMessage}>{errors.budget.message}</span>
              )}
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="timeline">Timeline</label>
              <select
                id="timeline"
                {...register('timeline', { required: 'Please select a timeline' })}
                className={errors.timeline ? styles.errorInput : ''}
              >
                <option value="">Select a timeline</option>
                <option value="ASAP (1-2 weeks)">ASAP (1-2 weeks)</option>
                <option value="Short term (2-4 weeks)">Short term (2-4 weeks)</option>
                <option value="Medium term (1-2 months)">Medium term (1-2 months)</option>
                <option value="Long term (3+ months)">Long term (3+ months)</option>
                <option value="Flexible">Flexible</option>
              </select>
              {errors.timeline && (
                <span className={styles.errorMessage}>{errors.timeline.message}</span>
              )}
            </div>
          </>
        )}

        {currentStep === 5 && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="description">Project Description</label>
              <textarea
                id="description"
                {...register('description', {
                  required: 'Please provide a project description',
                  minLength: {
                    value: 50,
                    message: 'Description should be at least 50 characters',
                  },
                })}
                className={errors.description ? styles.errorInput : ''}
                rows={5}
              />
              {errors.description && (
                <span className={styles.errorMessage}>{errors.description.message}</span>
              )}
            </div>
          </>
        )}

        {currentStep === 6 && (
          <>
            <div className={styles.reviewDetails}>
              <h2>Review your details</h2>
              <div className={styles.reviewDetailsGroup}>
                <span className={styles.reviewDetailsLabel}>Name</span>
                <span className={styles.reviewDetailsValue}>
                  {firstName} {lastName}
                </span>
              </div>
              <div className={styles.reviewDetailsGroup}>
                <span className={styles.reviewDetailsLabel}>Company</span>
                <span className={styles.reviewDetailsValue}>{company}</span>
              </div>
              <div className={styles.reviewDetailsGroup}>
                <span className={styles.reviewDetailsLabel}>Project Type</span>
                <span className={styles.reviewDetailsValue}>{projectType}</span>
              </div>
              <div className={styles.reviewDetailsGroup}>
                <span className={styles.reviewDetailsLabel}>Budget</span>
                <span className={styles.reviewDetailsValue}>{budget}</span>
              </div>
              <div className={styles.reviewDetailsGroup}>
                <span className={styles.reviewDetailsLabel}>Timeline</span>
                <span className={styles.reviewDetailsValue}>{timeline}</span>
              </div>
              <div className={styles.reviewDetailsGroup}>
                <span className={styles.reviewDetailsLabel}>Description</span>
                <span className={styles.reviewDetailsValue}>{description}</span>
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>
              {loading ? 'Sending...' : 'Looks good, send!'}
            </button>
          </>
        )}
      </form>
      <div className={styles.buttonContainer}>
        <button disabled={currentStep === MIN_STEP} onClick={handlePreviousStep}>
          <Icon path={mdiChevronLeft} size={1} /> Back
        </button>
        <button onClick={handleNextStep} disabled={currentStep === MAX_STEP}>
          Next
          <Icon path={mdiChevronRight} size={1} />
        </button>
      </div>
    </>
  )
}

export default QuoteForm
