import { db } from "@/lib/prisma";

// Phase 1 verification page only. This deliberately queries the database
// directly (no mock data, no fallback array) so that a failure here is a
// real, visible error — never silently swapped for "0 products" — per
// architecture rule 14. Replace with the real storefront in Phase 6.
export default async function Home() {
  const [productCount, brandCount] = await Promise.all([
    db.product.count(),
    db.brand.count(),
  ]);

  return (
    <main style={{ padding: "3rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        SHINN — Phase 1 scaffold
      </h1>
      <p>Database connection: OK</p>
      <p>Brands in database: {brandCount}</p>
      <p>Products in database: {productCount}</p>
      <p style={{ marginTop: "2rem", color: "#666" }}>
        This is a verification page, not the real storefront. If the counts
        above match what <code>prisma/seed.ts</code> inserted, Phase 1 (DB +
        Prisma + env config + migrations + seed) is confirmed working end to
        end. Admin, auth, product APIs, and the real storefront come in
        later phases.
      </p>
    </main>
  );
}
