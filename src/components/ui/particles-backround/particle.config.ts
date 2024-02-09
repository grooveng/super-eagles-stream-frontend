export const ParticleConfig = {
  emitters: [
    {
      life: {
        duration: 3,
        count: 1,
      },
      position: {
        x: 10,
        y: -10,
      },
      rate: {
        quantity: 30,
        delay: 0.1,
      },
      particles: {
        move: {
          direction: "bottom-right",
        },
        size: {
          value: 3,
          random: true,
        },
      },
    },
    {
      life: {
        duration: 3,
        count: 1,
      },
      rate: {
        quantity: 30,
        delay: 0.1,
      },
      position: {
        x: 100,
        y: -10,
      },
      particles: {
        move: {
          direction: "bottom-left",
        },
        size: {
          value: 3,
          random: true,
        },
      },
    },
  ],
  preset: "confetti",
};
