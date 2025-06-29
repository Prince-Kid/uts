"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Mail, MapPin, Phone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/public/2q3tB7b0YkHYtlMxBhC8anVKrc1.svg";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use the same API endpoint as the order system
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Message Failed",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl md:text-5xl text-[#3c5e9e] mb-3">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with any questions about our products or services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-[#3c5e9e] text-white rounded-2xl shadow-xl p-8 lg:p-10 overflow-hidden relative">
              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#f4fc0a]/20 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#f4fc0a]/20 rounded-full -ml-14 -mb-14"></div>
              
              {/* Logo */}
              <div className="flex justify-center mb-8 relative z-10 ">
                <div className="relative h-20 w-20 bg-white rounded-full p-2 flex items-center justify-center shadow-md">
                  <Image 
                    src={logo} 
                    alt="UTS Rwanda Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <h3 className="font-bold text-3xl mb-8 relative z-10 text-center">Get In Touch</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#f4fc0a] text-[#3c5e9e] p-3 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[#f4fc0a]">Our Location</h4>
                    <p className="text-white/90">Nyabihu, Rwanda</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#f4fc0a] text-[#3c5e9e] p-3 rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[#f4fc0a]">Email Us</h4>
                    <p className="text-white/90">twizerimanaschadrack@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#f4fc0a] text-[#3c5e9e] p-3 rounded-full">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[#f4fc0a]">Call Us</h4>
                    <p className="text-white/90">+250 785 954 141</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#f4fc0a] text-[#3c5e9e] p-3 rounded-full">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[#f4fc0a]">Business Hours</h4>
                    <p className="text-white/90">Monday - Friday: 8am - 6pm</p>
                    <p className="text-white/90">Saturday: 9am - 4pm</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex justify-center space-x-4 relative z-10">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-white/20 hover:bg-[#f4fc0a] hover:text-[#3c5e9e] p-3 rounded-full transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-white/20 hover:bg-[#f4fc0a] hover:text-[#3c5e9e] p-3 rounded-full transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-white/20 hover:bg-[#f4fc0a] hover:text-[#3c5e9e] p-3 rounded-full transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 transform hover:scale-[1.01] transition-transform duration-300">
              <h3 className="font-bold text-3xl text-[#3c5e9e] mb-6">Send Us A Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name" 
                      required
                      className="border-gray-300 focus:ring-[#3c5e9e] focus:border-[#3c5e9e] dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email" 
                      required
                      className="border-gray-300 focus:ring-[#3c5e9e] focus:border-[#3c5e9e] dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                  <Input 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is your message about?" 
                    required
                    className="border-gray-300 focus:ring-[#3c5e9e] focus:border-[#3c5e9e] dark:bg-gray-800 dark:border-gray-700" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..." 
                    required
                    className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-[#3c5e9e] focus:border-[#3c5e9e] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full bg-gradient-to-r from-[#3c5e9e] to-[#2a4a7a] hover:from-[#2a4a7a] hover:to-[#3c5e9e] text-white font-medium py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
              
              {/* Tagline */}
              <p className="text-center text-sm text-gray-500 mt-6">
                We appreciate your interest in UTS Rwanda. Our team will respond to your inquiry within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}