import { Link } from "react-router-dom";
import {
  FaUsers,
  FaTools,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaStar,
  FaHandshake,
  FaRegClock,
  FaArrowRight
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Hero */}
      <section className="text-center py-20 px-4">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
          Book Trusted Services, Anytime.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From cleaning to repairs, Hyperlocal connects you to the best local professionals.
        </p>
        <div className="mt-8 space-x-4">
          <Link to="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700">
            Get Started
          </Link>
          <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-md text-lg hover:bg-green-700">
            Become a Provider
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 px-6 shadow-inner">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <FaUsers className="text-4xl text-indigo-600 mx-auto mb-2" />
            <h3 className="text-xl font-bold">10,000+ Customers</h3>
            <p className="text-gray-500">Satisfied users across the city</p>
          </div>
          <div>
            <FaTools className="text-4xl text-green-600 mx-auto mb-2" />
            <h3 className="text-xl font-bold">2,000+ Service Providers</h3>
            <p className="text-gray-500">Verified and skilled professionals</p>
          </div>
          <div>
            <FaCheckCircle className="text-4xl text-purple-600 mx-auto mb-2" />
            <h3 className="text-xl font-bold">25+ Services</h3>
            <p className="text-gray-500">Home, beauty, repair & more</p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Hyperlocal?</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Hyperlocal is a one-stop destination to find and book trusted professionals near you. Whether it's home cleaning, plumbing, AC repair, beauty services, or any local need — we've got you covered with verified experts, transparent pricing, and hassle-free scheduling.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <FaRegClock className="text-5xl text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">1. Browse Services</h4>
              <p className="text-gray-500">Choose from 25+ reliable services available near you.</p>
            </div>
            <div>
              <FaHandshake className="text-5xl text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">2. Book Instantly</h4>
              <p className="text-gray-500">Pick a convenient time slot and confirm your booking.</p>
            </div>
            <div>
              <FaStar className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">3. Enjoy & Rate</h4>
              <p className="text-gray-500">Sit back while the pro handles the job. Rate the service afterward!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Popular Services</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Home Cleaning", img: "https://i.imgur.com/FXL9L3s.jpg" },
              { title: "AC Repair", img: "https://i.imgur.com/YTOuQ2D.jpg" },
              { title: "Plumbing", img: "https://i.imgur.com/RwA9U3u.jpg" },
              { title: "Haircut at Home", img: "https://i.imgur.com/bD0EuSk.jpg" },
              { title: "Pest Control", img: "https://i.imgur.com/v6Sk5KU.jpg" },
              { title: "Electrician", img: "https://i.imgur.com/fLfuhMl.jpg" },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded shadow hover:shadow-lg transition">
                <img src={s.img} alt={s.title} className="w-full h-48 object-cover rounded-t" />
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{s.title}</h4>
                  <Link to="/login" className="text-sm text-blue-600 hover:underline flex items-center mt-2">
                    Book Now <FaArrowRight className="ml-1" size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { name: "Ravi S.", review: "Booked an electrician in 2 mins. Quick response and professional work!" },
              { name: "Meena T.", review: "Their salon-at-home service was amazing. Highly recommended." },
              { name: "Karthik M.", review: "Hyperlocal made my AC repair hassle-free and affordable." },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded shadow">
                <p className="text-gray-600 mb-2 italic">“{t.review}”</p>
                <h5 className="text-sm font-semibold text-gray-800">{t.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Hyperlocal</h4>
            <p className="text-sm text-gray-300">Your go-to solution for local services.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Connect</h4>
            <p className="flex items-center gap-2 text-sm"><FaPhoneAlt /> +91 98765 43210</p>
            <p className="flex items-center gap-2 text-sm"><FaEnvelope /> support@hyperlocal.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-2 py-1 rounded text-black"
            />
            <button className="bg-indigo-600 text-white px-4 py-1 mt-2 rounded hover:bg-indigo-700">
              Subscribe
            </button>
          </div>
        </div>
        <div className="text-center text-sm py-4 border-t border-gray-700 text-gray-400">
          © {new Date().getFullYear()} Hyperlocal Services. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
