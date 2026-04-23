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
    Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        users: 0,
        destinations: 0,
        bookings: 0,
        inquiries: 0
    });
    const [usersList, setUsersList] = useState([]);
    const [activityLogs, setActivityLogs] = useState([]);
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
                const [statsRes, usersRes, logsRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/v1/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:8000/api/v1/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:8000/api/v1/admin/activity_logs', { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setStats(statsRes.data);
                setUsersList(usersRes.data);
                setActivityLogs(logsRes.data);
            } catch (err) {
                console.error('Failed to fetch admin data', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

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
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-orange-400 uppercase">Admin Panel</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
                    <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-slate-600 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative text-slate-600 hover:text-orange-500 transition-colors">
                            <Bell size={22} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">3</span>
                        </button>
                        <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-900">Admin User</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Super Admin</p>
                            </div>
                            <img
                                src="https://ui-avatars.com/api/?name=Admin+User&background=f97316&color=fff"
                                alt="Admin Avatar"
                                className="w-10 h-10 rounded-full border-2 border-orange-500/20"
                            />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto"
                    >
                        {/* Page Title */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 uppercase">{activeTab} Overview</h2>
                                <p className="text-slate-500 mt-1">Management and analytics for Sunshine Travels.</p>
                            </div>
                            <button className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                                <Plus size={20} />
                                <span className="font-medium">Add New Record</span>
                            </button>
                        </div>

                        {/* Stats Grid */}
                        {activeTab === 'dashboard' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                {[
                                    { label: 'Total Users', value: stats.users, icon: Users, color: 'blue' },
                                    { label: 'Destinations', value: stats.destinations, icon: BookOpen, color: 'orange' },
                                    { label: 'Total Bookings', value: stats.bookings, icon: CheckSquare, color: 'green' },
                                    { label: 'Inquiries', value: stats.inquiries, icon: FileText, color: 'purple' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                                <stat.icon size={24} />
                                            </div>
                                            <div className="flex items-center text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                                                <TrendingUp size={12} className="mr-1" />
                                                +5%
                                            </div>
                                        </div>
                                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-slate-900 mt-1">{loading ? '...' : stat.value.toLocaleString()}</h3>
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
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
