"use client"

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Home, User, Briefcase, FileText, Award, Mail, Github, Linkedin, Twitter, Moon, Sun, ChevronRight, Send, ExternalLink, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLDivElement>(null),
    resume: useRef<HTMLDivElement>(null),
    certificates: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(savedMode ? JSON.parse(savedMode) : prefersDark)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      setScrollProgress((currentScroll / totalScroll) * 100)
      setScrollY(currentScroll)

      const sections = ['home', 'about', 'portfolio', 'resume', 'certificates', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        gsap.from(ref.current.querySelectorAll('.animate-fade-in'), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        })
      }
    })
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.")
      return
    }
    console.log("Form submitted", { name, email, subject, message })
  }

  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: User },
    { name: 'Portfolio', icon: Briefcase },
    { name: 'Resume', icon: FileText },
    { name: 'Certificates', icon: Award },
    { name: 'Contact', icon: Mail },
  ]

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
      {/* Left Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-white dark:bg-gray-800 shadow-xl`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-foreground rounded-full flex items-center justify-center text-white text-xl font-bold">
                NR
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Naufal Rizky</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDarkMode}
                    className="rounded-full focus:ring-2 focus:ring-primary dark:focus:ring-primary-foreground"
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {/* Navigation Items */}
          <nav className="flex-grow py-6">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={`#${item.name.toLowerCase()}`}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ease-in-out ${
                      activeSection === item.name.toLowerCase()
                        ? 'text-primary dark:text-primary-foreground bg-primary/10 dark:bg-primary-foreground/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-primary/5 dark:hover:bg-primary-foreground/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* Social Links */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center space-x-4">
              <TooltipProvider>
                {[
                  { icon: Github, label: 'GitHub' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Twitter, label: 'Twitter' },
                ].map((social) => (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-200">
                        <social.icon className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-foreground rounded-full flex items-center justify-center text-white text-sm font-bold">
                NR
              </div>
              <span className="text-lg font-bold text-gray-800 dark:text-white">Naufal Rizky</span>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="mr-2 rounded-full focus:ring-2 focus:ring-primary dark:focus:ring-primary-foreground"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-primary-foreground"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress value={scrollProgress} className="w-full h-1" />
        </div>

        {/* Page Content */}
        <main className="pt-16 md:pt-0">
          {/* Home Section */}
          <section id="home" ref={sectionRefs.home} className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary to-primary-foreground dark:from-primary-foreground dark:to-primary text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMjUuNSAyNUwzMCAzME0zMCAzMEwzNC41IDI1TTMwIDMwVjM3IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <Image
                  src="/img/saya2.png"
                  alt="Naufal Rizky"
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-white shadow-lg mb-6 mx-auto"
                />
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Naufal Rizky</h1>
                <p className="text-xl md:text-2xl mb-8">Front End Developer & UI/UX Enthusiast</p>
                <div className="flex justify-center space-x-4 mb-8">
                  <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </div>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 dark:bg-gray-800 dark:text-primary-foreground dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <a href="#contact">Get in touch</a>
                </Button>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: scrollY > 100 ? 0 : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute bottom-8  left-1/2 transform -translate-x-1/2"
              >
                <ChevronDown className="h-8 w-8" />
              </motion.div>
            </div>

            {/* Floating Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full opacity-20"
                  style={{
                    width: Math.random() * 20 + 10,
                    height: Math.random() * 20 + 10,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * 100 - 50],
                    x: [0, Math.random() * 100 - 50],
                    scale: [1, Math.random() + 0.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" ref={sectionRefs.about} className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in text-gray-800 dark:text-white">About Me</h2>
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
                <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 animate-fade-in relative group">
                  <Image 
                    src="/img/saya2.png" 
                    alt="Naufal Rizky" 
                    width={200} 
                    height={200} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Naufal Rizky</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-lg mb-6 animate-fade-in">
                    I&apos;m a passionate Full Stack Developer with 5+ years of experience in creating responsive and user-friendly web applications. My expertise lies in React, Node.js, and modern web technologies. I&apos;m dedicated to writing clean, efficient code and constantly learning new skills to stay at the forefront of web development.
                  </p>
                  <Tabs defaultValue="skills" className="animate-fade-in">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="interests">Interests</TabsTrigger>
                    </TabsList>
                    <TabsContent value="skills">
                      <Card>
                        <CardHeader>
                          <CardTitle>Technical Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {['React & Redux', 'Node.js & Express', 'TypeScript', 'GraphQL', 'MongoDB & PostgreSQL'].map((skill) => (
                            <div key={skill} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">{skill}</span>
                                <span className="text-muted-foreground">Advanced</span>
                              </div>
                              <Progress value={Math.random() * 40 + 60} className="h-2" />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="interests">
                      <Card>
                        <CardHeader>
                          <CardTitle>Professional Interests</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="grid grid-cols-2 gap-4">
                            {['Web Performance Optimization', 'UI/UX Design', 'Serverless Architecture', 'Machine Learning', 'Open Source Contribution'].map((interest) => (
                              <li key={interest} className="flex items-center space-x-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary dark:bg-primary-foreground/10 dark:text-primary-foreground">
                                  {interest}
                                </Badge>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" ref={sectionRefs.portfolio} className="py-20 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in text-gray-800 dark:text-white">My Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "E-commerce Platform", description: "A full-stack e-commerce solution with React and Node.js", image: "/placeholder.svg?height=300&width=400", tags: ["React", "Node.js", "MongoDB"] },
                  { title: "Task Management App", description: "A real-time collaborative task manager using Socket.io", image: "/placeholder.svg?height=300&width=400", tags: ["Vue.js", "Express", "Socket.io"] },
                  { title: "AI-powered Chatbot", description: "An intelligent chatbot built with natural language processing", image: "/placeholder.svg?height=300&width=400", tags: ["Python", "TensorFlow", "Flask"] },
                  { title: "Fitness Tracking App", description: "A mobile app for tracking workouts and nutrition", image: "/placeholder.svg?height=300&width=400", tags: ["React Native", "GraphQL", "AWS"] },
                  { title: "Social Media Dashboard", description: "A comprehensive dashboard for social media analytics", image: "/placeholder.svg?height=300&width=400", tags: ["Angular", "D3.js", "Firebase"] },
                  { title: "Blockchain Explorer", description: "A web application for exploring cryptocurrency transactions", image: "/placeholder.svg?height=300&width=400", tags: ["React", "Web3.js", "Node.js"] },
                ].map((project, index) => (
                  <Card key={index} className="project-card overflow-hidden animate-fade-in group">
                    <div className="relative">
                      <Image src={project.image} alt={project.title} width={400} height={300} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
                        <Button variant="secondary" size="sm">
                          View Project
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="bg-primary/10 text-primary dark:bg-primary-foreground/10 dark:text-primary-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="link" className="p-0 text-primary dark:text-primary-foreground">
                          Details <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                        <Button variant="link" className="p-0 text-primary dark:text-primary-foreground">
                          GitHub <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Resume Section */}
          <section id="resume" ref={sectionRefs.resume} className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in text-gray-800 dark:text-white">Resume</h2>
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 animate-fade-in">Work Experience</h3>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Senior Full Stack Developer",
                        company: "TechCorp Inc.",
                        period: "2020 - Present",
                        responsibilities: [
                          "Led the development of a high-traffic e-commerce platform, improving performance by 40%",
                          "Implemented microservices architecture, enhancing scalability and maintainability",
                          "Mentored junior developers and conducted technical interviews"
                        ]
                      },
                      {
                        title: "Full Stack Developer",
                        company: "WebSolutions Co.",
                        period: "2018 - 2020",
                        responsibilities: [
                          "Developed and maintained multiple client websites and web applications",
                          "Implemented responsive designs and ensured cross-browser compatibility",
                          "Optimized database queries, resulting in a 30% reduction in page load times"
                        ]
                      }
                    ].map((job, index) => (
                      <Card key={index} className="resume-item animate-fade-in">
                        <CardContent className="p-6">
                          <h4 className="text-xl font-medium mb-2">{job.title}</h4>
                          <p className="text-muted-foreground mb-2">{job.company} • {job.period}</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                            {job.responsibilities.map((resp, respIndex) => (
                              <li key={respIndex}>{resp}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <Separator className="my-8" />
                <div>
                  <h3 className="text-2xl font-semibold mb-4 animate-fade-in">Education</h3>
                  <Card className="resume-item animate-fade-in">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-medium mb-2">Bachelor of Science in Computer Science</h4>
                      <p className="text-muted-foreground">Tech University • 2014 - 2018</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Certificates Section */}
          <section id="certificates" ref={sectionRefs.certificates} className="py-20 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in text-gray-800 dark:text-white">Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Certificates Front End Web", issuer: "Dicoding", date: "January 2023", image: "/img/sertifikat/1.png" },
                  { name: "Certificates Artificial Intelligence", issuer: "Dicoding", date: "March 2022", image: "/img/sertifikat/2.png" },
                  { name: "Certificates React Developer", issuer: "Dicoding", date: "July 2022", image: "/img/sertifikat/3.png" },
                  { name: "Certificates Javascript", issuer: "Dicoding", date: "September 2021", image: "/img/sertifikat/4.png" },
                  { name: "Certificates Dasar Web", issuer: "Dicoding", date: "December 2022", image: "/img/sertifikat/5.png" },
                  { name: "Certificates Kompetensi Kemalasan", issuer: "Imphnen", date: "May 2023", image: "/img/sertifikat/6.png" },
                  { name: "Certificates Competency", issuer: "Udacity", date: "May 2023", image: "/img/sertifikat/7.jpeg" },
                ].map((cert, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="certificate-card animate-fade-in group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary to-primary-foreground transform rotate-45 translate-x-8 -translate-y-8"></div>
                          <h3 className="font-bold text-xl mb-2">{cert.name}</h3>
                          <p className="text-muted-foreground mb-2">Issued by: {cert.issuer}</p>
                          <p className="text-muted-foreground mb-4">Date: {cert.date}</p>
                          <Button variant="link" className="p-0 group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors duration-200">
                            View Certificate <ExternalLink className="w-4 h-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{cert.name}</DialogTitle>
                        <DialogDescription>Certificate details</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Image
                            src={cert.image}
                            alt={cert.name}
                            width={800}
                            height={600}
                            className="col-span-4 w-full h-auto rounde d-lg shadow-md"
                            loader={({ src }) => src}
                            unoptimized
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="issuer" className="text-right font-medium">
                            Issuer
                          </label>
                          <div id="issuer" className="col-span-3">
                            {cert.issuer}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="date" className="text-right font-medium">
                            Date
                          </label>
                          <div id="date" className="col-span-3">
                            {cert.date}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" ref={sectionRefs.contact} className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in text-gray-800 dark:text-white">Get in Touch</h2>
              <Card className="animate-fade-in">
                <CardContent className="p-8">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                        <Input id="name" name="name" required className="w-full" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                        <Input id="email" name="email" type="email" required className="w-full" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                      <Input id="subject" name="subject" required className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                      <Textarea id="message" name="message" rows={4} required className="w-full" />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-foreground hover:from-primary/90 hover:to-primary-foreground/90 text-white">
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p>&copy; 2023 Naufal Rizky. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <TooltipProvider>
                  {[
                    { icon: Github, label: 'GitHub' },
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Twitter, label: 'Twitter' },
                  ].map((social) => (
                    <Tooltip key={social.label}>
                      <TooltipTrigger asChild>
                        <a href="#" className="hover:text-primary dark:hover:text-primary-foreground transition-colors duration-200">
                          <social.icon className="w-6 h-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{social.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}