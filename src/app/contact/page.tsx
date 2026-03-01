'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ChevronRight, Mail, Phone, MapPin, Building, Send,
  CheckCircle, AlertCircle, Briefcase, Globe, ShoppingCart
} from 'lucide-react'
import { Container } from '@/components/ui/Container'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const departments = [
  {
    icon: Briefcase,
    title: 'Strategy & Business Development',
    email: 'jignesh@hemapharma.com',
    phone: '+91 95379 36912',
    color: 'bg-brand-50 text-brand-500',
  },
  {
    icon: Building,
    title: 'General Office',
    email: 'office@hemapharma.com',
    phone: '+91 93161 07473',
    color: 'bg-navy-900/5 text-navy-900',
  },
  {
    icon: Globe,
    title: 'International Sales',
    email: 'marketing@hemapharma.com',
    phone: '+91 85911 98728',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: ShoppingCart,
    title: 'Procurement',
    email: 'purchase@hemapharma.com',
    secondaryEmail: 'office@hemapharma.com',
    color: 'bg-amber-50 text-amber-600',
  },
]

/* ─── Form Schema ─── */
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().min(2, 'Company name is required'),
  country: z.string().min(2, 'Country is required'),
  department: z.string().min(1, 'Please select a department'),
  product: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
  const searchParams = useSearchParams()
  const productParam = searchParams.get('product') || ''
  const typeParam = searchParams.get('type') || ''

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    defaultValues: {
      product: productParam,
      department: typeParam === 'quality' ? 'quality' : typeParam === 'sales' ? 'sales' : '',
    },
  })

  const onSubmit = async (data: ContactForm) => {
    try {
      // POST to API route (placeholder)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  const deptRef = useRef<HTMLElement>(null)
  const deptInView = useInView(deptRef, { once: true, margin: '-10%' })

  const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'
  const errorClass = 'mt-1 text-xs text-red-500'

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Contact</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
            Get in touch with our team for product inquiries, partnership opportunities, or any questions
          </motion.p>
        </Container>
      </section>

      {/* ─── Department Cards ─── */}
      <section ref={deptRef} className="bg-white py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={deptInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Departments</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Reach the Right Team</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, i) => {
              const Icon = dept.icon
              return (
                <motion.div
                  key={dept.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={deptInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${dept.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-gray-900">{dept.title}</h3>
                  <div className="mt-3 space-y-1.5">
                    <a href={`mailto:${dept.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-500 transition-colors">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{dept.email}</span>
                    </a>
                    {dept.secondaryEmail && (
                      <a href={`mailto:${dept.secondaryEmail}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-500 transition-colors">
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{dept.secondaryEmail}</span>
                      </a>
                    )}
                    {dept.phone && (
                      <a href={`tel:${dept.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-500 transition-colors">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        {dept.phone}
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── Contact Form + Map ─── */}
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Reveal>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {submitStatus === 'success' ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                    <p className="mt-2 text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitStatus('idle')} className="mt-6 rounded-full bg-brand-500 px-6 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Something went wrong. Please try again or email us directly.
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelClass}>Name *</label>
                        <input id="name" {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })} className={inputClass} placeholder="Your full name" />
                        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>Email *</label>
                        <input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Valid email required' } })} className={inputClass} placeholder="you@company.com" />
                        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="company" className={labelClass}>Company *</label>
                        <input id="company" {...register('company', { required: 'Company is required', minLength: { value: 2, message: 'Min 2 chars' } })} className={inputClass} placeholder="Company name" />
                        {errors.company && <p className={errorClass}>{errors.company.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="country" className={labelClass}>Country *</label>
                        <input id="country" {...register('country', { required: 'Country is required', minLength: { value: 2, message: 'Min 2 chars' } })} className={inputClass} placeholder="Your country" />
                        {errors.country && <p className={errorClass}>{errors.country.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="department" className={labelClass}>Department *</label>
                        <select id="department" {...register('department', { required: 'Please select a department' })} className={inputClass}>
                          <option value="">Select department</option>
                          <option value="sales">International Sales</option>
                          <option value="business">Strategy & Business Dev</option>
                          <option value="quality">Quality Assurance</option>
                          <option value="procurement">Procurement</option>
                          <option value="general">General Inquiry</option>
                        </select>
                        {errors.department && <p className={errorClass}>{errors.department.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="product" className={labelClass}>Product Interest</label>
                        <input id="product" {...register('product')} className={inputClass} placeholder="e.g. Tamsulosin HCl" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>Message *</label>
                      <textarea id="message" rows={4} {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })} className={`${inputClass} resize-none`} placeholder="Tell us about your requirements..." />
                      {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-brand-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Map & Address */}
            <Reveal delay={0.2}>
              <div className="space-y-6">
                {/* Google Maps */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29631.5!2d73.0152!3d21.6264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be024eb39d87f21%3A0x4e30dea47e66a5e7!2sAnkleshwar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hema Pharmaceuticals Location"
                  />
                </div>

                {/* Address */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Our Address</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Hema Pharmaceuticals Pvt. Ltd.</p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          Plot No. 4603/B, Phase IV, GIDC Industrial Estate,<br />
                          Ankleshwar — 393 002, District Bharuch,<br />
                          Gujarat, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-brand-500 shrink-0" />
                      <a href="mailto:office@hemapharma.com" className="text-sm text-gray-600 hover:text-brand-500 transition-colors">
                        office@hemapharma.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-brand-500 shrink-0" />
                      <a href="tel:+919316107473" className="text-sm text-gray-600 hover:text-brand-500 transition-colors">
                        +91 93161 07473
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  )
}
