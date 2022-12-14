import Link from "next/link"

import { InnerContainer, OuterContainer } from "@/components/Container"
import { routesArray } from "@/lib/routes"
import clsx from "clsx"
import { useRouter } from "next/router"

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  let isActive = useRouter().pathname === href
  return (
    <Link
      href={href}
      className={clsx(
        "transition",
        isActive
          ? "text-teal-500 dark:text-teal-400"
          : "hover:text-teal-500 dark:hover:text-teal-400"
      )}
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <OuterContainer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <InnerContainer>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {routesArray.map((route) => (
                  <NavLink key={route.path} href={route.path}>
                    {route.name}
                  </NavLink>
                ))}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Jan Oppermann. All rights
                reserved.
              </p>
            </div>
          </InnerContainer>
        </div>
      </OuterContainer>
    </footer>
  )
}
