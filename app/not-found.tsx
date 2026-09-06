import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(0,229,255,0.08) 0%, transparent 60%)",
      }}
    >
      <div
        style={{
          fontSize: "8rem",
          fontWeight: 900,
          background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: 800,
          marginBottom: 12,
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          maxWidth: 380,
          lineHeight: 1.7,
          marginBottom: 32,
        }}
      >
        Looks like this page doesn&apos;t exist. Maybe it was moved or you typed the
        URL wrong.
      </p>
      <Link href="/" className="btn-primary inline-block px-8 py-3 text-base">
        ← Back to Home
      </Link>
    </div>
  );
}
