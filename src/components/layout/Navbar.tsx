import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link } from "react-router"; // if you use react-router-dom, change to: react-router-dom
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import Logo from "@/assets/icons/Logo";
import { role } from "@/constants/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" as const },
  { href: "/about", label: "About", role: "PUBLIC" as const },
  { href: "/features", label: "Features", role: "PUBLIC" as const },
  { href: "/faq", label: "Faq", role: "PUBLIC" as const },
  { href: "/contact", label: "Contact", role: "PUBLIC" as const },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/agent", label: "Dashboard", role: role.agent },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const userRole = data?.data?.role; // "admin" | "superAdmin" | "user" | undefined

  // Single source of truth: filter links once and reuse in both desktop+mobile
  const visibleLinks = navigationLinks.filter((link) => {
    if (link.role === "PUBLIC") return true;
    return userRole && link.role === userRole;
  });

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-gray-300 ">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="relative md:hidden cursor-pointer"
                variant="ghost"
                size="icon"
              >
                {/* Hamburger with data-state animations */}
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all"
                >
                  <path
                    d="M4 6H20"
                    className="transition-transform data-[state=open]:translate-y-[6px] data-[state=open]:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="opacity-100 transition-opacity data-[state=open]:opacity-0"
                  />
                  <path
                    d="M4 18H20"
                    className="transition-transform data-[state=open]:-translate-y-[6px] data-[state=open]:-rotate-45"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            {/* Mobile menu */}
            <PopoverContent
              align="start"
              sideOffset={8}
              className="w-48 p-1 md:hidden z-[60]"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {visibleLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5 w-full">
                        <Link to={link.href} className="block w-full px-2 py-1.5 rounded hover:bg-muted">
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo + Desktop nav */}
          <div className="flex items-center gap-6">
            <Logo />

            {/* Desktop navigation */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {visibleLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      asChild
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-yellow-400 text-white hover:text-yellow-400 font-bold px-4 py-2 rounded-full text-sm shadow-xl hover:bg-yellow-300 transition"
            >
              Logout
            </Button>
          ) : (
            <Button
              asChild
              className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full text-sm shadow-xl hover:bg-yellow-300 transition"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
