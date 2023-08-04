import { BlockComponentProps } from '@/components/notion/unofficial/BlockResolver';

import { TableProvider } from './context';

const TableBlock = ({ block, ctx: { renderBlocks } }: BlockComponentProps<'table'>) => {
  const rowHeader = !!(block.format as { table_block_row_header?: boolean }).table_block_row_header;

  return (
    <TableProvider
      order={block.format.table_block_column_order}
      format={block.format.table_block_column_format ?? {}}
      columnHeader={block.format.table_block_column_header}
      rowHeader={rowHeader}
    >
      <table className='border-gray0 table-fixed border-collapse border-spacing-0 border'>
        <tbody>{renderBlocks(block.content ?? [], { renderContainer: (children) => <>{children}</> })}</tbody>
      </table>
    </TableProvider>
  );
};

export default TableBlock;
