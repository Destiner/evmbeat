<template>
  <IconAvalanche v-if="chain === AVALANCHE" />
  <IconBase v-else-if="chain === BASE" />
  <IconEthereum v-else-if="chain === ETHEREUM" />
  <IconOptimism v-else-if="chain === OPTIMISM" />
  <IconPolygon v-else-if="chain === POLYGON" />
  <IconZkSync v-else-if="chain === ZKSYNC" />
  <IconZora v-else-if="chain === ZORA" />
</template>

<script setup lang="ts">
import {
  AVALANCHE,
  BASE,
  ETHEREUM,
  OPTIMISM,
  POLYGON,
  ZKSYNC,
  ZORA,
} from '@/utils';
import type { Chain } from '@/utils';

import IconAvalanche from './icon/chain/Avalanche.vue';
import IconBase from './icon/chain/Base.vue';
import IconEthereum from './icon/chain/Ethereum.vue';
import IconOptimism from './icon/chain/Optimism.vue';
import IconPolygon from './icon/chain/Polygon.vue';
import IconZkSync from './icon/chain/ZkSync.vue';
import IconZora from './icon/chain/Zora.vue';

defineProps<{
  chain: Chain;
}>();
</script>
