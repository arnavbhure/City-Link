const Footer = () => {
  return (
    <>
      <footer className="border-t border-white/10 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">CityLink</h2>
              <p className="text-slate-400 text-sm">
                Helping students find roommates, housing, and community when
                moving to a new city.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white cursor-pointer">
                  Find Roommates
                </li>
                <li className="hover:text-white cursor-pointer">
                  Browse Housing
                </li>
                <li className="hover:text-white cursor-pointer">Community</li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer">
                  Terms of Service
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 pt-6 border-t border-white/10 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} CityLink. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
