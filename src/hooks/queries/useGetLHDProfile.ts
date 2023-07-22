import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { TokenProfile } from 'utils/types/lhd'

// Constants
import { LHD_API_TEMP } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

interface IGetLHDProfile {
  chainID: string
  address: string
  historic?: boolean
}

export const getLHDProfile = async ({ chainID, address }: IGetLHDProfile): Promise<TokenProfile> => {
  console.log('NON HISOTRY WAS CALLED')
  const { data } = await axios.get(`${LHD_API_TEMP}/liquidity-health-dashboard/profiles/${chainID}/${address}`)
  return data
}

export const getLHDHistoricProfile = async ({ chainID, address, historic }: IGetLHDProfile): Promise<TokenProfile> => {
  console.log('HISTORY WAS CALLED')
  const { data } = await axios.get(
    `${LHD_API_TEMP}/liquidity-health-dashboard/historic/${chainID}/${address}/${historic}`,
  )
  return data
}

export default function useGetLHDProfile({ chainID, address, historic }: IGetLHDProfile) {
  return useQuery({
    queryKey: [QUERY_KEYS.LHD_PROFILE, chainID, address, historic],
    queryFn: () =>
      !historic ? getLHDProfile({ chainID, address }) : getLHDHistoricProfile({ chainID, address, historic }),
  })
}
