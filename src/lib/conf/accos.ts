import { randomID, type AccoI } from 'accomadesc';
import { mapJsonBlock, type Block, type Section } from '$lib/types/blocks';
import accosJson from './accos.json';

const accos: AccoI[] = accosJson.map((aj) => {
  const a: AccoI = {
    path: aj.path,
    displayName: aj.displayName,
    cardContent: {
      displayName: aj.displayName,
      cardContent: {
        coverPhoto: {
          id: aj.id ?? randomID(),
          kind: 'photo',
          content: aj.cardContent.coverPhoto,
        },
        slug: aj.cardContent.slug,
        blocks: aj.cardContent.blocks.map((bj) => {
          return {
            id: randomID(),
            kind: bj.kind,
            content: bj.content,
          }
        },
      },
    },
    siteContent: aj.siteContent.map((sj) => {
      const s: Section = {
        header: sj.header,
        columnCount: sj.columnCount,
      };
      if (sj.blocks) {
        s.blocks = sj.blocks.map((bj) => {
          //@ts-ignore
          const b: Block = mapJsonBlock(bj);
          //console.log(bj)
          return b;
        });
      }
      return s;
    }),
  };
  return a;
});
export default accos;
