import React, { useState } from 'react'
import { Head, useForm, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@/layouts/app-layout'
import { User } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Copy, Trash2, Settings, X } from 'lucide-react'

interface Setting {
  id: number
  key: string
  value: string
  type: string
  description?: string
  created_at: string
  updated_at: string
}

interface Props {
  auth: { user: User }
  settings: Setting[]
}

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

// Simple Confirm Dialog
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-4">{message}</p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onConfirm}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Index({ auth, settings }: Props) {
  const { t } = useTranslation()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null)
  const [deletingSetting, setDeletingSetting] = useState<Setting | null>(null)

  const addForm = useForm({
    key: '',
    value: '',
    type: 'text',
    description: ''
  })

  const editForm = useForm({
    key: '',
    value: '',
    type: 'text',
    description: ''
  })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    addForm.post(route('admin.settings.store'), {
      onSuccess: () => {
        setIsAddModalOpen(false)
        addForm.reset()
      }
    })
  }

  const handleEdit = (setting: Setting) => {
    setEditingSetting(setting)
    editForm.setData({
      key: setting.key,
      value: setting.value,
      type: setting.type,
      description: setting.description || ''
    })
    setIsEditModalOpen(true)
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSetting) return
    
    editForm.put(route('admin.settings.update', editingSetting.id), {
      onSuccess: () => {
        setIsEditModalOpen(false)
        setEditingSetting(null)
        editForm.reset()
      }
    })
  }

  const handleCopy = (setting: Setting) => {
    router.post(route('admin.settings.copy', setting.id))
  }

  const handleDeleteClick = (setting: Setting) => {
    setDeletingSetting(setting)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (!deletingSetting) return
    router.delete(route('admin.settings.destroy', deletingSetting.id))
    setIsDeleteModalOpen(false)
    setDeletingSetting(null)
  }

  const getTypeColor = (type: string) => {
    const colors = {
      text: 'bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs',
      number: 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs',
      boolean: 'bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs',
      url: 'bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs',
      email: 'bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs',
      file: 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs'
  }

  const truncateValue = (value: string, maxLength = 50) => {
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value
  }

  return (
    <AppLayout>
      <Head title={t('admin.settings.title')} />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Settings className="h-6 w-6" />
                {t('admin.settings.title')}
              </h1>
              <p className="text-gray-600 mt-1">{t('admin.settings.description')}</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t('admin.settings.table.addNew')}
            </Button>
          </div>

          {/* Settings Table */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.settings.table.title')}</CardTitle>
              <CardDescription>
                {settings.length} {settings.length === 1 ? 'setting' : 'settings'} configured
              </CardDescription>
            </CardHeader>
            <CardContent>
              {settings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{t('admin.settings.table.noSettings')}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-gray-50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">{t('admin.settings.table.key')}</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">{t('admin.settings.table.value')}</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">{t('admin.settings.table.type')}</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">{t('admin.settings.table.description')}</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-gray-600">{t('admin.settings.table.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {settings.map((setting) => (
                        <tr key={setting.id} className="border-b transition-colors hover:bg-gray-50">
                          <td className="p-4 align-middle font-mono text-sm font-medium">
                            {setting.key}
                          </td>
                          <td className="p-4 align-middle">
                            <span className="cursor-help" title={setting.value}>
                              {truncateValue(setting.value)}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <span className={getTypeColor(setting.type)}>
                              {setting.type}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            {setting.description ? (
                              <span className="cursor-help" title={setting.description}>
                                {truncateValue(setting.description, 30)}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(setting)}
                                title={t('admin.settings.table.edit')}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopy(setting)}
                                title={t('admin.settings.table.copy')}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteClick(setting)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                title={t('admin.settings.table.delete')}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Setting Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('admin.settings.form.addTitle')}
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <Label htmlFor="key">{t('admin.settings.form.key')}</Label>
            <Input
              id="key"
              placeholder={t('admin.settings.form.keyPlaceholder')}
              value={addForm.data.key}
              onChange={(e) => addForm.setData('key', e.target.value)}
              className={addForm.errors.key ? 'border-red-500' : ''}
            />
            {addForm.errors.key && (
              <p className="text-sm text-red-500 mt-1">{addForm.errors.key}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">{t('admin.settings.form.keyHelper')}</p>
          </div>
          
          <div>
            <Label htmlFor="value">{t('admin.settings.form.value')}</Label>
            <Textarea
              id="value"
              placeholder={t('admin.settings.form.valuePlaceholder')}
              value={addForm.data.value}
              onChange={(e) => addForm.setData('value', e.target.value)}
              className={addForm.errors.value ? 'border-red-500' : ''}
            />
            {addForm.errors.value && (
              <p className="text-sm text-red-500 mt-1">{addForm.errors.value}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="type">{t('admin.settings.form.type')}</Label>
            <select
              id="type"
              value={addForm.data.type}
              onChange={(e) => addForm.setData('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">{t('admin.settings.form.typeText')}</option>
              <option value="number">{t('admin.settings.form.typeNumber')}</option>
              <option value="boolean">{t('admin.settings.form.typeBoolean')}</option>
              <option value="url">{t('admin.settings.form.typeUrl')}</option>
              <option value="email">{t('admin.settings.form.typeEmail')}</option>
              <option value="file">{t('admin.settings.form.typeFile')}</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="description">{t('admin.settings.form.description')}</Label>
            <Input
              id="description"
              placeholder={t('admin.settings.form.descriptionPlaceholder')}
              value={addForm.data.description}
              onChange={(e) => addForm.setData('description', e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              {t('admin.settings.table.cancel')}
            </Button>
            <Button type="submit" disabled={addForm.processing}>
              {addForm.processing ? t('admin.settings.form.saving') : t('admin.settings.form.save')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Setting Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={t('admin.settings.form.editTitle')}
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <Label htmlFor="edit-key">{t('admin.settings.form.key')}</Label>
            <Input
              id="edit-key"
              placeholder={t('admin.settings.form.keyPlaceholder')}
              value={editForm.data.key}
              onChange={(e) => editForm.setData('key', e.target.value)}
              className={editForm.errors.key ? 'border-red-500' : ''}
            />
            {editForm.errors.key && (
              <p className="text-sm text-red-500 mt-1">{editForm.errors.key}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="edit-value">{t('admin.settings.form.value')}</Label>
            <Textarea
              id="edit-value"
              placeholder={t('admin.settings.form.valuePlaceholder')}
              value={editForm.data.value}
              onChange={(e) => editForm.setData('value', e.target.value)}
              className={editForm.errors.value ? 'border-red-500' : ''}
            />
            {editForm.errors.value && (
              <p className="text-sm text-red-500 mt-1">{editForm.errors.value}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="edit-type">{t('admin.settings.form.type')}</Label>
            <select
              id="edit-type"
              value={editForm.data.type}
              onChange={(e) => editForm.setData('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">{t('admin.settings.form.typeText')}</option>
              <option value="number">{t('admin.settings.form.typeNumber')}</option>
              <option value="boolean">{t('admin.settings.form.typeBoolean')}</option>
              <option value="url">{t('admin.settings.form.typeUrl')}</option>
              <option value="email">{t('admin.settings.form.typeEmail')}</option>
              <option value="file">{t('admin.settings.form.typeFile')}</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="edit-description">{t('admin.settings.form.description')}</Label>
            <Input
              id="edit-description"
              placeholder={t('admin.settings.form.descriptionPlaceholder')}
              value={editForm.data.description}
              onChange={(e) => editForm.setData('description', e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              {t('admin.settings.table.cancel')}
            </Button>
            <Button type="submit" disabled={editForm.processing}>
              {editForm.processing ? t('admin.settings.form.updating') : t('admin.settings.form.update')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={t('admin.settings.table.confirmDelete')}
        message={deletingSetting ? `This will permanently delete the setting "${deletingSetting.key}".` : ''}
      />
    </AppLayout>
  )
}
