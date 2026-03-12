export async function submitIndexNow(urls: string[]) {
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: "medsforpain.com",
        key: "4c2b9f8d1e3a4b5c6d7e8f9a0b1c2d3e",
        keyLocation: "https://medsforpain.com/indexnow-key.txt",
        urlList: urls,
      }),
    });

    if (response.ok) {
      console.log("[SEO] IndexNow submission successful");
    } else {
      console.log("[SEO] IndexNow submission failed");
    }
  } catch (error) {
    console.log("[SEO] IndexNow submission failed", error);
  }
}
