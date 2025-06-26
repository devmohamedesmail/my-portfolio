import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  title = 'Success!', 
  message = 'Your request has been submitted successfully!' 
}: SuccessModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-green-900/90 via-emerald-900/90 to-green-900/90 border-green-500/20 text-white">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <DialogTitle className="text-2xl font-bold text-green-300">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-200 text-base mt-2">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 text-center">
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
            <p className="text-green-200 text-sm">
              {t('projectRequest.successDetails')}
            </p>
          </div>

          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            {t('projectRequest.gotIt')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
