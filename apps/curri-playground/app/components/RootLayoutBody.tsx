'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

const StyledBody = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  padding: 25px;
`

export const RootLayoutBody = ({ children }: Props) => {
  return <StyledBody>{children}</StyledBody>
}
