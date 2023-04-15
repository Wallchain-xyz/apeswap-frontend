import React, { Dispatch, SetStateAction } from 'react'

export interface ListMenuProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setFilterOption?: (value: string | undefined) => void
  filterOption?: string
  setSortOption: Dispatch<SetStateAction<string>>
  sortOption?: string
  query: string
  checkboxLabel: string
  showOnlyCheckbox: boolean
  setShowOnlyCheckbox: (value: boolean) => void
  toogleLabels: string[]
  filterOptions?: Option[]
  sortOptions?: Option[]
  actionButton?: React.ReactNode
  showMonkeyImage?: boolean
}

export type Option = {
  label: string
  value: string
}
