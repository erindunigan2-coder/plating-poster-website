// Shopify Storefront API helpers

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_URL = `https://${STORE_DOMAIN}/api/2024-01/graphql.json`;

// Logo Upgrade variant ID (from Shopify)
export const LOGO_UPGRADE_VARIANT_ID = "gid://shopify/ProductVariant/43670257893442";

async function shopifyFetch(query: string, variables?: object) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// Fetch all products with variants
export async function getProducts() {
  const data = await shopifyFetch(`{
    products(first: 20) {
      edges {
        node {
          id
          title
          description
          variants(first: 20) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
        }
      }
    }
  }`);
  return data.products.edges.map((e: { node: unknown }) => e.node);
}

// Create a cart and return the checkout URL
export async function createCartAndCheckout(
  lineItems: { merchandiseId: string; quantity: number }[]
) {
  const data = await shopifyFetch(
    `mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors { field message }
      }
    }`,
    { input: { lines: lineItems } }
  );

  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return cart as { id: string; checkoutUrl: string };
}

// Map our display size to Shopify's option value
export function toShopifySize(size: string): string {
  // Shopify uses "18x24", we display "18×24"
  return size.replace("×", "x");
}

// Map our display language to Shopify's option value
export function toShopifyLanguage(lang: "en" | "es"): string {
  return lang === "en" ? "English" : "Spanish";
}
