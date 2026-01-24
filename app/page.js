'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Phone, Mail, MapPin, Search, X, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

const products = [
  { id: 1, name: "D-CUT BAG", desc: "Custom D-Cut bags for everyday use", img: "/products/1.png" },
  { id: 2, name: "DRAW STRING BAG", desc: "Convenient draw string bags for storage and carrying", img: "/products/2.png" },
  { id: 3, name: "LAUNDRY BAGS", desc: "Durable laundry bags with custom prints", img: "/products/3.png" },
  { id: 4, name: "COAT COVER", desc: "Protective coat covers for garments", img: "/products/4.png" },
  { id: 5, name: "W-CUT BAG", desc: "W-Cut bags for shopping and packaging", img: "/products/5.png" },
  { id: 6, name: "STITCHED BAG", desc: "Stitched bags for heavy-duty use", img: "/products/6.png" },
  { id: 7, name: "CRAFT BAG", desc: "Craft bags for creative projects", img: "/products/7.png" },
  { id: 8, name: "CARD BAG", desc: "Card bags for gifting and packaging", img: "/products/8.png" },
  { id: 9, name: "HANDLE BAG", desc: "Handle bags for easy carrying", img: "/products/9.png" },
  { id: 10, name: "BOX BAG", desc: "Box-shaped bags for structured packaging", img: "/products/10.png" },
  { id: 11, name: "4 COLOR ZIPPER BAG", desc: "Zipper bags with 4-color printing", img: "/products/11.png" },
  { id: 12, name: "JUTE BAG", desc: "Eco-friendly jute bags", img: "/products/12.png" },
  { id: 13, name: "SHOE BAG", desc: "Shoe bags for protection and travel", img: "/products/13.png" },
  { id: 14, name: "TAKEAWAY PAPER BAG", desc: "Takeaway paper bags for food services", img: "/products/14.png" },
  { id: 15, name: "PP LAMINATED BAG", desc: "PP laminated bags for durability", img: "/products/15.png" },
  { id: 16, name: "EVA FROSTED BAG", desc: "EVA frosted bags for premium look", img: "/products/16.png" },
  { id: 17, name: "STANDUP POUCH", desc: "Standup pouches for packaging", img: "/products/17.png" },
  { id: 18, name: "COTTON/CANVAS BAG", desc: "Cotton or canvas bags for reusable purposes", img: "/products/18.png" },
  { id: 19, name: "GARDEN GROW BAG", desc: "Garden grow bags for plants", img: "/products/19.png" },
  { id: 20, name: "COURIER FLYER", desc: "Courier flyers for shipping", img: "/products/20.png" },
  { id: 21, name: "BUSINESS CARDS", desc: "Professional business cards", img: "/products/21.png" },
  { id: 22, name: "LETTER HEAD", desc: "Custom letterheads for official use", img: "/products/22.png" },
  { id: 23, name: "FILE COVER", desc: "File covers for organization", img: "/products/23.png" },
  { id: 24, name: "ENVELOPES", desc: "Custom envelopes for mailing", img: "/products/24.png" },
  { id: 25, name: "LABELS", desc: "Adhesive labels for products", img: "/products/25.png" },
  { id: 26, name: "STICKERS", desc: "Custom stickers for branding", img: "/products/26.png" },
  { id: 27, name: "BROCHURES", desc: "Informative brochures for marketing", img: "/products/27.png" },
  { id: 28, name: "WOVEN TAGS", desc: "Woven tags for clothing", img: "/products/28.png" },
  { id: 29, name: "STAMPS", desc: "Custom stamps for office use", img: "/products/29.png" },
  { id: 30, name: "RESTAURANT PACKAGING", desc: "Packaging solutions for restaurants", img: "/products/30.png" },
  { id: 31, name: "CALENDARS", desc: "Custom calendars for promotion", img: "/products/31.png" },
  { id: 32, name: "SHIELDS", desc: "Award shields for recognition", img: "/products/32.png" },
  { id: 33, name: "COMPANY PROFILE", desc: "Printed company profiles", img: "/products/33.png" },
  { id: 34, name: "DIGITAL PRINTING", desc: "High-quality digital printing services", img: "/products/34.png" },
  { id: 35, name: "PRICE TAGS", desc: "Custom price tags for retail", img: "/products/35.png" },
  { id: 36, name: "T-SHIRT & HOODIES", desc: "Custom printed t-shirts and hoodies", img: "/products/36.png" },
  { id: 37, name: "BARCODE STICKERS", desc: "Barcode stickers for inventory", img: "/products/37.png" },
  { id: 38, name: "PAPER TUBE PACKAGING", desc: "Eco-friendly paper tube packaging", img: "/products/38.png" },
  { id: 39, name: "TISSUE BOXES", desc: "Custom tissue boxes", img: "/products/39.png" },
  { id: 40, name: "PENS", desc: "Branded pens for promotion", img: "/products/40.png" },
  { id: 41, name: "KEYCHAINS", desc: "Custom keychains", img: "/products/41.png" },
  { id: 42, name: "MUGS", desc: "Personalized mugs", img: "/products/42.png" },
  { id: 43, name: "DIARY", desc: "Custom diaries", img: "/products/43.png" },
  { id: 44, name: "PIZZA BOXES", desc: "Custom pizza boxes", img: "/products/44.png" },
  { id: 45, name: "BOTTLES", desc: "Printed bottles", img: "/products/45.png" },
  { id: 46, name: "CARDBOARD BOX", desc: "Custom cardboard boxes", img: "/products/46.png" },
  { id: 47, name: "RIGID BOXES", desc: "Premium rigid boxes", img: "/products/47.png" },
  { id: 48, name: "BAKERY BOXES", desc: "Bakery packaging boxes", img: "/products/48.png" },
  { id: 49, name: "CUSTOMIZED BOXES", desc: "Fully customized boxes", img: "/products/49.png" },
  { id: 50, name: "BUTTER PAPER", desc: "Butter paper for wrapping", img: "/products/50.png" },
  { id: 51, name: "PVC CARDS", desc: "PVC cards for ID and membership", img: "/products/51.png" },
  { id: 52, name: "BOOKS", desc: "Custom printed books", img: "/products/52.png" },
  { id: 53, name: "BILL BOOKS", desc: "Bill books for receipts", img: "/products/53.png" },
  { id: 54, name: "SPIRAL DIARY", desc: "Spiral bound diaries", img: "/products/54.png" },
  { id: 55, name: "BADGES", desc: "Custom badges", img: "/products/55.png" },
  { id: 56, name: "SATIN RIBBON", desc: "Printed satin ribbons", img: "/products/56.png" },
  { id: 57, name: "FLAGS", desc: "Custom flags", img: "/products/57.png" },
  { id: 58, name: "STANDEE", desc: "Standee displays", img: "/products/58.png" },
  { id: 59, name: "VINYL", desc: "Vinyl printing", img: "/products/59.png" },
  { id: 60, name: "PANAFLEX", desc: "Panaflex banners", img: "/products/60.png" },
  { id: 61, name: "1 VISION", desc: "One way vision printing", img: "/products/61.png" },
  { id: 62, name: "3D SIGN BOARD", desc: "3D sign boards", img: "/products/62.png" }
]

export default function Home() {
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState({})
  const [formData, setFormData] = useState({ name: '', message: '' })

  const WHATSAPP_NUMBER = "923113902155"

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('abm-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('abm-cart', JSON.stringify(cart))
  }, [cart])

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
    
    // Show "Added" feedback
    setAddedToCart(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
    ))
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const buyNow = (product) => {
    const msg = `Hi abm Printing!\n\nI want to order:\n• ${product.name}\n\nPlease guide me further.`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }
    let message = "Hi abm Printing! I'd like to place this order:\n\n"
    cart.forEach(item => {
      message += `• ${item.name} × ${item.qty}\n`
    })
    message += "\nPlease confirm price, availability & shipping. Thank you!"
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
    setCart([])
    setIsCartOpen(false)
  }

  const sendInquiry = (e) => {
    e.preventDefault()
    const msg = `Hi abm Printing!\n\nName: ${formData.name}\nMessage: ${formData.message}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setFormData({ name: '', message: '' })
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="abm Printing Solution" 
                width={120} 
                height={60} 
                className="h-10 md:h-12 w-auto object-contain"
                priority
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#products" className="text-sm font-semibold text-gray-700 hover:text-blue-900 transition-colors uppercase tracking-wider">Products</a>
              <a href="#contact" className="text-sm font-semibold text-gray-700 hover:text-blue-900 transition-colors uppercase tracking-wider">Contact</a>
            </div>

            {/* Cart and WhatsApp */}
            <div className="flex items-center space-x-3">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Your Cart ({totalItems} items)</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={item.img} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium">{item.qty}</span>
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="ml-auto text-red-500" onClick={() => removeFromCart(item.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.length > 0 && (
                    <Button className="w-full mt-6 bg-green-600 hover:bg-green-700" onClick={checkoutViaWhatsApp}>
                      <Phone className="mr-2 h-4 w-4" />
                      Order via WhatsApp
                    </Button>
                  )}
                </SheetContent>
              </Sheet>

              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 text-xs md:text-sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Order Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-blue-800/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Open for Digital & Laser Printing</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Quality Printing,{' '}
              <span className="text-blue-400 block md:inline">Unlimited Possibilities.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              From business cards and customized packaging to large-scale 3D sign boards. We deliver precision and speed for every brand.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#products">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-bold">
                  View All Products
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">Our Full Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Browse our complete list of printing and manufacturing services tailored for businesses in Rawalpindi and beyond.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-base"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-base mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.desc}</p>
                  <div className="flex gap-2">
                    <Button
                      className={`flex-1 transition-all ${addedToCart[product.id] ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                      onClick={() => addToCart(product)}
                    >
                      {addedToCart[product.id] ? '✓ Added' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => buyNow(product)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="bg-gray-900 text-white pt-16 md:pt-24 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 border-b border-gray-800 pb-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start?</h2>
              <p className="text-gray-400 mb-8">
                Visit our facility in Rawalpindi or contact us digitally for a quick quote and nationwide shipping.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">
                    Shop # 6 Ground Floor, Rehman Plaza Opposit Ahlehadees Masjid Circular Road Rawalpindi
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-blue-400 flex-shrink-0" />
                  <a href="tel:+923113902155" className="text-gray-300 hover:text-white transition-colors">
                    +92 311 3902155
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-blue-400 flex-shrink-0" />
                  <a href="mailto:abmdigital07@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    abmdigital07@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-6">Quick Message</h3>
              <form onSubmit={sendInquiry} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="Tell us about your printing needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Inquiry via WhatsApp
                </Button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 text-center text-gray-500 text-sm">
            &copy; 2026 abm Printing Solution. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
