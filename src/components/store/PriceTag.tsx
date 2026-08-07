import { formatILS, type Product } from "@/data/products";

/**
 * Renders whatever stands in for a price on this product — a real figure,
 * a "by application" line, or "free". Never invents a number.
 */
export default function PriceTag({
  product,
  size = "md",
}: {
  product: Product;
  size?: "md" | "lg";
}) {
  const big = size === "lg" ? "text-5xl" : "text-3xl";

  if (product.mode === "application") {
    return (
      <div>
        <p className="font-display text-2xl font-bold text-gold-lt">
          בשיחת התאמה
        </p>
        <p className="mt-1 text-xs text-mist/50">
          המסלול והתשלום נקבעים יחד, לפי השלב שבו אתם נמצאים.
        </p>
      </div>
    );
  }

  if (product.mode === "free" || product.price == null) {
    return (
      <p className={`font-display ${big} font-black text-gradient-gold`}>חינם</p>
    );
  }

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span
          className={`ltr-nums font-display ${big} font-black text-gradient-gold`}
        >
          {formatILS(product.price)}
        </span>
        {product.compareAt && (
          <span className="ltr-nums text-sm text-mist/35 line-through">
            {formatILS(product.compareAt)}
          </span>
        )}
      </div>

      {product.priceNote && (
        <p className="ltr-nums mt-1.5 text-xs leading-relaxed text-mist/55">
          {product.priceNote}
        </p>
      )}

      {!product.priceNote && product.maxPayments > 1 && (
        <p className="ltr-nums mt-1 text-xs text-mist/45">
          עד {product.maxPayments} תשלומים
        </p>
      )}
    </div>
  );
}
