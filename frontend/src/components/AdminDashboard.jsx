import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    BookOpen,
    FileText,
    LayoutDashboard,
    LogOut,
    Bell,
    Plus,
    X,
    Trash2,
    Edit2,
    Image as ImageIcon,
    Quote
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import logo from '../assets/logo.png';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

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
    const [editDest, setEditDest] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Notifications State
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [toast, setToast] = useState(null);
    const lastLogId = useRef(null);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const [statsRes, usersRes, logsRes, inquiriesRes, testimonialsRes, destinationsRes] = await Promise.all([
                api.get('/api/v1/admin/stats'),
                api.get('/api/v1/admin/users'),
                api.get('/api/v1/admin/activity_logs'),
                api.get('/api/v1/admin/inquiries'),
                api.get('/api/v1/admin/testimonials'),
                api.get('/api/v1/admin/destinations')
            ]);

            setStats(statsRes.data);
            setUsersList(usersRes.data);

            const logs = logsRes.data;
            const feedbackLogs = logs.filter(log => log.action.toLowerCase().includes("feedback submitted"));
            const pendingTestimonials = testimonialsRes.data.filter(t => !t.is_approved);

            if (lastLogId.current === null) {
                // First load: Show last 5 feedback submissions as "recent"
                setNotifications(feedbackLogs.slice(0, 5));
                // Show blue dot if there are any unapproved testimonials on load
                if (pendingTestimonials.length > 0) {
                    setUnreadCount(pendingTestimonials.length);
                }
                if (logs.length > 0) {
                    lastLogId.current = Math.max(...logs.map(l => l.id));
                }
            } else {
                // Subsequent loads: Check for truly new feedback
                const newFeedbackLogs = feedbackLogs.filter(log => log.id > lastLogId.current);

                if (newFeedbackLogs.length > 0) {
                    setNotifications(prev => [...newFeedbackLogs, ...prev]);
                    setUnreadCount(prev => prev + newFeedbackLogs.length);
                    setToast({
                        title: "New Feedback!",
                        message: newFeedbackLogs[0].action,
                        count: newFeedbackLogs.length
                    });
                    setTimeout(() => setToast(null), 5000);
                    lastLogId.current = Math.max(...logs.map(l => l.id));
                }
            }

            setActivityLogs(logs);
            setInquiriesList(inquiriesRes.data);
            setTestimonialsList(testimonialsRes.data);
            setDestinationsList(destinationsRes.data);
        } catch (err) {
            console.error('Failed to fetch admin data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!token || !user || !user.is_superuser) {
            navigate('/login');
            return;
        }

        fetchData();
        const interval = setInterval(fetchData, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, [navigate]);

    const handleAddDestination = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await api.post('/api/v1/admin/destinations', {
                ...newDest,
                price: parseFloat(newDest.price) || 0,
                rating: parseFloat(newDest.rating) || 0
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

    const handleUpdateDestination = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await api.put(`/api/v1/admin/destinations/${editDest.id}`, {
                ...editDest,
                price: parseFloat(editDest.price) || 0,
                rating: parseFloat(editDest.rating) || 0
            });
            setDestinationsList(destinationsList.map(d => d.id === editDest.id ? res.data : d));
            setEditDest(null);
        } catch (err) {
            console.error("Failed to update destination", err);
            alert(err.response?.data?.detail || "Error updating destination.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await api.put(`/api/v1/admin/users/${editUser.id}`, editUser);
            setUsersList(usersList.map(u => u.id === editUser.id ? res.data : u));
            setEditUser(null);
        } catch (err) {
            console.error("Failed to update user", err);
            alert(err.response?.data?.detail || "Error updating user.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageUpload = (e, isEdit = false) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (isEdit) {
                    setEditDest({ ...editDest, image_url: reader.result });
                } else {
                    setNewDest({ ...newDest, image_url: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteDestination = async (id) => {
        if (!window.confirm("Are you sure you want to delete this destination?")) return;
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/api/v1/admin/destinations/${id}`);
            setDestinationsList(destinationsList.filter(dest => dest.id !== id));
            setStats(prev => ({ ...prev, destinations: prev.destinations - 1 }));
        } catch (err) {
            console.error("Failed to delete destination", err);
            const errorMsg = err.response?.data?.detail || "Error deleting destination.";
            alert(errorMsg);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/api/v1/admin/users/${id}`);
            setUsersList(usersList.filter(user => user.id !== id));
            setStats(prev => ({ ...prev, users: prev.users - 1 }));
        } catch (err) {
            console.error("Failed to delete user", err);
            const errorMsg = err.response?.data?.detail || "Error deleting user.";
            alert(errorMsg);
        }
    };

    const handleDeleteTestimonial = async (id) => {
        if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/api/v1/admin/testimonials/${id}`);
            setTestimonialsList(testimonialsList.filter(t => t.id !== id));
        } catch (err) {
            console.error("Failed to delete testimonial", err);
            const errorMsg = err.response?.data?.detail || "Error deleting testimonial.";
            alert(errorMsg);
        }
    };

    const handleApproveTestimonial = async (id) => {
        if (!id) {
            console.error("Testimonial ID is undefined");
            alert("Error: Testimonial ID is missing. Please refresh the page.");
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await api.put(`/api/v1/admin/testimonials/${id}/approve`, {});
            // Ensure we use the updated testimonial from the response, or fallback to the current one with is_approved=true
            const updatedTestimonial = res.data.id ? res.data : { ...testimonialsList.find(t => t.id === id), is_approved: true };
            setTestimonialsList(prev => prev.map(t => t.id === id ? updatedTestimonial : t));

            // Log locally for debug
            console.log("Approved testimonial:", id);
        } catch (err) {
            console.error("Failed to approve testimonial", err);
            const errorMsg = err.response?.data?.detail || "Error approving testimonial.";
            alert(errorMsg);
        }
    };

    const handleDeleteInquiry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/api/v1/admin/inquiries/${id}`);
            setInquiriesList(inquiriesList.filter(i => i.id !== id));
            setStats(prev => ({ ...prev, inquiries: prev.inquiries - 1 }));
        } catch (err) {
            console.error("Failed to delete inquiry", err);
            const errorMsg = err.response?.data?.detail || "Error deleting inquiry.";
            alert(errorMsg);
        }
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'destinations', label: 'Destinations', icon: BookOpen },
        { id: 'testimonials', label: 'Testimonials', icon: Quote },
        { id: 'inquiries', label: 'Inquiries', icon: FileText },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#F4F7FA] overflow-hidden font-sans text-slate-900">
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
                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setUnreadCount(0);
                                }}
                                className="p-3 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-2xl transition-all relative"
                            >
                                <Bell size={22} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></span>
                                )}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                                    >
                                        <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                            <h4 className="font-bold text-slate-900">Notifications</h4>
                                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-100 px-2 py-1 rounded-md">Real-time</span>
                                        </div>
                                        <div className="max-h-[350px] overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((n, idx) => (
                                                    <div key={idx} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-start space-x-3">
                                                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                                                            <Bell size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900">{n.user_email}</p>
                                                            <p className="text-xs text-slate-500 mt-1">{n.action}</p>
                                                            <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold">{new Date(n.timestamp).toLocaleTimeString()}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-10 text-center">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                                        <Bell size={32} />
                                                    </div>
                                                    <p className="text-slate-400 text-sm font-medium">No new notifications</p>
                                                </div>
                                            )}
                                        </div>
                                        {notifications.length > 0 && (
                                            <button
                                                onClick={() => setNotifications([])}
                                                className="w-full py-4 text-xs font-bold text-slate-400 hover:text-orange-500 hover:bg-slate-50 transition-all uppercase tracking-widest border-t border-slate-50"
                                            >
                                                Clear all
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

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
                <div className="flex-1 overflow-y-auto p-10 bg-[#F8FAFC]">
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

                        {/* Dashboard View */}
                        {activeTab === 'dashboard' && (
                            <>
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
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
                                        >
                                            <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 mb-6 w-fit`}>
                                                <stat.icon size={24} />
                                            </div>
                                            <p className="text-slate-500 text-sm font-bold tracking-wide uppercase mb-1">{stat.label}</p>
                                            <h3 className="text-4xl font-black text-[#0B1120] tracking-tight">{loading ? '...' : stat.value}</h3>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-slate-50/50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
                                                <tr>
                                                    <th className="px-8 py-5">User</th>
                                                    <th className="px-8 py-5">Action</th>
                                                    <th className="px-8 py-5 text-right">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {activityLogs.slice(0, 10).map((log) => (
                                                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-8 py-5">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400">
                                                                    {log.user_email[0].toUpperCase()}
                                                                </div>
                                                                <span className="font-bold text-slate-900">{log.user_email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-slate-600 font-medium">{log.action}</td>
                                                        <td className="px-8 py-5 text-slate-400 text-xs text-right font-bold uppercase tracking-wider">{new Date(log.timestamp).toLocaleTimeString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Users Table */}
                        {activeTab === 'users' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-200">
                                            <tr>
                                                <th className="px-8 py-6">User Details</th>
                                                <th className="px-8 py-6">Role</th>
                                                <th className="px-8 py-6">Joined</th>
                                                <th className="px-8 py-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {[...usersList].sort((a, b) => (b.is_superuser ? 1 : 0) - (a.is_superuser ? 1 : 0)).map((user) => (
                                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center font-black text-orange-500 text-xl">
                                                                {user.name ? user.name[0] : (user.email ? user.email[0].toUpperCase() : '?')}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-900">{user.name || 'N/A'}</p>
                                                                <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${user.is_superuser ? 'bg-orange-100 text-orange-600 border border-orange-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                                            {user.is_superuser ? 'Admin' : 'User'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-400 text-sm font-bold">{new Date(user.created_at).toLocaleDateString()}</td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button
                                                                onClick={() => setEditUser(user)}
                                                                className="p-3 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-2xl transition-all"
                                                            >
                                                                <Edit2 size={20} />
                                                            </button>
                                                            {user.id !== (JSON.parse(localStorage.getItem('user'))?.id) && (
                                                                <button
                                                                    onClick={() => handleDeleteUser(user.id)}
                                                                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                                >
                                                                    <Trash2 size={20} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Testimonials Table */}
                        {activeTab === 'testimonials' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-200">
                                            <tr>
                                                <th className="px-8 py-6">Author</th>
                                                <th className="px-8 py-6">Content</th>
                                                <th className="px-8 py-6">Status</th>
                                                <th className="px-8 py-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {testimonialsList.map((t) => (
                                                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center space-x-4">
                                                            <img src={t.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=f97316&color=fff`} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" alt="" />
                                                            <div>
                                                                <p className="font-bold text-slate-900">{t.name}</p>
                                                                <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-600 font-medium max-w-lg">"{t.content}"</td>
                                                    <td className="px-8 py-5">
                                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${t.is_approved ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-orange-100 text-orange-600 border border-orange-200'}`}>
                                                            {t.is_approved ? 'Approved' : 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5 text-right space-x-2 flex justify-end">
                                                        {!t.is_approved && (
                                                            <button
                                                                onClick={() => handleApproveTestimonial(t.id)}
                                                                className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-xl transition-all font-bold text-xs uppercase tracking-wider"
                                                            >
                                                                Approve
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteTestimonial(t.id)}
                                                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Destinations Table */}
                        {activeTab === 'destinations' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900">All Destinations</h3>
                                    <button
                                        onClick={() => setShowAddDestModal(true)}
                                        className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30"
                                    >
                                        <Plus size={20} strokeWidth={3} />
                                        <span className="font-black text-sm uppercase tracking-widest">Add New</span>
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-200">
                                            <tr>
                                                <th className="px-8 py-6">Destination</th>
                                                <th className="px-8 py-6">Location</th>
                                                <th className="px-8 py-6">Price</th>
                                                <th className="px-8 py-6">Rating</th>
                                                <th className="px-8 py-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {destinationsList.map((dest) => (
                                                <tr key={dest.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center space-x-4">
                                                            <img src={dest.image_url} className="w-16 h-12 rounded-xl object-cover border-2 border-white shadow-sm" alt="" />
                                                            <div>
                                                                <p className="font-bold text-slate-900">{dest.name}</p>
                                                                <p className="text-xs text-slate-500 font-medium truncate max-w-[200px]">{dest.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-600 font-bold text-sm uppercase tracking-wide">{dest.location}</td>
                                                    <td className="px-8 py-5 font-black text-[#0B1120]">₹{dest.price}</td>
                                                    <td className="px-8 py-5 text-orange-500 font-black text-sm">⭐ {dest.rating}</td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button
                                                                onClick={() => setEditDest(dest)}
                                                                className="p-3 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-2xl transition-all"
                                                            >
                                                                <Edit2 size={20} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteDestination(dest.id)}
                                                                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {/* Inquiries Table */}
                        {activeTab === 'inquiries' && (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-200">
                                            <tr>
                                                <th className="px-8 py-6">Sender</th>
                                                <th className="px-8 py-6">Contact Details</th>
                                                <th className="px-8 py-6">Message</th>
                                                <th className="px-8 py-6">Date</th>
                                                <th className="px-8 py-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {inquiriesList.map((inquiry) => (
                                                <tr key={inquiry.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center font-black">
                                                                {inquiry.name[0].toUpperCase()}
                                                            </div>
                                                            <span className="font-bold text-slate-900">{inquiry.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="text-xs font-bold text-slate-900">{inquiry.email}</p>
                                                        <p className="text-[10px] text-slate-400 font-medium">{inquiry.phone || 'No phone'}</p>
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
                                                        {inquiry.message}
                                                    </td>
                                                    <td className="px-8 py-5 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                        {new Date(inquiry.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <button
                                                            onClick={() => handleDeleteInquiry(inquiry.id)}
                                                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {inquiriesList.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-medium">No inquiries found.</td>
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
            <AnimatePresence>
                {showAddDestModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl my-8 relative overflow-hidden"
                        >
                            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <h3 className="text-xl font-black text-[#0B1120] tracking-tight">New Destination</h3>
                                <button onClick={() => setShowAddDestModal(false)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
                                    <X size={20} strokeWidth={3} />
                                </button>
                            </div>

                            <form onSubmit={handleAddDestination} className="p-8 space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
                                        <input required type="text" value={newDest.name} onChange={e => setNewDest({ ...newDest, name: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" placeholder="e.g. Maldives" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                        <input required type="text" value={newDest.location} onChange={e => setNewDest({ ...newDest, location: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" placeholder="e.g. Indian Ocean" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                    <textarea required rows="2" value={newDest.description} onChange={e => setNewDest({ ...newDest, description: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm resize-none" placeholder="Describe this paradise..." />
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                                        <input required type="number" value={newDest.price} onChange={e => setNewDest({ ...newDest, price: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-black text-sm" placeholder="e.g. 1200" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rating (0-5)</label>
                                        <input required type="number" step="0.1" min="0" max="5" value={newDest.rating} onChange={e => setNewDest({ ...newDest, rating: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-black text-sm" placeholder="e.g. 4.9" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Image</label>
                                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-400 transition-all group relative overflow-hidden">
                                        {newDest.image_url ? (
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-md">
                                                <img src={newDest.image_url} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setNewDest({ ...newDest, image_url: '' })}
                                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-20 h-20 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">
                                                <ImageIcon size={24} />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-slate-600">
                                                {newDest.image_url ? "Image selected" : "Upload photo"}
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 5MB</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/30 disabled:opacity-50 text-xs">
                                        {isSubmitting ? 'Adding...' : 'Confirm Addition'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Destination Modal */}
            <AnimatePresence>
                {editDest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl my-8 relative overflow-hidden"
                        >
                            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <h3 className="text-xl font-black text-[#0B1120] tracking-tight">Edit Destination</h3>
                                <button onClick={() => setEditDest(null)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
                                    <X size={20} strokeWidth={3} />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateDestination} className="p-8 space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
                                        <input required type="text" value={editDest.name} onChange={e => setEditDest({ ...editDest, name: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                        <input required type="text" value={editDest.location} onChange={e => setEditDest({ ...editDest, location: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                    <textarea required rows="2" value={editDest.description} onChange={e => setEditDest({ ...editDest, description: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm resize-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                                        <input required type="number" value={editDest.price} onChange={e => setEditDest({ ...editDest, price: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-black text-sm" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rating (0-5)</label>
                                        <input required type="number" step="0.1" min="0" max="5" value={editDest.rating} onChange={e => setEditDest({ ...editDest, rating: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-black text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Image</label>
                                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-400 transition-all group relative overflow-hidden">
                                        {editDest.image_url ? (
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-md">
                                                <img src={editDest.image_url} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setEditDest({ ...editDest, image_url: '' })}
                                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold"
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-20 h-20 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">
                                                <ImageIcon size={24} />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-slate-600">
                                                {editDest.image_url ? "Image selected" : "Upload photo"}
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 5MB</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, true)}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/30 disabled:opacity-50 text-xs">
                                        {isSubmitting ? 'Updating...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit User Modal */}
            <AnimatePresence>
                {editUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md my-8 relative overflow-hidden"
                        >
                            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <h3 className="text-xl font-black text-[#0B1120] tracking-tight">Edit User</h3>
                                <button onClick={() => setEditUser(null)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
                                    <X size={20} strokeWidth={3} />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateUser} className="p-8 space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input required type="text" value={editUser.name} onChange={e => setEditUser({ ...editUser, name: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input required type="email" value={editUser.email} onChange={e => setEditUser({ ...editUser, email: e.target.value })} className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role</label>
                                    <select
                                        value={editUser.is_superuser ? "true" : "false"}
                                        onChange={e => setEditUser({ ...editUser, is_superuser: e.target.value === "true" })}
                                        className="w-full px-5 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500 focus:outline-none transition-all font-bold text-sm"
                                    >
                                        <option value="false">Standard User</option>
                                        <option value="true">Administrator</option>
                                    </select>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#0B1120] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/30 disabled:opacity-50 text-xs">
                                        {isSubmitting ? 'Updating...' : 'Update User'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Notification Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, y: 0 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="fixed bottom-10 right-10 z-[100] w-80 bg-[#0B1120] text-white p-6 rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-orange-500"></div>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-orange-500 rounded-xl text-white">
                                    <Bell size={18} />
                                </div>
                                <h5 className="font-bold text-sm tracking-wide">{toast.title}</h5>
                            </div>
                            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>
                        <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">{toast.message}</p>
                        {toast.count > 1 && (
                            <p className="mt-2 text-[10px] font-black text-orange-500 uppercase tracking-widest">+ {toast.count - 1} more new alerts</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
