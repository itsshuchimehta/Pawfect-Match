"use client"

import type React from "react"
import Hero from "./Hero"
import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "../utils/api"
import AuthErrorAlert from "./AuthErrorAlert"
import { Heart, Search, Home, ArrowRight } from "lucide-react"
import PawPrintBackground from "./PawPrintBackground"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import DynamicMetadata from "./DynamicMetadata"

interface LoginProps {
  onLogin: (name: string) => void
}


const isValidName = (name: string): boolean => {
  if (!name.trim()) return false
  return /^[A-Za-z\s'-]{2,}$/.test(name.trim())
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9-]{2,}$/
  return emailRegex.test(email)
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export default function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [showAuthErrorAlert, setShowAuthErrorAlert] = useState(false)
  const [activeSection, setActiveSection] = useState<"hero" | "login" | "features" | "cta">("hero")
  const [isScrolling, setIsScrolling] = useState(false)
  const [metadataSection, setMetadataSection] = useState<"hero" | "login" | "features" | "cta">("hero")

  const loginFormRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const isLoginFormInView = useInView(loginFormRef, { once: false, margin: "-100px" })
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const isCtaInView = useInView(ctaRef, { once: false, margin: "-100px" })
  const isHeroInView = useInView(heroRef, { amount: 0.6 })
  const controls = useAnimation()
  const featuresControls = useAnimation()

  const debouncedSetMetadataSection = useRef(
    debounce((section: "hero" | "login" | "features" | "cta") => {
      setMetadataSection(section)
      setIsScrolling(false)
    }, 300), 
  ).current

  useEffect(() => {
    if (isLoginFormInView) {
      controls.start("visible")
      setActiveSection("login")
      debouncedSetMetadataSection("login")
    }
  }, [isLoginFormInView, controls, debouncedSetMetadataSection])

  useEffect(() => {
    if (isFeaturesInView) {
      featuresControls.start("visible")
      setActiveSection("features")
      debouncedSetMetadataSection("features")
    }
  }, [isFeaturesInView, featuresControls, debouncedSetMetadataSection])

  useEffect(() => {
    if (isCtaInView) {
      setActiveSection("cta")
      debouncedSetMetadataSection("cta")
    }
  }, [isCtaInView, debouncedSetMetadataSection])

  useEffect(() => {
    if (isHeroInView) {
      setActiveSection("hero")
      debouncedSetMetadataSection("hero")
    }
  }, [isHeroInView, debouncedSetMetadataSection])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  
  useEffect(() => {
    const handleScrollEnd = () => {
      if (isScrolling) {
        debouncedSetMetadataSection(activeSection)
      }
    }
    const scrollTimeout = setTimeout(handleScrollEnd, 100)
    return () => {
      clearTimeout(scrollTimeout)
    }
  }, [isScrolling, activeSection, debouncedSetMetadataSection])

  const scrollToSection = (sectionId: string) => {
    setIsScrolling(true) 
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = 80
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })

      if (sectionId === "login-form") {
        debouncedSetMetadataSection("login")
      } else if (sectionId === "features") {
        debouncedSetMetadataSection("features")
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "name") {
      setName(value)
      if (errors.name) {
        setErrors((prev) => ({ ...prev, name: undefined }))
      }
    } else if (name === "email") {
      setEmail(value)
      if (errors.email) {
        setErrors((prev) => ({ ...prev, email: undefined }))
      }
    }
  }

  const handleBlur = (field: "name" | "email") => {
    const newErrors: { [key: string]: string } = {}
    if (field === "name") {
      if (!name.trim()) {
        newErrors.name = "Name is required"
      } else if (/\d/.test(name)) {
        newErrors.name = "Please enter a valid name (no numeric characters)"
      } else if (!isValidName(name)) {
        newErrors.name = "Please enter a valid name"
      }
    }
    if (field === "email") {
      if (!email.trim()) {
        newErrors.email = "Email is required"
      } else if (!isValidEmail(email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }
    setErrors((prev) => ({ ...prev, ...newErrors }))
  }

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {}
    if (!name.trim()) {
      newErrors.name = "Name is required"
    } else if (/\d/.test(name)) {
      newErrors.name = "Please enter a valid name (no numeric characters)"
    } else if (!isValidName(name)) {
      newErrors.name = "Please enter a valid name (at least 2 letters)"
    }
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      setLoginError(null) 
      try {
        const response = await login(name, email)
        if (!response) {
          setShowAuthErrorAlert(true)
         }else{
           onLogin(name)
         }
       } catch (error) {
         console.error("Login error:", error)
         setLoginError("Login failed. Please try again.")
       } finally {
         setIsLoading(false)
       }
    }
  }
  const features = [
    {
      icon: Search,
      title: "Wide Selection",
      description: "Browse through hundreds of adorable dogs waiting for their forever homes",
    },
    {
      icon: Heart,
      title: "Perfect Match",
      description: "Our matching system helps you find your ideal furry companion",
    },
    {
      icon: Home,
      title: "Local Shelters",
      description: "Connect with shelters in your area and support your local community",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 relative overflow-hidden">
      <DynamicMetadata
        title={
          metadataSection === "hero"
            ? "Pawfect Match - Find Your Furry Friend"
            : metadataSection === "login"
              ? "Login | Pawfect Match"
              : metadataSection === "features"
                ? "Why Choose Pawfect Match | Features"
                : "Start Your Journey | Pawfect Match"
        }
        description={
          metadataSection === "hero"
            ? "Find your perfect furry friend and give them a forever home with Pawfect Match."
            : metadataSection === "login"
              ? "Sign in to Pawfect Match and start your journey to find your perfect furry friend."
              : metadataSection === "features"
                ? "Discover why thousands choose Pawfect Match for dog adoption. Wide selection, perfect matching, and local shelter support."
                : "Join thousands of happy pet owners who found their furry companions through Pawfect Match."
        }
      />
      <PawPrintBackground />

      <div ref={heroRef}>
        <Hero
          isAuthenticated={false}
          onGetStarted={() => scrollToSection("login-form")}
          onLearnMore={() => scrollToSection("features")}
          className="min-h-[100vh] flex flex-col items-center justify-center"
        />
      </div>
      {showAuthErrorAlert && (
        <AuthErrorAlert onClose={() => setShowAuthErrorAlert(false)} />
      )}
      <motion.section
        id="login-form"
        ref={loginFormRef}
        className="py-16 md:px-12 lg:px-16 bg-white/40 backdrop-blur-sm min-h-screen opacity-0 flex items-center justify-center dark:bg-gray-800/40"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={
          isLoginFormInView
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
              }
            : {
                opacity: 0,
                y: 50,
                scale: 0.9,
              }
        }
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <div className="container max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Dog Animation Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-full max-w-md lg:max-w-sm xl:max-w-md order-first lg:order-last"
            >
              <DotLottieReact
                src="https://lottie.host/02920e51-648d-4f42-93d7-1fa578d604c5/QGYurbYb9X.lottie"
                loop
                autoplay
              />
            </motion.div>

            {/* Form Column */}
            <div className="w-full max-w-md px-4">
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 max-w-[400px] mx-auto dark:bg-gray-800/80"
                initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                animate={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Pawfect Match</h2>
                  <p className="text-gray-600 dark:text-gray-300">Sign in to start your adoption journey</p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name" 
                      value={name}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("name")}
                      className={`w-full rounded-lg transition-colors ${
                        errors.name ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      placeholder="Enter your name"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-xs mt-1 flex items-center">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("email")}
                      className={`w-full rounded-lg transition-colors ${
                        errors.email || loginError ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      placeholder="Enter your email"
                      aria-invalid={errors.email || loginError ? "true" : "false"}
                      aria-describedby={errors.email || loginError ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-xs mt-1 flex items-center">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {loginError && (
                    <p className="text-red-500 text-sm mt-2 text-center dark:text-red-300">{loginError}</p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 dark:text-gray-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Start Your Pawsome Journey"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="features"
        ref={featuresRef}
        className="py-12 md:py-16 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm overflow-hidden"
        initial="hidden"
        animate={featuresControls}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
          hidden: {},
        }}
      >
        <motion.div
          className="container mx-auto max-w-6xl px-4"
          variants={{
            visible: {
              x: 0,
              opacity: 1,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
              },
            },
            hidden: {
              x: "100%",
              opacity: 0,
            },
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Choose Pawfect Match?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We make the adoption process simple, enjoyable, and meaningful for both you and your future furry friend.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={{
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                    },
                  },
                  hidden: {
                    x: "100%",
                    opacity: 0,
                  },
                }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-primary/10 dark:border-primary/20"
              >
                <div className="bg-primary/10 dark:bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary dark:text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <section
        className="py-12 md:py-16 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-800 dark:to-pink-800 text-gray-800 dark:text-gray-200"
        ref={ctaRef}
      >
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Meet Your Perfect Match?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of happy pet owners who found their furry companions through Pawfect Match.
          </p>
          <Button
            size="lg"
            className="group relative bg-white dark:bg-primary text-primary dark:text-primary-foreground hover:bg-white/90 dark:hover:bg-primary/90 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg overflow-hidden border border-primary/20 dark:border-primary/40"
            onClick={() => scrollToSection("login-form")}
          >
            <span className="relative z-10 flex items-center">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </span>    
          </Button>
        </div>
      </section>
    </div>
  )
}

