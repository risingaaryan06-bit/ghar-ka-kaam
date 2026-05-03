import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACTS = [
  {
    icon: Phone,
    title: "Contact Person",
    name: "Aaryan Kathuga",
    phone: "8894186675",
    desc: "For all queries, support, payment issues, and complaints — reach out directly.",
    gradientClass: "construction-gradient",
    badgeClass: "border-primary text-primary",
  },
];

const FAQS = [
  {
    q: "How do I post a job on Ghar Ka Kaam?",
    a: "Simply sign up, click 'Post a Job', fill in your work details like type of work, location, budget and timeline. Workers in your area will see your job and can contact you directly.",
  },
  {
    q: "How are workers verified?",
    a: "All workers go through identity verification and skill assessment. You can also check their profile ratings, past reviews, and completed jobs before hiring.",
  },
  {
    q: "Is payment secure on the platform?",
    a: "Yes. We use milestone-based escrow payments. Your money is held securely and released to the worker only when you confirm each milestone is complete.",
  },
  {
    q: "What types of work can I find workers for?",
    a: "We cover masonry, carpentry, painting, electrical, plumbing, tiling, general labor, renovation, and more. If it's home-related, we have workers for it.",
  },
  {
    q: "How do I find and hire the right worker?",
    a: "Browse verified worker profiles, compare their ratings, reviews, experience, and skills — all in one place. Message the workers you like directly and hire them on the spot.",
  },
  {
    q: "Can workers create free profiles?",
    a: "Absolutely. Workers can create a free profile, showcase their skills and past work, and start getting hired right away — no subscription fees required.",
  },
];

const HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { day: "Saturday", time: "10:00 AM – 5:00 PM" },
  { day: "Sunday", time: "Closed" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border rounded-lg overflow-hidden"
      data-ocid="contact.faq.item"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-card hover:bg-muted/30 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground text-sm">{q}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed bg-card border-t border-border">
          <p className="pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubjectChange(val: string) {
    setFormData((prev) => ({ ...prev, subject: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Message sent! We'll get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
      >
        <div className="absolute inset-0 bg-foreground/78" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="construction-gradient text-primary-foreground border-0 mb-4 uppercase tracking-wider text-xs font-semibold px-3 py-1">
              Get in Touch
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-card mb-4">
              We're Here to Help
            </h1>
            <p className="text-card/75 max-w-lg mx-auto text-lg">
              Reach out to the right person directly — no bots, no queues. Real
              people who care about your experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="bg-card border-b border-border py-14">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 max-w-sm mx-auto">
            {CONTACTS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`contact.contact_card.item.${i + 1}`}
                >
                  <Card className="h-full border-border shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-200">
                    <CardContent className="pt-6 pb-5 text-center space-y-4">
                      <div
                        className={`mx-auto h-14 w-14 rounded-2xl ${c.gradientClass} flex items-center justify-center shadow-md`}
                      >
                        <Icon className="h-6 w-6 text-card" />
                      </div>
                      <div>
                        <Badge
                          variant="outline"
                          className={`${c.badgeClass} text-xs font-semibold mb-2`}
                        >
                          {c.title}
                        </Badge>
                        <h3 className="font-display font-bold text-foreground text-base">
                          {c.name}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {c.desc}
                      </p>
                      <a
                        href={`tel:${c.phone}`}
                        className="flex items-center justify-center gap-2 bg-muted rounded-lg px-4 py-2.5 hover:bg-primary/10 transition-colors group"
                      >
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                          +91 {c.phone}
                        </span>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + Hours ── */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card className="border-border shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg construction-gradient flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <CardTitle className="font-display text-xl">
                      Send Us a Message
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          data-ocid="contact.name.input"
                          placeholder="Rahul Sharma"
                          value={formData.name}
                          onChange={handleChange}
                          className="border-input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          data-ocid="contact.email.input"
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="border-input"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">Subject</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSubjectChange}
                      >
                        <SelectTrigger
                          data-ocid="contact.subject.select"
                          className="border-input"
                        >
                          <SelectValue placeholder="Select a topic…" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Query</SelectItem>
                          <SelectItem value="payment">Payment Issue</SelectItem>
                          <SelectItem value="complaint">
                            Complaint / Issue
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        data-ocid="contact.message.textarea"
                        placeholder="Describe your query in detail…"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="border-input resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      data-ocid="contact.form.submit_button"
                      className="btn-primary w-full"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Sending…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="border-border shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg construction-gradient flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <CardTitle className="font-display text-lg">
                      Working Hours
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 space-y-3">
                  {HOURS.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between items-center py-2.5 border-b border-border last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">
                        {h.day}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          h.time === "Closed"
                            ? "text-destructive"
                            : "text-foreground"
                        }`}
                      >
                        {h.time}
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground pt-1">
                    * All times are in IST (India Standard Time)
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5 shadow-sm">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full construction-gradient flex items-center justify-center flex-shrink-0">
                      <Phone className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground text-sm mb-1">
                        Prefer to call directly?
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Our team is available during working hours for urgent
                        queries. Choose the right contact for faster resolution.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge
              variant="outline"
              className="border-primary text-primary mb-3"
            >
              Frequently Asked
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Common Questions
            </h2>
            <p className="text-muted-foreground mt-2">
              Can't find your answer? Reach out directly — we're happy to help.
            </p>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
