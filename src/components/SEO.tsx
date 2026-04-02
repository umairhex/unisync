import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  twitterHandle?: string;
}

export function SEO({
  title,
  description = "Smart course scheduling system with drag-drop, conflict prevention, and export to calendar. Plan your semester smarter with Calyra.",
  name = "Calyra",
  type = "website",
  url = "https://calyra.vercel.app",
  image = "/og-image.png",
  twitterHandle = "@calyra_app",
}: SEOProps) {
  const siteTitle = title ? `${title} | ${name}` : name;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: name,
    url: url,
    description: description,
    applicationCategory: "Productivity",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Drag-Drop Scheduling, Visual Weekly Grid, Conflict Detection, Credit Tracking, Reference Images, Export as PNG, Dark Mode, Local Persistence",
  };

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
