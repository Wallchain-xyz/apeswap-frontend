import { Percent } from "@ape.swap/sdk-core";
import JSBI from "jsbi";


export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const BIG_INT_ZERO = JSBI.BigInt(0)


// one basis JSBI.BigInt
const BIPS_BASE = JSBI.BigInt(10000)
export const ONE_BIPS = new Percent(JSBI.BigInt(1), BIPS_BASE)
