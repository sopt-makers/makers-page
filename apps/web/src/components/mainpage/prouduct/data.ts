interface DescriptionMap {
  [key: string]: {
    imageUrl: string;
    altText: string;
  };
}

export const descriptionMap: DescriptionMap = {
  official: {
    imageUrl: 'https://github.com/sopt-makers/makers-page/assets/97586683/a59a5edd-d39c-42c8-b362-4d5542e02ec8',
    altText: 'official_image',
  },
  playground: {
    imageUrl: 'https://github.com/sopt-makers/makers-page/assets/97586683/d86f0d9a-34cc-4e01-ad72-930e1211843c',
    altText: 'playground_image',
  },
  app: {
    imageUrl: 'https://github.com/sopt-makers/makers-page/assets/97586683/73dd7fa5-21e2-4977-b0e6-6b6fa45729ef',
    altText: 'app_image',
  },
};
