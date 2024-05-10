import Link from "next/link";
import Avatar from "./avatar";

export const Header = () => {
  return (
    <header>
      <Link
        href="/"
        className="md:hidden flex justify-center items-center text-2xl font-bold mt-10"
      >
        <Avatar />
        <span>&nbsp;Blog</span>
      </Link>
    </header>
  );
};
