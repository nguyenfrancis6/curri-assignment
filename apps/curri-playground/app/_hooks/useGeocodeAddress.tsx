// Inspired by: https://designcode.io/react-hooks-handbook-geocoding-mapbox

import { useEffect, useState } from 'react'
import { useDebouncedState } from '@mantine/hooks'
import { useSearchBoxCore } from '@mapbox/search-js-react'
import { SearchBoxSuggestion } from '@mapbox/search-js-core'
import { randomBytes } from 'crypto'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYnJpYW5nb256YWxleiIsImEiOiJjbHJiY2R2cHQwbW9iMmxqcWQ4dmk4NjJpIn0._IHishRHb7c2CzoeYn71EQ'

const useGeocodeAddress = (initialValue: string) => {
  const [value, setValue] = useDebouncedState(initialValue, 200)
  const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([])

  const [clientLatitude, setClientLatitude] = useState<number | undefined>(
    undefined
  )
  const [clientLongitude, setClientLongitude] = useState<number | undefined>(
    undefined
  )
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setClientLatitude(position.coords.latitude)
      setClientLongitude(position.coords.longitude)
    })
  } else {
    console.log('Geolocation is not supported by this browser.')
  }

  const addressAutofillCore = useSearchBoxCore({
    accessToken: MAPBOX_TOKEN,
    // @ts-ignore
    types: new Set(['address', 'poi']),
  })

  const handleChange = async (value: string) => {
    if (!value) return
    try {
      const proximity: [number, number] | undefined =
        !!clientLatitude && !!clientLongitude
          ? [clientLongitude, clientLatitude]
          : undefined

      const results = await addressAutofillCore.suggest(value, {
        sessionToken: randomBytes(16).toString('hex'),
        proximity,
      })
      setSuggestions(results?.suggestions)
    } catch (error) {
      console.log('Error fetching data, ', error)
      return []
    }
  }

  useEffect(() => {
    handleChange(value)
  }, [value])

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
  }
}

export default useGeocodeAddress
