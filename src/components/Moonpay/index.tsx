import { Flex, Button, Svg } from "components/uikit";
import useModal from "hooks/useModal";
import MoonPayModal from "./MoonpayModal";

export default function Moonpay() {
  const [onPresentModal] = useModal(<MoonPayModal onDismiss={() => null} />);

  return (
    <>
      <Flex justifyContent="center" mb="20px" mt="20px">
        <Flex onClick={onPresentModal} mr="10px" sx={{cursor: 'pointer'}}>
          <Svg icon="calculator" />
        </Flex>
      </Flex>
    </>
  );
}
