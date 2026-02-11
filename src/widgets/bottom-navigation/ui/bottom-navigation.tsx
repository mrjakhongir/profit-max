import Container from "@/shared/ui/custom/container";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { allowedPaths } from "../model/constants";
import { navItems } from "../model/nav-item";

export const BottomNavigation = () => {
  const location = useLocation();

  const activeIndex = useMemo(
    () => navItems.findIndex((item) => item.route === location.pathname),
    [location.pathname],
  );
  console.log(location);
  return (
    <div
      className={`fixed right-0 bottom-0 left-0 ${allowedPaths.includes(location.pathname) ? "block" : "hidden"}`}
    >
      <Container>
        <ul className="glass-bg relative flex items-center justify-between rounded-full p-1">
          {/* Sliding Background */}
          <div
            className="bg-primary absolute top-1 bottom-1 left-1 rounded-full transition-transform duration-300 ease-in-out"
            style={{
              width: `calc((100% - 0.5rem) / ${navItems.length})`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />

          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link
                to={item.route}
                className={`relative z-10 flex items-center justify-center rounded-full p-3 ${
                  location.pathname === item.route
                    ? "text-background"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};
