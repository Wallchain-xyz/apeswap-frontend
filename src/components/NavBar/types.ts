export interface MenuItem {
  label: string;
  href: string;
  isNew?: boolean;
}

export interface NavConfig {
  label: string;
  items?: MenuItem[];
  href?: string;
  isNew?: boolean;
}
