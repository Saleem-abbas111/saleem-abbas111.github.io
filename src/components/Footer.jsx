export default function Footer({ name, githubUrl }) {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center text-sm text-subtle md:flex-row md:justify-between md:text-left">
        <p>
          © {new Date().getFullYear()} {name}
        </p>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            GitHub
          </a>
        )}
      </div>
    </footer>
  );
}
