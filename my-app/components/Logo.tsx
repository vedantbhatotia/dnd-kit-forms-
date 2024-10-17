// components/Logo.tsx
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="font-bold text-3xl text-orange-600 hover:text-red-800 transition-colors duration-300 hover:cursor-pointer"
    >
      PageForm
    </Link>
  );
}

export default Logo;
