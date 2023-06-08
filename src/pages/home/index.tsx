import PageContainer from 'components/PageContainer'
import Home from 'views/Home'

const HomePage = ({ randomImage }: { randomImage: number }) => {
  return (
    <PageContainer variant="homepage">
      <Home randomImage={randomImage} />
    </PageContainer>
  )
}

export default HomePage
