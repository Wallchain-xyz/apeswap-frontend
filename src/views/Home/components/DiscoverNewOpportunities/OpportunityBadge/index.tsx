import { Badge } from 'theme-ui'

// Components
import { Text } from 'components/uikit'
import { type } from 'os'

interface OpportunityBadgeProps {
  type: 'featured' | 'new'
}

const OpportunityBadge = ({ type }: OpportunityBadgeProps) => {
  return (
    <Badge
      sx={{
        px: '3px',
        h: '12px',
        bg: '#FDFBF5',
        borderRadius: '3px',
      }}
    >
      <Text sx={{ fontSize: '8px', fontWeight: '500', color: 'red' }}>{type}</Text>
    </Badge>
  )
}

export default OpportunityBadge
