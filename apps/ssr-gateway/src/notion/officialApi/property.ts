import { NotionPage } from './types';

export function propertyResolver(properties: NotionPage['properties']) {
  function getTypedProperty<T extends NotionPage['properties'][string]['type']>(
    name: string,
    type: T,
  ): NotionPage['properties'][string] & { type: T } {
    const property = properties[name];

    if (property.type !== type) {
      throw new Error(`${name} 필드는 ${type} 타입의 속성이 아닙니다.`);
    }

    return property as NotionPage['properties'][string] & { type: T };
  }

  return {
    title(name: string) {
      const titleProperty = getTypedProperty(name, 'title');
      const title = titleProperty.title.map((v) => v.plain_text).join('');

      return title;
    },
    checkbox(name: string) {
      const checkboxProperty = getTypedProperty(name, 'checkbox');

      return checkboxProperty.checkbox;
    },
    date(name: string) {
      const dateProperty = getTypedProperty(name, 'date');

      const rawDate = dateProperty.date;
      if (!rawDate) {
        return null;
      }

      return new Date(Date.parse(rawDate.start));
    },
    richText(name: string) {
      const richTextProperty = getTypedProperty(name, 'rich_text');

      return richTextProperty.rich_text.map((v) => v.plain_text).join('');
    },
    select(name: string) {
      const selectProperty = getTypedProperty(name, 'select');

      return selectProperty.select?.name ?? null;
    },
    multiSelect(name: string) {
      const multiSelectProperty = getTypedProperty(name, 'multi_select');

      return multiSelectProperty.multi_select.map((select) => select.name);
    },
    files(name: string) {
      const filesProperty = getTypedProperty(name, 'files');

      return filesProperty.files.map((file) => {
        if (file.type === 'file') {
          return {
            name: file.name,
            url: file.file.url,
          };
        } else if (file.type === 'external') {
          return {
            name: file.name,
            url: file.external.url,
          };
        }

        return null;
      });
    },
  };
}
