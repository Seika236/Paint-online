import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function MyDialog({children, isOpen}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Напишите своё имя</DialogTitle>

        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};