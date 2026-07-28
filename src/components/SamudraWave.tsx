interface SamudraWaveProps {
  className?: string;
  flip?: boolean;
}

export function SamudraWave({ className = "", flip = false }: SamudraWaveProps) {
  return (
    <div
      className={`pointer-events-none w-full leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          className="fill-page"
        />
        <path
          d="M0 50C360 90 720 10 1080 50C1260 70 1380 55 1440 50V80H0V50Z"
          fill="currentColor"
          className="text-brand/10"
        />
      </svg>
    </div>
  );
}
