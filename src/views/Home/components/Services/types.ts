import { ServiceData } from "state/homepage/types"

export interface DefaultServiceData {
  id: string
  title: string
  description: string
  backgroundImg: string
  link: string
  stats: ServiceData[]
}
