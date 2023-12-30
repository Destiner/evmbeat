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

function getBlockTime(block: Block) {
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
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  font-size: 8px;
  padding: 1px;
}

.block-fill {
  height: 100%;
  border-radius: 2px 0 0 2px;
  background: var(--color);
}

.info {
  min-width: 200px;
  display: flex;
  gap: 20px;
  flex-direction: column;
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

.info .header {
  font-weight: bold;
  font-size: 12px;
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
