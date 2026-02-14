import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import InfoItem from "@/shared/ui/custom/info-item";
import LoaderCenter from "@/shared/ui/custom/loader";
import {
  BanknoteArrowUp,
  CalendarCheck2,
  FileText,
  HandCoins,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDepositHistory } from "../../api/query";
import type { Deposit, Transaction } from "../../model/types";

type Properties = {
  item: Deposit;
};

const TransactionItem: React.FC<Properties> = ({ item }) => {
  const [opened, setOpened] = useState(false);
  const { data: history, isLoading } = useDepositHistory(
    opened ? item.id : undefined,
  );

  const dividends = history?.filter(
    (item: Transaction) => item.type === "dividend",
  );
  const withdrawals = history?.filter(
    (item: Transaction) => item.type === "withdrawal",
  );

  return (
    <li className="border-b last:border-0">
      <AccordionItem value={item.id} onFocus={() => setOpened(true)}>
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
          {isLoading ? (
            <LoaderCenter className="mt-2" size={24} />
          ) : (
            <>
              <div className="flex flex-col gap-2 rounded-lg border p-2">
                <h4 className="flex items-center gap-2 font-medium tracking-wide uppercase">
                  <HandCoins size={18} /> Dividends
                </h4>
                <ul className="flex flex-col gap-1">
                  {!dividends || dividends.length === 0 ? (
                    <span className="text-muted-foreground">
                      No dividends yet
                    </span>
                  ) : (
                    dividends.map((item: Transaction) => (
                      <InfoItem
                        key={item.id}
                        label={item.date}
                        value={`$${item.amount}`}
                      />
                    ))
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-2 rounded-lg border p-2">
                <h4 className="flex items-center gap-2 font-medium tracking-wide uppercase">
                  <BanknoteArrowUp size={18} /> Withdrawal
                </h4>
                <ul className="flex flex-col gap-1">
                  {!withdrawals || withdrawals.length === 0
                    ? "No withdrawals yet"
                    : withdrawals?.map((item: Transaction) => (
                        <InfoItem
                          key={item.id}
                          label={item.date}
                          value={`$${item.amount}`}
                        />
                      ))}
                </ul>
              </div>

              <Link to="">
                <Button size="sm" className="w-full rounded-lg">
                  <FileText />
                  Details
                </Button>
              </Link>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </li>
  );
};

export default TransactionItem;
