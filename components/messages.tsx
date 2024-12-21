import { Container } from "./container";
import { FadeIn } from "./fade-in";

export const Messages = () => {
  return (
    <Container className="relative z-10 max-w-[692px] space-y-12 py-36 text-3xl font-bold text-white md:text-4xl">
      <FadeIn>
        <p>
          Doğum günün kutlu olsun,
        </p>
      </FadeIn>
      <FadeIn>
        <p>
          Üzümlü kekim.
        </p>
      </FadeIn>
      <FadeIn>
        <p>
          Arkadaşlığımız boyunca beni hiç bir zaman
        </p>
      </FadeIn>
      <FadeIn>
        <p>
        Yalnız bırakmadığın için teşekkür ederim💖
        </p>
      </FadeIn>
    </Container>
  );
};
