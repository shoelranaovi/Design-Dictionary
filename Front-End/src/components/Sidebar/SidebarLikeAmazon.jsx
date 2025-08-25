import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronLeft,
  Video,
  ShoppingBag,
  Gift,
  Settings,
  ChevronRight,
} from "lucide-react";
// import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion"; // For smooth animations
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

const sidebarData = [
  {
    title: "Prime Video",
    icon: <Video size={20} />,
    subItems: [
      { name: "All Videos", link: "/all-videos" },
      { name: "Included with Prime", link: "/prime-videos" },
      { name: "Prime Video Channels", link: "/video-channels" },
      { name: "Rent or Buy", link: "/rent-buy" },
      { name: "Your Watchlist", link: "/watchlist" },
      { name: "Purchases & Rentals", link: "/purchases-rentals" },
      { name: "Watch Anywhere", link: "/watch-anywhere" },
      { name: "Getting Started", link: "/getting-started" },
    ],
  },
  {
    title: "Shop by Department",
    icon: <ShoppingBag size={20} />,
    subItems: [
      { name: "Electronics", link: "/electronics" },
      { name: "Computers", link: "/computers" },
      { name: "Smart Home", link: "/smart-home" },
      { name: "Arts & Crafts", link: "/arts-crafts" },
    ],
  },
  {
    title: "Programs & Features",
    icon: <Gift size={20} />,
    subItems: [
      { name: "Gift Cards", link: "/gift-cards" },
      { name: "Shop By Interest", link: "/shop-by-interest" },
      { name: "Amazon Live", link: "/amazon-live" },
      { name: "International Shopping", link: "/international-shopping" },
    ],
  },
  {
    title: "Help & Settings",
    icon: <Settings size={20} />,
    subItems: [
      { name: "Your Account", link: "/account" },
      { name: "English", link: "/language" },
      { name: "United States", link: "/country" },
      { name: "Customer Service", link: "/customer-service" },
      { name: "Sign in", link: "/sign-in" },
    ],
  },
];

export default function SidebarLikeAmazon() {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="relative">
      <Dialog>
        {/* Menu Button */}
        <DialogTrigger className="p-2 text-white bg-gray-800 rounded-md">
          <Menu size={24} />
        </DialogTrigger>

        {/* Sidebar Content */}
        <DialogContent className="fixed top-80 left-44  w-80 h-full bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl p-4 text-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-600 pb-2">
            {activeMenu ? (
                <DialogTitle>
              <button
                onClick={() => setActiveMenu(null)}
                className="flex items-center text-gray-300"
              >
                <ChevronLeft size={20} className="mr-2" />
                <span className="font-medium">Main Menu</span>
              </button>
              </DialogTitle>
            ) : (
                <DialogTitle>
              <h2 className="text-lg font-semibold">Hello, Sign In</h2>
              </DialogTitle>
            )}
          </div>

          {/* Main Menu */}
          <AnimatePresence>
            {!activeMenu ? (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="mt-4 space-y-2"
              >
                {sidebarData.map((section, index) => (
                  <button
                    key={index}
                    className="flex items-center w-full text-left font-medium p-3 hover:bg-gray-700 rounded-lg transition-all"
                    onClick={() => setActiveMenu(section)}
                  >
                    <div className="flex w-full justify-between items-center">
                      <div className="flex justify-center items-center">
                        {section.icon}
                        <span className="ml-3">{section.title}</span>
                      </div>
                      <ChevronRight size={20} className="mr-2" />
                    </div>
                  </button>
                ))}
              </motion.div>
            ) : (
              // Sub Menu with Links
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="mt-4"
              >
                <h3 className="font-bold">{activeMenu.title}</h3>
                <ul className="mt-2 space-y-2">
                  {activeMenu.subItems.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        to={item.link}
                        className="block text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-all"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
