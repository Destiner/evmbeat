<template>
  <div>
    <Tooltip.Provider :delay-duration="50">
      <Tooltip.Root>
        <Tooltip.Trigger as-child>
          <div
            :key="block.number.toString()"
            class="block"
            :style="{
              width: `${(getBlockTime(block) * 40n - 2n).toString()}px`,
            }"
          >
            <div
              class="block-fill"
              :style="{
                width: `${getFillLevel(block).toString()}%`,
              }"
            />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            as-child
            side="bottom"
            :side-offset="12"
          >
            <div class="info">
              <div class="header stat">
                <div class="stat-label">Block</div>
                <div class="stat-value">{{ block.number }}</div>
              </div>
              <div>
                <div class="stat">
                  <div class="stat-label">Timestamp</div>
                  <div class="stat-value">
                    {{ formatUnixTimestampToHHmmss(block.timestamp) }}
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-label">Transactions</div>
                  <div class="stat-value">{{ block.transactions }}</div>
                </div>
                <div class="stat">
                  <div class="stat-label">Gas used</div>
                  <div class="stat-value">{{ block.gasUsed }}</div>
                </div>
                <div class="stat">
                  <div class="stat-label">Gas limit</div>
                  <div class="stat-value">{{ block.gasLimit }}</div>
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

import type { Block } from '@/utils';

const props = defineProps<{
  blocks: Block[];
  block: Block;
}>();

function getBlockTime(block: Block): bigint {
  const number = BigInt(block.number);
  const previousBlock = props.blocks.find(
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

function formatUnixTimestampToHHmmss(unixTimestamp: bigint): string {
  // Create a date object from the Unix timestamp
  const date = new Date(Number(unixTimestamp) * 1000); // Convert to milliseconds

  // Extract hours, minutes, and seconds
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  // Return the formatted time string
  return `${hours}:${minutes}:${seconds}`;
}
</script>

<style scoped>
.block {
  height: 20px;
  padding: 1px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  font-size: 8px;
}

.block-fill {
  height: 100%;
  border-radius: 2px 0 0 2px;
  background: var(--color);
}

.info {
  display: flex;
  gap: 20px;
  flex-direction: column;
  min-width: 200px;
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

.info .header {
  font-size: 12px;
  font-weight: bold;
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
