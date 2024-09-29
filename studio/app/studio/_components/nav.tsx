"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const splitted = "/" + pathname.split("/").slice(2).toString();

  const navbars = [
    {
      name: "Overview",
      href: "/",
    },
    {
      name: "Users",
      href: "/users",
    },
    {
      name: "Organizations",
      href: "/orgs",
    },
    {
      name: "Configuration",
      href: "/config",
    },
  ];
  console.log({ splitted });
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8">
          {navbars.map((nav) => {
            return (
              <a href={`/studio${nav.href}`} key={nav.name}>
                <li
                  className={cn(
                    "py-4 text-sm text-gray-500 hover:text-gray-700",
                    nav.href === splitted
                      ? "border-b-2 text-gray-900 border-stone-600 font-medium"
                      : ""
                  )}
                >
                  {nav.name}
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
