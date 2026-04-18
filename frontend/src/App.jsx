import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Search, Menu, X, Instagram, Facebook, Twitter, ArrowRight, Quote, Plus, Trash2, Edit, LayoutDashboard, Users, Package, LogOut, Mail, MapPin, Phone } from 'lucide-react';
import AdminPanel from './components/AdminPanel';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// --- Shared Components ---

const Navbar = ({ cartCount, setIsCartOpen, user, onLogout, onOpenLogin, onGoToAdmin }) => {
  return (
    <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '1.2rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="display-font" style={{ fontSize: '1.8rem', color: 'var(--accent)', cursor: 'pointer' }}>UNIQUE</h1>
        </Link>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/collection" className="nav-link">Collection</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {user?.role === 'ADMIN' && (
            <button onClick={onGoToAdmin} className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.7rem' }}>Admin Panel</button>
          )}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>{user.username}</span>
              <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.85rem' }}>Logout</button>
            </div>
          ) : (
            <button onClick={onOpenLogin} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>Login</button>
          )}

          <div style={{ position: 'relative', cursor: 'pointer', marginLeft: '0.5rem' }} onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -10, right: -10, background: 'var(--accent)', color: 'black', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ user, onOpenLogin, onGoToAdmin }) => (
  <footer style={{ background: '#000', padding: '80px 0', borderTop: '1px solid #1a1a1a', marginTop: '100px' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
      <div style={{ gridColumn: 'span 2' }}>
        <h1 className="display-font" style={{ color: 'var(--accent)', marginBottom: '30px', fontSize: '2.5rem' }}>UNIQUE</h1>
        <p style={{ color: '#888', maxWidth: '400px', lineHeight: '2', fontSize: '1rem' }}>Bringing you the most unique and exclusive timepieces from around the globe. Quality and authenticity guaranteed.</p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          <Instagram className="social-icon" /> <Facebook className="social-icon" /> <Twitter className="social-icon" />
        </div>
      </div>
      <div>
        <h5 style={{ marginBottom: '30px', color: 'white', fontSize: '1.2rem' }}>Collections</h5>
        <ul className="footer-links">
          <li>Luxury Heritage</li>
          <li>Sport Performance</li>
          <li>Classic Selection</li>
          <li>Vintage Finds</li>
        </ul>
      </div>
      <div>
        <h5 style={{ marginBottom: '30px', color: 'white', fontSize: '1.2rem' }}>Support</h5>
        <ul className="footer-links">
          <li>Help Center</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li style={{ color: 'var(--accent)', fontWeight: 'bold' }} onClick={() => user?.role === 'ADMIN' ? onGoToAdmin() : onOpenLogin()}>Staff Login</li>
        </ul>
      </div>
    </div>
    <div className="container" style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #111', textAlign: 'center', color: '#444' }}>
      <p>© 2026 UNIQUE Watch Shop. Developed by Sanjay.</p>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ watches, loading, setSelectedWatch, addToCart }) => (
  <>
    <header style={{ 
      height: '80vh', 
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1600)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div className="fade-in">
        <h2 className="display-font" style={{ fontSize: '4rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>EXQUISITE TIME</h2>
        <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 2.5rem', color: '#ccc', fontWeight: '300' }}>Discover the peak of elegance and precision architectural mastery.</p>
        <Link to="/collection" className="btn btn-primary" style={{ textDecoration: 'none', padding: '1rem 3rem' }}>Explore Collection</Link>
      </div>
    </header>

    <section style={{ padding: '80px 0', borderBottom: '1px solid #1a1a1a' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h4 className="display-font" style={{ fontSize: '1.8rem', color: 'var(--accent)', letterSpacing: '4px' }}>NEW ARRIVALS</h4>
      </div>
      <ProductMarquee watches={watches} setSelectedWatch={setSelectedWatch} />
    </section>

    <section className="container" style={{ padding: '100px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h3 className="display-font" style={{ fontSize: '2.5rem' }}>Featured Selection</h3>
        <div style={{ width: '60px', height: '2px', background: 'var(--accent)', margin: '20px auto' }}></div>
      </div>
      <ProductGrid watches={watches.slice(0, 4)} loading={loading} setSelectedWatch={setSelectedWatch} addToCart={addToCart} columns="repeat(auto-fill, minmax(250px, 1fr))" />
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Link to="/collection" className="btn btn-outline" style={{ textDecoration: 'none' }}>View Full Catalog</Link>
      </div>
    </section>

    <section style={{ padding: '100px 0', background: 'rgba(212,175,55,0.02)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <div>
          <h2 className="display-font" style={{ fontSize: '3rem', marginBottom: '30px' }}>Crafting Heritage Since 1994</h2>
          <p style={{ fontSize: '1.1rem', color: '#888', lineHeight: '1.8', marginBottom: '30px' }}>Every timepiece at UNIQUE is hand-selected for its historical significance and mechanical perfection. We don't just sell watches; we preserve moments.</p>
          <Link to="/about" className="btn btn-primary" style={{ textDecoration: 'none' }}>Our Story</Link>
        </div>
        <div className="glass" style={{ height: '400px', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  </>
);

const ProductMarquee = ({ watches, setSelectedWatch }) => {
  const marqueeItems = watches.length > 0 ? [...watches, ...watches, ...watches] : [];
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {marqueeItems.map((watch, index) => (
          <div key={`${watch.id}-${index}`} className="marquee-item" onClick={() => setSelectedWatch(watch)}>
            <div className="glass" style={{ padding: '20px', transition: '0.3s' }}>
              <div style={{ height: '220px', overflow: 'hidden', borderRadius: '4px', marginBottom: '15px' }}>
                <img src={watch.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{watch.brand}</p>
              <h5 style={{ fontSize: '1rem', marginBottom: '10px' }}>{watch.name}</h5>
              <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>${watch.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductGrid = ({ watches, loading, setSelectedWatch, addToCart, columns = "repeat(auto-fill, minmax(260px, 1fr))" }) => {
  const renderStars = (rating) => (
    Array(5).fill(0).map((_, i) => (
      <Star key={i} size={14} fill={i < Math.floor(rating || 0) ? "var(--accent)" : "none"} color="var(--accent)" />
    ))
  );
  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}><p>Loading our treasures...</p></div>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: columns, gap: '30px' }}>
      {watches.map(watch => (
        <div key={watch.id} className="glass product-card" style={{ padding: '25px', cursor: 'pointer' }} onClick={() => setSelectedWatch(watch)}>
          <div style={{ height: '220px', overflow: 'hidden', borderRadius: '8px', marginBottom: '20px' }}>
            <img src={watch.imageUrl} alt={watch.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }} className="product-img" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '700' }}>{watch.brand}</span>
            <div style={{ display: 'flex', gap: '2px' }}>{renderStars(watch.rating)}</div>
          </div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '500' }}>{watch.name}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '1.4rem', fontWeight: '700', color: 'white' }}>${watch.price.toLocaleString()}</p>
            <button className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }} onClick={(e) => { e.stopPropagation(); addToCart(watch); }}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const CollectionPage = ({ watches, loading, setSelectedWatch, addToCart }) => {
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(20000);
  const brands = ['All', ...new Set(watches.map(w => w.brand))];
  const filteredWatches = watches.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.brand.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brandFilter === 'All' || w.brand === brandFilter;
    const matchesPrice = w.price <= priceRange;
    return matchesSearch && matchesBrand && matchesPrice;
  });
  return (
    <section className="container" style={{ padding: '100px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h3 className="display-font" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Our Collections</h3>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>Filter through centuries of horological excellence.</p>
      </div>
      <div className="glass" style={{ padding: '40px', marginBottom: '60px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-end' }}>
        <div style={{ flex: '2 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '15px', fontSize: '0.9rem', color: 'var(--accent)' }}>Search Treasures</label>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
            <input type="text" placeholder="Search models, brands..." className="glass" style={{ width: '100%', padding: '15px 15px 15px 50px', color: 'white' }} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '15px', fontSize: '0.9rem', color: 'var(--accent)' }}>Brand</label>
          <select className="glass" style={{ width: '100%', padding: '15px', color: 'white', background: 'transparent' }} value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
            {brands.map(b => <option key={b} value={b} style={{ background: '#000' }}>{b}</option>)}
          </select>
        </div>
        <div style={{ flex: '1 1 250px' }}>
          <label style={{ display: 'block', marginBottom: '15px', fontSize: '0.9rem', color: 'var(--accent)' }}>Price Ceiling: ${priceRange.toLocaleString()}</label>
          <input type="range" min="0" max="25000" step="1000" style={{ width: '100%', accentColor: 'var(--accent)' }} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
        </div>
      </div>
      <ProductGrid watches={filteredWatches} loading={loading} setSelectedWatch={setSelectedWatch} addToCart={addToCart} columns="repeat(auto-fill, minmax(220px, 1fr))" />
    </section>
  );
};

// --- Modals ---

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) { onLoginSuccess(data); onClose(); } else { setError(data || 'Invalid entry. Please try again.'); }
    } catch (err) { setError('Backend offline. Please restart your Java application.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass modal-content fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px', width: '90%', padding: '50px' }}>
        <h3 className="display-font" style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>{isLogin ? 'Welcome Back' : 'Join UNIQUE'}</h3>
        {error && <div style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" className="glass" style={{ width: '100%', padding: '15px', marginBottom: '15px', color: 'white' }} value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
          {!isLogin && <input type="email" placeholder="Email Address" className="glass" style={{ width: '100%', padding: '15px', marginBottom: '15px', color: 'white' }} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />}
          <input type="password" placeholder="Password" className="glass" style={{ width: '100%', padding: '15px', marginBottom: '30px', color: 'white' }} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          <button className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }} disabled={loading}>{loading ? 'Verifying...' : (isLogin ? 'Sign In' : 'Create Account')}</button>
        </form>
        <p style={{ marginTop: '25px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
          {isLogin ? "New to UNIQUE? " : "Already a member? "}
          <span style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Register Now" : "Login instead"}</span>
        </p>
      </div>
    </div>
  );
};

const PaymentModal = ({ total, user, cart, onClose, onOrderSuccess }) => {
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const handlePlaceOrder = async () => {
    if (!method) { alert("Please select a payment method"); return; }
    setLoading(true);
    try {
      for (const item of cart) {
        await fetch(`${API_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user.username, productName: item.name, price: item.price, paymentMethod: method })
        });
      }
      onOrderSuccess();
      onClose();
    } catch (err) { alert("Checkout failed. Check server status."); } finally { setLoading(false); }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass modal-content fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', width: '90%', padding: '50px' }}>
        <h3 className="display-font" style={{ fontSize: '2rem', marginBottom: '30px' }}>Secure Checkout</h3>
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '20px' }}>
          <span>Grand Total:</span>
          <span style={{ color: 'var(--accent)', fontSize: '1.8rem', fontWeight: 'bold' }}>${total.toLocaleString()}</span>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <p style={{ marginBottom: '15px', color: '#666' }}>Choose Method:</p>
          {['upi', 'card', 'cash'].map(m => (
            <div key={m} onClick={() => setMethod(m)} style={{ padding: '18px', border: '1px solid', borderColor: method === m ? 'var(--accent)' : '#222', borderRadius: '12px', cursor: 'pointer', marginBottom: '12px', transition: '0.3s', background: method === m ? 'rgba(212,175,55,0.05)' : 'transparent' }}>
              <span style={{ textTransform: 'uppercase', fontWeight: 'bold', color: method === m ? 'var(--accent)' : '#888' }}>{m === 'upi' ? 'UPI Transfer' : m === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }} onClick={handlePlaceOrder} disabled={loading || !method}>{loading ? 'Processing...' : 'Complete Payment'}</button>
      </div>
    </div>
  );
};

// --- Main App Logic ---

const AppContent = () => {
  const [watches, setWatches] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  const fetchWatches = () => {
    fetch(`${API_URL}/api/watches`)
      .then(res => res.json())
      .then(data => { setWatches(data); setLoading(false); })
      .catch(() => { 
        setWatches([
          { id: 1, name: "Rolex Submariner", brand: "Rolex", price: 12000, imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800", category: "Heritage", rating: 4.9, description: "The definitive diver's watch." },
          { id: 2, name: "Omega Speedmaster", brand: "Omega", price: 6800, imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800", category: "Classic", rating: 4.8, description: "The Moonwatch legend." }
        ]); 
        setLoading(false); 
      });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('unique_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchWatches();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      {!isAdminPage && (
        <Navbar 
          cartCount={cart.length} 
          setIsCartOpen={setIsCartOpen} 
          user={user} 
          onLogout={() => { setUser(null); localStorage.removeItem('unique_user'); navigate('/'); }} 
          onOpenLogin={() => setIsAuthOpen(true)}
          onGoToAdmin={() => navigate('/admin')}
        />
      )}
      
      <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage watches={watches} loading={loading} setSelectedWatch={setSelectedWatch} addToCart={(w) => {setCart([...cart, w]); setIsCartOpen(true);}} />} />
          <Route path="/collection" element={<CollectionPage watches={watches} loading={loading} setSelectedWatch={setSelectedWatch} addToCart={(w) => {setCart([...cart, w]); setIsCartOpen(true);}} />} />
          <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminPanel watches={watches} refreshWatches={fetchWatches} /> : <HomePage watches={watches} loading={loading} setSelectedWatch={setSelectedWatch} addToCart={(w) => {setCart([...cart, w]); setIsCartOpen(true);}} />} />
          <Route path="/about" element={
            <section className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
              <h2 className="display-font" style={{ fontSize: '4rem', marginBottom: '40px' }}>Our Legacy</h2>
              <div style={{ width: '100px', height: '2px', background: 'var(--accent)', margin: '0 auto 60px' }}></div>
              <p style={{ maxWidth: '900px', margin: '0 auto', fontSize: '1.3rem', color: '#ccc', lineHeight: '2', fontWeight: '300' }}>
                Founded in 1994, UNIQUE has served as the premier destination for collectors who demand more than just a watch. We seek out mechanical masterpieces that tell a story of innovation and human achievement. Every piece in our collection is authenticated by master horologists and comes with a lifetime authenticity guarantee.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '100px' }}>
                <div className="glass" style={{ padding: '40px' }}><h2 style={{ color: 'var(--accent)' }}>30+</h2><p>Years Experience</p></div>
                <div className="glass" style={{ padding: '40px' }}><h2 style={{ color: 'var(--accent)' }}>5k+</h2><p>Rare Pieces Sold</p></div>
                <div className="glass" style={{ padding: '40px' }}><h2 style={{ color: 'var(--accent)' }}>100%</h2><p>Authenticity Check</p></div>
              </div>
            </section>
          } />
          <Route path="/contact" element={
            <section className="container" style={{ padding: '120px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 className="display-font" style={{ fontSize: '3.5rem' }}>Get In Touch</h2>
                <p style={{ color: '#888' }}>Visit our private boutique or contact our consultants.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                <div className="glass" style={{ padding: '50px' }}>
                  <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
                      <MapPin color="var(--accent)" />
                      <div><h4>Visit Boutique</h4><p style={{ color: '#888' }}>123 Luxury Avenue, Geneva, Switzerland</p></div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
                      <Phone color="var(--accent)" />
                      <div><h4>Call Specialist</h4><p style={{ color: '#888' }}>+41 22 555 0199</p></div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <Mail color="var(--accent)" />
                      <div><h4>Email Support</h4><p style={{ color: '#888' }}>concierge@unique.com</p></div>
                    </div>
                  </div>
                </div>
                <form className="glass" style={{ padding: '50px' }}>
                  <input type="text" placeholder="Your Name" className="glass" style={{ width: '100%', padding: '15px', marginBottom: '20px', color: 'white' }} />
                  <input type="email" placeholder="Email Address" className="glass" style={{ width: '100%', padding: '15px', marginBottom: '20px', color: 'white' }} />
                  <textarea placeholder="How can we assist you?" className="glass" style={{ width: '100%', padding: '15px', marginBottom: '30px', color: 'white', minHeight: '150px' }}></textarea>
                  <button className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }}>Send Inquiry</button>
                </form>
              </div>
            </section>
          } />
        </Routes>
      </main>

      {!isAdminPage && <Footer user={user} onOpenLogin={() => setIsAuthOpen(true)} onGoToAdmin={() => navigate('/admin')} />}

      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} onLoginSuccess={(u) => { setUser(u); localStorage.setItem('unique_user', JSON.stringify(u)); if(u.role==='ADMIN') navigate('/admin'); }} />}
      {isCheckoutOpen && <PaymentModal total={total} user={user} cart={cart} onClose={() => setIsCheckoutOpen(false)} onOrderSuccess={() => { alert("🎉 Success! Your timepiece is being prepared."); setCart([]); }} />}
      
      {selectedWatch && (
        <div className="modal-overlay" onClick={() => setSelectedWatch(null)}>
          <div className="glass modal-content fade-in" onClick={e => e.stopPropagation()} style={{ padding: '50px', maxWidth: '900px', display: 'flex', gap: '40px' }}>
             <img src={selectedWatch.imageUrl} style={{ width: '400px', borderRadius: '12px', border: '1px solid #222' }} />
             <div style={{ flex: 1 }}>
                <h2 className="display-font" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{selectedWatch.name}</h2>
                <p style={{ color: 'var(--accent)', fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>${selectedWatch.price.toLocaleString()}</p>
                <p style={{ color: '#888', marginBottom: '30px', lineHeight: '1.8' }}>{selectedWatch.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', color: '#666' }}>
                  <li>✓ Authentic Certification</li>
                  <li>✓ 2-Year Professional Warranty</li>
                  <li>✓ Secure Global Shipping</li>
                </ul>
                <button className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }} onClick={() => { setCart([...cart, selectedWatch]); setIsCartOpen(true); setSelectedWatch(null); }}>Acquire Timepiece</button>
             </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="glass fade-in" style={{ position: 'fixed', top: 0, right: 0, width: '420px', height: '100vh', background: '#050505', padding: '40px', zIndex: 3000, borderLeft: '1px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h3 className="display-font" style={{ fontSize: '1.8rem' }}>Your Vault</h3>
            <X cursor="pointer" onClick={() => setIsCartOpen(false)} />
          </div>
          {cart.length === 0 ? <p style={{ color: '#444' }}>Your vault is currently empty.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '25px', alignItems: 'center' }}>
                    <img src={item.imageUrl} style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                      <p style={{ color: 'var(--accent)', margin: 0 }}>${item.price.toLocaleString()}</p>
                    </div>
                    <Trash2 size={18} cursor="pointer" color="#333" onClick={() => { const newCart = [...cart]; newCart.splice(i, 1); setCart(newCart); }} />
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                  <span>Total Investment</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>${total.toLocaleString()}</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }} onClick={() => { setIsCheckoutOpen(true); setIsCartOpen(false); }}>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
