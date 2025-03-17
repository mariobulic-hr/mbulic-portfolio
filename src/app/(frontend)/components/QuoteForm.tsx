'use client'

import * as React from 'react'
import { useForm as useReactForm } from 'react-hook-form'
import styles from './QuoteForm.module.css'

interface QuoteFormData {
  name: string
  email: string
  company?: string
  projectType: string
  budget: string
  timeline: string
  description: string
}

const QuoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactForm<QuoteFormData>()

  const onSubmit = async (data: QuoteFormData) => {
    console.log(data)
    // Here you would typically send the data to your backend
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className={errors.name ? styles.errorInput : ''}
        />
        {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email *</label>
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

      <div className={styles.formGroup}>
        <label htmlFor="company">Company (Optional)</label>
        <input type="text" id="company" {...register('company')} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="projectType">Project Type *</label>
        <select
          id="projectType"
          {...register('projectType', { required: 'Please select a project type' })}
          className={errors.projectType ? styles.errorInput : ''}
        >
          <option value="">Select a project type</option>
          <option value="website">Website Development</option>
          <option value="webapp">Web Application</option>
          <option value="ecommerce">E-commerce</option>
          <option value="mobile">Mobile App</option>
          <option value="other">Other</option>
        </select>
        {errors.projectType && (
          <span className={styles.errorMessage}>{errors.projectType.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="budget">Budget Range *</label>
        <select
          id="budget"
          {...register('budget', { required: 'Please select a budget range' })}
          className={errors.budget ? styles.errorInput : ''}
        >
          <option value="">Select a budget range</option>
          <option value="small">$5,000 - $10,000</option>
          <option value="medium">$10,000 - $25,000</option>
          <option value="large">$25,000 - $50,000</option>
          <option value="enterprise">$50,000+</option>
        </select>
        {errors.budget && <span className={styles.errorMessage}>{errors.budget.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="timeline">Timeline *</label>
        <select
          id="timeline"
          {...register('timeline', { required: 'Please select a timeline' })}
          className={errors.timeline ? styles.errorInput : ''}
        >
          <option value="">Select a timeline</option>
          <option value="urgent">ASAP (1-2 weeks)</option>
          <option value="short">Short term (2-4 weeks)</option>
          <option value="medium">Medium term (1-2 months)</option>
          <option value="long">Long term (3+ months)</option>
          <option value="flexible">Flexible</option>
        </select>
        {errors.timeline && <span className={styles.errorMessage}>{errors.timeline.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Project Description *</label>
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

      <button type="submit" className={styles.submitButton}>
        Request Quote
      </button>
    </form>
  )
}

export default QuoteForm
