import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/books.png";

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Bookstore catalog logo"
        width={70}
        height={10}
        quality={100}
        // placeholder="blur"
      />
      <h1>Bookstore Catalog</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/genres">Genres</Link>
    </nav>
  );
};
