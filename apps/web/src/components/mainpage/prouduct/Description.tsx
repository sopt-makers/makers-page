interface DescriptionProps {
  type: 'official' | 'playground' | 'app';
}

export default function Description({ type }: DescriptionProps) {
  switch (type) {
    case 'official':
      return (
        <div>
          <img
            className='py-[4rem]'
            src='https://github.com/sopt-makers/makers-page/assets/97586683/a59a5edd-d39c-42c8-b362-4d5542e02ec8'
            alt='official_image'
          />
          <div className='text-16-regular'>
            SOPT 공식 홈페이지에서는 그동안 잘 드러나지 않던 SOPT의 다양한 활동들과 사람들을 소개하고, 멋진 결과물을 잘
            보여주어
            <br /> SOPT가 지닌 열정과 가치들을 잘 알리는 역할을 해요.
            <br />
            <br /> 그로 인해 대외적으로 후원 및 협력을 용이하게 하고, 더 많은 분들이 SOPT를 잘 이해하고 지원할 수 있도록
            도와요.
          </div>
        </div>
      );
    case 'playground':
      return (
        <div>
          <img
            className='my-[4rem]'
            src='https://github.com/sopt-makers/makers-page/assets/97586683/fc756699-5c1f-4c1c-98d0-dd50d2c910cf'
            alt='playground_image'
          />
          <div className='text-16-regular'>
            플레이그라운드에서는 SOPT 전체 회원들의 소개를 볼 수 있고, 나보다 앞을 걸어가고 있는 OB들에게 멘토링을
            신청할 수 있어요.
            <br /> 앱잼, 솝커톤, 솝텀 등 프로젝트를 등록할 수 있고 스터디, 세미나 등의 모임을 열고 또 참여할 수 있어요.
            <br />
            SOPT 플레이그라운드는 SOPT 회원들이 소통하고 연결될 수 있는 공간이에요. 멘토링을 통한 가치있는 연결,
            끝말잇기와 같은
            <br /> 가벼운 연결도 만들어가고 있어요. 현재는 약 500명의 회원이 있으며 앞으로 모임 피드, 커뮤니티 등 여러
            가치있는 연결을 만들어
            <br />
            가고자 해요.
          </div>
        </div>
      );
    case 'app':
      return (
        <div>
          <img
            className='my-[4rem]'
            src='https://github.com/sopt-makers/makers-page/assets/97586683/5aece179-4098-4a77-9d11-8e4a2daec798'
            alt='app_image'
          />
          <div className='text-16-regular'>
            공식앱을 통해서 SOPT 정규 세미나와 데모데이 등 공식 행사의 출석 인증 및 관리를 할 수 있어요.
            <br /> 솝탬프를 통해 SOPT를 A부터 Z까지 즐길 수 있는 미션을 달성하며 회원들과 함께 랭킹을 쌓을 수 있어요.
            <br />
            <br />
            공식앱은 SOPT 활동이 더욱 편하고 즐거울 수 있도록 돕는 역할을 하며 여러 서비스들의 중심점의 역할을 하고자
            해요.
          </div>
        </div>
      );
    default:
      return null;
  }
}
