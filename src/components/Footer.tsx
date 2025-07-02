"use client";

export default function Footer() {
  return (
    <footer
      className="py-16"
      style={{ backgroundColor: "rgb(var(--background))" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: "rgb(var(--foreground))" }}
            >
              CrewDaily
            </h3>
            <p
              className="font-light"
              style={{ color: "rgb(var(--foreground-muted))" }}
            >
              Modern crew management for film & TV
            </p>
          </div>
          <div
            className="flex gap-8"
            style={{ color: "rgb(var(--foreground-muted))" }}
          >
            <a
              href="#"
              className="transition-colors font-light"
              style={{ color: "rgb(var(--foreground-muted))" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgb(var(--foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgb(var(--foreground-muted))";
              }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="transition-colors font-light"
              style={{ color: "rgb(var(--foreground-muted))" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgb(var(--foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgb(var(--foreground-muted))";
              }}
            >
              Terms
            </a>
            <a
              href="#"
              className="transition-colors font-light"
              style={{ color: "rgb(var(--foreground-muted))" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgb(var(--foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgb(var(--foreground-muted))";
              }}
            >
              Contact
            </a>
          </div>
        </div>
        <div
          className="border-t mt-8 pt-8 text-center font-light"
          style={{
            borderColor: "rgb(var(--border))",
            color: "rgb(var(--foreground-subtle))",
          }}
        >
          <p>&copy; 2024 CrewDaily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
