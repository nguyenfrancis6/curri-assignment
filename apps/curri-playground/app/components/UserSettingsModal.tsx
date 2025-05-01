'use client'

import { Button, Checkbox, Modal, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import {
  UserQuery,
  useUpdateOrderNumberFormatMutation,
} from '../_graphql-generated'
import { IconX } from '@tabler/icons-react'
import { toast } from 'react-toastify'

type UserSettingsModalProps = {
  isOpen: boolean
  close: () => void
  user?: UserQuery['user']
}

export const UserSettingsModal = ({
  isOpen,
  close,
  user,
}: UserSettingsModalProps) => {
  const [orderNumberRestrictions, setOrderNumberRestrictions] =
    useState<string>('')
  const [formatError, setFormatError] = useState<string | null>(null)
  const [updateFormat] = useUpdateOrderNumberFormatMutation()

  useEffect(() => {
    if (isOpen) {
      // Prefill with the user's format or fallback to an empty string for new users
      setOrderNumberRestrictions(user?.orderNumberFormat || '')
    }
  }, [isOpen, user?.orderNumberFormat])

  const addToFormat = (symbol: string) => {
    setOrderNumberRestrictions(prev => prev + symbol)
  }

  const handleUpdate = async () => {
    if (orderNumberRestrictions.length > 15) {
      setFormatError('Format must be 15 characters or less.')
      return
    }
    if (
      orderNumberRestrictions.startsWith('-') ||
      orderNumberRestrictions.endsWith('-')
    ) {
      setFormatError('Dash cannot be at the start or end.')
      return
    }
  
    try {
      await updateFormat({
        variables: {
          data: {
            userId: user?.id!,
            format: orderNumberRestrictions,
          },
        },
      })
      setFormatError(null)
      toast.success('Order number format updated successfully!')
      close()
    } catch (error) {
      setFormatError('Failed to update format. Please try again.')
    }
  }
  

  

  return (
    <Modal opened={isOpen} onClose={close}>
      <h1 style={{ marginTop: '0px' }}>User Settings</h1>
      <hr />
      <TextInput
        size="lg"
        label="Order number Format"
        value={orderNumberRestrictions}
        placeholder='Ex. "XX-####-XX"'
        onChange={() => {}}
        rightSection={
          <IconX
            size={18}
            style={{ cursor: 'pointer', color: 'gray' }}
            onClick={() => setOrderNumberRestrictions('')} // Clears the entire field
          />
        }
        style={{ marginBottom: '20px' }}
        readOnly={true}
      />
      {formatError && (
        <div
          style={{
            color: 'red',
            fontSize: '14px',
            marginTop: '-12px',
            marginBottom: '10px',
          }}
        >
          {formatError}
        </div>
      )}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        <Button onClick={() => addToFormat('#')}>Number</Button>
        <Button onClick={() => addToFormat('X')}>Letter</Button>
        <Button onClick={() => addToFormat('-')}>Dash</Button>
        <Button
          variant="filled"
          color="red"
          size="sm"
          onClick={() => {
            setOrderNumberRestrictions(prev => prev.slice(0, prev.length - 1)) // Removes the last character
          }}
        >
          Del
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
        }}
      >
        <Button color="black" onClick={() => close()}>Cancel</Button>
        <Button
          disabled={orderNumberRestrictions.length === 0}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </Modal>
  )
}
