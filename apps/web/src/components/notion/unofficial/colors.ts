import { Color } from 'notion-types';

export const colorStyles = {
  blue: 'text-[#4552E8]',
  brown: 'text-[#8f6e30]',
  gray: 'text-[#9b9a97]',
  pink: 'text-[#FDBBF9]',
  purple: 'text-[#7f46db]',
  orange: 'text-[#FF6E1D]',
  red: 'text-[#dc4444]',
  teal: 'text-[#5DDBFF]',
  yellow: 'text-[#FFCA00]',
  blue_background: 'bg-[#252b6b]',
  brown_background: '',
  gray_background: 'bg-[#37352f]',
  orange_background: '',
  pink_background: '',
  purple_background: '',
  red_background: '',
  teal_background: '',
  yellow_background: '',
} satisfies Record<Color, string>;
