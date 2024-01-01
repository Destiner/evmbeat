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
        v-for="(label, index) in GRID_LABELS"
        :key="index"
        class="grid-section"
      >
        <div class="axis">
          <div class="label">{{ label }}</div>
          <div class="line" />
        </div>
        <div
          v-if="label !== GRID_LABELS.at(-1)"
          class="marks"
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
import { CHAINS, getChainAlias } from '@/utils';
import type { Block, Blocks, Chain } from '@/utils';

import BlockView from './BlockView.vue';
import ChainView from './ChainView.vue';

const props = defineProps<{
  timestamp: number;
  blocks: Blocks;
}>();

const GRID_LABELS = ['now', '-5s', '-10s', '-15s', '-20s', '-25s'];

function getRecentBlocks(chainBlocks: Block[]): Block[] {
  const PERIOD = 25n;
  const now = BigInt(props.timestamp) / 1000n;
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

function getTimeSinceLastBlock(chain: Chain): bigint {
  const chainBlocks = props.blocks[chain];
  if (chainBlocks.length === 0) return 0n;
  const lastBlock = chainBlocks.reduce((block, b) => {
    if (block.number < b.number) return b;
    return block;
  });
  const now = BigInt(props.timestamp) / 1000n;
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

  display: flex;
  gap: 16px;
  position: absolute;
  z-index: -1;
  top: -40px;
  left: 140px;
}

.grid-section {
  display: flex;
  gap: 20px;
}

.axis {
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  width: var(--axis-width);
}

.label {
  color: #fff3;
  font-size: 12px;
}

.line {
  width: 1px;
  height: 760px;
  background-color: #ffffff1a;
}

.marks {
  display: flex;
  gap: 40px;
}

.mark {
  width: 1px;
  height: 10px;
  margin-top: 25px;
  background-color: #ffffff1a;
}

.rows {
  display: flex;
  gap: 12px;
  flex-direction: column;
  overflow: hidden;
}

@media (width < 1200px) {
  .rows {
    overflow: initial;
  }
}

.row {
  display: flex;
  color: var(--color);
}

.row.ethereum,
.row.zksync,
.row.zora,
.row.linea {
  --color: #fff;
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

.row.gnosis {
  --color: #486858;
}

.row.fantom {
  --color: #3367f6;
}

.row.canto {
  --color: #74f8a2;
}

.row.aurora {
  --color: #8fd460;
}

.row.moonbeam {
  --color: #bb2e71;
}

.row.kava {
  --color: #ff232f;
}

.row.pulsechain {
  --color: #5cc9fa;
}

.row.klaytn {
  --color: ##eb4626;
}

.row.cronos {
  --color: #4697f3;
}

.row.astar {
  --color: #8beafc;
}

.row.manta {
  --color: #5298eb;
}

.blocks {
  display: flex;
  gap: 2px;
  transition: opacity 0.2s ease-in-out;
  opacity: 0.4;
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
