<template>
  <IconArbitrumNova v-if="chain === ARBITRUM_NOVA" />
  <IconArbitrumOne v-else-if="chain === ARBITRUM_ONE" />
  <IconAstar v-else-if="chain === ASTAR" />
  <IconAurora v-else-if="chain === AURORA" />
  <IconAvalanche v-else-if="chain === AVALANCHE" />
  <IconBase v-else-if="chain === BASE" />
  <IconCanto v-else-if="chain === CANTO" />
  <IconCronos v-else-if="chain === CRONOS" />
  <IconEthereum v-else-if="chain === ETHEREUM" />
  <IconFantom v-else-if="chain === FANTOM" />
  <IconGnosis v-else-if="chain === GNOSIS" />
  <IconKava v-else-if="chain === KAVA" />
  <IconKlaytn v-else-if="chain === KLAYTN" />
  <IconLinea v-else-if="chain === LINEA" />
  <IconManta v-else-if="chain === MANTA" />
  <IconMoonbeam v-else-if="chain === MOONBEAM" />
  <IconOptimism v-else-if="chain === OPTIMISM" />
  <IconPolygon v-else-if="chain === POLYGON" />
  <IconPolygon v-else-if="chain === POLYGON_ZK_EVM" />
  <IconPulsechain v-else-if="chain === PULSECHAIN" />
  <IconScroll v-else-if="chain === SCROLL" />
  <IconZkSync v-else-if="chain === ZKSYNC" />
  <IconZora v-else-if="chain === ZORA" />
</template>

<script setup lang="ts">
import {
  ARBITRUM_NOVA,
  ARBITRUM_ONE,
  ASTAR,
  AURORA,
  AVALANCHE,
  BASE,
  CANTO,
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
} from '@/utils';
import type { Chain } from '@/utils';

import IconArbitrumNova from './icon/chain/ArbitrumNova.vue';
import IconArbitrumOne from './icon/chain/ArbitrumOne.vue';
import IconAstar from './icon/chain/Astar.vue';
import IconAurora from './icon/chain/Aurora.vue';
import IconAvalanche from './icon/chain/Avalanche.vue';
import IconBase from './icon/chain/Base.vue';
import IconCanto from './icon/chain/Canto.vue';
import IconCronos from './icon/chain/Cronos.vue';
import IconEthereum from './icon/chain/Ethereum.vue';
import IconFantom from './icon/chain/Fantom.vue';
import IconGnosis from './icon/chain/Ethereum.vue';
import IconKava from './icon/chain/Ethereum.vue';
import IconKlaytn from './icon/chain/Klaytn.vue';
import IconLinea from './icon/chain/Linea.vue';
import IconManta from './icon/chain/Manta.vue';
import IconMoonbeam from './icon/chain/Moonbeam.vue';
import IconOptimism from './icon/chain/Optimism.vue';
import IconPolygon from './icon/chain/Polygon.vue';
import IconPulsechain from './icon/chain/Pulsechain.vue';
import IconScroll from './icon/chain/Scroll.vue';
import IconZkSync from './icon/chain/ZkSync.vue';
import IconZora from './icon/chain/Zora.vue';

defineProps<{
  chain: Chain;
}>();
</script>
