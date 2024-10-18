import Hero from "./_components/Hero";
import HomeHeader from "./_components/HomeHeader";

export default function Home() {
  return (
    <main className="max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl py-8 px-4 vsm:px-8  m-auto">
      <HomeHeader />
      <Hero />
    </main>
  );
}
