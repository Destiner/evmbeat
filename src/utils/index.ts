import type { Chain as ChainData } from 'viem';
import {
  arbitrum,
  arbitrumNova,
  avalanche,
  base,
  linea,
  mainnet,
  mantle,
  optimism,
  polygon,
  polygonZkEvm,
  scroll,
  zkSync,
  zora,
} from 'viem/chains';

const ARBITRUM_NOVA = 42170;
const ARBITRUM_ONE = 42161;
const AVALANCHE = 43114;
const BASE = 8453;
const ETHEREUM = 1;
const LINEA = 59144;
const MANTLE = 5000;
const OPTIMISM = 10;
const POLYGON = 137;
const POLYGON_ZK_EVM = 1101;
const SCROLL = 534352;
const ZKSYNC = 324;
const ZORA = 7777777;

type Chain =
  | typeof ARBITRUM_NOVA
  | typeof ARBITRUM_ONE
  | typeof AVALANCHE
  | typeof BASE
  | typeof ETHEREUM
  | typeof LINEA
  | typeof MANTLE
  | typeof OPTIMISM
  | typeof POLYGON
  | typeof POLYGON_ZK_EVM
  | typeof SCROLL
  | typeof ZKSYNC
  | typeof ZORA;

const CHAINS: Chain[] = [
  ETHEREUM,
  POLYGON,
  OPTIMISM,
  ARBITRUM_ONE,
  ARBITRUM_NOVA,
  BASE,
  ZKSYNC,
  MANTLE,
  AVALANCHE,
  LINEA,
  POLYGON_ZK_EVM,
  SCROLL,
  ZORA,
];

interface Block {
  number: bigint;
  timestamp: bigint;
  gasUsed: bigint;
  gasLimit: bigint;
  transactions: number;
}

type Blocks = Record<Chain, Block[]>;

function getChainData(chain: Chain): ChainData {
  switch (chain) {
    case ARBITRUM_NOVA:
      return arbitrumNova;
    case ARBITRUM_ONE:
      return arbitrum;
    case AVALANCHE:
      return avalanche;
    case BASE:
      return base;
    case ETHEREUM:
      return mainnet;
    case LINEA:
      return linea;
    case MANTLE:
      return mantle;
    case OPTIMISM:
      return optimism;
    case POLYGON:
      return polygon;
    case POLYGON_ZK_EVM:
      return polygonZkEvm;
    case SCROLL:
      return scroll;
    case ZKSYNC:
      return zkSync;
    case ZORA:
      return zora;
  }
}

function getChainName(chain: Chain): string {
  const data = getChainData(chain);
  return data.name;
}

function getChainAlias(chain: Chain): string {
  switch (chain) {
    case ARBITRUM_NOVA:
      return 'arbitrum-nova';
    case ARBITRUM_ONE:
      return 'arbitrum';
    case AVALANCHE:
      return 'avalanche';
    case BASE:
      return 'base';
    case ETHEREUM:
      return 'ethereum';
    case LINEA:
      return 'linea';
    case MANTLE:
      return 'mantle';
    case OPTIMISM:
      return 'optimism';
    case POLYGON:
      return 'polygon';
    case POLYGON_ZK_EVM:
      return 'polygon-zk-evm';
    case SCROLL:
      return 'scroll';
    case ZKSYNC:
      return 'zksync';
    case ZORA:
      return 'zora';
  }
}

export {
  ARBITRUM_NOVA,
  ARBITRUM_ONE,
  AVALANCHE,
  BASE,
  CHAINS,
  ETHEREUM,
  LINEA,
  MANTLE,
  OPTIMISM,
  POLYGON,
  POLYGON_ZK_EVM,
  SCROLL,
  ZKSYNC,
  ZORA,
  getChainData,
  getChainName,
  getChainAlias,
};
export type { Block, Blocks, Chain };
