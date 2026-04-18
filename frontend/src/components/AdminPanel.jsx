import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Package, ShoppingCart, Plus, Trash2, Edit, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const AdminPanel = ({ watches, refreshWatches }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalOrders: 0, totalSales: 0, salesData: [] });
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingWatch, setEditingWatch] = useState(null);
  const [newWatch, setNewWatch] = useState({ name: '', brand: '', price: '', description: '', imageUrl: '', category: 'Luxury', rating: 4.5, reviews: '' });

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchStats = () => {
    fetch(`${API_URL}/api/stats`).then(res => res.json()).then(setStats);
  };
  const fetchUsers = () => {
    fetch(`${API_URL}/api/users`).then(res => res.json()).then(setUsers);
  };
  const fetchOrders = () => {
    fetch(`${API_URL}/api/orders`).then(res => res.json()).then(setOrders);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const method = editingWatch ? 'PUT' : 'POST';
    const url = editingWatch ? `${API_URL}/api/watches/${editingWatch.id}` : `${API_URL}/api/watches`;
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingWatch || newWatch)
    });
    
    setEditingWatch(null);
    setNewWatch({ name: '', brand: '', price: '', description: '', imageUrl: '', category: 'Luxury', rating: 4.5, reviews: '' });
    refreshWatches();
    fetchStats();
    setActiveTab('products');
  };

  const deleteWatch = async (id) => {
    if(window.confirm("Are you sure you want to delete this watch?")) {
      await fetch(`${API_URL}/api/watches/${id}`, { method: 'DELETE' });
      refreshWatches();
      fetchStats();
    }
  };

  const deleteUser = async (id) => {
    if(window.confirm("Delete this user?")) {
      await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE' });
      fetchUsers();
      fetchStats();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505', color: 'white' }}>
      {/* Admin Sidebar */}
      <div className="glass" style={{ width: '260px', borderRight: '1px solid #1a1a1a', padding: '40px 20px', position: 'fixed', height: '100vh' }}>
        <h2 className="display-font" style={{ marginBottom: '40px', color: 'var(--accent)', fontSize: '1.5rem' }}>UNIQUE ADMIN</h2>
        <div style={{ display: 'grid', gap: '8px' }}>
          <SidebarItem active={activeTab === 'dashboard'} icon={<LayoutDashboard size={20}/>} label="Dashboard" onClick={() => setActiveTab('dashboard')} />
          <SidebarItem active={activeTab === 'orders'} icon={<ShoppingCart size={20}/>} label="Orders" onClick={() => setActiveTab('orders')} />
          <SidebarItem active={activeTab === 'products'} icon={<Package size={20}/>} label="Products" onClick={() => setActiveTab('products')} />
          <SidebarItem active={activeTab === 'users'} icon={<Users size={20}/>} label="Users" onClick={() => setActiveTab('users')} />
          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #111' }}>
            <SidebarItem active={false} icon={<ArrowRight size={20}/>} label="Back to Store" onClick={() => window.location.href = '/'} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', padding: '40px', maxWidth: '1200px' }}>
        {activeTab === 'dashboard' && (
          <div className="fade-in">
            <h2 className="display-font" style={{ marginBottom: '40px' }}>Global Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <StatCard label="Total Sales" value={`$${stats.totalSales?.toLocaleString()}`} color="var(--accent)" />
              <StatCard label="Orders" value={stats.totalOrders} />
              <StatCard label="Users" value={stats.totalUsers} />
              <StatCard label="Inventory" value={watches.length} />
            </div>
            
            <div className="glass" style={{ padding: '40px' }}>
              <h4 style={{ marginBottom: '30px' }}>Sales Performance</h4>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '25px', height: '250px', paddingBottom: '20px', borderBottom: '1px solid #222' }}>
                {stats.salesData?.map((val, i) => (
                  <div key={i} style={{ flex: 1, background: 'linear-gradient(to top, var(--accent), transparent)', height: `${val * 12}px`, borderRadius: '6px 6px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: '#888' }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', color: '#444', fontSize: '0.8rem' }}>
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="fade-in">
            <h2 className="display-font" style={{ marginBottom: '40px' }}>Order History</h2>
            <div className="glass" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid #222' }}>
                    <th style={tableHeadStyle}>ID</th>
                    <th style={tableHeadStyle}>Customer</th>
                    <th style={tableHeadStyle}>Product</th>
                    <th style={tableHeadStyle}>Price</th>
                    <th style={tableHeadStyle}>Payment</th>
                    <th style={tableHeadStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #111' }}>
                      <td style={tableCellStyle}>#{o.id}</td>
                      <td style={tableCellStyle}>{o.username}</td>
                      <td style={tableCellStyle}>{o.productName}</td>
                      <td style={tableCellStyle}>${o.price.toLocaleString()}</td>
                      <td style={tableCellStyle}>{o.paymentMethod.toUpperCase()}</td>
                      <td style={tableCellStyle}><span style={badgeStyle}>Completed</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 className="display-font">Inventory</h2>
              <button className="btn btn-primary" onClick={() => { setEditingWatch(null); setActiveTab('add-product'); }}>
                <Plus size={18} /> New Watch
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {watches.map(w => (
                <div key={w.id} className="glass" style={{ padding: '15px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: '0.3s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <img src={w.imageUrl} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #333' }} />
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{w.name}</h4>
                      <div style={{ display: 'flex', gap: '15px', color: '#888', fontSize: '0.85rem' }}>
                        <span>{w.brand}</span>
                        <span>•</span>
                        <span style={{ color: 'var(--accent)' }}>${w.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <Edit size={18} cursor="pointer" color="#aaa" onClick={() => { setEditingWatch(w); setActiveTab('add-product'); }} />
                    <Trash2 size={18} cursor="pointer" color="#ff4d4d" onClick={() => deleteWatch(w.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="fade-in">
            <h2 className="display-font" style={{ marginBottom: '40px' }}>Active Users</h2>
            <div className="glass shadow" style={{ overflow: 'hidden' }}>
              {users.map(u => (
                <div key={u.id} style={{ padding: '20px 30px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h5 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{u.username}</h5>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{u.email}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '0.75rem', padding: '4px 12px', background: u.role === 'ADMIN' ? 'var(--accent)' : '#222', color: u.role === 'ADMIN' ? 'black' : '#888', borderRadius: '20px', fontWeight: 'bold' }}>
                      {u.role}
                    </span>
                    {u.role !== 'ADMIN' && (
                      <Trash2 size={18} cursor="pointer" color="#444" onClick={() => deleteUser(u.id)} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'add-product' && (
          <div className="fade-in">
            <h2 className="display-font" style={{ marginBottom: '40px' }}>{editingWatch ? 'Update Watch' : 'Create Watch'}</h2>
            <form className="glass" style={{ padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} onSubmit={handleCreateOrUpdate}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Product Name</label>
                <input type="text" className="glass" style={inputStyle} 
                  value={editingWatch ? editingWatch.name : newWatch.name} 
                  onChange={(e) => editingWatch ? setEditingWatch({...editingWatch, name: e.target.value}) : setNewWatch({...newWatch, name: e.target.value})} 
                  required />
              </div>
              <div>
                <label style={labelStyle}>Brand</label>
                <input type="text" className="glass" style={inputStyle} 
                  value={editingWatch ? editingWatch.brand : newWatch.brand} 
                  onChange={(e) => editingWatch ? setEditingWatch({...editingWatch, brand: e.target.value}) : setNewWatch({...newWatch, brand: e.target.value})} 
                  required />
              </div>
              <div>
                <label style={labelStyle}>Price ($)</label>
                <input type="number" className="glass" style={inputStyle} 
                  value={editingWatch ? editingWatch.price : newWatch.price} 
                  onChange={(e) => editingWatch ? setEditingWatch({...editingWatch, price: e.target.value}) : setNewWatch({...newWatch, price: e.target.value})} 
                  required />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Description</label>
                <textarea className="glass" style={{ ...inputStyle, minHeight: '120px' }} 
                  value={editingWatch ? editingWatch.description : newWatch.description} 
                  onChange={(e) => editingWatch ? setEditingWatch({...editingWatch, description: e.target.value}) : setNewWatch({...newWatch, description: e.target.value})} 
                  required></textarea>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Image URL</label>
                <input type="text" className="glass" style={inputStyle} 
                  value={editingWatch ? editingWatch.imageUrl : newWatch.imageUrl} 
                  onChange={(e) => editingWatch ? setEditingWatch({...editingWatch, imageUrl: e.target.value}) : setNewWatch({...newWatch, imageUrl: e.target.value})} 
                  required />
              </div>
              <div style={{ display: 'flex', gap: '20px', gridColumn: 'span 2', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Timepiece</button>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setActiveTab('products')}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Helper Components & Styles ---

const SidebarItem = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: '15px', width: '100%',
    padding: '14px 20px', borderRadius: '12px', border: 'none',
    background: active ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
    color: active ? 'var(--accent)' : '#888',
    cursor: 'pointer', textAlign: 'left', transition: '0.3s',
    fontWeight: active ? 'bold' : 'normal'
  }}>
    {icon} <span>{label}</span>
  </button>
);

const StatCard = ({ label, value, color = 'white' }) => (
  <div className="glass" style={{ padding: '25px', borderLeft: color !== 'white' ? `4px solid ${color}` : 'none' }}>
    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
    <h2 style={{ color, fontSize: '1.8rem', margin: 0 }}>{value}</h2>
  </div>
);

const tableHeadStyle = { padding: '18px 20px', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' };
const tableCellStyle = { padding: '18px 20px', fontSize: '0.95rem' };
const badgeStyle = { color: 'var(--accent)', fontSize: '0.75rem', background: 'rgba(212, 175, 55, 0.05)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' };
const inputStyle = { width: '100%', padding: '15px', color: 'white', border: '1px solid #222', borderRadius: '10px' };
const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: '#888' };

export default AdminPanel;
