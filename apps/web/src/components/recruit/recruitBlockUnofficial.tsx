import type { BlockComponentsBase } from '@/components/notion/unofficial/BlockResolver';

import TextRenderer from './TextRenderer';

export const recruitBlockComponents = {
  text: ({ block }) => (
    <div>
      <TextRenderer text={block.properties?.title ?? []} />
    </div>
  ),
} satisfies BlockComponentsBase;
