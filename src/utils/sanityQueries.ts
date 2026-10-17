// One round-trip for everything the page needs.
export const siteContentQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    companyName,
    "logoUrl": logo.asset->url,
    contactEmail,
    discordUrl,
    slackWebhookUrl,
    slackEndpointUrl,
    address,
    "socialLinks": coalesce(socialLinks[]{label, url}, []),
    seoTitle,
    seoDescription,
    "ogImageUrl": ogImage.asset->url,
    footerText
  },
  "home": *[_type == "homepageContent"][0]{
    heroHeading,
    heroDescription,
    heroPrimaryCta,
    heroSecondaryCta,
    aboutHeading,
    aboutBody,
    servicesHeading,
    servicesIntro,
    testimonialsHeading,
    testimonialsIntro,
    contactHeading,
    contactDescription
  },
  "services": *[_type == "service" && isVisible != false] | order(order asc){
    "id": _id,
    title,
    description,
    icon,
    "imageUrl": image.asset->url,
    "points": coalesce(points, [])
  },
  "testimonials": *[_type == "testimonial" && isVisible != false] | order(order asc, _createdAt desc){
    "id": _id,
    clientName,
    roleCompany,
    quote,
    "type": coalesce(testimonialType, "text"),
    "clientPhotoUrl": clientPhoto.asset->url,
    "imageUrl": image.asset->url,
    "videoUrl": coalesce(videoFile.asset->url, videoUrl),
    "videoThumbnailUrl": videoThumbnail.asset->url,
    featured,
    order
  }
}`;
