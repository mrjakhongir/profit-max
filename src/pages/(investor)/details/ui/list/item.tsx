import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import InfoItem from "@/shared/ui/custom/info-item";
import { CalendarCheck2 } from "lucide-react";

const TransactionItem = () => {
  return (
    <li className="border-b">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center py-2">
            <div className="flex flex-col">
              <h3 className="text-accent font-serif text-lg font-medium">
                $10,000.00
              </h3>
              <div className="text-muted-foreground/70 flex items-center gap-1 font-medium">
                <CalendarCheck2 size={14} />
                <span className="text-xs">12.02.2026</span>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col gap-1 rounded-xl border p-2">
              <InfoItem label="25 Feb 2026" value="$400" />
              <InfoItem label="25 Mar 2026" value="$400" />
              <InfoItem label="25 Apr 2026" value="$400" />
              <InfoItem label="25 May 2026" value="$400" />
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
};

export default TransactionItem;
