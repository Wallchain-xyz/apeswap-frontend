import React from 'react'

export interface ListMenuProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setFilterOption: React.Dispatch<React.SetStateAction<string>>
  filterOption?: string
  setSortOption: React.Dispatch<React.SetStateAction<string>>
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
