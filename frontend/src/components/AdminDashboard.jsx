import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    BookOpen,
    FileText,
    CheckSquare,
    LayoutDashboard,
    Settings,
    LogOut,
    Search,
    Bell,
    ChevronRight,
    TrendingUp,
    MoreVertical,
    Plus,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        users: 0,
        destinations: 0,
        bookings: 0,
        inquiries: 0
    });
    const [usersList, setUsersList] = useState([]);
    const [activityLogs, setActivityLogs] = useState([]);
    const [inquiriesList, setInquiriesList] = useState([]);
    const [testimonialsList, setTestimonialsList] = useState([]);
    const [destinationsList, setDestinationsList] = useState([]);
    const [showAddDestModal, setShowAddDestModal] = useState(false);
    const [newDest, setNewDest] = useState({ name: '', description: '', location: '', price: '', rating: '', image_url: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!token || !user || !user.is_superuser) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const [statsRes, usersRes, logsRes, inquiriesRes, testimonialsRes, destinationsRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/v1/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:8000/api/v1/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:8000/api/v1/admin/activity_logs', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:8000/api/v1/admin/inquiries', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:8000/api/v1/admin/testimonials', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:8000/api/v1/admin/destinations', { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setStats(statsRes.data);
                setUsersList(usersRes.data);
                setActivityLogs(logsRes.data);
                setInquiriesList(inquiriesRes.data);
                setTestimonialsList(testimonialsRes.data);
                setDestinationsList(destinationsRes.data);
            } catch (err) {
                console.error('Failed to fetch admin data', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleAddDestination = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:8000/api/v1/admin/destinations', {
                ...newDest,
                price: parseFloat(newDest.price) || 0,
                rating: parseFloat(newDest.rating) || 0
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDestinationsList([res.data, ...destinationsList]);
            setShowAddDestModal(false);
            setNewDest({ name: '', description: '', location: '', price: '', rating: '', image_url: '' });
            setStats({ ...stats, destinations: stats.destinations + 1 });
        } catch (err) {
            console.error("Failed to add destination", err);
            alert("Error adding destination.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'destinations', label: 'Destinations', icon: BookOpen },
        { id: 'bookings', label: 'Bookings', icon: CheckSquare },
        { id: 'testimonials', label: 'Testimonials', icon: Bell },
        { id: 'inquiries', label: 'Inquiries', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#F4F7FA] overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0B1120] text-white flex flex-col z-20 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-64 bg-orange-500/10 blur-[100px] pointer-events-none"></div>
                
                <div className="p-8 pb-4 relative z-10">
                    <div className="mb-6 w-full flex items-center justify-center py-2 bg-white/95 rounded-2xl shadow-lg overflow-hidden">
                        <img src={logo} alt="Sunshine Travels Logo" className="w-[92%] h-auto object-contain" />
                    </div>
                    <h1 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 pl-4">Menu</h1>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-4 relative z-10">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${activeTab === item.id
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/25'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white transition-colors'} />
                            <span className="font-semibold tracking-wide text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-6 relative z-10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-4 text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all w-full px-5 py-3.5 rounded-2xl"
                    >
                        <LogOut size={20} />
                        <span className="font-semibold tracking-wide text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-[88px] bg-white/80 backdrop-blur-xl border-b border-white/50 flex items-center justify-between px-10 z-10 sticky top-0 shadow-sm">
                    {/* Header Title */}
                    <div>
                        <h2 className="text-xl font-black text-[#0B1120] uppercase tracking-widest">Admin Portal</h2>
                        <p className="text-xs text-orange-500 font-bold uppercase tracking-[0.2em] mt-1">A reason to smile</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-bold text-[#0B1120] tracking-wide">
                                    {user?.name || (user?.email ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1) : 'Admin User')}
                                </p>
                                <p className="text-[10px] text-orange-500 uppercase tracking-widest font-black">
                                    {user?.is_superuser ? 'Super Admin' : 'Admin'}
                                </p>
                            </div>
                            <div className="relative cursor-pointer group">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || (user?.email ? user.email.split('@')[0] : 'Admin User'))}&background=f97316&color=fff&bold=true`}
                                    alt="Admin Avatar"
                                    className="w-12 h-12 rounded-full border-[3px] border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto"
                    >
                        {/* Page Title */}
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-black text-[#0B1120] tracking-tight capitalize">{activeTab}</h2>
                                <p className="text-slate-500 mt-1.5 text-sm font-medium">Manage and monitor your platform's performance.</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        {activeTab === 'dashboard' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {[
                                    { label: 'Total Users', value: stats.users, icon: Users, color: 'blue' },
                                    { label: 'Destinations', value: stats.destinations, icon: BookOpen, color: 'orange' },
                                    { label: 'Inquiries', value: stats.inquiries, icon: FileText, color: 'purple' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, ease: "easeOut" }}
                                        className="bg-white p-7 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden"
                                    >
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
                                        <div className="flex items-center justify-between mb-6 relative">
                                            <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                                                <stat.icon size={24} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex items-center text-green-600 text-xs font-bold bg-green-50/80 px-3 py-1.5 rounded-full border border-green-100">
                                                <TrendingUp size={14} className="mr-1.5" />
                                                +12%
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <p className="text-slate-500 text-sm font-bold tracking-wide uppercase mb-1">{stat.label}</p>
                                            <h3 className="text-4xl font-black text-[#0B1120] tracking-tight">{loading ? '...' : stat.value.toLocaleString()}</h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'dashboard' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-slate-900">Recent Activity</h3>
                                    <button className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center">
                                        View All <ChevronRight size={16} className="ml-1" />
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                            <tr>
                                                <th className="px-8 py-5">User</th>
                                                <th className="px-8 py-5">Action</th>
                                                <th className="px-8 py-5">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {activityLogs.slice(0, 10).map((log) => (
                                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                                                                {log.user_email[0].toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-slate-900">{log.user_email.split('@')[0]}</p>
                                                                <p className="text-xs text-slate-500">{log.user_email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-600 text-sm">{log.action}</td>
                                                    <td className="px-8 py-5 text-slate-500 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                            {activityLogs.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="px-8 py-8 text-center text-slate-500">No recent activity.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-slate-900">Registered Users</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                            <tr>
                                                <th className="px-8 py-5">Name</th>
                                                <th className="px-8 py-5">Email</th>
                                                <th className="px-8 py-5">Role</th>
                                                <th className="px-8 py-5">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {usersList.map((user) => (
                                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-8 py-5 font-semibold text-slate-900">{user.name || 'N/A'}</td>
                                                    <td className="px-8 py-5 text-slate-600 text-sm">{user.email}</td>
                                                    <td className="px-8 py-5">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.is_superuser ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                                                            {user.is_superuser ? 'Admin' : 'User'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-500 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                            {usersList.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="px-8 py-8 text-center text-slate-500">No users found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'inquiries' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-slate-900">Contact Inquiries</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                            <tr>
                                                <th className="px-8 py-5">Name</th>
                                                <th className="px-8 py-5">Contact Details</th>
                                                <th className="px-8 py-5">Message</th>
                                                <th className="px-8 py-5">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {inquiriesList.map((inquiry) => (
                                                <tr key={inquiry.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-8 py-5 font-semibold text-slate-900">{inquiry.name}</td>
                                                    <td className="px-8 py-5">
                                                        <p className="text-slate-600 text-sm">{inquiry.email}</p>
                                                        <p className="text-slate-500 text-xs mt-1">{inquiry.phone}</p>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-600 text-sm max-w-xs truncate" title={inquiry.message}>
                                                        {inquiry.message}
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-500 text-sm whitespace-nowrap">
                                                        {new Date(inquiry.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                            {inquiriesList.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="px-8 py-8 text-center text-slate-500">No inquiries found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'testimonials' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-slate-900">User Testimonials</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                            <tr>
                                                <th className="px-8 py-5">Author</th>
                                                <th className="px-8 py-5">Role</th>
                                                <th className="px-8 py-5">Content</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {testimonialsList.map((testimonial) => (
                                                <tr key={testimonial.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center space-x-3">
                                                            <img
                                                                src={testimonial.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=f97316&color=fff`}
                                                                alt={testimonial.name}
                                                                className="w-10 h-10 rounded-full border border-slate-200"
                                                            />
                                                            <span className="font-semibold text-slate-900">{testimonial.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-600 text-sm">{testimonial.role}</td>
                                                    <td className="px-8 py-5 text-slate-600 text-sm max-w-md truncate" title={testimonial.content}>
                                                        "{testimonial.content}"
                                                    </td>
                                                </tr>
                                            ))}
                                            {testimonialsList.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="px-8 py-8 text-center text-slate-500">No testimonials found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'destinations' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-slate-900">Manage Destinations</h3>
                                    <button
                                        onClick={() => setShowAddDestModal(true)}
                                        className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20"
                                    >
                                        <Plus size={18} />
                                        <span className="font-medium text-sm">Add Destination</span>
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                            <tr>
                                                <th className="px-8 py-5">Destination</th>
                                                <th className="px-8 py-5">Location</th>
                                                <th className="px-8 py-5">Price</th>
                                                <th className="px-8 py-5">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {destinationsList.map((dest) => (
                                                <tr key={dest.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                                                                <img
                                                                    src={dest.image_url || 'https://via.placeholder.com/150'}
                                                                    alt={dest.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold text-slate-900 block">{dest.name}</span>
                                                                <span className="text-xs text-slate-500 max-w-[200px] truncate block">{dest.description}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-600 text-sm">{dest.location}</td>
                                                    <td className="px-8 py-5 font-semibold text-slate-900">${dest.price}</td>
                                                    <td className="px-8 py-5 text-slate-600 text-sm flex items-center mt-3">
                                                        ⭐ {dest.rating}
                                                    </td>
                                                </tr>
                                            ))}
                                            {destinationsList.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="px-8 py-8 text-center text-slate-500">No destinations found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            {/* Add Destination Modal */}
            {showAddDestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl my-8 relative overflow-hidden"
                    >
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-slate-900">Add New Destination</h3>
                            <button
                                onClick={() => setShowAddDestModal(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8">
                            <form onSubmit={handleAddDestination} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Destination Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={newDest.name}
                                            onChange={e => setNewDest({ ...newDest, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50 focus:bg-white"
                                            placeholder="e.g. Bali, Indonesia"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Location</label>
                                        <input
                                            required
                                            type="text"
                                            value={newDest.location}
                                            onChange={e => setNewDest({ ...newDest, location: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50 focus:bg-white"
                                            placeholder="e.g. Southeast Asia"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Description</label>
                                    <textarea
                                        required
                                        rows="3"
                                        value={newDest.description}
                                        onChange={e => setNewDest({ ...newDest, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50 focus:bg-white resize-none"
                                        placeholder="Brief description of the destination..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Image URL</label>
                                    <input
                                        required
                                        type="url"
                                        value={newDest.image_url}
                                        onChange={e => setNewDest({ ...newDest, image_url: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50 focus:bg-white"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Price ($)</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            value={newDest.price}
                                            onChange={e => setNewDest({ ...newDest, price: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50 focus:bg-white"
                                            placeholder="e.g. 1299.99"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Rating (0-5)</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            value={newDest.rating}
                                            onChange={e => setNewDest({ ...newDest, rating: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50 focus:bg-white"
                                            placeholder="e.g. 4.8"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end space-x-4 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddDestModal(false)}
                                        className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 rounded-xl font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
                                    >
                                        {isSubmitting ? 'Adding...' : 'Add Destination'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
