export async function callWithPagination<T extends { has_more: boolean; next_cursor: string | null | undefined }>(
  cb: (obj: { cursor?: string }) => Promise<T>,
) {
  const result: T[] = [];

  async function inner(cursor: string | undefined) {
    const res = await cb({ cursor });
    result.push(res);

    if (res.has_more) {
      await inner(res.next_cursor ?? undefined);
    }
  }

  await inner(undefined);
  return result;
}
