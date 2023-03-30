import React, { useState, ChangeEvent } from 'react'
import { FormType } from './types'
import styles, { dynamicStyles } from './styles'
import Privacy from './Privacy'
import { Button, Flex, Svg, Text } from 'components/uikit'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import { useTranslation } from 'contexts/Localization'
import { Input } from 'theme-ui'

const NewsletterForm: React.FC<FormType> = ({ status, message, onValidated, isModal }) => {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const isMd = isMobile
  const isLg = isTablet
  const isXl = isDesktop
  const [subscriber, setSubscriber] = useState('')
  const { t } = useTranslation()

  const onHandleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setSubscriber(value)
  }

  const handleSubmit = (evt: MouseEvent) => {
    evt.preventDefault()
    if (!(subscriber.indexOf('@') > -1)) return
    if (subscriber.indexOf('@') > -1) {
      onValidated({
        EMAIL: subscriber,
      })
      setSubscriber('')
    }
  }

  // On route change, reset input, status and message to ""

  return (
    <Flex sx={dynamicStyles.newsletterCon({ isModal, isMobile, status })}>
      <Flex sx={dynamicStyles.bodyCon({ isModal, isMobile, isTablet })}>
        <Flex sx={dynamicStyles.content({ isModal })}>
          <Flex sx={dynamicStyles.left({ isModal })}>
            <Text sx={dynamicStyles.latestText({ isModal })}>
              Get the latest news from ApeSwap directly to your{isModal && isMd && <br />} inbox.
            </Text>
            {!isModal && <Privacy t={t} />}
          </Flex>

          <Flex sx={dynamicStyles.formCon({ isModal })}>
            <Flex
              className="input-form-container"
              as="form"
              onSubmit={(e: MouseEvent) => handleSubmit(e)}
              sx={dynamicStyles.form({ isModal })}
            >
              <Flex sx={{ alignItems: 'center' }}>
                <Svg icon="message" />
                <Input
                  className="input"
                  name="EMAIL"
                  onChange={onHandleChange}
                  value={subscriber}
                  placeholder={(status === 'success' && message) || 'example@domain.com'}
                  sx={dynamicStyles.input({ isModal, isLg, isXl, isMd, status })}
                />
              </Flex>
              <Button
                variant="text"
                className="input-btn"
                type="submit"
                formValues={[subscriber]}
                disabled={status === 'sending'}
                sx={styles.submit}
              >
                {status === 'sending' ? (
                  '...'
                ) : (
                  <Text weight={400} size="38px" mt="1px">
                    {'>'}
                  </Text>
                )}
              </Button>
            </Flex>
            {status === 'error' && (
              <Text color="error" sx={styles.status}>
                {t("Invalid email address. Make sure the format is 'email@domain.com'")}
              </Text>
            )}
          </Flex>
          {isModal && <Privacy isModal={isModal} t={t} />}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NewsletterForm
