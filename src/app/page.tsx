// import { Button } from "@/components/ui/button";

import { CVCard } from "@/components/cv-card";
import { ConnectSection } from "@/components/connect-section-card";
import { EmailCard } from "@/components/email-card";
import Hero from "@/components/hero";
import { ProfileInfo } from "@/components/profile-info";
// import V1Button from "@/components/v1-button";
import { profileData } from "./data/profile-data"

export default function Home() {
  return (
    <div>
      <Hero />
      <ProfileInfo {...profileData} />
      <ConnectSection />
      <EmailCard email={""} />
      <CVCard cvUrl={profileData.cvUrl} />
    </div>
  );
}
