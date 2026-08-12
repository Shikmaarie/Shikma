import type { Metadata } from "next";
import CheckoutForm from "./CheckoutForm";
import { Eyebrow } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "תשלום",
  description: "השלמת ההזמנה ומעבר לסליקה מאובטחת.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="px-5 pt-36 pb-24 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Eyebrow>שלב אחרון</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-black text-cream sm:text-5xl">
          כמעט <span className="text-gradient-gold">שם</span>
        </h1>
        <p className="mt-4 max-w-xl text-cream/60">
          עוד כמה פרטים ואת עוברת לעמוד התשלום המאובטח.
        </p>

        <div className="mt-12">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
