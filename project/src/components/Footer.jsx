import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useAppContext } from "../contextAPI/AppContextProvider";

const Footer = () => {
  const { setActiveSection, handleEmailSubscribe } = useAppContext();
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Classic Food</h3>
            <p className="text-gray-400 mb-4">
              Experience the perfect blend of traditional flavors and modern
              cuisine. We serve authentic Indian dishes made with the finest
              ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                <span>Mon - Fri: 11am - 10pm</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                <span>Sat - Sun: 10am - 11pm</span>
              </li>
            </ul>

            {/* Login/Register Section */}
            <h3 className="text-xl font-bold text-white mb-4 mt-4">
              Login/Register
            </h3>
            <ul className="space-y-2" onClick={() => setActiveSection("admin")}>
              <li>
                <a
                  // href="/admin-login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Admin Login
                </a>
              </li>
              <li>
                <a
                  href="/user-login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  User Login/Register{" "}
                  <span className="text-[0.7rem] text-red-500">
                    comming soon
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                <span className="max-w-28">
                  classic food restaurand, Sai Vihar Colony, Rau, Indore, MP
                  453331
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-orange-500" />
                <span>+91 62673 14645</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-orange-500" />
                <span className="max-w-28">ishverrunghe2001@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                onClick={(e) => {
                  handleEmailSubscribe(e, email);
                  setEmail("");
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Classic Food. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
