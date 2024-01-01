import { http, webSocket } from 'viem';
import type { Chain as ChainData, Transport } from 'viem';
import {
  arbitrum,
  arbitrumNova,
  astar,
  aurora,
  avalanche,
  base,
  canto,
  cronos,
  fantom,
  gnosis,
  kava,
  klaytn,
  linea,
  mainnet,
  manta,
  moonbeam,
  optimism,
  polygon,
  polygonZkEvm,
  pulsechain,
  scroll,
  zkSync,
  zora,
} from 'viem/chains';

const ARBITRUM_NOVA = 42170;
const ARBITRUM_ONE = 42161;
const ASTAR = 592;
const AURORA = 1313161554;
const AVALANCHE = 43114;
const BASE = 8453;
const CANTO = 7700;
const CRONOS = 25;
const FANTOM = 250;
const GNOSIS = 100;
const KAVA = 2222;
const KLAYTN = 8217;
const ETHEREUM = 1;
const LINEA = 59144;
const MANTA = 169;
const MOONBEAM = 1284;
const OPTIMISM = 10;
const POLYGON = 137;
const POLYGON_ZK_EVM = 1101;
const PULSECHAIN = 369;
const SCROLL = 534352;
const ZKSYNC = 324;
const ZORA = 7777777;

type Chain =
  | typeof ARBITRUM_NOVA
  | typeof ARBITRUM_ONE
  | typeof ASTAR
  | typeof AURORA
  | typeof AVALANCHE
  | typeof BASE
  | typeof CANTO
  | typeof CRONOS
  | typeof FANTOM
  | typeof GNOSIS
  | typeof KAVA
  | typeof KLAYTN
  | typeof ETHEREUM
  | typeof LINEA
  | typeof MANTA
  | typeof MOONBEAM
  | typeof OPTIMISM
  | typeof POLYGON
  | typeof POLYGON_ZK_EVM
  | typeof PULSECHAIN
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
  AVALANCHE,
  LINEA,
  POLYGON_ZK_EVM,
  SCROLL,
  ZORA,
  GNOSIS,
  FANTOM,
  CANTO,
  AURORA,
  MOONBEAM,
  KAVA,
  PULSECHAIN,
  KLAYTN,
  CRONOS,
  ASTAR,
  MANTA,
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
    case ASTAR:
      return astar;
    case AURORA:
      return aurora;
    case AVALANCHE:
      return avalanche;
    case BASE:
      return base;
    case CANTO:
      return canto;
    case CRONOS:
      return cronos;
    case FANTOM:
      return fantom;
    case GNOSIS:
      return gnosis;
    case KAVA:
      return kava;
    case KLAYTN:
      return klaytn;
    case ETHEREUM:
      return mainnet;
    case LINEA:
      return linea;
    case MANTA:
      return manta;
    case MOONBEAM:
      return moonbeam;
    case OPTIMISM:
      return optimism;
    case POLYGON:
      return polygon;
    case POLYGON_ZK_EVM:
      return polygonZkEvm;
    case PULSECHAIN:
      return pulsechain;
    case SCROLL:
      return scroll;
    case ZKSYNC:
      return zkSync;
    case ZORA:
      return zora;
  }
}

function getChainTransport(chain: Chain): Transport {
  switch (chain) {
    case ARBITRUM_NOVA:
      return http();
    case ARBITRUM_ONE:
      return http();
    case ASTAR:
      return http();
    case AURORA:
      return http();
    case AVALANCHE:
      return http();
    case BASE:
      return http();
    case CANTO:
      return http();
    case CRONOS:
      return http();
    case FANTOM:
      return http();
    case GNOSIS:
      return http();
    case KAVA:
      return http();
    case KLAYTN:
      return http();
    case ETHEREUM:
      return http();
    case LINEA:
      return http();
    case MANTA:
      return http();
    case MOONBEAM:
      return http();
    case OPTIMISM:
      return http();
    case POLYGON:
      return http();
    case POLYGON_ZK_EVM:
      return http();
    case PULSECHAIN:
      return http();
    case SCROLL:
      return webSocket();
    case ZKSYNC:
      return webSocket();
    case ZORA:
      return webSocket();
  }
}

function getChainName(chain: Chain): string {
  const data = getChainData(chain);
  return data.name;
}

function getChainId(chain: Chain): number {
  const data = getChainData(chain);
  return data.id;
}

function getChainCurrency(chain: Chain): string {
  const data = getChainData(chain);
  return data.nativeCurrency.symbol;
}

function getChainAlias(chain: Chain): string {
  switch (chain) {
    case ARBITRUM_NOVA:
      return 'arbitrum-nova';
    case ARBITRUM_ONE:
      return 'arbitrum';
    case ASTAR:
      return 'astar';
    case AURORA:
      return 'aurora';
    case AVALANCHE:
      return 'avalanche';
    case BASE:
      return 'base';
    case CANTO:
      return 'canto';
    case CRONOS:
      return 'cronos';
    case FANTOM:
      return 'fantom';
    case GNOSIS:
      return 'gnosis';
    case KAVA:
      return 'kava';
    case KLAYTN:
      return 'klaytn';
    case ETHEREUM:
      return 'ethereum';
    case LINEA:
      return 'linea';
    case MANTA:
      return 'manta';
    case MOONBEAM:
      return 'moonbeam';
    case OPTIMISM:
      return 'optimism';
    case POLYGON:
      return 'polygon';
    case POLYGON_ZK_EVM:
      return 'polygon-zk-evm';
    case PULSECHAIN:
      return 'pulsechain';
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
  ASTAR,
  AURORA,
  AVALANCHE,
  BASE,
  CANTO,
  CHAINS,
  CRONOS,
  ETHEREUM,
  FANTOM,
  GNOSIS,
  KAVA,
  KLAYTN,
  LINEA,
  MANTA,
  MOONBEAM,
  OPTIMISM,
  POLYGON,
  POLYGON_ZK_EVM,
  PULSECHAIN,
  SCROLL,
  ZKSYNC,
  ZORA,
  getChainData,
  getChainName,
  getChainAlias,
  getChainId,
  getChainCurrency,
  getChainTransport,
};
export type { Block, Blocks, Chain };
