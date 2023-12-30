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
                  class="stat-value"
                  v-if="timeSinceLastBlock"
                >
                  {{ timeSinceLastBlock }}
                </div>
                <div
                  class="stat-value"
                  v-else
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
import ChainIcon from './ChainIcon.vue';

import { getChainName, getChainId, getChainCurrency } from '@/utils';
import type { Block, Chain } from '@/utils';

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
  min-width: 160px;
  width: 160px;
  color: #9d9d9d;
  text-transform: lowercase;
  opacity: 0.75;
  cursor: pointer;
}

.row:hover .chain {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
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
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid #ffffff1a;
  padding: 8px;
  background: #0e0e0e;
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation-name: slideUpAndFade;
}

.info .stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
