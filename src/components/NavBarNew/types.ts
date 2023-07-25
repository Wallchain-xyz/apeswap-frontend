export interface NavItemOptions {
  itemLabel: string
  itemDesc: string
  href: string
  icon: string
}
export interface NavItem {
  label: string
  items?: NavItemOptions[]
  href?: string
}
