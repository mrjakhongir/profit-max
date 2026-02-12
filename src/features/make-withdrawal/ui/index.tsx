import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { BanknoteArrowUp } from "lucide-react";

export const MakeWithdrawal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="flex-1">
        <Button
          size="lg"
          className="flex w-full items-center justify-center rounded-full"
        >
          <BanknoteArrowUp />
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>Yeeeeeey new deposit 🎉</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
