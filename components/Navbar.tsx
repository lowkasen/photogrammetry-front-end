import Link from "next/link";

export function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h1>Photogrammetry Capstone</h1>
      </div>

      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/upload/images">
        <a>Upload Images</a>
      </Link>
      <Link href="/upload/video">
        <a>Upload Video</a>
      </Link>
    </nav>
  );
}
