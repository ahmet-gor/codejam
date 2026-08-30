import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function MarketingLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
