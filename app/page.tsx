import { Marquee } from '@/components/Marquee'
import { Backing } from '@/components/sections/Backing'
import { Contact } from '@/components/sections/Contact'
import { Difference } from '@/components/sections/Difference'
import { Founders } from '@/components/sections/Founders'
import { Hero } from '@/components/sections/Hero'
import { Product } from '@/components/sections/Product'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Product />
      <Difference />
      <Backing />
      <Founders />
      <Contact />
    </>
  )
}
