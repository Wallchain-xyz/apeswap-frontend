import { connectionIcons, listOfConnections } from '../../utils/connection'
import { Text, Button, Image } from 'theme-ui'
import { getConnectionName } from '../../utils/connection/utils'
import useActivate from '../../utils/connection/activate'
import Flex from 'components/Flex'

const ConenctWallet = () => {
  const activate = useActivate()
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      {listOfConnections.map((connection) => {
        return (
          <Button
            onClick={() => activate(connection)}
            margin="10px 0px"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key={getConnectionName({ connection })}
          >
            <Image
              src={connectionIcons[connection.type]?.src}
              width="20px"
              mr="10px"
            />
            <Text>{getConnectionName({ connection })}</Text>
          </Button>
        )
      })}
    </Flex>
  )
}

export default ConenctWallet
