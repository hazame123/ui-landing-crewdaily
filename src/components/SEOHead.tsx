export default function SEOHead() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CrewDaily",
    description:
      "Professional film crew hiring platform connecting productions with trusted crew members",
    url: "https://crewdaily.co.uk",
    logo: "https://crewdaily.co.uk/logo.png",
    sameAs: [
      "https://twitter.com/crewdaily",
      "https://linkedin.com/company/crewdaily",
      "https://instagram.com/crewdaily",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-XXX-XXX-XXXX", // <----- ADD LATER -----
      contactType: "customer service",
      email: "support@crewdaily.co.uk", // <----- ADD LATER -----
    },
    service: {
      "@type": "Service",
      name: "Film Crew Hiring Platform",
      description:
        "Professional crew booking and production management platform for film and TV industry",
      provider: {
        "@type": "Organization",
        name: "CrewDaily",
      },
      areaServed: {
        "@type": "Place",
        name: "United Kingdom",
      },
      audience: {
        "@type": "Audience",
        audienceType: "Film and TV Productions, Freelance Crew Members",
      },
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://crewdaily.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Film Crew Hiring",
        item: "https://crewdaily.co.uk/crew-hiring",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="CrewDaily" />
      <meta name="publisher" content="CrewDaily" />
      <meta name="copyright" content="© 2024 CrewDaily. All rights reserved." />
      <meta
        name="category"
        content="Film Production, Crew Hiring, Entertainment Industry"
      />
      <meta name="coverage" content="United Kingdom" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
    </>
  );
}
