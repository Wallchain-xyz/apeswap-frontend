interface IconProps {
  chain: string
  color?: string
}

const Icon: React.FC<IconProps> = ({ chain, color = 'white' }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      style={{ borderRadius: '1000px', background: color }}
      height="16px"
      width="16px"
      src={`/images/chains/${chain}.svg`}
      alt={chain}
    />
  )
}

export default Icon
