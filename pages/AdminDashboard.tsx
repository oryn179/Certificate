import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, Save, X, Search } from 'lucide-react';
import { db } from '../services/db';
import { Certificate, User } from '../types';

interface AdminDashboardProps {
  user: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Protect Route again roughly
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = () => {
    setCerts(db.getCertificates());
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newPassword) {
      db.addCertificate(newName, newPassword);
      setNewName('');
      setNewPassword('');
      setIsAdding(false);
      loadData();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      db.deleteCertificate(id);
      loadData();
    }
  };

  const startEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setEditName(cert.name);
    setEditPassword(cert.passwordHash);
  };

  const saveEdit = () => {
    if (editingId && editName && editPassword) {
      db.updateCertificate(editingId, editName, editPassword);
      setEditingId(null);
      loadData();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const filteredCerts = certs.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-hacker-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 font-mono text-sm mt-1">Manage TenaNet-CTF Certificates</p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 bg-neon-purple hover:bg-purple-700 text-white px-4 py-2 rounded font-bold shadow-neon-purple transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Entry
          </button>
        </div>

        {/* Add Form */}
        {isAdding && (
          <div className="mb-8 bg-gray-900 border border-neon-purple/50 p-6 rounded-lg animate-in fade-in slide-in-from-top-4">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-purple rounded-full"></span>
              New Certificate Entry
            </h3>
            <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-neon-purple outline-none"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-xs text-gray-500 mb-1">Password (from Google Form)</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-neon-purple outline-none font-mono"
                  placeholder="Secret123"
                  required
                />
              </div>
              <button type="submit" className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200">
                Save Record
              </button>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:border-hacker-red outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/50 text-gray-400 font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      {editingId === cert.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="bg-black border border-gray-600 rounded px-2 py-1 text-white w-full"
                        />
                      ) : (
                        <span className="font-medium text-white">{cert.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-300">
                      {editingId === cert.id ? (
                        <input
                          type="text"
                          value={editPassword}
                          onChange={e => setEditPassword(e.target.value)}
                          className="bg-black border border-gray-600 rounded px-2 py-1 text-white w-full"
                        />
                      ) : (
                        <span className="blur-[4px] group-hover:blur-none transition-all duration-300 bg-gray-800 px-2 py-1 rounded">
                          {cert.passwordHash}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-mono">
                      {new Date(cert.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === cert.id ? (
                          <>
                            <button onClick={saveEdit} className="p-2 text-green-400 hover:bg-green-400/10 rounded">
                              <Save className="w-4 h-4" />
                            </button>
                            <button onClick={cancelEdit} className="p-2 text-gray-400 hover:bg-gray-700 rounded">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(cert)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(cert.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCerts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-mono">
                      No certificates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;