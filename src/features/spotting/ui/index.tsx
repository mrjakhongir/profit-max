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
import { HandCoins } from "lucide-react";

export const Spotting = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-accent flex h-16 w-16 items-center justify-center rounded-full">
          <HandCoins />
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
