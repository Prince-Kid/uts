import Image from "next/image"
import { Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">Meet Our Team</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind UTS who bring Rwandan culture and modern fashion together. Our diverse
            team combines traditional craftsmanship with contemporary design expertise.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="UMURAGE TWIZERIMANA Schadrack"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl">UMURAGE TWIZERIMANA Schadrack</h2>
              <p className="text-xl text-primary font-medium">Founder & Creative Director</p>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  UMURAGE TWIZERIMANA Schadrack founded UTS in 2018 with a vision to showcase Rwandan cultural heritage
                  through contemporary fashion. Born and raised in Kigali, Schadrack's deep connection to his roots and
                  passion for design led him to create a brand that bridges tradition and innovation.
                </p>
                <p>
                  With a background in textile design and fashion from the Royal Academy of Fine Arts in Antwerp,
                  Schadrack combines his formal education with the traditional craftsmanship he learned from local
                  artisans during his childhood. His unique perspective has earned UTS recognition both in Rwanda and
                  internationally.
                </p>
                <p>
                  "My goal is to tell stories through clothing - stories of Rwanda's rich culture, its resilience, and
                  its beauty. Each piece we create is a conversation between heritage and contemporary design."
                </p>
              </div>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="section-heading text-center mx-auto mb-12">Leadership Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Uwase",
                role: "Head of Design",
                bio: "With over 15 years of experience in fashion design, Marie leads our creative team with a focus on blending traditional patterns with contemporary silhouettes.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Jean-Paul Mugabo",
                role: "Production Manager",
                bio: "Jean-Paul oversees our production process, ensuring that each garment meets our high standards of quality while maintaining ethical manufacturing practices.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Claire Mutoni",
                role: "Marketing Director",
                bio: "Claire brings a global perspective to our brand strategy, having worked with fashion houses in Paris and New York before joining UTS.",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-heading text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                  <div className="flex space-x-3 mt-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Team */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="section-heading text-center mx-auto mb-12">Design Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Emmanuel Nkusi",
                role: "Senior Designer",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Diane Mukamana",
                role: "Pattern Maker",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Patrick Uwimana",
                role: "Textile Designer",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Olivia Ingabire",
                role: "Junior Designer",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-sm">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-center space-x-3">
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                          <Instagram className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4 text-center">
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="section-heading text-center mx-auto mb-6">Our Artisans</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            The skilled craftspeople who bring our designs to life, preserving traditional techniques while embracing
            innovation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="UTS Artisans at work"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-heading text-2xl">Preserving Tradition Through Craftsmanship</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At the heart of UTS are our talented artisans who bring decades of experience in traditional Rwandan
                  craftsmanship. Many of our team members have learned their skills through family traditions passed
                  down through generations.
                </p>
                <p>
                  We currently work with over 30 artisans across Rwanda, providing fair employment and opportunities to
                  preserve and share their cultural heritage. Our artisans specialize in various techniques including
                  weaving, embroidery, beadwork, and natural dyeing.
                </p>
                <p>
                  Through our apprenticeship program, we ensure these valuable skills continue to be passed on to
                  younger generations, creating a sustainable future for Rwandan craftsmanship while adapting to
                  contemporary fashion needs.
                </p>
              </div>
              <Button>Learn About Our Artisan Program</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Join Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals who share our vision of blending cultural heritage with
            contemporary fashion. Explore our current opportunities or send us your portfolio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">View Open Positions</Button>
            <Button variant="outline" size="lg">
              Send Your Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
