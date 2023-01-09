import { useWeb3React } from "@web3-react/core";
import { Flex } from "components/uikit";
import useModal from "hooks/useModal";
import AccountModal from "./AccountModal";

const AccountLoggedInDisplay = () => {
  const { account } = useWeb3React();
  const [onPresentAccountModal] = useModal(
    <AccountModal onDismiss={() => null} />
  );
  return account ? (
    <Flex variant="flex.navContainer" onClick={onPresentAccountModal}>
      {account.slice(0, 4).toUpperCase()}...
      {account.slice(account.length - 4, account.length).toUpperCase()}
    </Flex>
  ) : (
    <></>
  );
};

export default AccountLoggedInDisplay;
