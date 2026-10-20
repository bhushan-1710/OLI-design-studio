import { Instrument_Serif, DM_Mono, Just_Another_Hand } from 'next/font/google';

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-mono',
  display: 'swap',
});

export const justAnotherHand = Just_Another_Hand({
  subsets: ['latin'],
  weight: '400',
  style: ['normal'],
  variable: '--font-hand',
  display: 'swap',
});

export const fontClassNames = `${instrumentSerif.variable} ${dmMono.variable} ${justAnotherHand.variable}`;
