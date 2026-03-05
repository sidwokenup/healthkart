const fs = require("fs");
const path = require("path");

// SEO Generator Logic for Anti-Anxiety
function generateSEOFields(product) {
  const name = product.name;

  // 1. Meta Title
  if (!product.meta_title) {
    product.meta_title = `${name} Tablet – Uses, Dosage, Side Effects | MedsForPain`;
  }

  // 2. Meta Description
  if (!product.meta_description) {
    product.meta_description = `${name} tablet is commonly used to treat anxiety disorders and panic attacks. Learn about its uses, dosage, side effects, precautions and safety information.`;
  }

  // 3. Slug (URL)
  if (!product.url || product.url === "") {
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
    product.description = `${name} tablet is a medication commonly used to treat anxiety disorders, panic attacks, and stress-related conditions. It works by calming the brain and nerves.\n\nThis medicine belongs to a class of drugs known as benzodiazepines or anxiolytics, which help in reducing excessive worry and nervousness.`;
  }

  // 5. Uses
  if (!product.uses || product.uses === "") {
    product.uses = `${name} is commonly used for:\n<ul>\n<li>Generalized Anxiety Disorder (GAD)</li>\n<li>Panic disorders with or without agoraphobia</li>\n<li>Short-term relief of anxiety symptoms</li>\n<li>Anxiety associated with depression</li>\n</ul>`;
  }

  // 6. Side Effects
  if (!product.side_effects || product.side_effects === "") {
    product.side_effects = `Common side effects of ${name} may include:\n<ul>\n<li>Drowsiness</li>\n<li>Dizziness</li>\n<li>Fatigue</li>\n<li>Difficulty concentrating</li>\n<li>Dry mouth</li>\n</ul>\n<p>If severe side effects occur, consult a healthcare professional immediately.</p>`;
  }

  // 7. Precautions
  if (!product.precautions || product.precautions === "") {
    product.precautions = `${name} should be used with caution:\n<ul>\n<li>Avoid alcohol while taking this medication</li>\n<li>Do not drive or operate heavy machinery if you feel drowsy</li>\n<li>Consult a doctor if you have a history of substance abuse</li>\n<li>Not recommended during pregnancy without medical advice</li>\n</ul>`;
  }

  // 8. Image Alt
  if (!product.image_alt || product.image_alt === "") {
    product.image_alt = `${name} tablet anti-anxiety medicine`;
  }

  // 9. FAQ
  if (!product.faq || product.faq === "") {
    product.faq = `<h3>What is ${name} used for?</h3>\n<p>${name} is used to treat anxiety disorders and panic attacks by calming the nervous system.</p>\n<h3>How long does ${name} take to work?</h3>\n<p>This medication usually starts working within 30 to 60 minutes after administration.</p>\n<h3>Can ${name} be taken long-term?</h3>\n<p>Long-term use may lead to dependence. It is generally recommended for short-term use under medical supervision.</p>`;
  }

  return product;
}

const productsPath = path.join(__dirname, "../lib/products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

let updatedCount = 0;

const updatedProducts = products.map((p) => {
  // Check if category is Anti-Anxiety (flexible matching)
  if (
    p.category &&
    p.category.toLowerCase().replace("-", "").includes("antianxiety")
  ) {
    updatedCount++;
    return generateSEOFields(p);
  }
  return p;
});

fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));

console.log(
  `Successfully updated ${updatedCount} Anti-Anxiety products with SEO fields.`
);
