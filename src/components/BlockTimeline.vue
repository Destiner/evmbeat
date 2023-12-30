<template>
  <div class="timeline">
    <div class="rows">
      <div
        v-for="chain in CHAINS"
        :key="chain"
        class="row"
        :class="{
          [getChainAlias(chain)]: true,
        }"
      >
        <ChainView
          :chain="chain"
          :blocks="blocks[chain]"
        />
        <div
          class="blocks"
          :style="{
            'margin-left': `${(
              getTimeSinceLastBlock(chain) * 40n
            ).toString()}px`,
          }"
        >
          <TransitionGroup name="blocks">
            <BlockView
              v-for="block in getRecentBlocks(blocks[chain])"
              :key="block.number.toString()"
              :block="block"
              :blocks="blocks[chain]"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
    <div class="grid">
      <div
        class="grid-section"
        v-for="label in GRID_LABELS"
      >
        <div class="axis">
          <div class="label">{{ label }}</div>
          <div class="line" />
        </div>
        <div
          class="marks"
          v-if="label !== GRID_LABELS.at(-1)"
        >
          <div class="mark" />
          <div class="mark" />
          <div class="mark" />
          <div class="mark" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlockView from './BlockView.vue';
import ChainView from './ChainView.vue';

import { CHAINS, getChainAlias } from '@/utils';
import type { Block, Blocks, Chain } from '@/utils';

const props = defineProps<{
  blocks: Blocks;
}>();

const GRID_LABELS = ['now', '-5s', '-10s', '-15s', '-20s', '-25s'];

function getRecentBlocks(chainBlocks: Block[]) {
  const PERIOD = 25n;
  const now = BigInt(Date.now()) / 1000n;
  const recentBlocks = chainBlocks.filter(
    (block) => now - block.timestamp < PERIOD,
  );
  // Order by block number
  recentBlocks.sort((a, b) => (a.number < b.number ? 1 : -1));
  // Remove the oldest recent block if there is no block after it available
  const minBlockNumber = chainBlocks.reduce((number, block) => {
    if (number === 0n || block.number < number) return block.number;
    return number;
  }, 0n);
  if (recentBlocks.at(-1)?.number === minBlockNumber) {
    recentBlocks.pop();
  }
  return recentBlocks;
}

function getTimeSinceLastBlock(chain: Chain) {
  const chainBlocks = props.blocks[chain];
  if (chainBlocks.length === 0) return 0n;
  const lastBlock = chainBlocks.reduce((block, b) => {
    if (block.number < b.number) return b;
    return block;
  });
  const now = BigInt(Date.now()) / 1000n;
  return now - lastBlock.timestamp;
}
</script>

<style scoped>
.timeline {
  position: relative;
}

.grid {
  --axis-width: 40px;
  --axis-gap: 200px;

  position: absolute;
  display: flex;
  gap: 16px;
  top: -40px;
  left: 140px;
  z-index: -1;
}

.grid-section {
  display: flex;
  gap: 20px;
}

.axis {
  width: var(--axis-width);
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
}

.label {
  font-size: 12px;
  color: #ffffff33;
}

.line {
  height: 420px;
  width: 1px;
  background-color: #ffffff1a;
}

.marks {
  display: flex;
  gap: 40px;
}

.mark {
  height: 10px;
  width: 1px;
  background-color: #ffffff1a;
  margin-top: 25px;
}

.rows {
  display: flex;
  gap: 12px;
  flex-direction: column;
  overflow: hidden;
}

.row {
  display: flex;
}

.row.ethereum,
.row.zksync,
.row.zora,
.row.linea {
  --color: #ffffff;
}

.row.optimism {
  --color: #ea3431;
}

.row.arbitrum {
  --color: #12aaff;
}

.row.arbitrum-nova {
  --color: #ef8220;
}

.row.avalanche {
  --color: #d64f49;
}

.row.polygon {
  --color: #7352d5;
}

.row.base {
  --color: #2e50ec;
}

.row.scroll {
  --color: #f9dcb5;
}

.row {
  display: flex;
  color: var(--color);
}

.blocks {
  display: flex;
  gap: 2px;
  opacity: 0.4;
  transition: opacity 0.2s ease-in-out;
}

.row:hover .blocks {
  opacity: 1;
}

.blocks-enter-active,
.blocks-leave-active {
  transition: all 0.5s ease;
}

.blocks-enter-from {
  opacity: 0;
}
</style>
