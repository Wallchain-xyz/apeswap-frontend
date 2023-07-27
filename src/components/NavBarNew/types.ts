export interface NavItemOptions {
  itemLabel: string
  itemDesc: string
  href: string
  icon: string // Assumes format of {icon}-dark.svg or {icon}-light.svg for image files
}
export interface NavItem {
  label: string
  items?: NavItemOptions[]
  href?: string
}
