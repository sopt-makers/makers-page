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
    imageUrl: 'https://github.com/sopt-makers/makers-page/assets/97586683/fc756699-5c1f-4c1c-98d0-dd50d2c910cf',
    altText: 'playground_image',
  },
  app: {
    imageUrl: 'https://github.com/sopt-makers/makers-page/assets/97586683/5aece179-4098-4a77-9d11-8e4a2daec798',
    altText: 'app_image',
  },
};
