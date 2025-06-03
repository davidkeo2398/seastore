
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaTruck, FaBiking, FaDrone } from "react-icons/fa";

export default function DeliveryDialog({ open, onClose, onSelect }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn phương thức giao hàng</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 mt-4">
          <Button
            className="flex items-center gap-2 w-full"
            onClick={() => onSelect("truck")}
          >
            <FaTruck size={32} />
            Giao hàng bằng xe tải
          </Button>
          <Button
            className="flex items-center gap-2 w-full"
            onClick={() => onSelect("bike")}
          >
            <FaBiking size={32} />
            Giao hàng bằng xe máy
          </Button>
          <Button
            className="flex items-center gap-2 w-full"
            onClick={() => onSelect("drone")}
          >
            <FaDrone size={32} />
            Giao hàng bằng drone
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}