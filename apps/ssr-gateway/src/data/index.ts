import { sortedUniqBy } from 'lodash-es';

import { contributors } from './contributors';
import { generation1 } from './generation1';
import { generation2 } from './generation2';
import { MakersGeneration } from './types';

export const makersGenerationsData: MakersGeneration[] = [generation2, generation1, contributors];

export function getMakersMemberList() {
  const data = makersGenerationsData.flatMap((generation) =>
    generation.teams.flatMap((team) =>
      team.people.flatMap((person) => {
        if (person.type === 'raw') {
          return [];
        }

        return {
          id: person.id,
          name: person.name,
          position: person.position,
          team: team.title,
          generationSeq: generation.seq,
          generation: generation.title,
        };
      }),
    ),
  );

  data.sort((a, b) => b.generationSeq - a.generationSeq).sort((a, b) => a.name.localeCompare(b.name));

  const makersMemberList = sortedUniqBy(data, (v) => v.id);

  return makersMemberList;
}
