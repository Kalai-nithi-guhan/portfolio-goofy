import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kalainithiguhan.dev";
  return [
    {
      url: baseUrl,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
