import React, { useEffect, useState } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { Lead, LeadStatus, OperationType } from '../types';
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  MoreVertical, 
  Trash2, 
  ExternalLink,
  MessageSquare,
  Clock,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function SaaSAdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    // Check for leadId in URL
    const params = new URLSearchParams(window.location.search);
    const leadId = params.get('leadId');
    if (leadId) {
      setHighlightedId(leadId);
      // Remove the parameter from URL without refreshing
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    const q = query(
      collection(db, 'leads'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(leadData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'leads');
    });

    return unsubscribe;
  }, []);

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${id}`);
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm('Delete this lead record?')) return;
    try {
      await deleteDoc(doc(db, 'leads', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `leads/${id}`);
    }
  };

  const filteredLeads = leads.filter(l => filter === 'all' || l.status === filter);

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-400">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full mb-4" />
          <div className="h-4 bg-gray-100 w-32 rounded mb-2" />
          <div className="h-3 bg-gray-100 w-24 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-gray-900 tracking-tight">Lead Portal</h1>
          <p className="text-gray-500 font-medium">Manage demo requests and pilot conversions</p>
        </div>

        <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          {(['all', ...Object.values(LeadStatus)] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filter === s ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode='popLayout'>
          {filteredLeads.map(lead => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={lead.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center shadow-sm hover:shadow-md transition-all ${
                highlightedId === lead.id 
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/10' 
                  : 'border-gray-100'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-display font-bold text-gray-900">{lead.schoolName}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(lead.status)}`}>
                    {lead.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5 font-medium"><Users className="w-4 h-4" /> {lead.contactName}</span>
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {lead.email}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {lead.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <select 
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 flex-1 lg:flex-none"
                >
                  {Object.values(LeadStatus).map(s => (
                    <option key={s} value={s}>{s.replace('-', ' ')}</option>
                  ))}
                </select>
                
                <a 
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>

                <button 
                  onClick={() => deleteLead(lead.id)}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredLeads.length === 0 && (
          <div className="text-center py-32 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
            <h3 className="text-xl font-bold text-gray-400">No leads found in this category</h3>
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusColor(status: LeadStatus) {
  switch (status) {
    case LeadStatus.NEW: return 'bg-blue-50 text-blue-600 border border-blue-100';
    case LeadStatus.CONTACTED: return 'bg-amber-50 text-amber-600 border border-amber-100';
    case LeadStatus.DEMO_SCHEDULED: return 'bg-purple-50 text-purple-600 border border-purple-100';
    case LeadStatus.PILOT_STARTED: return 'bg-green-50 text-green-600 border border-green-100';
    case LeadStatus.LOST: return 'bg-gray-100 text-gray-500 border border-gray-200';
    default: return 'bg-gray-50 text-gray-500';
  }
}
