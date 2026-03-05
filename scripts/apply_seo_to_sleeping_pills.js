const fs = require("fs");
const path = require("path");

// SEO Generator Logic for Sleeping Pills
function generateSEOFields(product) {
  const name = product.name;

  // 1. Meta Title
  if (!product.meta_title) {
    product.meta_title = `${name} Tablet – Uses, Dosage, Side Effects | MedsForPain`;
  }

  // 2. Meta Description
  if (!product.meta_description) {
    product.meta_description = `${name} tablet is commonly used to treat insomnia and sleep disorders. Learn about its uses, dosage, side effects, precautions and safety information.`;
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
    product.description = `${name} tablet is a medication commonly used to treat insomnia and other sleep disorders. It works by slowing down activity in the brain to allow for better sleep.\n\nThis medicine is often prescribed for short-term management of sleep difficulties.`;
  }

  // 5. Uses
  if (!product.uses || product.uses === "") {
    product.uses = `${name} is commonly used for:\n<ul>\n<li>Short-term treatment of insomnia</li>\n<li>Improving sleep quality</li>\n<li>Reducing sleep onset latency</li>\n<li>Managing sleep maintenance disorders</li>\n</ul>`;
  }

  // 6. Side Effects
  if (!product.side_effects || product.side_effects === "") {
    product.side_effects = `Common side effects of ${name} may include:\n<ul>\n<li>Drowsiness</li>\n<li>Dizziness</li>\n<li>Fatigue</li>\n<li>Headache</li>\n<li>Dry mouth</li>\n</ul>\n<p>If severe side effects occur, consult a healthcare professional immediately.</p>`;
  }

  // 7. Precautions
  if (!product.precautions || product.precautions === "") {
    product.precautions = `${name} should be used with caution:\n<ul>\n<li>Avoid alcohol while taking this medication</li>\n<li>Do not drive or operate heavy machinery after taking</li>\n<li>Consult a doctor if you have liver or kidney disease</li>\n<li>Not recommended during pregnancy without medical advice</li>\n</ul>`;
  }

  // 8. Image Alt
  if (!product.image_alt || product.image_alt === "") {
    product.image_alt = `${name} tablet sleeping aid medicine`;
  }

  // 9. FAQ
  if (!product.faq || product.faq === "") {
    product.faq = `<h3>What is ${name} used for?</h3>\n<p>${name} is used for treating insomnia and helping patients fall asleep faster and stay asleep longer.</p>\n<h3>How long does ${name} take to work?</h3>\n<p>Most sleep medications start working within 30 to 60 minutes. It is recommended to take it right before bedtime.</p>\n<h3>Can ${name} cause addiction?</h3>\n<p>Some sleep medications can be habit-forming if used for long periods. Use exactly as prescribed by your doctor.</p>`;
  }

  return product;
}

const productsPath = path.join(__dirname, "../lib/products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

let updatedCount = 0;

const updatedProducts = products.map((p) => {
  // Check if category is Sleeping Pills (flexible matching)
  if (p.category && p.category.toLowerCase().includes("sleeping pills")) {
    updatedCount++;
    return generateSEOFields(p);
  }
  return p;
});

fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));

console.log(
  `Successfully updated ${updatedCount} Sleeping Pills products with SEO fields.`
);
