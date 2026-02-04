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
  { id: 1, name: "BUSINESS CARDS", desc: "Professional business cards", img: "/products/business_cards.jpg" },
  { id: 2, name: "STAMPS", desc: "Custom stamps for office use", img: "/products/stamps.jpg" },
  { id: 3, name: "LETTER HEAD", desc: "Custom letterheads for official use", img: "/products/letter_head.jpg" },
  { id: 4, name: "BROCHURES", desc: "Informative brochures for marketing", img: "/products/brochures.png" },
  { id: 5, name: "BILL BOOKS", desc: "Bill books for receipts", img: "/products/bill_books.png" },
  { id: 6, name: "COMPANY PROFILE", desc: "Printed company profiles", img: "/products/company_profile.png" },
  { id: 7, name: "FILE COVER", desc: "File covers for organization", img: "/products/card_file_cover.png" },
  { id: 8, name: "ENVELOPES", desc: "Custom envelopes for mailing", img: "/products/envelopes.jpg" },
  { id: 9, name: "PVC CARDS", desc: "PVC cards for ID and membership", img: "/products/pvc_cards.jpg" },
  { id: 10, name: "STICKERS & LABELS", desc: "Custom stickers and labels for branding", img: "/products/stickers_labels.png" },
  { id: 11, name: "PANAFLEX", desc: "Panaflex banners", img: "/products/panaflex.jpeg" },
  { id: 12, name: "CALENDARS", desc: "Custom calendars for promotion", img: "/products/table_calendar.jpg" },
  { id: 13, name: "DIARY", desc: "Custom diaries", img: "/products/diary.jpg" },
  { id: 14, name: "SPIRAL NOTEPADS", desc: "Spiral bound notepads", img: "/products/spiral_notepads.jpg" },
  { id: 15, name: "PENS", desc: "Branded pens for promotion", img: "/products/pens.png" },
  { id: 16, name: "KEYCHAINS", desc: "Custom keychains", img: "/products/keychains.png" },
  { id: 17, name: "MUGS", desc: "Personalized mugs", img: "/products/mugs.png" },
  { id: 18, name: "TEMPERATURE BOTTLE", desc: "Printed temperature bottles", img: "/products/temperature_bottle.jpg" },
  { id: 19, name: "COFFEE MUG", desc: "Custom coffee mugs", img: "/products/coffee_mug.png" },
  { id: 20, name: "SCHOOL BADGES", desc: "Custom school badges", img: "/products/school_badges.png" },
  { id: 21, name: "SHIELDS", desc: "Award shields for recognition", img: "/products/shields.png" },
  { id: 22, name: "CUSTOMIZED BOX", desc: "Fully customized boxes", img: "/products/packaging_box.png" },
  { id: 23, name: "BURGER BOX", desc: "Custom burger boxes", img: "/products/burger_box.png" },
  { id: 24, name: "BUTTER PAPER", desc: "Butter paper for wrapping", img: "/products/takeaway_bag.png" },
  { id: 25, name: "RESTAURANT PACKAGING", desc: "Packaging solutions for restaurants", img: "/products/packaging_box.png" },
  { id: 26, name: "PIZZA BOXES", desc: "Custom pizza boxes", img: "/products/cardboard_boxes.png" },
  { id: 27, name: "TISSUE BOXES", desc: "Custom tissue boxes", img: "/products/packaging_box.png" },
  { id: 28, name: "TISSUE PRINTING", desc: "Custom tissue printing", img: "/products/packaging_box.png" },
  { id: 29, name: "SPORTS WEARS PRINTING", desc: "Custom sports wear printing", img: "/products/promotional_items.png" },
  { id: 30, name: "T-SHIRTS AND HOODIE", desc: "Custom printed t-shirts and hoodies", img: "/products/promotional_items.png" },
  { id: 31, name: "CLOTH TAGS", desc: "Woven cloth tags", img: "/products/sticker_labels.png" },
  { id: 32, name: "PRICE TAGS", desc: "Custom price tags for retail", img: "/products/sticker_labels.png" },
  { id: 33, name: "STANDUP POUCH", desc: "Standup pouches for packaging", img: "/products/stand_up_pouch.png" },
  { id: 34, name: "HAND BAGS", desc: "Handle bags for easy carrying", img: "/products/shopping_bag.png" },
  { id: 35, name: "FLYERS", desc: "High-quality marketing flyers", img: "/products/flyers.png" },
  { id: 36, name: "ROLLUP STANDY", desc: "Custom rollup standies", img: "/products/rollup_standy.png" },
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
      <section className="relative w-full aspect-[2.5/1] overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="ABM Printing Solution Banner"
          fill
          className="object-cover"
          priority
        />
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
