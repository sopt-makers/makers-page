export default function MakersIntodution() {
  return (
    <article className='mt-[21.56rem] ml-[7.5rem] flex flex-col justify-center items-start text-h2'>
      <p>
        SOPT에 필요한 프로덕트를 만들어
        <br /> <span className='text-main-makers'>3천여명의 구성원</span>들을{' '}
        <span className='text-sub-skyblue'>연결</span>하고 <span className='text-sub-yellow'>새로운 가치</span>를
        제공하기 위한
        <br /> SOPT 특수 기구예요.
      </p>
      <p className='mt-[2.5rem]'>
        수년간 방치되어 SOPT를 잘 드러내지 못하는 공식 홈페이지를 보고
        <br />
        홈페이지에 오너십을 가진 조직의 부재라는 문제 의식으로부터
        <br />
        이를 지속 가능한 방법으로 해결하고자 22년 7월 30일 특수 기구로 시작했어요.
      </p>
      <button className='flex flex-row justify-center items-center gap-[0.5rem] mt-[3.75rem] px-[2rem]  py-[1.5rem] border border-white'>
        메이커스 탄생 배경 보기 <ArrowIcon />
      </button>
    </article>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20 11c-2.438 0-4.66-2.22-4.66-4.66v-1h-2v1c0 1.774.778 3.438 1.999 4.66H3v2h12.339c-1.221 1.222-1.999 2.886-1.999 4.66v1h2v-1c0-2.439 2.222-4.66 4.66-4.66h1v-2h-1z'
        fill='#fff'
      />
    </svg>
  );
}
