import styled from 'styled-components'
import { DEFAULT_THEME } from '@mantine/core'

export const VehicleTile = styled.div<{ selected: boolean }>`
  background-color: ${DEFAULT_THEME.colors.blue[0]};
  border: 3px solid
    ${({ selected }) =>
      selected ? DEFAULT_THEME.colors.blue[5] : 'transparent'};
  padding: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`
