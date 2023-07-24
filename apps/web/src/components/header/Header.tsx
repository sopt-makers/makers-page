import React from 'react';

const Header = () => {
  return (
    <header className='fixed w-full flex justify-center bg-black100 px-[2.25rem] py-[1.125rem] z-10'>
      <MakersLogo />
    </header>
  );
};

export default Header;

function MakersLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={118} height={33} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M18.304 30.583V23.08c0-1.025.454-1.999 1.238-2.66L43.36.377c.95-.8 2.4-.124 2.4 1.117v7.612c.001 1.03-.455 2.006-1.244 2.666L20.702 31.703c-.95.796-2.398.12-2.398-1.12zM38.07 32.046a1.46 1.46 0 01-1.461-1.46v-6.231c0-.807.654-1.461 1.46-1.461h6.23c.808 0 1.462.654 1.462 1.46v6.231a1.46 1.46 0 01-1.461 1.461h-6.23z'
        fill='#fff'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M.124 31.167c-.08-.18-.124-.38-.124-.59v-6.229c0-.043.002-.085.005-.127v-1.14c0-1.025.453-1.999 1.238-2.66L25.056.377c.95-.8 2.4-.124 2.4 1.117v7.612c0 1.03-.455 2.006-1.244 2.666L9.148 26.056v4.522a1.46 1.46 0 01-1.46 1.46H1.62a1.477 1.477 0 01-1.497-.87z'
        fill='#fff'
      />
      <path
        d='M58.501 13.093h-4.047a2.302 2.302 0 01-2.302-2.301v-.167c0-.092.075-.167.167-.167h1.662c.092 0 .166.075.166.167 0 .262.213.475.476.475h3.976c.44 0 .798-.357.798-.798V9.69a.637.637 0 00-.637-.637h-4.03a2.75 2.75 0 01-2.751-2.75V5.66a2.889 2.889 0 012.889-2.888h3.805a2.544 2.544 0 012.544 2.543.167.167 0 01-.167.166h-1.716a.112.112 0 01-.111-.112v-.072a.532.532 0 00-.533-.532h-3.935a.782.782 0 00-.782.782v.642c0 .481.39.87.87.87h4.122a2.424 2.424 0 012.425 2.424v.721a2.889 2.889 0 01-2.889 2.888zM115.11 31.924h-4.047a2.302 2.302 0 01-2.302-2.301v-.168c0-.091.075-.166.166-.166h1.663c.092 0 .166.074.166.166 0 .263.213.475.475.475h3.977c.44 0 .798-.357.798-.797v-.613a.638.638 0 00-.638-.637h-4.029a2.75 2.75 0 01-2.751-2.749v-.644a2.889 2.889 0 012.89-2.887h3.804a2.544 2.544 0 012.545 2.542.167.167 0 01-.167.167h-1.716a.112.112 0 01-.112-.112v-.072a.532.532 0 00-.532-.532h-3.935a.782.782 0 00-.782.782v.642c0 .48.39.87.87.87h4.122A2.425 2.425 0 01118 28.314v.721a2.889 2.889 0 01-2.889 2.888h-.001zM68.869 4.809a.93.93 0 01.928.928v4.468a.929.929 0 01-.928.928h-3.515a.929.929 0 01-.928-.928V5.737a.93.93 0 01.928-.928h3.515zm0-1.993h-3.515a2.92 2.92 0 00-2.921 2.92v4.469a2.92 2.92 0 002.92 2.92h3.516a2.92 2.92 0 002.92-2.92V5.737a2.92 2.92 0 00-2.92-2.921zM74.909 2.816h-1.458a.268.268 0 00-.268.268v14.025c0 .148.12.268.268.268h1.458c.148 0 .268-.12.268-.268V3.084a.268.268 0 00-.268-.268zM81.238 17.395h-1.474a.26.26 0 00-.26.26v14.041c0 .144.117.26.26.26h1.474a.26.26 0 00.26-.26v-14.04a.26.26 0 00-.26-.26zM107.964 21.863a.26.26 0 00-.26-.26h-3.286c-.963 0-1.397.476-1.657 1.343v-1.127a.26.26 0 00-.26-.26h-1.475a.26.26 0 00-.26.26v9.878c0 .143.116.26.26.26h1.475a.26.26 0 00.26-.26v-6.67c0-.791.641-1.431 1.432-1.431h3.51a.26.26 0 00.26-.26v-1.474h.001z'
        fill='#fff'
      />
      <path d='M83.755 27.366v-1.994H79.59v1.994h4.164z' fill='#fff' />
      <path
        d='M86.847 21.471h2.047c.127 0 .2.148.12.248L85.224 26.5h-2.599l3.839-4.844a.488.488 0 01.383-.185h-.001z'
        fill='#fff'
      />
      <path
        d='M87.197 32.044h2.048a.153.153 0 00.12-.247l-4.14-5.297h-2.599l4.186 5.356a.489.489 0 00.385.188zM68.701 21.818v1.474c0 .144.116.26.26.26h6.017c.46 0 .833.372.833.832v7.313c0 .143.116.26.26.26h1.475a.26.26 0 00.26-.26v-7.972a2.173 2.173 0 00-2.168-2.166h-6.676a.26.26 0 00-.26.26v-.001zM79.836 2.86h-3.2c-.903 0-1.634.731-1.634 1.633v6.794a1.85 1.85 0 001.851 1.85h2.984a2.582 2.582 0 002.582-2.58V5.44a2.582 2.582 0 00-2.582-2.58l-.001-.001zm.63 7.248c0 .566-.459 1.025-1.025 1.025h-3.115a1.15 1.15 0 01-1.15-1.15v-3.94c0-.636.514-1.151 1.15-1.151h3.115c.566 0 1.025.458 1.025 1.024v4.193-.001zM87.496 11.1a1.216 1.216 0 01-1.217-1.216v-5.08h3.555a.26.26 0 00.26-.26V3.07a.26.26 0 00-.26-.26h-3.555V.26a.26.26 0 00-.26-.26h-1.301a.26.26 0 00-.26.26v1.954c0 .33-.268.596-.597.596h-.27a.26.26 0 00-.26.26v1.475c0 .143.115.26.26.26h.693v5.079a3.21 3.21 0 003.21 3.209h2.358a.26.26 0 00.26-.26v-1.474a.26.26 0 00-.26-.26h-2.357zM64.004 21.44h-1.766c-.876 0-1.657.409-2.161 1.045a2.627 2.627 0 00-2.1-1.045h-1.68c-.976 0-1.833.508-2.323 1.273V21.7a.26.26 0 00-.26-.26H52.24a.26.26 0 00-.26.26v9.997c0 .143.116.26.26.26h1.475a.26.26 0 00.26-.26v-7.212c0-.581.472-1.052 1.054-1.052h2.19c.604 0 1.093.488 1.093 1.091v7.172c0 .144.116.26.26.26h1.445a.26.26 0 00.26-.26v-7.21c0-.581.472-1.052 1.054-1.052h2.19c.603 0 1.092.488 1.092 1.091v7.17c0 .144.117.26.26.26h1.506a.26.26 0 00.26-.26v-7.627a2.63 2.63 0 00-2.63-2.629l-.004.001z'
        fill='#fff'
      />
      <path
        d='M70.14 26.082a2.095 2.095 0 00-2.096 2.095v1.685c0 1.156.938 2.095 2.096 2.095h3.268c2.104 0 2.919-1.705 2.919-3.808v-2.69l-6.187.623zm5.667 2.174c0 1.047-.666 1.722-1.713 1.722H71.08c-.576 0-1.043-.294-1.043-.869v-.319c0-.575.467-.869 1.043-.869l4.726-.483v.819zM91.57 27.994v-.979h-1.994v1.344a3.685 3.685 0 003.684 3.685h4.898a.26.26 0 00.26-.26V30.31a.26.26 0 00-.26-.26h-4.533a2.055 2.055 0 01-2.055-2.056v.001z'
        fill='#fff'
      />
      <path
        d='M89.576 24.422v3.031h9.355a.264.264 0 00.265-.264v-2.766a2.864 2.864 0 00-2.864-2.864H92.44a2.864 2.864 0 00-2.863 2.864h-.001zm7.626 1.037h-5.447a.186.186 0 01-.186-.185V24.26c0-.39.317-.708.708-.708h4.216c.391 0 .709.317.709.708v1.2-.002z'
        fill='#fff'
      />
    </svg>
  );
}
