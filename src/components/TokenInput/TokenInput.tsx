import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { InputProps } from 'theme-ui'
import { Button, Flex, StyledInput } from 'components/uikit'
import styled from '@emotion/styled'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({ max, symbol, onChange, onSelectMax, value }) => {
  const { t } = useTranslation()
  return (
    <StyledTokenInput>
      <StyledMaxText>
        {max.toLocaleString()} {symbol} {t('Available')}
      </StyledMaxText>
      <StyledInput
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <span sx={{ color: 'text' }}>{symbol}</span>
            <StyledSpacer />
            <div>
              <StyledButton size="sm" onClick={onSelectMax}>
                {t('Max')}
              </StyledButton>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``

const StyledSpacer = styled(Flex)`
  flex-direction: column;
  width: 8px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledButton = styled(Button)`
  align-items: center;
  display: flex;
  background-color: #ffb300;
  box-shadow: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
`

const StyledMaxText = styled(Flex)`
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  font-size: 12px;
  font-weight: 500;
  height: 18px;
  justify-content: flex-end;
  margin-bottom: 5px;
`

export default TokenInput
