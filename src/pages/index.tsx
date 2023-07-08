import HomePage from './home'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  // Generates a random number on the server which is then passed to the client for consistency between them.
  // Bear in mind this amountOfBillsImages should be updated if the amount of bills images change
  const getRandomImg = (imageCount: number): number => {
    return Math.floor(Math.random() * (imageCount + 1))
  }
  const BILLS_IMAGES_COUNT = 10
  const LHD_IMAGES_COUNT = 7
  const randomImage = getRandomImg(BILLS_IMAGES_COUNT)
  const randomLHDImage = getRandomImg(LHD_IMAGES_COUNT)
  return {
    props: {
      randomImage,
      randomLHDImage,
    },
  }
}
export default function Index({ randomImage, randomLHDImage }: { randomImage: number; randomLHDImage: number }) {
  return <HomePage randomImage={randomImage} randomLHDImage={randomLHDImage} />
}
