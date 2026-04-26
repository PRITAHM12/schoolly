import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Users, 
  BarChart3, 
  Zap, 
  ChevronRight, 
  Globe, 
  CheckCircle,
  Smartphone,
  CheckCircle2,
  X,
  CreditCard,
  Clock,
  ArrowRight,
  Menu,
  Linkedin
} from 'lucide-react';
import { Logo } from './Logo';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { OperationType, LeadStatus } from '../types';

export function LandingPage() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Home</a>
            <a href="#features" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Features</a>
            <a href="#about" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">About Us</a>
            <a href="#how-it-works" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">How it Works</a>
            <button 
              onClick={() => setShowDemoModal(true)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95"
            >
              Book Free Pilot
            </button>
          </div>

          <button className="md:hidden p-2 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-bold mb-8">
                <Zap className="w-4 h-4" />
                <span>The Future of School-Parent Communication</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-display font-extrabold text-gray-900 leading-[1] mb-10 tracking-tighter">
                School ERP, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Schoolly Simplified.
                </span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-lg font-medium">
                No apps to install. No passwords to remember. 
                Everything from attendance to grades delivered directly to where parents already are.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <button 
                  onClick={() => setShowDemoModal(true)}
                  className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-indigo-200/50 hover:-translate-y-1 active:translate-y-0"
                >
                  Start Your Free Pilot <ArrowRight className="w-6 h-6" />
                </button>
                <div className="flex gap-4">
                  <a 
                    href="https://wa.me/911234567890" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                    title="WhatsApp Support"
                  >
                    <MessageSquare className="w-6 h-6 text-green-500" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/pritamrajchaurasiya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-6 h-6 text-blue-600" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mt-16 lg:mt-0 relative"
            >
              <div className="relative z-10 glass-panel p-6 rounded-[3rem] shadow-2xl border-white/50 bg-white/40">
                <div className="bg-gray-900 rounded-[2rem] overflow-hidden aspect-[4/3] flex items-center justify-center p-8 relative">
                   {/* WhatsApp Simulation */}
                   <div className="w-full max-w-xs space-y-4">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">S</div>
                        <div className="h-2 bg-gray-100 rounded w-24"></div>
                      </div>
                      <p className="text-gray-800 text-xs font-semibold">Attendance alert: Shreyas was present today at Schoolly High.</p>
                    </motion.div>
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="bg-emerald-500 p-4 rounded-2xl shadow-lg self-end text-white max-w-[85%] ml-auto"
                    >
                      <p className="text-xs font-bold leading-relaxed">
                        📢 Result Update: Midterm results are out! View Shreyas's performance here: schoolly.com/results/123
                      </p>
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-indigo-200/30 rounded-full blur-[120px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h2 variants={itemVariants} className="text-5xl font-display font-extrabold text-gray-900 mb-6 tracking-tight">Built for Schools, <br/> Loved by Parents.</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500 text-xl font-medium">Everything you need to run a modern, transparent school environment.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <FeatureCard 
              icon={<Smartphone className="text-indigo-600 w-8 h-8" />}
              title="Zero Friction"
              desc="Parents receive updates on WhatsApp. No downloads, no signups, no friction."
            />
            <FeatureCard 
              icon={<CreditCard className="text-indigo-600 w-8 h-8" />}
              title="Smart Fees"
              desc="Send payment reminders and links. Parents pay in one click via their phone."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-indigo-600 w-8 h-8" />}
              title="Admin Control"
              desc="Manage multiple branches, teachers, and student records from one powerful dashboard."
            />
            <FeatureCard 
              icon={<Zap className="text-indigo-600 w-8 h-8" />}
              title="Instant Delivery"
              desc="Automatic delivery of results and attendance as soon as teachers mark them."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="text-indigo-600 w-8 h-8" />}
              title="School Branding"
              desc="Your school, your brand. Custom landing pages and white-labeled communication."
            />
            <FeatureCard 
              icon={<Clock className="text-indigo-600 w-8 h-8" />}
              title="Fast Setup"
              desc="Go live in less than 24 hours. We handle all the digital heavy lifting for you."
            />
          </motion.div>
        </div>
      </section>

      {/* About Us / Services Section */}
      <section id="about" className="py-32 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <Logo size="lg" variant="light" className="mb-12" />
              <h2 className="text-5xl lg:text-6xl font-display font-extrabold mb-8 tracking-tighter leading-tight">
                Empowering Schools <br/> 
                <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">Beyond Messaging.</span>
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-medium">
                Schoolly isn't just a platform; it's a digital transformation partner. We specialize in eliminating the administrative friction that slows down education, allowing you to focus on what matters most: your students.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="group space-y-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-xl">Smart Automation</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Automate fee reminders, result distribution, and daily attendance logs with zero manual intervention.</p>
                </div>
                <div className="group space-y-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-xl">Digital Visibility</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Establish a professional online presence with custom school pages that showcase your academy's achievements.</p>
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mt-12 lg:mt-0">
              <div className="space-y-6 sm:pt-12">
                <div className="aspect-square bg-indigo-600/20 rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-end hover:bg-indigo-600/30 transition-colors group">
                  <span className="text-6xl font-display font-extrabold mb-2 text-white group-hover:scale-110 transition-transform origin-left">90%</span>
                  <span className="text-sm font-bold text-indigo-400 uppercase tracking-[0.2em]">Efficiency Boost</span>
                  <p className="text-xs text-gray-500 mt-4">Administrative time saved per week by partner schools.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-[4/5] bg-white/5 rounded-[2.5rem] border border-white/5 p-10 overflow-hidden relative group hover:border-indigo-500/30 transition-all">
                   <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                   <div className="relative z-10 h-full flex flex-col justify-end">
                      <span className="text-2xl font-display font-bold text-white mb-2">ERP Sync</span>
                      <p className="text-sm text-indigo-200/80 font-medium">Seamlessly sync with your existing records via our secure API layer.</p>
                   </div>
                   <CreditCard className="absolute top-10 right-10 w-12 h-12 text-white/10 group-hover:text-white/20 transition-colors" />
                </div>
                <div className="aspect-square bg-indigo-600 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-2xl shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
                  <Zap className="w-16 h-16 mb-6 text-white animate-pulse" />
                  <span className="text-xl font-bold leading-tight mb-2">Instant Onboarding</span>
                  <p className="text-indigo-100 text-xs font-medium">
                    Set up your entire school roster in <span className="text-white font-black underline decoration-indigo-400 underline-offset-4">days, not months</span>. 
                    <br/><br/>
                    <span className="text-white font-bold bg-indigo-500/50 px-2 py-1 rounded">Data migration free of cost.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -ml-48" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[150px] -mr-64 -mb-64" />
        
        {/* Our Promise Footer */}
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h4 className="text-white font-bold mb-2">The Schoolly Promise</h4>
              <p className="text-gray-500 text-sm">We guarantee a 100% data privacy policy. Your student records are encrypted and never shared. We grow with you, ensuring your school stays at the forefront of digital education.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">24/7</span>
                <span className="text-gray-500 text-xs uppercase tracking-widest">Support</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">99.9%</span>
                <span className="text-gray-500 text-xs uppercase tracking-widest">Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-extrabold text-gray-900 mb-8">Simple 3-Step Process</h2>
              <div className="space-y-8">
                <Step 
                  number="01"
                  title="Teacher Posts Updates"
                  desc="Teachers use our simple school portal to post attendance, homework, or result cards."
                />
                <Step 
                  number="02"
                  title="WhatsApp Delivery"
                  desc="Schoolly instantly routes these updates to parent WhatsApp numbers automatically."
                />
                <Step 
                  number="03"
                  title="Dashboard Insights"
                  desc="School leadership gets real-time analytics on attendance trends and payment status."
                />
              </div>
            </div>
            <div className="mt-16 lg:mt-0 bg-indigo-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <Globe className="w-3 h-3" />
                  Multilingual Ready
                </div>
                <h3 className="text-3xl font-display font-bold mb-8 leading-tight">
                  Reach parents in their <br/> 
                  <span className="text-indigo-400">preferred language.</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xs">EN</div>
                    <p className="text-sm text-indigo-100">"Attendance Alert: Rahul was present today..."</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">HI</div>
                    <p className="text-sm text-indigo-100">"उपस्थिति सूचना: राहुल आज स्कूल में उपस्थित थे..."</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-indigo-200 text-sm font-medium">
                    Our system automatically translates critical updates to ensure 100% parental engagement regardless of language.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16 underline-offset-4">
            <div>
              <div className="mb-6">
                <Logo size="sm" variant="light" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering schools with modern communication tools. Zero friction, maximum transparency.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-indigo-400">Contact Us</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:schoollyservices@gmail.com" className="hover:text-indigo-400 transition-colors">
                    schoollyservices@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/pritamrajchaurasiya" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Profile
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/911234567890" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 font-bold hover:underline flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-indigo-400">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">Get the latest school tech updates.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                <button className="bg-indigo-600 px-4 py-2 rounded-lg font-bold">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
            <p>&copy; 2026 Schoolly Services. Built for the future of education.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setShowDemoModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-display font-extrabold text-gray-900">Book Demo</h2>
                  <button onClick={() => setShowDemoModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                <DemoForm onSuccess={() => setShowDemoModal(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-display font-extrabold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6">
      <div className="text-4xl font-display font-extrabold text-indigo-100 select-none">{number}</div>
      <div>
        <h4 className="text-xl font-display font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function DemoForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'leads'), {
        ...formData,
        status: LeadStatus.NEW,
        createdAt: serverTimestamp()
      });

      // Call server-side notification
      try {
        await fetch('/api/notify-demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: docRef.id }),
        });
      } catch (notifyErr) {
        console.error('Notification failed:', notifyErr);
      }

      setSubmitted(true);
      setTimeout(onSuccess, 2000);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'leads');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
        <p className="text-gray-500">We'll get back to you shortly for the pilot setup.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        required
        placeholder="School Name"
        className="input-primary py-4"
        value={formData.schoolName}
        onChange={e => setFormData({...formData, schoolName: e.target.value})}
      />
      <input 
        required
        placeholder="Contact Name"
        className="input-primary py-4"
        value={formData.contactName}
        onChange={e => setFormData({...formData, contactName: e.target.value})}
      />
      <input 
        required
        type="email"
        placeholder="Email Address"
        className="input-primary py-4"
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})}
      />
      <input 
        required
        type="tel"
        placeholder="Phone Number / WhatsApp"
        className="input-primary py-4"
        value={formData.phone}
        onChange={e => setFormData({...formData, phone: e.target.value})}
      />
      <button 
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-5 text-lg font-extrabold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 rounded-2xl"
      >
        {loading ? 'Submitting...' : 'Book My Demo'}
      </button>
    </form>
  );
}
