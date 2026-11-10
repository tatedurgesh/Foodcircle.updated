import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { motion, LayoutGroup } from 'motion/react';
import heroImage from './assets/food-safety-hero.jpg';
import {
  formatWhatsAppMessage,
  createWhatsAppUrl,
  createServiceEnquiryMessage,
} from './utils/enquiry.ts';
import {
  ArrowDownRight, ArrowRight, Award, ClipboardCheck, FileCheck2, Factory,
  FlaskConical, Menu, MessageCircle, PackageCheck, Plus, ShieldCheck,
  Utensils, X, Phone, Mail, MapPin, Check, Leaf, Sparkles, ClipboardList,
  Boxes, CookingPot, Store, Milk, CakeSlice, Coffee, Warehouse,
} from 'lucide-react';

const phone = '+919137639148';
const email = 'info@foodcircle.co.in';
const whatsapp = '919137639148';
const navItems = [
  ['Home', '#home'], ['About', '#about'], ['Services', '#services'],
  ['Industries', '#industries'], ['Our Approach', '#approach'], ['Contact', '#contact'],
];

interface TabItem {
  id: string;
  label: string;
}

const navTabs: TabItem[] = navItems.map(([label, href]) => ({
  id: href,
  label,
}));

function AnimatedDesktopNav({
  activeId,
  onChange,
}: {
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <LayoutGroup>
      <nav
        className="
          desktop-nav relative flex items-center gap-0.5 p-1 sm:p-1.5
          rounded-full
          border border-[#073d2b]/20
          bg-gradient-to-b from-[#ffffff] to-[#f4f2e9]
          shadow-[inset_0_-2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9),0_4px_12px_rgba(7,61,43,0.06)]
          transition-all duration-300
        "
        aria-label="Main navigation"
      >
        {navTabs.map((tab) => {
          const isActive = activeId === tab.id;

          return (
            <a
              key={tab.id}
              href={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full outline-none no-underline cursor-pointer select-none inline-block"
              data-testid={`nav-${tab.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {/* Active pill using theme color (#073d2b) */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    mass: 0.9,
                  }}
                  className="
                    absolute inset-0 rounded-full
                    bg-[#073d2b]
                    shadow-sm
                  "
                />
              )}

              {/* Text */}
              <motion.span
                layout="position"
                className={`relative z-10 text-xs sm:text-sm font-semibold transition-colors duration-200 block whitespace-nowrap
                  ${isActive
                    ? "text-white font-bold"
                    : "text-[#35443a] hover:text-[#073d2b]"
                  }
                `}
              >
                {tab.label}
              </motion.span>
            </a>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}

const services = [
  { title: 'FSSAI Licensing & Registration Assistance', desc: 'Understand the licence or registration pathway relevant to your food business and prepare the supporting information.', icon: FileCheck2 },
  { title: 'Food Safety & Hygiene Audits', desc: 'A practical review of hygiene conditions, handling practices and records, with findings clearly organised for action.', icon: ClipboardCheck },
  { title: 'FSSAI Schedule 4 Compliance', desc: 'Guidance to interpret applicable hygiene requirements and translate them into workable day-to-day practices.', icon: ShieldCheck },
  { title: 'HACCP & Food Safety Management System (FSMS) Documentation', desc: 'Build structured food safety documentation around your products, processes, hazards and operational controls.', icon: ClipboardList, featured: true },
  { title: 'FSSC 22000 / ISO 22000 Consultancy', desc: 'Practical consultancy support for food safety management system development, review and readiness.', icon: Award },
  { title: 'Internal Audits & Compliance Checks', desc: 'Check systems and records against relevant requirements, then make observations easy to prioritise.', icon: Check },
  { title: 'Food Safety Staff Awareness', desc: 'Help teams understand hygienic handling, responsibilities and the everyday practices that support safe food.', icon: Utensils },
  { title: 'Food Testing Coordination', desc: 'Coordinate testing requirements with appropriate laboratories and help organise the related records.', icon: FlaskConical },
  { title: 'Food Labelling & Regulatory Compliance Guidance', desc: 'Review label information for relevant regulatory considerations and clear, consistent product communication.', icon: FileCheck2 },
  { title: 'New Food Business Setup Guidance', desc: 'Plan food safety fundamentals, documentation and compliance considerations for a new food operation.', icon: CookingPot },
  { title: 'Food Safety Documentation & Record Management', desc: 'Create or organise practical records that make routine controls clearer and easier to maintain.', icon: ClipboardList },
  { title: 'Hygiene, Storage & Temperature Control Checks', desc: 'Review cleanliness, storage conditions and temperature-monitoring practices across your operation.', icon: PackageCheck },
  { title: 'Audit Preparation & Corrective Action Support', desc: 'Organise evidence, prepare teams and structure corrective actions ahead of an audit or assessment.', icon: ClipboardCheck },
  { title: 'Food Safety Process Improvement', desc: 'Identify opportunities to make food safety routines more consistent, useful and sustainable.', icon: Sparkles },
];


const industries = [
  ['Hotels', Store], ['Catering Services', CookingPot], ['Restaurants', Utensils],
  ['Cloud Kitchens', CookingPot], ['Retailers and Supermarkets', Store],
  ['Dairy Businesses', Milk], ['Bakeries', CakeSlice], ['FMCG Businesses', Boxes],
  ['Spices & Snacks Manufacturers', PackageCheck], ['Beverage Businesses', Coffee],
  ['Food Manufacturing Units', Factory], ['Warehousing & Distribution', Warehouse],
] as const;

const stages = [
  ['01', 'Understand Your Business', 'Review the business type, operations, applicable requirements, and goals.'],
  ['02', 'Identify Compliance Gaps', 'Assess relevant documentation, hygiene practices, processes, and existing controls.'],
  ['03', 'Build Practical Solutions', 'Recommend appropriate documentation, procedures, corrective actions, and implementation priorities.'],
  ['04', 'Strengthen Audit Readiness', 'Support preparation, documentation review, internal checks, and continual improvement.'],
];

const faqs = [
  ['What does a food safety consultant help with?', 'A consultant can support food safety documentation, hygiene assessments, compliance guidance, internal audits and food safety management systems. The right scope depends on your operation.'],
  ['Which food businesses can receive consultancy support?', 'Food Circle supports a range of food businesses, from hospitality and retail to manufacturing, dairy, bakery, beverage, warehousing and distribution operations.'],
  ['What is HACCP and why is it important?', 'HACCP is a structured approach to identifying food safety hazards and managing them through appropriate controls. Its application should reflect the products and processes involved.'],
  ['What is an FSMS?', 'A Food Safety Management System is the organised set of policies, procedures, controls and records a business uses to manage food safety.'],
  ['How can a business prepare for an audit?', 'Start by reviewing applicable requirements, keeping records current, checking hygiene practices and assigning actions for identified gaps. Food Circle can support this preparation.'],
  ['How can a business enquire about services?', 'Use the enquiry form to prepare a message for WhatsApp, or contact Food Circle by phone or email. Form details are handed off to WhatsApp only after you choose to open it.'],
];

/**
 * LOGO CONFIGURATION:
 * Logo file: /public/Food Circle Eco Logo.png (also available as /public/logo.png)
 */
const LOGO_SRC = '/Food%20Circle%20Eco%20Logo.png';

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`wordmark${light ? ' wordmark-light' : ''}`}
      href="#home"
      aria-label="Food Circle home"
      data-testid="link-brand-home"
    >
      <img
        src={LOGO_SRC}
        alt="Food Circle - Safety • Quality • Trust"
        className="brand-logo"
        data-testid="img-brand-logo"
      />
    </a>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [handoffMessage, setHandoffMessage] = useState('');
  const [handoffUrl, setHandoffUrl] = useState('');
  const privacyDialogRef = useRef<HTMLElement | null>(null);
  const privacyTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') { setPrivacyOpen(false); setMenuOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!privacyOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    privacyDialogRef.current?.focus();
    return () => {
      (privacyTriggerRef.current ?? previouslyFocused)?.focus();
      privacyTriggerRef.current = null;
    };
  }, [privacyOpen]);

  const keepDialogFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  const serviceEnquiry = (service: string) => {
    const message = createServiceEnquiryMessage(service);
    const url = createWhatsAppUrl(whatsapp, message);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // safe fallback
    }
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = formatWhatsAppMessage({
      name: String(data.get('name') ?? ''),
      business: String(data.get('business') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      industry: String(data.get('industry') ?? ''),
      service: String(data.get('service') ?? ''),
      message: String(data.get('message') ?? ''),
    });
    const url = createWhatsAppUrl(whatsapp, message);
    setHandoffMessage('Your enquiry is ready. WhatsApp will open in a new tab so you can review and send it.');
    setHandoffUrl(url);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // safe fallback
    }
  };

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    
    {/* Prominent Noticeable Top Contact Helpline Bar */}
    <div className="top-contact-bar" data-testid="top-contact-bar">
      <div className="container top-contact-inner">
        <div className="top-contact-left">
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Food Circle, I would like to discuss food safety requirements for my business.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="top-contact-item highlight"
            data-testid="top-contact-phone"
          >
            <Phone size={14} aria-hidden="true" />
            <span>Contact Us: <strong className="contact-bold-val">+91 91376 39148</strong></span>
          </a>
          <span className="top-contact-sep" aria-hidden="true">•</span>
          <a href={`mailto:${email}`} className="top-contact-item" data-testid="top-contact-email">
            <Mail size={14} aria-hidden="true" />
            <span>Email: <strong className="contact-bold-val">{email}</strong></span>
          </a>
        </div>
        <div className="top-contact-right">
          <span className="top-contact-loc">
            <MapPin size={13} aria-hidden="true" />
            <span>Consultancy in <strong>Mumbai &amp; Maharashtra</strong></span>
          </span>
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Food Circle, I would like to discuss food safety requirements for my business.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="top-contact-whatsapp-btn"
            data-testid="top-contact-whatsapp"
          >
            <MessageCircle size={13} aria-hidden="true" />
            <strong>WhatsApp</strong>
          </a>
        </div>
      </div>
    </div>

    <header className="site-header">
      <div className="container header-inner">
        <Wordmark />
        <AnimatedDesktopNav activeId={activeNav} onChange={setActiveNav} />
        <div className="header-actions">
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Food Circle, I would like to discuss food safety requirements for my business.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="header-phone-quick"
            data-testid="link-header-phone"
          >
            <div className="header-phone-icon"><MessageCircle size={16} /></div>
            <div className="header-phone-details">
              <span className="header-phone-label">WHATSAPP CHAT</span>
              <strong className="header-phone-number">+91 91376 39148</strong>
            </div>
          </a>
        </div>
        <button className="mobile-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuOpen && <nav className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation">
        <div className="mobile-contact-highlight">
          <span className="mobile-contact-title">DIRECT CONTACT:</span>
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Food Circle, I would like to discuss food safety requirements for my business.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-phone-link"
            data-testid="mobile-contact-phone"
          >
            <MessageCircle size={17} /> <strong>WhatsApp +91 91376 39148</strong>
          </a>
          <a href={`mailto:${email}`} className="mobile-email-link" data-testid="mobile-contact-email">
            <Mail size={17} /> <strong>{email}</strong>
          </a>
        </div>
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} data-testid={`mobile-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        <a className="btn btn-dark" href="#contact" onClick={() => setMenuOpen(false)} data-testid="mobile-link-consultation">Request a Consultation <ArrowRight size={15} /></a>
      </nav>}
    </header>

    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Food safety · Quality · Compliance</span>
            <h1 id="hero-title">Food Safety.<br />Quality.<br /><span>Compliance.</span></h1>
            <p className="hero-description">Practical food safety and regulatory compliance solutions to help food businesses strengthen systems, improve hygiene, and prepare for audits with confidence.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#services" data-testid="link-explore-services">Explore Our Services <ArrowDownRight size={16} /></a>
            </div>

            <p className="hero-note">Your partner in food safety and compliance in Mumbai, Maharashtra.</p>
          </div>
          <div className="hero-image-wrap">
            <img className="hero-image" src={heroImage} alt="Food safety work surface with fresh produce, a checklist and a quality inspection in progress" width="900" height="900" fetchPriority="high" />
            <div className="image-caption"><strong>Good systems start on the floor.</strong><span>Practical guidance for the people and processes behind every plate.</span></div>
            <span className="hero-index" aria-hidden="true">FOOD CIRCLE · MUMBAI</span>
          </div>
        </div>
      </section>

      <section className="about-section section-pad" id="about" aria-labelledby="about-title">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">A practical partner</span>
            <h2 className="section-title" id="about-title">Making Food Safety Practical.</h2>
            <p className="section-copy">Food Circle supports food businesses with food safety documentation, regulatory compliance, hygiene assessments, internal audits, and food safety management systems. The focus is clear guidance that fits the way your operation works.</p>
            <p className="section-copy">From risk awareness to records that make sense on a busy day, we help make compliance easier to understand and sustain.</p>
            <div className="about-ribbon"><b>Our belief</b><span>Strong food safety is built into everyday work.</span></div>
          </div>
          <div className="about-side">
            <article className="principle"><span className="principle-num">01</span><div><h3>Practical Guidance</h3><p>Clear recommendations grounded in real operational routines.</p></div></article>
            <article className="principle"><span className="principle-num">02</span><div><h3>Compliance-Focused Approach</h3><p>Support that keeps applicable requirements and evidence in view.</p></div></article>
            <article className="principle"><span className="principle-num">03</span><div><h3>Continuous Improvement</h3><p>Useful next steps that help strengthen practices over time.</p></div></article>
          </div>
        </div>
      </section>

      <section className="services-section section-pad" id="services" aria-labelledby="services-title">
        <div className="container">
          <div className="services-head">
            <div><span className="eyebrow">What we do</span><h2 className="section-title" id="services-title">Food Safety Solutions<br />for Your Business.</h2></div>
            <p className="section-copy">Choose a focused service or bring us a broader compliance question. We’ll help you identify a practical next step.</p>
          </div>
          <article className="service-feature">
            <div className="service-feature-main"><span className="feature-number">01 / SYSTEMS</span><h3>Build a food safety system your team can use.</h3><p>From hazard awareness to clear records, develop documentation that reflects your operation instead of sitting on a shelf.</p></div>
            <div className="service-feature-aside"><p>HACCP and FSMS documentation can help make responsibilities, controls and monitoring more structured across daily operations.</p><button className="text-link" onClick={() => serviceEnquiry(services[3].title)} data-testid="button-enquire-featured">Enquire about this service <ArrowRight size={15} /></button></div>
          </article>
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              if (service.featured) return null;
              return <article className="service-item" key={service.title} data-testid={`service-${index + 1}`}>
                <span className="service-icon"><Icon size={17} strokeWidth={1.7} /></span>
                <div><h3>{service.title}</h3><p>{service.desc}</p><button className="text-link" onClick={() => serviceEnquiry(service.title)} data-testid={`button-enquire-service-${index + 1}`}>Enquire about this service <ArrowRight size={14} /></button></div>
              </article>;
            })}
          </div>
        </div>
      </section>


      <section className="industry-section section-pad" id="industries" aria-labelledby="industries-title">
        <div className="container industry-layout">
          <div className="industry-intro"><span className="eyebrow">Across the food chain</span><h2 className="section-title" id="industries-title">Supporting Businesses Across the Food Industry.</h2><p className="section-copy">Different operations carry different risks and routines. Food Circle’s guidance is shaped around your business environment and practical compliance needs.</p></div>
          <div><div className="industry-grid">
            {industries.map(([label, Icon], index) => <div className="industry-item" key={label} data-testid={`industry-${index + 1}`}><Icon size={19} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></div>)}
          </div><p className="industry-note">Support is tailored to the activities, products and applicable requirements of each business.</p></div>
        </div>
      </section>

      <section className="approach-section section-pad" id="approach" aria-labelledby="approach-title">
        <div className="container">
          <div className="approach-top"><div><span className="eyebrow">Our approach</span><h2 className="section-title" id="approach-title">A Clear Path to Better<br />Food Safety.</h2></div><p className="section-copy">A thoughtful process makes the work understandable, relevant and easier to carry forward.</p></div>
          <div className="process-grid">{stages.map(([number, title, copy]) => <article className="process-step" key={number} data-testid={`approach-step-${number}`}><span className="step-dot">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="why-section section-pad" aria-labelledby="why-title">
        <div className="container why-layout">
          <div><span className="eyebrow">Why Food Circle</span><h2 className="section-title" id="why-title">Built Around Quality.<br />Driven by Compliance.</h2><p className="section-copy">Food safety is not one document or one inspection. It is a set of everyday decisions, supported by clear systems and shared understanding.</p><a className="btn btn-primary why-cta" href="#contact" data-testid="link-discuss-requirements">Discuss Your Requirements <ArrowRight size={15} /></a></div>
          <div className="why-list">
            <article className="why-item"><ShieldCheck size={21} /><h3>Commitment to Quality</h3><p>Keep quality and food safety considerations central to practical support.</p></article>
            <article className="why-item"><ClipboardCheck size={21} /><h3>Practical Compliance Support</h3><p>Translate requirements into clear records, routines and priorities.</p></article>
            <article className="why-item"><MessageCircle size={21} /><h3>Building Trust</h3><p>Offer straightforward communication and transparent next steps.</p></article>
            <article className="why-item"><Leaf size={21} /><h3>Continuous Improvement</h3><p>Encourage learning and steady progress within your operation.</p></article>
          </div>
        </div>
      </section>

      <section className="faq-section section-pad" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div className="faq-intro"><span className="eyebrow">Good to know</span><h2 className="section-title" id="faq-title">Questions, answered.</h2><p className="section-copy">A few starting points for food businesses considering consultancy support.</p></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <div className="faq-item" key={question}>
              <h3 style={{ margin: 0 }}><button className="faq-question" id={`faq-question-${index}`} aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)} data-testid={`button-faq-${index + 1}`}>{question}<Plus size={18} aria-hidden="true" /></button></h3>
              {openFaq === index && <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} data-testid={`faq-answer-${index + 1}`}>{answer}</div>}
            </div>)}
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
        <div className="container contact-layout">
          <div className="contact-intro">
            <span className="eyebrow">Start a conversation</span>
            <h2 className="section-title" id="contact-title">Let's Discuss Your Food Safety Requirements.</h2>
            <p className="section-copy">Connect directly with our food safety and compliance consultants in Mumbai, Maharashtra via WhatsApp or Email.</p>
            <div className="contact-info">
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Food Circle, I would like to discuss food safety requirements for my business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card phone-card"
                data-testid="link-contact-phone"
              >
                <div className="contact-card-icon"><MessageCircle size={24} /></div>
                <div className="contact-card-body">
                  <span className="contact-card-label">DIRECT WHATSAPP CHAT</span>
                  <strong className="contact-card-primary text-xl md:text-2xl">+91 91376 39148</strong>
                  <span className="contact-card-hint">Tap to start a direct WhatsApp chat →</span>
                </div>
              </a>
              <a href={`mailto:${email}`} className="contact-card email-card" data-testid="link-contact-email">
                <div className="contact-card-icon"><Mail size={24} /></div>
                <div className="contact-card-body">
                  <span className="contact-card-label">OFFICIAL CONSULTANCY EMAIL</span>
                  <strong className="contact-card-primary text-base md:text-lg email-value">{email}</strong>
                  <span className="contact-card-hint">Send audit requirements &amp; documents →</span>
                </div>
              </a>
              <div className="contact-card location-card" data-testid="text-location">
                <div className="contact-card-icon"><MapPin size={24} /></div>
                <div className="contact-card-body">
                  <span className="contact-card-label">SERVICE LOCATION &amp; CONSULTATION REACH</span>
                  <strong className="contact-card-primary text-base md:text-lg">Mumbai, Maharashtra, India</strong>
                  <span className="contact-card-hint">On-site audits &amp; regulatory guidance across Mumbai</span>
                </div>
              </div>
            </div>
            <div className="contact-note"><strong>Food Circle</strong><br />Food Safety &amp; Compliance Consultancy — Mumbai, Maharashtra</div>
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand"><Wordmark light /><p>Food Safety &amp; Compliance Consultancy supporting food businesses with practical guidance in Mumbai, Maharashtra, India.</p></div>
          <div><h2 className="footer-heading">Explore</h2><nav className="footer-links" aria-label="Footer navigation">{navItems.map(([label, href]) => <a href={href} key={href} data-testid={`footer-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}<button onClick={(event) => { privacyTriggerRef.current = event.currentTarget; setPrivacyOpen(true); }} data-testid="footer-privacy-policy">Privacy Policy</button></nav></div>
          <div><h2 className="footer-heading">Core services</h2><div className="footer-links">{['Food safety & hygiene audits', 'HACCP & FSMS documentation', 'Licensing assistance', 'Audit preparation'].map((item) => <a href="#services" key={item} data-testid={`footer-service-${item.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`}>{item}</a>)}</div></div>
          <div className="footer-contact-col">
            <h2 className="footer-heading">Direct Contact</h2>
            <div className="footer-contact-list">
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Food Circle, I would like to discuss food safety requirements for my business.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
                data-testid="footer-phone"
              >
                <MessageCircle size={18} className="footer-contact-icon text-[#25d366]" />
                <div>
                  <small>WhatsApp Chat</small>
                  <strong className="footer-contact-val text-base">+91 91376 39148</strong>
                </div>
              </a>
              <a href={`mailto:${email}`} className="footer-contact-item" data-testid="footer-email">
                <Mail size={18} className="footer-contact-icon text-[#ff8900]" />
                <div>
                  <small>Official Email</small>
                  <strong className="footer-contact-val text-sm">{email}</strong>
                </div>
              </a>
              <div className="footer-contact-item">
                <MapPin size={18} className="footer-contact-icon text-[#ff8900]" />
                <div>
                  <small>Service Location</small>
                  <strong className="footer-contact-val text-sm">Mumbai, Maharashtra, India</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Food Circle. Safety • Quality • Trust.</span><span>FOOD SAFETY &amp; COMPLIANCE</span></div>
      </div>
    </footer>
    <a className="whatsapp-float" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Food Circle, I would like to discuss food safety and compliance support for my business.')}`} target="_blank" rel="noopener noreferrer" aria-label="Contact Food Circle on WhatsApp" data-testid="link-whatsapp-floating"><MessageCircle size={23} /></a>
    {privacyOpen && <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPrivacyOpen(false); }} data-testid="dialog-privacy-backdrop">
      <section className="privacy-dialog" ref={privacyDialogRef} tabIndex={-1} onKeyDown={keepDialogFocus} role="dialog" aria-modal="true" aria-labelledby="privacy-title" data-testid="dialog-privacy">
        <h2 id="privacy-title">Privacy Policy</h2>
        <p>The enquiry form asks for your name, business name, phone, email, industry, service required and message. These details are used to prepare the enquiry you choose to hand off to WhatsApp. The website does not submit the form to a server. If you contact Food Circle by email or phone, the information you share is handled through those channels.</p>
        <p>Review the prepared WhatsApp message before sending. You may instead contact Food Circle directly using the listed email address or phone number.</p>
        <div className="dialog-actions"><button className="btn btn-dark" onClick={() => setPrivacyOpen(false)} data-testid="button-close-privacy">Close</button></div>
      </section>
    </div>}
  </div>;
}

export default App;
