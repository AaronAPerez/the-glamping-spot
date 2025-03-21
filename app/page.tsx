import CategorySection from "@/components/home/CategorySection";
import Hero from "@/components/home/Hero";
import ImmersiveExperience from "@/components/home/ImmersiveExperience";
import MemoriesPreview from "@/components/home/MemoriesPreview";
import UniqueExperiences from "@/components/home/UniqueExperiences";


export default function Home() {
  return (
    <div>
    
    <Hero/>

    <CategorySection/>

    <ImmersiveExperience/>

    <UniqueExperiences/>

    <MemoriesPreview/>

    </div>
  );
}
