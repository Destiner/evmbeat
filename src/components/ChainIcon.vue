<template>
  <IconArbitrumNova v-if="chain === ARBITRUM_NOVA" />
  <IconArbitrumOne v-else-if="chain === ARBITRUM_ONE" />
  <IconAvalanche v-else-if="chain === AVALANCHE" />
  <IconBase v-else-if="chain === BASE" />
  <IconEthereum v-else-if="chain === ETHEREUM" />
  <IconLinea v-else-if="chain === LINEA" />
  <IconMantle v-else-if="chain === MANTLE" />
  <IconOptimism v-else-if="chain === OPTIMISM" />
  <IconPolygon v-else-if="chain === POLYGON" />
  <IconPolygon v-else-if="chain === POLYGON_ZK_EVM" />
  <IconScroll v-else-if="chain === SCROLL" />
  <IconZkSync v-else-if="chain === ZKSYNC" />
  <IconZora v-else-if="chain === ZORA" />
</template>

<script setup lang="ts">
import {
  ARBITRUM_NOVA,
  ARBITRUM_ONE,
  AVALANCHE,
  BASE,
  ETHEREUM,
  LINEA,
  MANTLE,
  OPTIMISM,
  POLYGON,
  POLYGON_ZK_EVM,
  SCROLL,
  ZKSYNC,
  ZORA,
} from '@/utils';
import type { Chain } from '@/utils';

import IconArbitrumNova from './icon/chain/ArbitrumNova.vue';
import IconArbitrumOne from './icon/chain/ArbitrumOne.vue';
import IconAvalanche from './icon/chain/Avalanche.vue';
import IconBase from './icon/chain/Base.vue';
import IconEthereum from './icon/chain/Ethereum.vue';
import IconLinea from './icon/chain/Linea.vue';
import IconMantle from './icon/chain/Mantle.vue';
import IconOptimism from './icon/chain/Optimism.vue';
import IconPolygon from './icon/chain/Polygon.vue';
import IconScroll from './icon/chain/Scroll.vue';
import IconZkSync from './icon/chain/ZkSync.vue';
import IconZora from './icon/chain/Zora.vue';

defineProps<{
  chain: Chain;
}>();
</script>
