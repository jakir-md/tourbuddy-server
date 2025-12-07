export function generateSlug(title: string): string {
  console.log("title", title);
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  console.log("base", base);
  const uniqueSuffix = Date.now().toString(36).substring(4);

  return `${base}-${uniqueSuffix}`;
}
