import { Property } from "@prisma/client";
import { Dialog, DialogTitle, DialogContent, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";

type PropertyModalProps = {
    property: Property;
    open: boolean;
    onClose: () => void;
};

export default function PropertyModal({ property, open, onClose }: PropertyModalProps) {
    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="flex items-center justify-center fixed  bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 mx-auto my-auto">
                    <DialogTitle className="text-lg font-bold">{property.name}</DialogTitle>
                    <DialogDescription className="mt-2">
                        <p>{property.description}</p>
                        <div className="mt-4">
                            <label htmlFor="checkIn">Incheckning:</label>
                            <input type="date" id="checkIn" className="border rounded ml-2" />
                            <label htmlFor="checkOut" className="ml-4">Utcheckning:</label>
                            <input type="date" id="checkOut" className="border rounded ml-2" />
                        </div>
                    </DialogDescription>
                    <div className="mt-4 flex justify-between">
                        <Button onClick={() => {/* Logik för att boka fastigheten */}}>Boka</Button>
                        <Button variant="secondary" onClick={onClose}>Stäng</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
