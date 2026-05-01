import Attention from '@/components/Attention'
import Ceremony from '@/components/Ceremory'
import Details from '@/components/Details'
import FamilyPresence from '@/components/FamilyPresence'
import HeroSection from '@/components/HeroSection'
import Reception from '@/components/Reception'
import Rsvp from '@/components/Rsvp'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`${inter.className} bg-white`}>
      <HeroSection/>
      <Rsvp/>
      <FamilyPresence/>
      <Details/>
      {/* <Attention/> */}
      <Ceremony/>
      <Reception/>
    </div>
  )
}
