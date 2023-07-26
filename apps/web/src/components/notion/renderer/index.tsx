import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { ModifiedBlock } from 'ssr-gateway';

import { BlockComponentsBase, BlockResolver } from './BlockResolver';

interface BlockRendererProps {
  className?: string;
  blocks: ModifiedBlock[];
  renderPageLink: (id: string, name: string) => ReactElement;
  blockComponents: BlockComponentsBase;
}

export const BlockRenderer: FC<BlockRendererProps> = ({ className, blocks, renderPageLink, blockComponents }) => {
  const merged = mergeBlocks(blocks);

  function renderBlocks(blocks: ModifiedBlock[]) {
    if (!blocks || blocks.length === 0) {
      return <></>;
    }
    return <BlockRenderer blocks={blocks} renderPageLink={renderPageLink} blockComponents={blockComponents} />;
  }

  return (
    <div className={clsx('flex flex-col', className)}>
      {merged.map((entryOrArray, idx) => {
        if (Array.isArray(entryOrArray)) {
          return (
            <div key={idx} className='flex flex-col gap-[1px]'>
              {entryOrArray.map(({ block, streak }) => (
                <BlockResolver
                  key={block.id}
                  block={block}
                  streak={streak}
                  renderBlocks={renderBlocks}
                  renderPageLink={renderPageLink}
                  blockComponents={blockComponents}
                />
              ))}
            </div>
          );
        }
        return (
          <BlockResolver
            key={idx}
            block={entryOrArray.block}
            streak={entryOrArray.streak}
            renderBlocks={renderBlocks}
            renderPageLink={renderPageLink}
            blockComponents={blockComponents}
          />
        );
      })}
    </div>
  );
};

function mergeBlocks(blocks: ModifiedBlock[]) {
  type Entry = {
    streak: number;
    block: ModifiedBlock;
  };

  const result: (Entry[] | Entry)[] = [];
  let buffer: Entry[] = [];

  for (const block of blocks) {
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      if (buffer.length > 0 && buffer[buffer.length - 1].block.type === block.type) {
        buffer.push({ streak: buffer[buffer.length - 1].streak + 1, block });
        continue;
      }

      buffer.push({ streak: 0, block });
      continue;
    }

    if (buffer.length > 0) {
      result.push(buffer);
      buffer = [];
    }

    result.push({ streak: 1, block });
  }

  if (buffer.length > 0) {
    result.push(buffer);
  }

  return result;
}
