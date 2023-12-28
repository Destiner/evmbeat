<template>
  <div class="page">
    <div class="content">
      <BlockTimeline :blocks="blocks" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
import { ref } from 'vue';

import BlockTimeline from '@/components/BlockTimeline.vue';
import EvmService from '@/services/evm';
import { CHAINS } from '@/utils';
import type { Blocks, Chain } from '@/utils';

const FETCH_INTERVAL = 500;
const INIT_BLOCKS = 5n;

const isFetching = ref<Record<Chain, boolean>>(initIsFetching());
const blocks = ref<Blocks>(initBlocks());

useIntervalFn(
  () => {
    fetch();
  },
  FETCH_INTERVAL,
  { immediate: true },
);

function initIsFetching(): Record<Chain, boolean> {
  const isFetching: Record<Chain, boolean> = {} as Record<Chain, boolean>;
  for (const chain of CHAINS) {
    isFetching[chain] = false;
  }
  return isFetching;
}

function initBlocks(): Blocks {
  const blocks: Blocks = {} as Blocks;
  for (const chain of CHAINS) {
    blocks[chain] = [];
  }
  return blocks;
}

async function fetch(): Promise<void> {
  // Fetch block data for each chain
  for (const chain of CHAINS) {
    if (isFetching.value[chain]) {
      continue;
    }
    isFetching.value[chain] = true;
    const service = new EvmService(chain);
    const latestBlockNumber = await service.getBlockNumber();
    // Fetch new blocks if any
    const chainBlocks = blocks.value[chain];
    const lastFetchedBlockNumber = chainBlocks.length
      ? chainBlocks[chainBlocks.length - 1].number
      : -1n;
    const minBlockToFetch =
      lastFetchedBlockNumber === -1n
        ? latestBlockNumber - INIT_BLOCKS
        : lastFetchedBlockNumber + 1n;
    const maxBlockToFetch =
      lastFetchedBlockNumber >= latestBlockNumber ? -1 : latestBlockNumber;
    for (
      let blockNumber = minBlockToFetch;
      blockNumber <= maxBlockToFetch;
      blockNumber++
    ) {
      const block = await service.getBlock(blockNumber);
      blocks.value[chain].push(block);
    }
    isFetching.value[chain] = false;
  }
}
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  margin-top: 160px;
  width: 100%;
  max-width: 1200px;
}
</style>
