import localFont from 'next/font/local';

export const ppAgrandir = localFont({
  src: [
    {
      path: '../../public/fonts/figmafonts/PP Agrandir/PPAgrandir-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/figmafonts/PP Agrandir/PPAgrandir-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-pp-agrandir',
  display: 'swap',
});

export const graphik = localFont({
  src: [
    {
      path: '../../public/fonts/figmafonts/Graphik/177dfc527bd44fad48eb07c66fb3cc41.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/figmafonts/Graphik/Graphik-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-graphik',
  display: 'swap',
});

export const sohne = localFont({
  src: [
    {
      path: '../../public/fonts/figmafonts/Sohne (Body)/Sohne-Buch.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/figmafonts/Sohne (Body)/Sohne-Kraftig.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-sohne',
  display: 'swap',
});

export const bagoss = localFont({
  src: [
    {
      path: '../../public/fonts/figmafonts/Bagoss/BagossTRIALVF.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-bagoss',
  display: 'swap',
});
