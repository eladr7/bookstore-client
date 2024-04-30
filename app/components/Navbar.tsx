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
        // height={10}
        quality={100}
        // placeholder="blur"
      />
      <div className="flex align-center divide-x-2 gap-2">
        <h1>Super-Mario Bookstore Catalog</h1>
        <div className="flex gap-6 pt-1 ml-4 pl-3">
          <Link href="/">Dashboard</Link>
          <Link href="/books">Books Catalog</Link>
        </div>
      </div>
    </nav>
  );
};
