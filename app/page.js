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
  { id: 1, name: "D-CUT BAG", desc: "Custom D-Cut bags for everyday use", img: "https://images.unsplash.com/photo-1591348278863-a4fd8fc7c5e2?w=400" },
  { id: 2, name: "DRAW STRING BAG", desc: "Convenient draw string bags for storage and carrying", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 3, name: "LAUNDRY BAGS", desc: "Durable laundry bags with custom prints", img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400" },
  { id: 4, name: "COAT COVER", desc: "Protective coat covers for garments", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400" },
  { id: 5, name: "W-CUT BAG", desc: "W-Cut bags for shopping and packaging", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
  { id: 6, name: "STITCHED BAG", desc: "Stitched bags for heavy-duty use", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" },
  { id: 7, name: "CRAFT BAG", desc: "Craft bags for creative projects", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 8, name: "CARD BAG", desc: "Card bags for gifting and packaging", img: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400" },
  { id: 9, name: "HANDLE BAG", desc: "Handle bags for easy carrying", img: "https://images.unsplash.com/photo-1613231563897-56e2ba1d12a9?w=400" },
  { id: 10, name: "BOX BAG", desc: "Box-shaped bags for structured packaging", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
  { id: 11, name: "4 COLOR ZIPPER BAG", desc: "Zipper bags with 4-color printing", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 12, name: "JUTE BAG", desc: "Eco-friendly jute bags", img: "https://images.unsplash.com/photo-1615369838525-fd5c4239a56b?w=400" },
  { id: 13, name: "SHOE BAG", desc: "Shoe bags for protection and travel", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
  { id: 14, name: "TAKEAWAY PAPER BAG", desc: "Takeaway paper bags for food services", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400" },
  { id: 15, name: "PP LAMINATED BAG", desc: "PP laminated bags for durability", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 16, name: "EVA FROSTED BAG", desc: "EVA frosted bags for premium look", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
  { id: 17, name: "STANDUP POUCH", desc: "Standup pouches for packaging", img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400" },
  { id: 18, name: "COTTON/CANVAS BAG", desc: "Cotton or canvas bags for reusable purposes", img: "https://images.unsplash.com/photo-1591348278863-a4fd8fc7c5e2?w=400" },
  { id: 19, name: "GARDEN GROW BAG", desc: "Garden grow bags for plants", img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400" },
  { id: 20, name: "COURIER FLYER", desc: "Courier flyers for shipping", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400" },
  { id: 21, name: "BUSINESS CARDS", desc: "Professional business cards", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400" },
  { id: 22, name: "LETTER HEAD", desc: "Custom letterheads for official use", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400" },
  { id: 23, name: "FILE COVER", desc: "File covers for organization", img: "https://images.unsplash.com/photo-1568667256549-094345857637?w=400" },
  { id: 24, name: "ENVELOPES", desc: "Custom envelopes for mailing", img: "https://images.unsplash.com/photo-1568667256549-094345857637?w=400" },
  { id: 25, name: "LABELS", desc: "Adhesive labels for products", img: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400" },
  { id: 26, name: "STICKERS", desc: "Custom stickers for branding", img: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400" },
  { id: 27, name: "BROCHURES", desc: "Informative brochures for marketing", img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400" },
  { id: 28, name: "WOVEN TAGS", desc: "Woven tags for clothing", img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400" },
  { id: 29, name: "STAMPS", desc: "Custom stamps for office use", img: "https://images.unsplash.com/photo-1611532736573-7b96f7f28d46?w=400" },
  { id: 30, name: "RESTAURANT PACKAGING", desc: "Packaging solutions for restaurants", img: "https://images.unsplash.com/photo-1599458448458-f970a66e7d8b?w=400" },
  { id: 31, name: "CALENDARS", desc: "Custom calendars for promotion", img: "https://images.unsplash.com/photo-1611762687430-417d490e60cd?w=400" },
  { id: 32, name: "SHIELDS", desc: "Award shields for recognition", img: "https://images.unsplash.com/photo-1551992100-19f1dc5e1126?w=400" },
  { id: 33, name: "COMPANY PROFILE", desc: "Printed company profiles", img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400" },
  { id: 34, name: "DIGITAL PRINTING", desc: "High-quality digital printing services", img: "https://images.unsplash.com/photo-1612540579184-b5f5f2f11b0f?w=400" },
  { id: 35, name: "PRICE TAGS", desc: "Custom price tags for retail", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400" },
  { id: 36, name: "T-SHIRT & HOODIES", desc: "Custom printed t-shirts and hoodies", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400" },
  { id: 37, name: "BARCODE STICKERS", desc: "Barcode stickers for inventory", img: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400" },
  { id: 38, name: "PAPER TUBE PACKAGING", desc: "Eco-friendly paper tube packaging", img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400" },
  { id: 39, name: "TISSUE BOXES", desc: "Custom tissue boxes", img: "https://images.unsplash.com/photo-1584955589806-f0839f17d620?w=400" },
  { id: 40, name: "PENS", desc: "Branded pens for promotion", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400" },
  { id: 41, name: "KEYCHAINS", desc: "Custom keychains", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { id: 42, name: "MUGS", desc: "Personalized mugs", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400" },
  { id: 43, name: "DIARY", desc: "Custom diaries", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400" },
  { id: 44, name: "PIZZA BOXES", desc: "Custom pizza boxes", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
  { id: 45, name: "BOTTLES", desc: "Printed bottles", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
  { id: 46, name: "CARDBOARD BOX", desc: "Custom cardboard boxes", img: "https://images.unsplash.com/photo-1566752703793-ab1a17ee69d1?w=400" },
  { id: 47, name: "RIGID BOXES", desc: "Premium rigid boxes", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
  { id: 48, name: "BAKERY BOXES", desc: "Bakery packaging boxes", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400" },
  { id: 49, name: "CUSTOMIZED BOXES", desc: "Fully customized boxes", img: "https://images.unsplash.com/photo-1566752703793-ab1a17ee69d1?w=400" },
  { id: 50, name: "BUTTER PAPER", desc: "Butter paper for wrapping", img: "https://images.unsplash.com/photo-1577201647178-b7409044a5b7?w=400" },
  { id: 51, name: "PVC CARDS", desc: "PVC cards for ID and membership", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400" },
  { id: 52, name: "BOOKS", desc: "Custom printed books", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
  { id: 53, name: "BILL BOOKS", desc: "Bill books for receipts", img: "https://images.unsplash.com/photo-1568667256549-094345857637?w=400" },
  { id: 54, name: "SPIRAL DIARY", desc: "Spiral bound diaries", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400" },
  { id: 55, name: "BADGES", desc: "Custom badges", img: "https://images.unsplash.com/photo-1587824170264-074e0ac5c774?w=400" },
  { id: 56, name: "SATIN RIBBON", desc: "Printed satin ribbons", img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400" },
  { id: 57, name: "FLAGS", desc: "Custom flags", img: "https://images.unsplash.com/photo-1582912472588-bc1e0e70c2c0?w=400" },
  { id: 58, name: "STANDEE", desc: "Standee displays", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400" },
  { id: 59, name: "VINYL", desc: "Vinyl printing", img: "https://images.unsplash.com/photo-1611532736573-7b96f7f28d46?w=400" },
  { id: 60, name: "PANAFLEX", desc: "Panaflex banners", img: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400" },
  { id: 61, name: "1 VISION", desc: "One way vision printing", img: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400" },
  { id: 62, name: "3D SIGN BOARD", desc: "3D sign boards", img: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400" }
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
            <div className="flex items-center space-x-2">
              <span className="text-2xl md:text-3xl font-black text-blue-900">abm</span>
              <div className="flex flex-col leading-none">
                <span className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase tracking-tight">Printing</span>
                <span className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase tracking-tight">Solution</span>
              </div>
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
