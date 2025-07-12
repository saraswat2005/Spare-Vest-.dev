"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Coins, MapPin, Clock, Users, Heart, Zap, Coffee } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const jobs = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "3-5 years",
    description: "Build scalable fintech solutions using React, Node.js, and blockchain technologies.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Mumbai / Remote",
    type: "Full-time",
    experience: "4-6 years",
    description: "Drive product strategy and roadmap for our micro-investing platform.",
    skills: ["Product Strategy", "User Research", "Analytics", "Fintech", "Agile"],
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Delhi / Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Create intuitive and beautiful user experiences for financial products.",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Mobile Design"],
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "3-5 years",
    description: "Manage infrastructure and deployment pipelines for high-availability systems.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
  },
  {
    title: "Data Scientist",
    department: "AI/ML",
    location: "Hyderabad / Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Develop AI models for portfolio optimization and risk management.",
    skills: ["Python", "Machine Learning", "TensorFlow", "Statistics", "Finance"],
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Mumbai / Remote",
    type: "Full-time",
    experience: "3-5 years",
    description: "Lead digital marketing campaigns and user acquisition strategies.",
    skills: ["Digital Marketing", "Growth Hacking", "Analytics", "Content Strategy", "SEO"],
  },
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs.",
  },
  {
    icon: Zap,
    title: "Learning & Growth",
    description: "Annual learning budget, conference tickets, and skill development programs.",
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible hours, remote work options, and unlimited PTO policy.",
  },
  {
    icon: Users,
    title: "Equity & Ownership",
    description: "Employee stock options and profit-sharing programs for all team members.",
  },
]

const perks = [
  "🏠 Remote-first culture with flexible working hours",
  "💰 Competitive salary with equity participation",
  "🏥 Premium health insurance for you and family",
  "📚 ₹50,000 annual learning and development budget",
  "🌴 Unlimited paid time off policy",
  "💻 Latest MacBook Pro and home office setup",
  "🍕 Monthly team dinners and quarterly offsites",
  "🚀 Opportunity to shape the future of fintech in India",
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-2">
            <Coins className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Careers at SpareVest
            </span>
          </div>
        </div>
        <ThemeToggle />
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Build the Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              Financial Technology
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Join our mission to democratize investing and help millions of Indians build wealth through innovative
            micro-investing solutions.
          </p>
          <motion.div
            className="text-6xl mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            🚀
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center p-6 h-full shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Perks Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-center mb-12">Perks & Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {perks.map((perk, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-lg">{perk}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Open Positions</h2>
          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2 text-gray-900 dark:text-white">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          >
                            {job.department}
                          </Badge>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{job.location}</span>
                          </Badge>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{job.type}</span>
                          </Badge>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Experience: {job.experience}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Culture</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    At SpareVest, we believe in creating an environment where everyone can do their best work. We're a
                    diverse, inclusive team that values collaboration, innovation, and continuous learning.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    We move fast, think big, and aren't afraid to challenge the status quo. Every team member has a
                    voice and the opportunity to make a meaningful impact on our product and mission.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Join us in building something that matters – technology that helps millions of people achieve
                    financial freedom.
                  </p>
                </div>
                <motion.div
                  className="text-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-8xl mb-4">🌟</div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Building amazing things together</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Don't See Your Role?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                We're always looking for talented individuals who share our passion for fintech innovation. Send us your
                resume and let's talk!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                  >
                    Send Resume
                  </Button>
                </motion.div>
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                      Contact Us
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
