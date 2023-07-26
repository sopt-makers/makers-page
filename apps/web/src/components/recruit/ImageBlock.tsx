'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { z } from 'zod';

interface ImageBlockProps {
  url: string;
  command: string;
}

const ImageBlock: FC<ImageBlockProps> = ({ url, command }) => {
  const options = parseCommand(
    command,
    z.object({
      height: z.number().optional(),
      align: z.union([z.literal('center'), z.literal('left'), z.literal('right')]),
    }),
  );

  return (
    <div className='flex flex-col items-center'>
      <img
        src={url}
        alt='Image Block'
        className={clsx({ 'self-start': options?.align === 'left', 'self-end': options?.align === 'right' })}
        style={{ height: options?.height ?? undefined }}
      />
    </div>
  );
};

export default ImageBlock;

function parseCommand<T>(command: string, schema: z.ZodType<T>): T {
  const json = safeParseJSON(command.replaceAll('”', '"'));
  if (!json) {
    return null;
  }

  return schema.parse(json);
}

function safeParseJSON(raw: string) {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}
