import {
  Anchor,
  Award,
  BarChart3,
  Building2,
  Globe2,
  MessageSquare,
  Package,
  Search,
  Shield,
  Ship,
  Sparkles,
  Users,
} from "lucide-react";

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#commodities", label: "Commodities" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/direktori", label: "Directory" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export const whyChooseUs = [
  {
    icon: Building2,
    title: "Professional Company Profile Website",
    description:
      "Premium digital identity that builds credibility with international buyers.",
  },
  {
    icon: Search,
    title: "Discoverable on Google",
    description:
      "SEO optimization so your supplier profile appears when buyers search for Indonesian commodities.",
  },
  {
    icon: Sparkles,
    title: "SEO Optimization",
    description:
      "Website structure and content designed for global search engine rankings.",
  },
  {
    icon: Ship,
    title: "Export-Ready",
    description:
      "Complete profiles with certifications, production capacity, and export information.",
  },
  {
    icon: Globe2,
    title: "Indonesia Supplier Directory",
    description:
      "Listed in a verified supplier ecosystem accessed by global buyers.",
  },
  {
    icon: MessageSquare,
    title: "Inquiry / RFQ Forms",
    description:
      "Buyers can send quotation requests directly through the platform.",
  },
  {
    icon: Users,
    title: "Multilingual Ready",
    description:
      "Content accessible to international buyers with multi-language support.",
  },
  {
    icon: Award,
    title: "Professional Design",
    description:
      "Modern, elegant presentation reflecting global B2B trade standards.",
  },
];

export const commodities = [
  { name: "Coffee", color: "bg-amber-50 ring-1 ring-amber-100" },
  { name: "Spices", color: "bg-orange-50 ring-1 ring-orange-100" },
  { name: "Coconut", color: "bg-emerald-50 ring-1 ring-emerald-100" },
  { name: "Cocoa", color: "bg-yellow-50 ring-1 ring-yellow-100" },
  { name: "Seafood", color: "bg-sky-50 ring-1 ring-sky-100" },
  { name: "Furniture", color: "bg-amber-50/80 ring-1 ring-amber-100" },
  { name: "Palm Oil", color: "bg-lime-50 ring-1 ring-lime-100" },
  { name: "Textiles", color: "bg-purple-50 ring-1 ring-purple-100" },
  { name: "Essential Oils", color: "bg-teal-50 ring-1 ring-teal-100" },
  { name: "Agriculture", color: "bg-green-50 ring-1 ring-green-100" },
  { name: "Manufacturing", color: "bg-slate-50 ring-1 ring-slate-100" },
  { name: "Other Commodities", color: "bg-indigo-50 ring-1 ring-indigo-100" },
];

export const commodityStyleByName = Object.fromEntries(
  commodities.map((c) => [c.name, c.color]),
) as Record<string, string>;

export const howItWorks = [
  {
    step: 1,
    title: "Supplier Registers",
    description: "Indonesian exporters and SMEs join the Samudra Supply platform.",
  },
  {
    step: 2,
    title: "Company Profile Built",
    description: "Our team builds a professional, SEO-ready company profile website.",
  },
  {
    step: 3,
    title: "Listed in Directory",
    description: "Suppliers are listed in the Samudra Supply Indonesia supplier directory.",
  },
  {
    step: 4,
    title: "Buyers Discover Suppliers",
    description: "International importers find suppliers through search and the directory.",
  },
  {
    step: 5,
    title: "Buyer Sends RFQ",
    description: "Quotation requests are sent directly through the platform inquiry form.",
  },
  {
    step: 6,
    title: "Business Partnership",
    description: "Sustainable export partnerships form between suppliers and buyers.",
  },
];

export const supplierBenefits = [
  "Export-ready professional website",
  "Complete digital company profile",
  "Interactive product catalog",
  "Company certification page",
  "Production capacity information",
  "Global Google SEO optimization",
  "Integrated inquiry / RFQ forms",
  "Listed in supplier directory",
  "Opportunity to reach international buyers",
];

export const buyerBenefits = [
  "Find trusted Indonesian suppliers",
  "Browse full commodity categories",
  "Compare supplier profiles",
  "Contact suppliers directly",
  "Send RFQs easily",
  "View certifications and production capacity",
];

export const supplierCategories = [
  "All",
  ...commodities.map((c) => c.name),
];

export const statistics = [
  { value: 250, suffix: "+", label: "Registered Suppliers" },
  { value: 50, suffix: "+", label: "Commodity Types" },
  { value: 35, suffix: "+", label: "Destination Countries" },
  { value: 1200, suffix: "+", label: "Registered Buyers" },
];

export const testimonialsSection = {
  label: "Testimonials",
  title: "Trusted by the industry",
};

export const testimonials = [
  {
    quote:
      "Since joining Samudra Supply, inquiries from European buyers have tripled. Our profile website looks highly professional.",
    author: "Budi Santoso",
    role: "Director, Nusantara Coffee Export",
    initials: "BS",
  },
  {
    quote:
      "This platform makes it easy to find quality spice suppliers from Indonesia. The RFQ process is very efficient.",
    author: "Sarah Mitchell",
    role: "Procurement Manager, Global Spice Trading UK",
    initials: "SM",
  },
  {
    quote:
      "The Samudra Supply directory helped our company access international markets without heavy marketing spend.",
    author: "Dewi Kartika",
    role: "CEO, Tropical Spice Co.",
    initials: "DK",
  },
];

export const faqs = [
  {
    question: "How do I join as a supplier?",
    answer:
      "Register through the form on our website or contact the Samudra Supply team via WhatsApp. We will guide you through registration, company data collection, and profile website creation.",
  },
  {
    question: "What does it cost to join?",
    answer:
      "We offer flexible packages tailored to your business needs. Contact our team for a free consultation and a package suited to your company scale.",
  },
  {
    question: "How long does it take to build a company profile website?",
    answer:
      "A professional company profile website is typically completed within 7–14 business days after all company materials (logo, product photos, certifications) are received.",
  },
  {
    question: "How do I reach international buyers?",
    answer:
      "Registered suppliers are automatically listed in the SEO-optimized Samudra Supply directory. International buyers can find your profile via Google and our platform, then send RFQs directly.",
  },
  {
    question: "Is there support for the export process?",
    answer:
      "We currently focus on digital identity and buyer-supplier connections. Future updates will add export documentation, logistics integration, and export assistance.",
  },
];

export const futureFeatures = [
  { icon: Shield, title: "Supplier Verification" },
  { icon: Award, title: "Premium Membership" },
  { icon: MessageSquare, title: "RFQ Marketplace" },
  { icon: BarChart3, title: "Supplier Dashboard" },
  { icon: Users, title: "Buyer Dashboard" },
  { icon: MessageSquare, title: "Live Chat" },
  { icon: Sparkles, title: "AI Buyer & Supplier Matching" },
  { icon: Ship, title: "Logistics Integration" },
  { icon: Package, title: "Export Documentation" },
  { icon: Anchor, title: "Shipment Tracking" },
  { icon: Globe2, title: "Trade Analytics" },
];
