export interface ProductInput {
  name: string;
  category: string;
  price: string | number;
  url?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  uses?: string;
  side_effects?: string;
  precautions?: string;
  faq?: string;
  image_alt?: string;
  images?: string[];
  [key: string]: any;
}

export function generateSEOFields(product: ProductInput): ProductInput {
  const name = product.name;

  // 1. Meta Title
  if (!product.meta_title) {
    product.meta_title = `${name} Tablet – Uses, Dosage, Side Effects | MedsForPain`;
  }

  // 2. Meta Description
  if (!product.meta_description) {
    product.meta_description = `${name} tablet is commonly used to treat pain and discomfort. Learn about its uses, dosage, side effects, precautions and safety information.`;
  }

  // 3. Slug (URL)
  if (!product.url || product.url === "") {
    // Generate slug: /category-slug/product-slug
    const categorySlug = product.category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const productSlug = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}-tablet`;
    product.url = `/${categorySlug}/${productSlug}`;
  }

  // 4. Description
  if (!product.description || product.description === "") {
    product.description = `${name} tablet is a medication commonly used to treat moderate to severe pain. It works by affecting certain chemical signals in the brain that are responsible for pain perception.\n\nThis medicine is often prescribed to manage chronic pain, injury related pain, and post-surgical discomfort.`;
  }

  // 5. Uses
  if (!product.uses || product.uses === "") {
    product.uses = `${name} is commonly used for:\n<ul>\n<li>Relief from moderate pain</li>\n<li>Muscle pain treatment</li>\n<li>Injury related pain relief</li>\n<li>Post surgical pain management</li>\n</ul>`;
  }

  // 6. Side Effects
  if (!product.side_effects || product.side_effects === "") {
    product.side_effects = `Common side effects of ${name} may include:\n<ul>\n<li>Drowsiness</li>\n<li>Dizziness</li>\n<li>Nausea</li>\n<li>Headache</li>\n<li>Constipation</li>\n</ul>\n<p>If severe side effects occur, consult a healthcare professional immediately.</p>`;
  }

  // 7. Precautions
  if (!product.precautions || product.precautions === "") {
    product.precautions = `${name} should be used with caution:\n<ul>\n<li>Avoid alcohol while taking this medication</li>\n<li>Do not exceed the recommended dosage</li>\n<li>Consult a doctor if you have liver or kidney disease</li>\n<li>Not recommended during pregnancy without medical advice</li>\n</ul>`;
  }

  // 8. Image Alt
  if (!product.image_alt || product.image_alt === "") {
    product.image_alt = `${name} tablet pain relief medicine`;
  }

  // 9. FAQ
  if (!product.faq || product.faq === "") {
    product.faq = `<h3>What is ${name} used for?</h3>\n<p>${name} is used for treating moderate to severe pain and improving comfort in patients suffering from chronic pain conditions.</p>\n<h3>How long does ${name} take to work?</h3>\n<p>Most pain relief medications start working within 30 to 60 minutes after consumption.</p>\n<h3>What are the side effects of ${name}?</h3>\n<p>Common side effects may include dizziness, nausea, drowsiness and headache.</p>`;
  }

  return product;
}
