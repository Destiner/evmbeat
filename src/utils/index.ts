import type { Chain as ChainData } from 'viem';
import {
  avalanche,
  base,
  mainnet,
  optimism,
  polygon,
  zkSync,
  zora,
} from 'viem/chains';

const AVALANCHE = 43114;
const BASE = 8453;
const ETHEREUM = 1;
const OPTIMISM = 10;
const POLYGON = 137;
const ZKSYNC = 324;
const ZORA = 7777777;

type Chain =
  | typeof AVALANCHE
  | typeof BASE
  | typeof ETHEREUM
  | typeof OPTIMISM
  | typeof POLYGON
  | typeof ZKSYNC
  | typeof ZORA;

const CHAINS: Chain[] = [
  ETHEREUM,
  POLYGON,
  OPTIMISM,
  BASE,
  ZKSYNC,
  AVALANCHE,
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
    case AVALANCHE:
      return avalanche;
    case BASE:
      return base;
    case ETHEREUM:
      return mainnet;
    case OPTIMISM:
      return optimism;
    case POLYGON:
      return polygon;
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
    case AVALANCHE:
      return 'avalanche';
    case BASE:
      return 'base';
    case ETHEREUM:
      return 'ethereum';
    case OPTIMISM:
      return 'optimism';
    case POLYGON:
      return 'polygon';
    case ZKSYNC:
      return 'zksync';
    case ZORA:
      return 'zora';
  }
}

export {
  AVALANCHE,
  BASE,
  CHAINS,
  ETHEREUM,
  OPTIMISM,
  POLYGON,
  ZKSYNC,
  ZORA,
  getChainData,
  getChainName,
  getChainAlias,
};
export type { Block, Blocks, Chain };
