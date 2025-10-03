import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FAQs from '@/components/FAQs';
import About from '@/components/About';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Services />
      <FAQs />
      <About />
    </div>
  );
};

export default Home;
