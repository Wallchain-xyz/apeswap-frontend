import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

type IndustryStats = {
  averageConcentrationScore: number
  averageHealthScore: number
  averageOwnershipScore: number
  averageTotalScore: number
  chainsSupported: number
  coefficients: {
    concentration: number
    health: number
    ownership: number
  }
  createdAt: string
  evmCoverage: string
  formulaVersion: string
  tokensTracked: number
  tokensVerified: number
}

const getIndustryStats = async (): Promise<IndustryStats> => {
  const { data } = await axios.get(`${LHD_API}/industry-stats`)
  return data
}

export default function useGetIndustryStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.INDUSTRY_STATS],
    queryFn: () => getIndustryStats(),
  })
}
