// Hooks
import useGetLiveAndUpcoming from 'hooks/queries/useGetLiveAndUpcoming'

const LiveAndUpcoming = () => {
  const { data } = useGetLiveAndUpcoming()
  console.log({ data })
  return <div>LiveAndUpcoming</div>
}

export default LiveAndUpcoming
