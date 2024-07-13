// NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api

const url = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties({ isFeatured = false } = {}) {
  try {
    if (!url) return [];
    const res = await fetch(
      `${url}/properties${isFeatured ? "/featured" : ""} `,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch properties");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchProperty(id: string) {
  try {
    if (!url) return null;
    const res = await fetch(`${url}/properties/${id}`);
    if (!res.ok) throw new Error("Failed to fetch property");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
