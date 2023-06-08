import MailChimpSubscribe from 'react-mailchimp-subscribe'
import NewsletterForm from './NewsLetterForm'
import { NewsletterProps } from './types'

const Newsletter = ({ mailChimpUrl }: { mailChimpUrl: string }) => {
  return (
    <MailChimpSubscribe
      url={mailChimpUrl}
      render={({ subscribe, status, message }: any) => (
        <NewsletterForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  )
}

export default Newsletter
