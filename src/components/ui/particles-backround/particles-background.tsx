import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import { ParticleConfig } from "./particle.config";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {

    await loadConfettiPreset(engine);
  }, []);

  const options = useMemo(() => {
    return ParticleConfig;
  }, []);

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};
