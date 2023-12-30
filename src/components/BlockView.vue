<template>
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
</template>

<script setup lang="ts">
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
</style>
