import CategorySection from "@/components/home/CategorySection";
import CTASection from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";
import ImmersiveExperience from "@/components/home/ImmersiveExperience";
import MemoriesPreview from "@/components/home/MemoriesPreview";
import TestimonialSection from "@/components/home/TestimonialSection";
import UniqueExperiences from "@/components/home/UniqueExperiences";


export default function Home() {
  return (
    <div>
    
    <Hero/>

    <CategorySection/>

    <ImmersiveExperience/>

    <UniqueExperiences/>

    <MemoriesPreview/>

    <TestimonialSection/>

    <CTASection/>
    

    </div>
  );
}
