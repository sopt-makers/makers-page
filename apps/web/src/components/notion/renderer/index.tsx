import { FC } from 'react';
import { ModifiedBlock } from 'ssr-gateway';

import { BlockResolver } from './BlockResolver';

interface BlockRendererProps {
  blocks: ModifiedBlock[];
}

export const BlockRenderer: FC<BlockRendererProps> = ({ blocks }) => {
  const merged = mergeBlocks(blocks);

  return (
    <div className='flex flex-col gap-y-[20px] pb-[20px]'>
      {merged.map((blockOrArray, idx) => {
        if (Array.isArray(blockOrArray)) {
          return (
            <div key={idx} className='flex flex-col gap-[1px]'>
              {blockOrArray.map((block, idx) => (
                <BlockResolver key={block.id} block={block} position={idx + 1} />
              ))}
            </div>
          );
        }
        return <BlockResolver key={idx} block={blockOrArray} position={idx + 1} />;
      })}
    </div>
  );
};

function mergeBlocks(blocks: ModifiedBlock[]) {
  const result: (ModifiedBlock[] | ModifiedBlock)[] = [];
  let buffer: ModifiedBlock[] = [];

  for (const block of blocks) {
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      buffer.push(block);
      continue;
    }

    if (buffer.length > 0) {
      result.push(buffer);
      buffer = [];
    }

    result.push(block);
  }

  return result;
}
