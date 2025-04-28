'use client'

import { Button, Checkbox, Modal, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { UserQuery } from '../_graphql-generated'

type UserSettingsModalProps = {
    isOpen: boolean
    close: () => void
    user?: UserQuery['user']
}

export const UserSettingsModal = ({ isOpen, close, user }: UserSettingsModalProps) => {
  const [orderNumberRestrictions, setOrderNumberRestrictions] = useState<string>()

  return (
    <Modal opened={isOpen} onClose={close}>
        <h1 style={{marginTop: '0px'}}>User Settings</h1>
        <hr />
        <TextInput
            size="lg"
            label="Order number restrictions"
            value={orderNumberRestrictions}
            onChange={(e) => {
              setOrderNumberRestrictions(e.target.value)
            }}
            style={{marginBottom: '20px'}}
        />
        <Checkbox label='Order number required?'/>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '16px'
        }}>
            <Button color='black'>Cancel</Button>
            <Button>Update</Button>
        </div>
    </Modal>
  )
}
