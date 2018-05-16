import Blocks from '../../pages/Blocks'
import Transactions from '../../pages/Tranactions'
import Transfer from '../../pages/Transfer'
import Assets from '../../pages/Assets'
import Address from '../../pages/Address'
import {beNamespace} from "../beNamespace";

const Routers = [
    {text:"区块", path: "/", name: beNamespace.BLOCKS, component: Blocks},
    {text:"交易", path: "/transaction", name: beNamespace.TRANSACTIONS, component: Transactions},
    {text:"转账", path: "/transfer", name: beNamespace.TRANSFER, component: Transfer},
    {text:"资产", path: "/assets", name: beNamespace.ASSETS, component: Assets},
    {text:"地址", path: "/address", name: beNamespace.ADDRESS, component: Address},
]


export {
    Routers
}