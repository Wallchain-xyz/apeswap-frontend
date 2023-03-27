import MailChimpSubscribe from 'react-mailchimp-subscribe'
import NewsletterForm from './NewsLetterForm'
import { NewsletterProps } from './types'

const Newsletter = ({ isNewsModal, mailChimpUrl }: { isNewsModal: boolean | undefined; mailChimpUrl: string }) => {
  return (
    <MailChimpSubscribe
      url={mailChimpUrl}
      render={({ subscribe, status, message }: any) => (
        <NewsletterForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
          isModal={isNewsModal}
        />
      )}
    />
  )
}

export default Newsletter
