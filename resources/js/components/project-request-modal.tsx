import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from '@inertiajs/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import SuccessModal from './success-modal'

interface ProjectRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ProjectRequestForm {
  name: string
  email: string
  phone: string
  project_idea: string
  [key: string]: any
}

export default function ProjectRequestModal({ isOpen, onClose }: ProjectRequestModalProps) {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const { data, setData, post, reset, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    project_idea: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    post('/project-requests', {
      onSuccess: () => {
        // Show success modal and close main modal immediately
        setTimeout(() => {
          setShowSuccessModal(true)
        }, 100)
        reset()
        onClose()
      },
      onError: () => {
        // Errors will be displayed via the errors object
        console.error('Form submission error:', errors)
      },
      onFinish: () => {
        setIsSubmitting(false)
      },
    })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('projectRequest.title')}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-base">
              {t('projectRequest.description')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* ...existing form content... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-200">
                  {t('projectRequest.name')} *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                  placeholder={t('projectRequest.namePlaceholder')}
                  required
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
                  {t('projectRequest.phone')} *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                  placeholder={t('projectRequest.phonePlaceholder')}
                  required
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                {t('projectRequest.email')} *
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                placeholder={t('projectRequest.emailPlaceholder')}
                required
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_idea" className="text-sm font-medium text-gray-200">
                {t('projectRequest.projectIdea')} *
              </Label>
              <Textarea
                id="project_idea"
                value={data.project_idea}
                onChange={(e) => setData('project_idea', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400 min-h-[120px] resize-none"
                placeholder={t('projectRequest.projectIdeaPlaceholder')}
                required
              />
              {errors.project_idea && (
                <p className="text-red-400 text-sm">{errors.project_idea}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('projectRequest.submitting')}
                  </>
                ) : (
                  t('projectRequest.submit')
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 border-2 border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black font-semibold py-3 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {t('projectRequest.cancel')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t('projectRequest.successTitle')}
        message={t('projectRequest.successMessage')}
      />
    </>
  )
}
