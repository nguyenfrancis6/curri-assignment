'use client'

import { PageWrapper } from './components/PageWrapper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logo } from './components/Logo'
import { VehicleTile } from './components/VehicleTile'
import { SearchBoxSuggestion, AutofillSuggestion } from '@mapbox/search-js-core'
import useGeocodeAddress from './_hooks/useGeocodeAddress'
import { TextInput, Space, Button, SimpleGrid, Divider } from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconMapPinFilled,
  IconFlagFilled,
  IconSquareNumber1,
  IconSquareNumber2,
  IconSquareNumber3,
  IconSettings,
} from '@tabler/icons-react'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useBookDeliveryMutation, useUserQuery } from './_graphql-generated'
import { UserSettingsModal } from './components/UserSettingsModal'

function formatToRegex(format: string): RegExp {
  const escaped = format
    .split('')
    .map(char => {
      if (char === 'X') return '[A-Za-z]'
      if (char === '#') return '\\d'
      if (char === '-') return '-'
      return '' // ignore unsupported chars
    })
    .join('')
  return new RegExp(`^${escaped}$`)
}

const EMPTY_FORM = {
  initialValues: {
    originAddressInputString: '',
    originAddress: {
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
    },
    destinationAddressInputString: '',
    destinationAddress: {
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
    },
    orderNumber: '',
    vehicle: 'car',
  },
}

const CLASSNAME_FOR_BODY_EVENT_CANCELLATION = 'cancel-body-event'

const StopInputWrapper = styled.div`
  width: 100%;
  position: relative;
`

const AddressSuggestionsWrapper = styled.div`
  position: absolute;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
  z-index: 100;
  border: 1px solid #ccc;
`

const AddressSuggestion = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`

const AddressSuggestions = ({
  suggestions,
  selectSuggestion,
  className,
}: {
  suggestions: SearchBoxSuggestion[]
  selectSuggestion: Function
  className?: string
}) => {
  return (
    <AddressSuggestionsWrapper className={className}>
      {suggestions.map(suggestion => (
        <AddressSuggestion
          className={CLASSNAME_FOR_BODY_EVENT_CANCELLATION}
          key={suggestion.full_address}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            selectSuggestion(suggestion)
          }}
        >
          <strong>{suggestion.name}</strong>
          <br />
          {suggestion.full_address}
        </AddressSuggestion>
      ))}
    </AddressSuggestionsWrapper>
  )
}

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */

  const form = useForm(EMPTY_FORM)

  const [bookDeliveryMutation] = useBookDeliveryMutation()

  const { data: userData } = useUserQuery({
    variables: {
      id: 1,
    }
  })

  const [originInputFocused, setOriginInputFocused] = useState(false)
  const [destinationInputFocused, setDestinationInputFocused] = useState(false)
  const [userSettingsModalOpen, setUserSettingsModalOpen] = useState(false)
  const [orderNumberError, setOrderNumberError] = useState<string | null>(null)
  const geocodeOriginAddress = useGeocodeAddress('')
  const geocodeDestinationAddress = useGeocodeAddress('')

  useEffect(() => {
    if (!form.values.originAddressInputString) return
    geocodeOriginAddress.setValue(form.values.originAddressInputString)
  }, [form.values.originAddressInputString])

  useEffect(() => {
    if (!form.values.destinationAddressInputString) return
    geocodeDestinationAddress.setValue(
      form.values.destinationAddressInputString
    )
  }, [form.values.destinationAddressInputString])

  useEffect(() => {
    if (!userData?.user?.orderNumberFormat || !form.values.orderNumber) {
      setOrderNumberError(null)
      return
    }
  
    const regex = formatToRegex(userData.user.orderNumberFormat)
    const isValid = regex.test(form.values.orderNumber)
  
    if (!isValid) {
      setOrderNumberError(
        `Order number must match the format: ${userData.user.orderNumberFormat}`
      )
    } else {
      setOrderNumberError(null)
    }
  }, [form.values.orderNumber, userData?.user?.orderNumberFormat])

  // @ts-ignore
  const handleBodyClick = e => {
    if (e.target.classList.contains(CLASSNAME_FOR_BODY_EVENT_CANCELLATION)) {
      return
    }
    setDestinationInputFocused(false)
    setOriginInputFocused(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick)
    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  }, [])
  return (
    <>
      <ToastContainer />
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}  
      >
        {userData?.user?.firstName} {userData?.user?.lastName} | {userData?.user?.emailAddress}
        <IconSettings height='28px' style={{ cursor: 'pointer' }} onClick={() => {
          setUserSettingsModalOpen(true)
        }}/>
      </div>
      <div 
        style={{
          display: 'flex',
          width: '100%',
          margin: '25px 0px 45px',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textTransform: 'uppercase',
          letterSpacing: 2,
          fontWeight: 300,
        }}
      >
        <Logo width={150} style={{ marginBottom: 10 }} />
        <span>Playground</span>
      </div>
      <PageWrapper>
        <h2 style={{marginTop: '8px'}}>
          <IconSquareNumber1
            height="28px"
            style={{ verticalAlign: 'text-top', marginRight: 5 }}
          />{' '}
          Stops
        </h2>
        <StopInputWrapper>
          <TextInput
            size="lg"
            label="Origin"
            className={CLASSNAME_FOR_BODY_EVENT_CANCELLATION}
            leftSection={<IconMapPinFilled size={14} />}
            {...form.getInputProps('originAddressInputString')}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setOriginInputFocused(true)
            }}
            value={form.values.originAddressInputString}
          />
          {originInputFocused ? (
            <AddressSuggestions
              className={CLASSNAME_FOR_BODY_EVENT_CANCELLATION}
              suggestions={geocodeOriginAddress.suggestions}
              selectSuggestion={(suggestion: SearchBoxSuggestion) => {
                const address = suggestion.context

                if (
                  !address.address?.name ||
                  !address.place?.name ||
                  !address.region?.name ||
                  !address.postcode?.name
                )
                  return

                form.setValues({
                  originAddress: {
                    name: suggestion.name,
                    addressLine1: address.address?.name,
                    addressLine2: address.address?.name,
                    city: address.place?.name,
                    state: address.region?.name,
                    postalCode: address.postcode?.name,
                  },
                  originAddressInputString: suggestion.full_address
                })
                setOriginInputFocused(false)
              }}
            />
          ) : null}
        </StopInputWrapper>
        <Space h="md" />
        <StopInputWrapper>
          <TextInput
            size="lg"
            label="Destination"
            className={CLASSNAME_FOR_BODY_EVENT_CANCELLATION}
            {...form.getInputProps('destinationAddressInputString')}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setDestinationInputFocused(true)
            }}
            leftSection={<IconFlagFilled size={14} />}
            value={form.values.destinationAddressInputString}
          />
          {destinationInputFocused ? (
            <AddressSuggestions
              className={CLASSNAME_FOR_BODY_EVENT_CANCELLATION}
              suggestions={geocodeDestinationAddress.suggestions}
              selectSuggestion={(suggestion: SearchBoxSuggestion) => {
                const address = suggestion.context

                if (
                  !address.address?.name ||
                  !address.place?.name ||
                  !address.region?.name ||
                  !address.postcode?.name
                )
                  return

                form.setValues({
                  destinationAddress: {
                    name: suggestion.name,
                    addressLine1: address.address?.name,
                    addressLine2: address.address?.name,
                    city: address.place?.name,
                    state: address.region?.name,
                    postalCode: address.postcode?.name,
                  },
                  destinationAddressInputString: suggestion.full_address
                })
                setDestinationInputFocused(false)
              }}
          />
          ) : null}
        </StopInputWrapper>
        <Space h="xl" />
        <h2>
          <IconSquareNumber2
            height="28px"
            style={{ verticalAlign: 'text-top', marginRight: 5 }}
          />{' '}
          Delivery info
        </h2>
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={{ base: 'sm' }}
          verticalSpacing={{ base: 'sm' }}
        >
          <TextInput
            {...form.getInputProps('orderNumber')}
            size="lg"
            label="Order number"
            value={form.values.orderNumber}
            onChange={(e) => {
              form.setValues({
                orderNumber: e.target.value,
              })
            }}
          />
        </SimpleGrid>
        <div style={{ marginTop: '4px', fontSize: '14px', color: '#666' }}>
            {userData?.user?.orderNumberFormat ? (
              <>Format: <strong>{userData.user.orderNumberFormat}</strong></>
            ) : (
              <>No format defined yet. <span style={{ color: '#007aff', cursor: 'pointer' }} onClick={() => setUserSettingsModalOpen(true)}>Click here to set one.</span></>
            )}
        </div>
        {orderNumberError && (
          <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
            {orderNumberError}
          </div>
        )}
        <Space h="xl" />
        <h2>
          <IconSquareNumber3
            height="28px"
            style={{ verticalAlign: 'text-top', marginRight: 5 }}
          />{' '}
          Vehicle
        </h2>
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={{ base: 'sm' }}
          verticalSpacing={{ base: 'sm' }}
        >
          {['car', 'van', 'truck', 'flatbed', 'dryvan'].map(vehicle => (
            <VehicleTile
              key={vehicle}
              selected={form.values.vehicle === vehicle}
              onClick={() => form.setValues({ vehicle: vehicle })}
            >
              {vehicle.toUpperCase()}
            </VehicleTile>
          ))}
        </SimpleGrid>
        <Space h="50px" />
        <Button size="xl" color="black" fullWidth 
          disabled={!form.values.destinationAddress.addressLine1 || 
                    !form.values.originAddress.addressLine1 || 
                    !form.values.vehicle || 
                    !form.values.orderNumber ||
                    !!orderNumberError
                  }
          onClick={async () => {
            await bookDeliveryMutation({
              variables: {
                data: {
                  vehicle: 'car',
                  destinationAddress: {
                    addressLine1: form.values.destinationAddress.addressLine1,
                    postalCode: form.values.destinationAddress.postalCode,
                    state: form.values.destinationAddress.state,
                    city: form.values.destinationAddress.city,
                  },
                  originAddress: {
                    addressLine1: form.values.originAddress.addressLine1,
                    postalCode: form.values.originAddress.postalCode,
                    state: form.values.originAddress.state,
                    city: form.values.originAddress.city,
                  },
                  orderNumber: form.values.orderNumber
                }
              }
            })

            form.setValues({ ...EMPTY_FORM.initialValues })

            toast.success("Delivery booked!")
          }}
        >
          Book delivery
        </Button>
      </PageWrapper>
      <UserSettingsModal 
        isOpen={userSettingsModalOpen} 
        close={() => setUserSettingsModalOpen(false)}
        user={userData?.user}
      />
    </>
  )
}
