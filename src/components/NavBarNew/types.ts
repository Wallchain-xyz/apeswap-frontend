export interface NavItemOptions {
  itemLabel: string
  itemDesc: string
  href: string
  icon: string // Assumes format of name-dark/light.svg
}
export interface NavItem {
  label: string
  items?: NavItemOptions[]
  href?: string
}
