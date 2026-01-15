import ProfileClient from "@/components/Home/ProfileClient";
import { ProfileData } from "@/data/profileData";


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const profile = ProfileData.find(
    (p) => String(p.slug) === params.slug
  );

  if (!profile) {
    return {
      title: "Profile not found",
      robots: "noindex",
    };
  }

  return {
    title: `${profile.name} | TheGreyIT`,
    alternates: {
      canonical: `https://www.thegreyit.org/profile/${params.slug}`,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProfileClient slug={params.slug} />;
}
