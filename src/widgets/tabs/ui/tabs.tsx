import { Button } from "@/shared/ui/button";
import Container from "@/shared/ui/custom/container";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import type { TabItem } from "../model/types";

type Properties = {
  items: TabItem[];
};

export const Tabs: React.FC<Properties> = ({ items }) => {
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "active",
  });

  const activeIndex = useMemo(
    () => items.findIndex((item) => item.value === status),
    [status, items],
  );

  return (
    <Container className="flex gap-2">
      <ul className="glass-bg border-accent/10 relative z-20 flex w-full rounded-full border p-1">
        {/* Sliding background */}
        <div
          className="bg-primary absolute top-1 bottom-1 left-1 rounded-full transition-transform duration-300 ease-in-out"
          style={{
            width: `calc((100% - 0.5rem) / ${items.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {items.map((item) => (
          <Button
            key={item.value}
            onClick={() => setStatus(item.value)}
            variant="ghost"
            className={`relative z-30 flex-1 rounded-full tracking-wider ${
              status === item.value
                ? "text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            <item.icon />
            {item.label}
          </Button>
        ))}
      </ul>
    </Container>
  );
};
