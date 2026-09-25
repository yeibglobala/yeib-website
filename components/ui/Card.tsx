import * as React from "react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/ui/CountUp";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-[var(--color-pale-oak)] bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight font-[var(--font-asul)]",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--color-evergreen)]/80", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Signature element pattern: Evergreen block within the card
interface CardStatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  label?: string;
  source?: string;
}

const CardStatBlock = React.forwardRef<HTMLDivElement, CardStatBlockProps>(
  ({ className, value, label, source, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white text-[var(--color-evergreen)] p-6 rounded-lg relative overflow-hidden shadow-sm border border-[var(--color-pale-oak)]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group",
        className
      )}
      {...props}
    >
      {value && <div className="text-4xl md:text-5xl font-bold font-[var(--font-asul)] mb-2"><CountUp text={value} /></div>}
      {label && <div className="text-sm font-semibold opacity-90">{label}</div>}
      {children}
      {source && (
        <div className="mt-6 pt-4 border-t border-[var(--color-pale-oak)]/20 text-xs font-semibold flex items-center">
          <VerifiedBadge source={source} />
        </div>
      )}
    </div>
  )
);
CardStatBlock.displayName = "CardStatBlock";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardStatBlock,
};
