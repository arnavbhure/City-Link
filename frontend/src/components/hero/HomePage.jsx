import Features from "./Features";
import Heading from "./HeadingMainContent";
import AnimatedContent from "./react bit components/AnimatedText";

const HomePage = () => {
  return (
    <>
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0.2}
      >
        <Heading />
        <Features />
      </AnimatedContent>
    </>
  );
};

export default HomePage;
