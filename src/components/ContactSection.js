import React, { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import emailjs from "emailjs-com";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // Use proper way to access environment variables in React
    const serviceId = process.env.REACT_APP_PORTFOLIO_EMAILJS_SERVICE_ID; 
    const templateId = process.env.REACT_APP_PORTFOLIO_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_PORTFOLIO_EMAILJS_USER_ID;

    try {
      // The correct way to use emailjs.send
      await emailjs.send(
        serviceId, 
        templateId, 
        formData,
        publicKey
      );
      
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message. Try again.");
      console.error("EmailJS Error:", error);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 ">
      {/*  if background is required bg-gray-800/50 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12">Let's Connect</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Get in Touch</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded bg-gray-600 border border-gray-500 focus:border-orange-500 outline-none"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded bg-gray-600 border border-gray-500 focus:border-orange-500 outline-none"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                <textarea
                  className="w-full px-4 py-2 rounded bg-gray-600 border border-gray-500 focus:border-orange-500 outline-none h-32 resize-none"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
              >
                Send Message
              </button>
              {status && <p className="text-center text-sm text-gray-300">{status}</p>}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Project Assistance</h3>
              <p className="text-gray-300 mb-4">
                Offering expertise in Java, Flutter, web development (including Shopify), market research, and analysis. Previous work includes secure user access finance apps.
                Stuck on a project? Need assistance? Message me.
              </p>
              <div className="flex items-center gap-2 text-orange-500">
                <MessageSquare size={20} />
                <span>Usually responds within 24 hours</span>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-orange-500" />
                  <a href="mailto:neeleshchaturvedi233@gmail.com" className="hover:text-orange-500 text-gray-300 transition-colors">
                    neeleshchaturvedi233@gmail.com
                  </a>
                </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}