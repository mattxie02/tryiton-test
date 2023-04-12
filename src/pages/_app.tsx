import '@/styles/globals.css'
import type { AppType, AppProps } from 'next/app'
import { trpc } from '@/utils/trpc';
import Header from '@/components/Header';

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
