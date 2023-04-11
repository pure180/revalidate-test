import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export function getStaticProps() {
  return {
    props: {
      time: new Date().toISOString(),
    },
  };
}

export default function Home({ time }: any) {
  function revalidate() {
    fetch('/api/revalidate');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{time}</div>
      <div>
        <button onClick={() => revalidate()}>Revalidate</button>
      </div>
    </main>
  );
}
