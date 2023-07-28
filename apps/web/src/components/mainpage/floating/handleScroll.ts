export const handleScroll = (position: number | undefined) => {
  window.scrollTo({ top: position, behavior: 'smooth' });
};
