"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-page">
      <div className="container-main">
        <Reveal>
          <SectionHeading
            label="Contact"
            title="Start a conversation"
            description="Ready to join or have questions? Our team is here to help."
            align="center"
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal delay={100}>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "info@samudrasupply.com",
                  href: "mailto:info@samudrasupply.com",
                },
                {
                  icon: Phone,
                  title: "WhatsApp",
                  value: "+62 812-3456-7890",
                  href: "https://wa.me/6281234567890",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  value: "Jakarta, Indonesia",
                  href: undefined,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="industrial-panel-accent flex items-start gap-4 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors hover:text-cyan"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  title="Samudra Supply location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.37562674277!2d106.6894297!3d-6.229728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} direction="right">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
