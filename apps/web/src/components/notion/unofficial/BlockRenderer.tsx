import type { Block } from 'notion-types';
import { FC, ReactElement, ReactNode } from 'react';

import { BlockComponentsBase, BlockResolver } from './BlockResolver';
import { NotionRendererContext, PageLinkRenderer } from './types';

interface BlockRendererProps {
  blocks: string[];
  blockComponents: BlockComponentsBase;
  renderPageLink: PageLinkRenderer;
  getBlock: (id: string) => Block;
  renderContainer?: (children: ReactNode) => ReactElement;
}

const BlockRenderer: FC<BlockRendererProps> = ({
  blocks,
  blockComponents,
  getBlock,
  renderPageLink,
  renderContainer = (children) => <div className='flex flex-col'>{children}</div>,
}) => {
  const fetchedBlocks = blocks.map((blockId) => getBlock(blockId));

  const merged = mergeBlocks(fetchedBlocks);

  const ctx: NotionRendererContext = {
    renderBlocks: (blockIds, options) => {
      if (!blockIds || blockIds.length === 0) {
        return <></>;
      }

      return (
        <BlockRenderer
          blocks={blockIds}
          renderPageLink={renderPageLink}
          blockComponents={blockComponents}
          getBlock={getBlock}
          renderContainer={options?.renderContainer}
        />
      );
    },
    renderPageLink,
  };

  return renderContainer(
    <>
      {merged.map((entryOrArray, idx) => {
        if (Array.isArray(entryOrArray)) {
          return (
            <div key={idx} className='flex flex-col gap-[1px]'>
              {entryOrArray.map(({ block, streak }) => (
                <BlockResolver
                  key={block.id}
                  block={block}
                  streak={streak}
                  blockComponents={blockComponents}
                  ctx={ctx}
                />
              ))}
            </div>
          );
        }
        return (
          <BlockResolver
            key={entryOrArray.block?.id}
            block={entryOrArray.block}
            streak={entryOrArray.streak}
            blockComponents={blockComponents}
            ctx={ctx}
          />
        );
      })}
    </>,
  );
};

export default BlockRenderer;

function mergeBlocks(blocks: Block[]) {
  type Entry = {
    streak: number;
    block: Block;
  };

  const result: (Entry[] | Entry)[] = [];
  let buffer: Entry[] = [];

  for (const block of blocks) {
    if (block?.type === 'bulleted_list' || block?.type === 'numbered_list') {
      if (buffer.length > 0 && buffer[buffer.length - 1].block?.type === block?.type) {
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
