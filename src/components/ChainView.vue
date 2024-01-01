<template>
  <div>
    <Tooltip.Provider :delay-duration="50">
      <Tooltip.Root>
        <Tooltip.Trigger as-child>
          <div class="chain">
            <div class="icon"><ChainIcon :chain="chain" /></div>
            <div class="name">{{ getChainName(chain) }}</div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            as-child
            side="bottom"
            :side-offset="12"
          >
            <div class="info">
              <div class="stat">
                <div class="stat-label">Chain ID</div>
                <div class="stat-value">
                  {{ getChainId(chain) }}
                </div>
              </div>
              <div class="stat">
                <div class="stat-label">Currency</div>
                <div class="stat-value">
                  {{ getChainCurrency(chain) }}
                </div>
              </div>
              <div class="stat">
                <div class="stat-label">Latest block</div>
                <div class="stat-value">
                  {{ latestBlockNumber }}
                </div>
              </div>
              <div class="stat">
                <div class="stat-label">Time since last block</div>
                <div
                  v-if="timeSinceLastBlock"
                  class="stat-value"
                >
                  {{ timeSinceLastBlock }}
                </div>
                <div
                  v-else
                  class="stat-value"
                >
                  —
                </div>
              </div>
              <div class="stat">
                <div class="stat-label">Block time</div>
                <div class="stat-value">
                  {{ blockTime.toFixed(2) }}
                </div>
              </div>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  </div>
</template>

<script setup lang="ts">
import { Tooltip } from 'radix-vue/namespaced';
import { computed } from 'vue';

import { getChainName, getChainId, getChainCurrency } from '@/utils';
import type { Block, Chain } from '@/utils';

import ChainIcon from './ChainIcon.vue';

const props = defineProps<{
  chain: Chain;
  blocks: Block[];
}>();

const latestBlockNumber = computed(() =>
  props.blocks.reduce((number, current) => {
    return number > current.number ? number : current.number;
  }, 0n),
);

const timeSinceLastBlock = computed(() => {
  const latestBlock = props.blocks.find(
    (block) => block.number === latestBlockNumber.value,
  );
  if (!latestBlock) return null;
  const now = new Date();
  return BigInt(now.getTime()) / 1000n - latestBlock.timestamp;
});

const blockTime = computed(() => {
  // Block time is the average time between blocks
  const earliestBlock = props.blocks.reduce((block, current) => {
    return block.number < current.number ? block : current;
  });
  const latestBlock = props.blocks.reduce((block, current) => {
    return block.number > current.number ? block : current;
  });
  const timeBetweenBlocks =
    Number(latestBlock.timestamp - earliestBlock.timestamp) /
    Number(latestBlock.number - earliestBlock.number);
  return timeBetweenBlocks;
});
</script>

<style scoped>
.chain {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 160px;
  min-width: 160px;
  opacity: 0.75;
  color: #9d9d9d;
  text-transform: lowercase;
  cursor: pointer;
}

.row:hover .chain {
  transition: opacity 0.2s ease-in-out;
  opacity: 1;
}

.icon {
  width: 20px;
  height: 20px;
}

.name {
  font-size: 12px;
}

.info {
  min-width: 240px;
  padding: 8px;
  animation-name: slide-up-and-fade;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid #ffffff1a;
  border-radius: 4px;
  background: #0e0e0e;
  font-size: 14px;
  user-select: none;
  will-change: transform, opacity;
}

.info .stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@keyframes slide-up-and-fade {
  from {
    transform: translateY(2px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
