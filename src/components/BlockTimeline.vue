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
        <div class="chain">
          <div class="icon"><ChainIcon :chain="chain" /></div>
          <div class="name">{{ getChainName(chain) }}</div>
        </div>
        <div
          class="blocks"
          :style="{
            'margin-left': `${(
              getTimeSinceLastBlock(chain) * 40n
            ).toString()}px`,
          }"
        >
          <div
            v-for="block in getRecentBlocks(blocks[chain])"
            :key="block.number.toString()"
            class="block"
            :style="{
              width: `${(getBlockTime(chain, block) * 40n - 2n).toString()}px`,
            }"
          >
            <div
              class="block-fill"
              :style="{
                width: `${getFillLevel(block).toString()}%`,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid">
      <div
        class="axis"
        v-for="label in GRID_LABELS"
      >
        <div class="label">{{ label }}</div>
        <div class="line" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChainIcon from '@/components/ChainIcon.vue';
import { CHAINS, getChainAlias, getChainName } from '@/utils';
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

function getBlockTime(chain: Chain, block: Block) {
  const number = BigInt(block.number);
  const previousBlock = props.blocks[chain].find(
    (b) => BigInt(b.number) === number - 1n,
  );
  if (!previousBlock) return 0n;
  return block.timestamp - previousBlock.timestamp;
}

function getFillLevel(block: Block): bigint {
  const gasUsed = BigInt(block.gasUsed);
  const gasLimit = BigInt(block.gasLimit);
  return (100n * gasUsed) / gasLimit;
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
  gap: calc(var(--axis-gap) - var(--axis-width));
  top: -40px;
  left: 200px;
  z-index: -1;
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
  height: 300px;
  width: 1px;
  background-color: #ffffff1a;
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
.row.zora {
  --color: #ffffff;
}

.row.optimism {
  --color: #ea3431;
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

.row {
  color: var(--color);
}

.row .block-fill {
  background: var(--color);
}

.chain {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 200px;
  color: #9d9d9d;
}

.icon {
  width: 20px;
  height: 20px;
}

.name {
  font-size: 12px;
}

.blocks {
  display: flex;
  gap: 2px;
  opacity: 0.4;
}

.row:hover .blocks {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.block {
  height: 20px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  font-size: 8px;
  padding: 1px;
}

.block-fill {
  height: 100%;
  border-radius: 2px 0 0 2px;
}
</style>
