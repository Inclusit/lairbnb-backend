// ErrorPopup.tsx

import { Dialog, DialogTitle, DialogContent, DialogDescription } from "./ui/dialog"; // Justera sökvägen om det behövs
import { Button } from "./ui/button";


type ErrorPopupProps = {
    open: boolean;
    onClose: () => void;
    message: string;
};

// Du kan definiera komponenten som en vanlig funktion
function ErrorPopup({ open, onClose, message }: ErrorPopupProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Fel</DialogTitle>
                <DialogDescription>
                    {message}
                </DialogDescription>
                <div className="mt-4 flex justify-end">
                    <Button variant="secondary" onClick={onClose}>Stäng</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ErrorPopup;
