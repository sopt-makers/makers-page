interface DescriptionMap {
  [key: string]: {
    imageUrl: string;
    altText: string;
  };
}

export const descriptionMap: DescriptionMap = {
  official: {
    imageUrl: 'https://github.com/sopt-makers/makers-page/assets/97586683/86465d59-8c72-49e0-9360-02b3f55dcc2a',
    altText: 'official_image',
  },
  playground: {
    imageUrl: 'https://github.com/sopt-makers/makers-page/assets/97586683/d86f0d9a-34cc-4e01-ad72-930e1211843c',
    altText: 'playground_image',
  },
  app: {
    imageUrl: 'https://github.com/sopt-makers/makers-page/assets/97586683/c9df5461-c5bd-49b8-a84b-932fba081cea',
    altText: 'app_image',
  },
};
