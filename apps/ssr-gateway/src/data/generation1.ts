import { MakersGeneration } from './types';

export const generation1: MakersGeneration = {
  seq: 1,
  title: '1기',
  teams: [
    {
      title: 'makers lead',
      people: [{ type: 'member', id: 1, name: '이정연' }],
    },
    {
      title: 'makers organizer',
      description:
        'makers의 지속 가능한 활동 운영을 포함해서 makers의 문화를 만들어가며, 메이커들이 오너십을 가지고 제품을 더 잘 만들어갈 수 있도록 고민하는 역할을 해요.',
      people: [
        { type: 'member', id: 44, name: '이채연' },
        { type: 'member', id: 23, name: '이예서' },
        { type: 'member', id: 31, name: '이서영' },
        { type: 'member', id: 8, name: '남주영' },
        { type: 'member', id: 30, name: '김인우' },
      ],
    },
    {
      title: 'SOPT 공식 홈페이지 팀',
      description: 'SOPT를 대내외적으로 알릴 수 있는 공식홈페이지를 개선하고 발전시켜요.',
      link: 'https://sopt.org',
      people: [
        { type: 'member', id: 40, name: '김희영', position: 'PM' },
        { type: 'member', id: 46, name: '박수아', position: '디자이너' },
        { type: 'member', id: 26, name: '박정무', position: '백엔드 개발자' },
        { type: 'member', id: 60, name: '정효원', position: '백엔드 개발자' },
        { type: 'member', id: 31, name: '이서영', position: '웹 프론트엔드 개발자' },
        { type: 'member', id: 39, name: '이인송', position: '웹 프론트엔드 개발자' },
      ],
    },
    {
      title: 'SOPT Playground 팀',
      description:
        'SOPT 구성원들을 위한 서비스, SOPT 플레이그라운드를 만들고 있어요. 앱잼, 솝커톤, 솝텀 등 멋진 프로젝트들이 잘 기록될 수 있도록 프로젝트 기능을 담당해요. 또한 이천여명의 SOPT 구성원들이 어떻게 하면 더 잘 소통하고 가치를 연결할 수 있을지 고민하는 팀이에요.',
      people: [
        { type: 'member', id: 1, name: '이정연', position: 'PM' },
        { type: 'member', id: 6, name: '박현지', position: 'PM' },
        { type: 'member', id: 9, name: '유예린', position: '디자이너' },
        { type: 'member', id: 7, name: '송정우', position: '백엔드 개발자' },
        { type: 'member', id: 8, name: '남주영', position: '웹 프론트엔드 개발자' },
        { type: 'member', id: 2, name: '박건영', position: '웹 프론트엔드 개발자' },
        { type: 'member', id: 3, name: '이준호', position: '웹 프론트엔드 개발자' },
        { type: 'member', id: 29, name: '이정민', position: '웹 프론트엔드 개발자' },
      ],
    },
    {
      title: 'Product Crew 팀',
      description: 'SOPT 플레이그라운드 내에서 구성원들이 하나로 모일 수 있는 모임 서비스를 만들고 있어요.',
      people: [
        { type: 'member', id: 5, name: '김나연', position: 'PM' },
        { type: 'member', id: 30, name: '김인우', position: '디자이너' },
        { type: 'member', id: 38, name: '김준영', position: '디자이너' },
        { type: 'member', id: 37, name: '이동훈', position: '백엔드 개발자' },
        { type: 'member', id: 13, name: '김은수', position: '웹 프론트엔드 개발자' },
        { type: 'member', id: 28, name: '백지연', position: '웹 프론트엔드 개발자' },
        { type: 'member', id: 36, name: '이재훈', position: '웹 프론트엔드 개발자' },
      ],
    },
    {
      title: 'SOPT APP 팀',
      description:
        'SOPT 공식 앱을 만드는 팀이에요. SOPT를 더욱 재미있고, 알차게 활동할 수 있도록 도와주는 서비스를 만들고 있어요.',
      people: [
        { type: 'member', id: 58, name: '박윤정', position: 'PM' },
        { type: 'member', id: 173, name: '김연수', position: '디자이너' },
        { type: 'member', id: 32, name: '이다영', position: '디자이너' },
        { type: 'member', id: 43, name: '김현기', position: '백엔드 개발자' },
        { type: 'member', id: 188, name: '허정민', position: '백엔드 개발자' },
        { type: 'member', id: 59, name: '박세란', position: 'Android 개발자' },
        { type: 'member', id: 34, name: '박진수', position: 'Android 개발자' },
        { type: 'member', id: 21, name: '이현우', position: 'Android 개발자' },
        { type: 'member', id: 33, name: '양수빈', position: 'iOS 개발자' },
        { type: 'member', id: 22, name: '윤수빈', position: 'iOS 개발자' },
        { type: 'member', id: 35, name: '이세진', position: 'iOS 개발자' },
        { type: 'member', id: 45, name: '이준호', position: 'iOS 개발자' },
      ],
    },
  ],
};
