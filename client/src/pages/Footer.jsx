import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Links Section */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Quick Links:</h2>
            <ul className="mt-2">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/search" className="hover:text-gray-400">
                  Search Properties
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Contact Us:</h2>
            <p className="mt-2">Email: inspirationdev1@gmail.com</p>
            <p>Phone: +91 95503 45573</p>
          </div>
          {/* Location Map */}
          <div className="mt-0">
            <h2 className="text-lg font-bold">Our Office Location:</h2>
            <iframe
              className="mt-2"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d475.91287597469795!2d78.37745660344633!3d17.39724030363228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1729530767858!5m2!1sen!2sin"
              width="300"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map Location"
            ></iframe>
          </div>
          {/* Social Media Section */}
          <div>
            <h2 className="text-lg font-bold">Follow Us:</h2>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-gray-400">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="mb-4">
          <h2 className="text-lg font-bold">Feedback:</h2>
          <form className="mt-2">
            <textarea
              placeholder="Leave your feedback..."
              className=" bg-slate-800 p-2 rounded border border-gray-300 w-full"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Send Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Real Estate Company. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
