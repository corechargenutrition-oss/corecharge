import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://corechargenutrition.in";

  // Fetch products (for dynamic URLs)
  let products: any[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        cache: "no-store",
      }
    );

    products = await res.json();
  } catch (err) {
    console.error("Failed to fetch products for sitemap", err);
  }

  const productUrls =
    products?.map((product) => ({
      url: `${baseUrl}/shop/${product._id}`,
      lastModified: new Date(),
    })) || [];

  return [
    // STATIC PAGES
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/whychooseus`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/verify`,
      lastModified: new Date(),
    },

    // DYNAMIC PRODUCT PAGES
    ...productUrls,
  ];
}