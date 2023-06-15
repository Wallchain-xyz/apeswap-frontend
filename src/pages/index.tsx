import HomePage from './home'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  // Generates a random number on the server which is then passed to the client for consistency between them.
  // Bear in mind this amountOfBillsImages should be updated if the amount of bills images change
  const amountOfBillsImages = 10
  const randomImage = Math.floor(Math.random() * (amountOfBillsImages + 1))
  return {
    props: {
      randomImage,
    },
  }
}
export default function Index({ randomImage }: { randomImage: number }) {
  return <HomePage randomImage={randomImage} />
}
