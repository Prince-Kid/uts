import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearnPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">Discover How We Make Clothes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn about the craftsmanship, techniques, and cultural significance behind each UTS creation. Our
            educational resources showcase the journey from concept to finished product.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              Watch Videos <Play className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Read Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  alt="Featured Video"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button variant="secondary" size="icon" className="rounded-full h-16 w-16">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl">The Art of Traditional Rwandan Weaving</h2>
              <p className="text-muted-foreground">
                In this featured video, we explore the ancient weaving techniques that have been passed down through
                generations in Rwanda. Learn how these traditional methods inspire our modern designs and how we
                incorporate them into our contemporary clothing line.
              </p>
              <p className="text-muted-foreground">
                Our master artisans demonstrate the intricate process of creating patterns that tell stories of Rwandan
                culture and history. This video offers a rare glimpse into the craftsmanship that makes each UTS piece
                unique and meaningful.
              </p>
              <Button className="gap-2">
                Watch Full Video <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="section-heading text-center mx-auto mb-12">Educational Content</h2>

          <Tabs defaultValue="videos" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="workshops">Workshops</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "From Sketch to Garment",
                    description: "Follow the journey of a UTS piece from initial concept to finished product.",
                    duration: "12:45",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "Sustainable Fabric Selection",
                    description: "Learn about our eco-friendly approach to choosing materials for our clothing line.",
                    duration: "09:18",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "Traditional Dyeing Techniques",
                    description: "Discover the natural dyeing methods that give our fabrics their vibrant colors.",
                    duration: "15:32",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "Pattern Making: Rwandan Influence",
                    description: "See how traditional Rwandan patterns are incorporated into modern fashion designs.",
                    duration: "11:05",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "Ethical Production Practices",
                    description: "Explore our commitment to fair trade and ethical manufacturing processes.",
                    duration: "14:23",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "Cultural Significance of Designs",
                    description: "Understand the stories and meanings behind our most popular patterns.",
                    duration: "18:47",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                ].map((video, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-md">
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={video.image || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="font-heading text-xl mb-2">{video.title}</h3>
                      <p className="text-muted-foreground mb-4">{video.description}</p>
                      <Button variant="link" className="p-0 h-auto font-medium">
                        Watch Video <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "The History of Rwandan Textiles",
                    description:
                      "Explore the rich history of textile production in Rwanda and how it influences modern fashion.",
                    readTime: "8 min read",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "Sustainable Fashion: Our Approach",
                    description:
                      "Learn about UTS's commitment to environmental responsibility in the fashion industry.",
                    readTime: "12 min read",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "Cultural Motifs in Contemporary Design",
                    description:
                      "How traditional Rwandan symbols and patterns are reimagined for today's fashion landscape.",
                    readTime: "10 min read",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                ].map((article, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-md">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-2">{article.readTime}</div>
                      <h3 className="font-heading text-xl mb-2">{article.title}</h3>
                      <p className="text-muted-foreground mb-4">{article.description}</p>
                      <Button variant="link" className="p-0 h-auto font-medium">
                        Read Article <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workshops">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Introduction to Rwandan Weaving",
                    description:
                      "A hands-on workshop where you'll learn the basics of traditional Rwandan weaving techniques.",
                    date: "June 15, 2023",
                    location: "UTS Studio, Kigali",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                  {
                    title: "Sustainable Fashion Design",
                    description: "Learn how to incorporate eco-friendly practices into your fashion design process.",
                    date: "July 8, 2023",
                    location: "Online Workshop",
                    image: "/placeholder.svg?height=400&width=600",
                  },
                ].map((workshop, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-md">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto">
                        <Image
                          src={workshop.image || "/placeholder.svg"}
                          alt={workshop.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 p-6">
                        <h3 className="font-heading text-xl mb-2">{workshop.title}</h3>
                        <p className="text-muted-foreground mb-4">{workshop.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-calendar mr-2 text-primary"
                            >
                              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                              <line x1="16" x2="16" y1="2" y2="6" />
                              <line x1="8" x2="8" y1="2" y2="6" />
                              <line x1="3" x2="21" y1="10" y2="10" />
                            </svg>
                            {workshop.date}
                          </div>
                          <div className="flex items-center text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-map-pin mr-2 text-primary"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {workshop.location}
                          </div>
                        </div>
                        <Button>Register Now</Button>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process Showcase */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="section-heading text-center mx-auto mb-12">Our Creation Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Design & Inspiration",
                description:
                  "Every UTS piece begins with inspiration drawn from Rwanda's rich cultural heritage. Our designers sketch concepts that blend traditional elements with contemporary fashion trends.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                step: "02",
                title: "Material Selection",
                description:
                  "We carefully source sustainable materials that meet our quality standards. From organic cotton to locally-sourced fabrics, each material is chosen for its environmental impact and durability.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                step: "03",
                title: "Craftsmanship",
                description:
                  "Our skilled artisans bring designs to life using both traditional techniques and modern methods. Each garment is crafted with attention to detail, ensuring quality in every stitch.",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((process, index) => (
              <div key={index} className="flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-xl mb-6">
                  <Image src={process.image || "/placeholder.svg"} alt={process.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-heading text-2xl w-12 h-12 rounded-full flex items-center justify-center">
                    {process.step}
                  </div>
                </div>
                <h3 className="font-heading text-xl mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="section-heading text-center mx-auto mb-12">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How are your clothes made?",
                answer:
                  "Our clothes are made through a combination of traditional craftsmanship and modern techniques. We work with skilled artisans who specialize in Rwandan textile traditions, while also employing contemporary production methods to ensure quality and consistency. Each piece goes through a careful process of design, material selection, pattern making, cutting, sewing, and quality control before reaching our customers.",
              },
              {
                question: "What makes UTS clothing sustainable?",
                answer:
                  "UTS is committed to sustainability at every stage of production. We use organic and responsibly-sourced materials, minimize waste through efficient pattern cutting, employ eco-friendly dyeing processes, and ensure fair wages and safe working conditions for all our artisans and employees. We also focus on creating timeless designs that transcend seasonal trends, encouraging a more sustainable approach to fashion consumption.",
              },
              {
                question: "Can I visit your workshop?",
                answer:
                  "Yes! We offer guided tours of our main workshop in Kigali. Visitors can see firsthand how our clothes are made and meet some of the artisans behind our collections. Tours are available by appointment and can be booked through our website or by contacting our customer service team.",
              },
              {
                question: "Do you offer custom designs?",
                answer:
                  "We do offer custom design services for special occasions and bulk orders. Our design team can work with you to create unique pieces that incorporate your preferences while maintaining the UTS aesthetic and commitment to quality. Please contact us directly to discuss your custom design needs.",
              },
            ].map((faq, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="font-heading text-xl mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Ready to Experience UTS Quality?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Now that you've learned about our craftsmanship and dedication to quality, explore our collections and find
            pieces that tell a story and make a statement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
