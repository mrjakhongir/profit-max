import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import InfoItem from "@/shared/ui/custom/info-item";
import {
  BanknoteArrowUp,
  CalendarCheck2,
  FileText,
  HandCoins,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Deposit } from "../../model/types";

type Properties = {
  item: Deposit;
};

const TransactionItem: React.FC<Properties> = ({ item }) => {
  return (
    <li className="border-b">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center py-2">
            <div className="flex flex-col">
              <h3 className="text-accent font-serif text-lg font-medium">
                ${item.amount}
              </h3>
              <div className="text-muted-foreground/70 flex items-center gap-1 font-medium">
                <CalendarCheck2 size={14} />
                <span className="text-xs">{item.date}</span>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-2">
            <>
              <div className="flex flex-col gap-2 rounded-xl border p-2">
                <h4 className="flex items-center gap-2 font-medium tracking-wide uppercase">
                  <HandCoins size={18} /> Dividends
                </h4>
                <ul className="flex flex-col gap-1">
                  <InfoItem label="25 Feb 2026" value="$400" />
                  <InfoItem label="25 Mar 2026" value="$400" />
                  <InfoItem label="25 Apr 2026" value="$400" />
                  <InfoItem label="25 May 2026" value="$400" />
                </ul>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border p-2">
                <h4 className="flex items-center gap-2 font-medium tracking-wide uppercase">
                  <BanknoteArrowUp size={18} /> Withdrawal
                </h4>
                <ul className="flex flex-col gap-1">
                  <InfoItem label="25 Feb 2026" value="$400" />
                  <InfoItem label="25 Mar 2026" value="$400" />
                </ul>
              </div>

              <Link to="">
                <Button size="sm" className="w-full rounded-lg">
                  <FileText />
                  Details
                </Button>
              </Link>
            </>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
};

export default TransactionItem;
