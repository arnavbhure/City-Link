const DashboardAurora = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>
        {`
          @keyframes citylink-aurora-drift {
            0%, 100% { transform: translate3d(-8%, -4%, 0) rotate(0deg) scale(1); }
            50% { transform: translate3d(8%, 5%, 0) rotate(2deg) scale(1.08); }
          }

          @keyframes citylink-grid-fade {
            0%, 100% { opacity: 0.22; }
            50% { opacity: 0.34; }
          }

          @media (prefers-reduced-motion: reduce) {
            .citylink-aurora-motion {
              animation: none !important;
            }
          }
        `}
      </style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_75%_8%,rgba(129,140,248,0.17),transparent_32%),linear-gradient(180deg,#020617_0%,#070b1c_52%,#020617_100%)]" />

      <div
        className="citylink-aurora-motion absolute -left-1/4 top-16 h-80 w-[145%] blur-3xl"
        style={{
          background:
            "linear-gradient(110deg, transparent 8%, rgba(34, 211, 238, 0.16) 22%, rgba(129, 140, 248, 0.2) 42%, rgba(16, 185, 129, 0.11) 61%, transparent 82%)",
          animation: "citylink-aurora-drift 18s ease-in-out infinite",
        }}
      />

      <div
        className="citylink-aurora-motion absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148, 163, 184, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.07) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 16%, black 58%, transparent 92%)",
          animation: "citylink-grid-fade 10s ease-in-out infinite",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
    </div>
  );
};

export default DashboardAurora;
