import React from 'react';

const RecruitBanner = () => {
  return (
    <article className='flex flex-row justify-between items-center w-full h-[33.4rem] mt-[27.5rem] mb-[29.69rem] bg-dark1'>
      <BannerLeft />
      <section className='flex flex-col justify-center items-center'>
        <h1 className='h1'>메이커스를 통해 성장해보세요</h1>
        <button className='mt-[3.81rem] bg-white text-dark1 h2 px-[7.5rem] py-[2rem] rounded-[0.625rem]'>
          모집 공고 보러가기
        </button>
      </section>
      <BannerRight />
    </article>
  );
};

export default RecruitBanner;

function BannerLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={556} height={533} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#prefix__clip0_364_6278)'>
        <path d='M555.76 175.81l-84.727 70.117v-55.102l84.727-70.117v55.102z' fill='#F3BD39' />
        <path d='M471.039 190.825H287.035v55.102h184.004v-55.102z' fill='#E5A324' />
        <path d='M393.231 440.231L287.07 534.26v-65.953l106.161-91.556v63.48z' fill='#FF8139' />
        <path d='M287.175 468.56h-447.12v66.302l447.12-1.69V468.56z' fill='#FF6E1D' />
        <path d='M287.036 245.814l-91.227 76.623v-55.102l91.227-76.623v55.102z' fill='#5FCAE8' />
        <path d='M195.809 267.26h-355.7v55.102h355.7V267.26z' fill='#36BDD3' />
        <path d='M71.801-80.029L-73.269 40.406v-55.102L71.8-134.189v54.16z' fill='#DCB0D2' />
        <path d='M287.036 191.792H187.73' stroke='#5FCAE8' strokeWidth={1.779} strokeMiterlimit={10} />
        <path d='M555.626 119.846H274.137' stroke='#F3BD39' strokeWidth={1.779} strokeMiterlimit={10} />
        <path d='M393.231 377.746H195.809' stroke='#FF8039' strokeWidth={1.779} strokeMiterlimit={10} />
        <path d='M196.337 377.539L89.828 468.573v-56.595l106.509-89.541v55.102z' fill='#DCB0D2' />
        <path d='M89.783 412.062h-290.525v56.281H89.783v-56.281z' fill='#D59AC5' />
        <path d='M274.136 121.06l-86.406 71.802V41.285l86.406-71.801V121.06z' fill='#2B3C98' />
        <path d='M188.323 40.608H-73.269v151.893h261.592V40.608z' fill='#1F299C' />
      </g>
      <defs>
        <clipPath id='prefix__clip0_364_6278'>
          <path fill='#fff' transform='translate(0 -2)' d='M0 0h556v535H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}

function BannerRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={556} height={535} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#prefix__clip0_364_6299)'>
        <path d='M320.848 228.197l-94.088 82.655v-61.059l94.088-82.654v61.058z' fill='#F3BD39' />
        <path d='M226.702 249.405H0v60.946h226.702v-60.946z' fill='#E5A324' />
        <path d='M612.646 310.639H226.82v61.059h385.826v-61.059z' fill='#36BDD3' />
        <path d='M478.135-74.194L320.777 59.26V-1.798L478.135-134.21v60.015z' fill='#DCB0D2' />
        <path d='M320.778-1.963H95.871v168.314h224.907V-1.963z' fill='#D59AC5' />
        <path d='M613.219 432.841l-115.53 100.875.001-62.713 115.529-99.221v61.059z' fill='#FF8039' />
        <path d='M497.877 471.027h-394.83v62.054h394.83v-62.054z' fill='#FF6E1D' />
        <path d='M604.527 59.485h-283.75v168.313h283.75V59.485z' fill='#1F299C' />
        <path d='M0 248.851l95.996-82.554' stroke='#F3BD39' />
        <path d='M103.047 471.027l123.113-99.73' stroke='#FF6E1D' />
      </g>
      <defs>
        <clipPath id='prefix__clip0_364_6299'>
          <path fill='#fff' d='M0 0h556v535H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}
