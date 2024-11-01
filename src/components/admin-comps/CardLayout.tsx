import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

type CardProps= {
    imageUrl?: string;
  title?: string;
  badgeText?: string;
  children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function CardLayout({ imageUrl, title, badgeText, children, footer }: CardProps) {

   return (
    <Card className="w-full max-w-sm shadow-lg rounded-lg overflow-hidden bg-white">
        <CardHeader>
            {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />}
            {badgeText && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {badgeText}
          </div>
        )}
        </CardHeader>
        
        <CardTitle>{title}</CardTitle>
        
        <div>{children}</div>
        
        {footer && <CardFooter className="p-4 flex justify-end">{footer}</CardFooter>}
    </Card>
   )

}