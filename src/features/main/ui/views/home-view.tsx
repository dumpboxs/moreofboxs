import { HomeHeroSection } from '@/features/main/ui/components/home-hero-section'
import { HomeRecentBlogs } from '@/features/main/ui/components/home-recent-blogs'

export const HomeView = () => {
  return (
    <div className="pt-24 pb-10">
      <HomeHeroSection />

      <HomeRecentBlogs />
    </div>
  )
}
