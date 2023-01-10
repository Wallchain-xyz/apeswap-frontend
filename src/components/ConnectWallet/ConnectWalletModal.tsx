import { Button, Flex, Modal, Svg, Text } from "components/uikit";
import { useAppDispatch } from "state/hooks";
import { updateSelectedWallet } from "state/user/reducer";
import useActivate from "utils/connection/activate";
import connectors from "./config";

const ConnectWalletModal = ({ onDismiss }: { onDismiss: () => void }) => {
  const activate = useActivate();
  const dispatch = useAppDispatch();
  return (
    <Modal maxWidth="400px" minWidth="350px" title="Connect to a Wallet">
      <Flex
        sx={{ height: "400px", flexDirection: "column", overflow: "scroll" }}
      >
        {connectors.map(({ label, icon, connection }) => {
          return (
            <Button
              fullWidth
              variant="tertiary"
              sx={{
                justifyContent: "space-between",
                margin: "3.5px 0px",
                height: "45px",
                alignItems: "center",
                background: "white4",
              }}
              onClick={() => {
                activate(connection),
                  dispatch(updateSelectedWallet({ wallet: connection.type })),
                  onDismiss();
              }}
            >
              <Text weight="normal" size="15px">
                {label}
              </Text>
              <Svg icon={icon} width="30px" />
            </Button>
          );
        })}
      </Flex>
    </Modal>
  );
};

export default ConnectWalletModal;
