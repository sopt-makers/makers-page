import clsx from 'clsx';

import Description from './Description';
import Title from './Title';

interface ProductProps {
  className?: string;
}

export default function ProductSection({ className }: ProductProps) {
  return (
    <div className='mt-[20rem]'>
      <article className={clsx('', className)}>
        <div className='flex flex-col justify-start md:flex-row'>
          <section className='mr-[6.704rem] min-w-[36.4rem]'>
            <p className='md:text-40-semibold text-32-regular sticky top-0 ml-[2rem] pt-[18.4rem] font-semibold md:ml-[6rem]'>
              메이커스는 <br />
              3개의 제품으로
              <br />
              <span className='text-brand-orange'>
                SOPT에 <br className='hidden md:block' />
                없던 가치
              </span>
              를
              <br />
              더하고 있어요.
            </p>
          </section>
          <nav className='md:text-40-semibold text-24-semibold w-full border-solid border-white md:border-l'>
            <a href='https://www.sopt.org/'>
              <Title type='official' className='sticky top-0'>
                OFFICIAL
              </Title>
            </a>
            <Description type='official'>
              SOPT 공식 홈페이지에서는 그동안 잘 드러나지 않던 <br className='md:hidden' />
              SOPT의 다양한 활동들과 사람들을 소개하고, 멋진 결과물을 잘 보여주어
              <br /> SOPT가 지닌 열정과 가치들을 잘 알리는 역할을 해요.
              <br />
              <br /> 그로 인해 대외적으로 후원 및 협력을 용이하게 하고, 더 많은 분이 SOPT를 잘 이해하고 지원할 수 있도록
              도와요.
            </Description>
            <a href='https://playground.sopt.org/'>
              <Title
                type='playground'
                className='sticky top-[8.4rem] border-t border-solid border-white md:top-[11.1rem]'
              >
                PLAYGROUND
                <br />& CREW
              </Title>
            </a>
            <Description type='playground'>
              플레이그라운드에서는
              <br className='md:hidden' />
              커뮤니티와 모임 피드를 통해 다양한 이야기를 나눌 수 있고, SOPT 전체 회원들의 소개를 볼 수 있어요.
              <br /> 또한 앱잼, 솝커톤, 솝텀 등 프로젝트를 등록할 수 있고 스터디, 세미나 등의 모임을 열고 참여할 수
              있어요.
              <br />
              SOPT 플레이그라운드는 SOPT 회원들이 소통하고 연결될 수 있는 공간이에요. 커뮤니티, 모임 피드를 통해 여러
              회원들의 <br className='hidden md:block' /> 소통을 도모하며 끝말잇기와 같은 가벼운 연결도 만들어 가고
              있어요.
              <br /> 현재는 약 700명의 회원이 있으며 앞으로도 여러 가치 있는 연결을 만들어가고자 해요.
            </Description>
            <Title type='app' className='sticky top-[16.8rem] border-t border-solid border-white md:top-[22.4rem]'>
              APP
              <br />& OPERATION
            </Title>
            <Description type='app'>
              공식 앱을 통해서 SOPT 정규 세미나와 데모데이 등 공식 행사의 출석 인증 및 관리를 할 수 있어요.
              <br /> 콕찌르기, 솝탬프 등을 통해 SOPT 회원들과 함께 즐거운 경험을 할 수 있어요.
              <br />
              <br /> 공식 앱은 SOPT 활동이 더욱 편하고 즐거울 수 있도록 돕는 역할을 하며 메이커스의 프로덕트들을 모바일
              경험으로 연결하여 중심점 역할을 하고자 해요.
            </Description>
          </nav>
        </div>
      </article>
    </div>
  );
}
