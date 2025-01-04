// import { Button } from "@/components/ui/button";

import Hero from "@/components/hero";
import { ProfileInfo } from "@/components/profile-info";
// import V1Button from "@/components/v1-button";
import { profileData } from "./data/profile-data"

export default function Home() {
  return (
    <div>
      <Hero />
      <ProfileInfo {...profileData} />
    </div>
  );
}
