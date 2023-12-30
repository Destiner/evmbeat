import { createPublicClient } from 'viem';
import type { PublicClient } from 'viem';

import { getChainData, getChainTransport } from '@/utils';
import type { Block, Chain } from '@/utils';

class Service {
  chain: Chain;
  client: PublicClient;

  constructor(chain: Chain) {
    this.chain = chain;
    this.client = createPublicClient({
      chain: getChainData(chain),
      transport: getChainTransport(chain),
    });
  }

  async getBlockNumber(): Promise<bigint> {
    return await this.client.getBlockNumber();
  }

  async getBlock(number: bigint): Promise<Block | null> {
    try {
      const block = await this.client.getBlock({
        blockNumber: number,
      });
      return {
        number: block.number,
        timestamp: block.timestamp,
        gasUsed: block.gasUsed,
        gasLimit: block.gasLimit,
        transactions: block.transactions.length,
      };
    } catch {
      return null;
    }
  }
}

export default Service;
