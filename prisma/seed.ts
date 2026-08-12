// Development seed data only — never a data source the app depends on at
// runtime. Safe to re-run: uses upsert on unique slugs/skus throughout.
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const nike = await db.brand.upsert({
    where: { slug: "nike" },
    update: {},
    create: { nameEn: "Nike", nameKm: "ណៃគី", slug: "nike" },
  });

  const gap = await db.brand.upsert({
    where: { slug: "gap" },
    update: {},
    create: { nameEn: "GAP", nameKm: "ហ្គាប", slug: "gap" },
  });

  const footwear = await db.category.upsert({
    where: { slug: "footwear" },
    update: {},
    create: { nameEn: "Footwear", nameKm: "ស្បែកជើង", slug: "footwear" },
  });

  const outerwear = await db.category.upsert({
    where: { slug: "outerwear" },
    update: {},
    create: { nameEn: "Outerwear", nameKm: "សម្លៀកបំពាក់ខាងក្រៅ", slug: "outerwear" },
  });

  const airMax = await db.product.upsert({
    where: { slug: "nike-air-max" },
    update: {},
    create: {
      sku: "NIKE-AIRMAX-001",
      slug: "nike-air-max",
      nameEn: "Nike Air Max",
      nameKm: "ណៃគី អែរ ម៉ាក់ស៍",
      descriptionEn: "Classic cushioned running silhouette.",
      descriptionKm: "រូបរាងរត់បែបបុរាណដែលមានខ្នើយទន់។",
      price: 120.0,
      status: "ACTIVE",
      visibility: true,
      brandId: nike.id,
      categoryId: footwear.id,
    },
  });

  await db.productVariant.upsert({
    where: { sku: "NIKE-AIRMAX-001-BLK-9" },
    update: {},
    create: {
      productId: airMax.id,
      size: "9",
      color: "Black",
      sku: "NIKE-AIRMAX-001-BLK-9",
      stock: 12,
    },
  });

  await db.productVariant.upsert({
    where: { sku: "NIKE-AIRMAX-001-BLK-10" },
    update: {},
    create: {
      productId: airMax.id,
      size: "10",
      color: "Black",
      sku: "NIKE-AIRMAX-001-BLK-10",
      stock: 7,
    },
  });

  const existingImage = await db.productImage.findFirst({
    where: { productId: airMax.id, isMain: true },
  });
  if (!existingImage) {
    await db.productImage.create({
      data: {
        productId: airMax.id,
        url: "https://placehold.co/800x800?text=Nike+Air+Max",
        altEn: "Nike Air Max, black colorway",
        altKm: "ណៃគី អែរ ម៉ាក់ស៍ ពណ៌ខ្មៅ",
        isMain: true,
        position: 0,
      },
    });
  }

  await db.product.upsert({
    where: { slug: "gap-classic-jacket" },
    update: {},
    create: {
      sku: "GAP-JACKET-001",
      slug: "gap-classic-jacket",
      nameEn: "Classic Denim Jacket",
      nameKm: "អាវខោខូវប៊យបុរាណ",
      price: 89.0,
      status: "ACTIVE",
      visibility: true,
      brandId: gap.id,
      categoryId: outerwear.id,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
