import { z } from 'zod';

import { getMakersMemberList } from '../data';
import { internalProcedure, router } from '../trpc/stub';

export const makersRouter = router({
  memberList: internalProcedure.query(async ({}) => {
    const memberList = getMakersMemberList();
    const memberMetadata = await fetchMemberMetadata();

    if (!memberMetadata) {
      return { status: 'API_ERROR' } as const;
    }

    const profileImageMap = new Map<number, string>(
      memberMetadata.map((data) => [data.id, data.profileImage]).filter((data): data is [number, string] => !!data[1]),
    );

    const memberListWithImage = memberList.map((member) => ({
      ...member,
      profileImage: profileImageMap.get(member.id) ?? null,
    }));

    return { status: 'SUCCESS', data: memberListWithImage } as const;
  }),
});

async function fetchMemberMetadata() {
  const res = await fetch('https://playground.api.sopt.org/makers/profile', {
    method: 'GET',
  });

  if (!res.ok || res.status !== 200) {
    return null;
  }

  const validator = z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      profileImage: z.string().nullable(),
      activities: z.array(
        z.object({
          id: z.number(),
          generation: z.number(),
        }),
      ),
      careers: z.array(
        z.object({
          id: z.number(),
          companyName: z.string(),
          title: z.string(),
          isCurrent: z.boolean(),
        }),
      ),
    }),
  );

  const parsed = validator.safeParse(await res.json());

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}
