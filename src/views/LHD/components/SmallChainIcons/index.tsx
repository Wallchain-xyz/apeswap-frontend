import Bnb from './BNB';
import Matic from './Matic';
import Eth from './Eth';
import Tlos from './Tlos';
import Arbitrum from './Arbitrum';

export const icons: { [key: string]: JSX.Element } = {
  '56': <Bnb />,
  '137': <Matic />,
  '1': <Eth />,
  '40': <Tlos />,
  '42161': <Arbitrum />,
};
