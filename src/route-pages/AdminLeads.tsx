"use client";

import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "@/compat/react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { requireAdminSession } from "@/lib/admin-auth";
import { Eye, Trash2, LogOut, Users, X, RefreshCw, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";
import { leadTypeLabels, type LeadType } from "@/lib/leads";

interface Lead {
  id: string;
  company_name: string | null;
  full_name: string;
  email: string;
  lead_type: LeadType;
  message?: string | null;
  service?: string | null;
  phone: string | null;
  team_size: string | null;
  preferred_location: string | null;
  nature_of_business: string | null;
  planned_timeline: string | null;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<LeadType>("consultation");
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Unable to load leads",
        description: error.message,
        variant: "destructive",
      });
    }

    setLeads((data as Lead[]) || []);
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    const checkAuth = async () => {
      const authResult = await requireAdminSession();
      if (!authResult.session || !authResult.isAdmin) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      fetchLeads();
    };
    checkAuth();
  }, [fetchLeads, navigate]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
      setDeletingId(null);
      return;
    }

    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLead?.id === id) setSelectedLead(null);
    setDeletingId(null);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const resolveLeadType = (lead: Lead): LeadType =>
    lead.lead_type || (lead.service === "certification" ? "certification" : "consultation");
  const resolveCompanyName = (lead: Lead) =>
    lead.company_name || lead.message?.match(/^Company Name:\s*(.+)$/)?.[1] || null;
  const filteredLeads = leads.filter((lead) => resolveLeadType(lead) === activeType);

  return (
    <>
      <SEOHead title="Leads | EverySpaces Admin" description="Admin leads" keywords="admin" noIndex />
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-30 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <Link to="/admin/dashboard" className="p-1.5 rounded-full hover:bg-primary-foreground/10 transition-colors"><ArrowLeft size={16} /></Link>
            <Users size={20} />
            <h1 className="text-lg font-serif">Leads</h1>
            <span className="bg-primary-foreground/20 text-xs px-2 py-0.5 rounded-full">{leads.length}</span>
          </div>
          <button onClick={fetchLeads} className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"><RefreshCw size={16} /></button>
        </header>

        <div className="p-4 max-w-2xl mx-auto">
          <div className="mb-4 inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
            {(["consultation", "certification"] as LeadType[]).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeType === type ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {leadTypeLabels[type]}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><span className="h-8 w-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Users size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-serif">No {leadTypeLabels[activeType].toLowerCase()} leads yet</p>
              <p className="text-sm mt-1">Form submissions will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead, i) => (
                <motion.div key={lead.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-card border border-border rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground text-sm truncate">{lead.full_name}</h3>
                      {resolveCompanyName(lead) ? <p className="text-xs text-foreground/70 truncate">{resolveCompanyName(lead)}</p> : null}
                      <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-1">{formatDate(lead.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => setSelectedLead(lead)} className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-colors"><Eye size={15} /></button>
                      <button onClick={() => handleDelete(lead.id)} disabled={deletingId === lead.id} className="p-2 rounded-full bg-destructive/5 hover:bg-destructive/10 text-destructive transition-colors disabled:opacity-40">
                        {deletingId === lead.id ? <span className="h-3.5 w-3.5 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin block" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    <span className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full">{leadTypeLabels[resolveLeadType(lead)]}</span>
                    {lead.team_size && <span className="text-[10px] bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded-full">{lead.team_size} people</span>}
                    {lead.preferred_location && <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">{lead.preferred_location}</span>}
                    {lead.planned_timeline && <span className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full">{lead.planned_timeline}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
              <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="bg-card w-full max-w-sm rounded-2xl shadow-2xl border border-border overflow-hidden">
                <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center justify-between">
                  <h2 className="font-serif text-base">Lead Details</h2>
                  <button onClick={() => setSelectedLead(null)} className="p-1 rounded-full hover:bg-primary-foreground/10 transition-colors"><X size={18} /></button>
                </div>
                <div className="p-5 space-y-3 max-h-[65vh] overflow-y-auto">
                  <DetailRow label="Lead Type" value={leadTypeLabels[resolveLeadType(selectedLead)]} />
                  <DetailRow label="Company Name" value={resolveCompanyName(selectedLead)} />
                  <DetailRow label="Full Name" value={selectedLead.full_name} />
                  <DetailRow label="Email" value={selectedLead.email} />
                  <DetailRow label="Phone" value={selectedLead.phone} />
                  <DetailRow label="Team Size" value={selectedLead.team_size} />
                  <DetailRow label="Location" value={selectedLead.preferred_location} />
                  <DetailRow label="Business" value={selectedLead.nature_of_business} />
                  <DetailRow label="Timeline" value={selectedLead.planned_timeline} />
                  <DetailRow label="Submitted" value={formatDate(selectedLead.created_at)} />
                </div>
                <div className="px-5 pb-5">
                  <button onClick={() => handleDelete(selectedLead.id)} className="w-full py-2.5 rounded-full bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2">
                    <Trash2 size={14} /> Delete Lead
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string | null }) => (
  <div className="flex justify-between items-start gap-3 py-1.5 border-b border-border/50 last:border-0">
    <span className="text-xs text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm text-foreground text-right font-medium">{value || "—"}</span>
  </div>
);

export default AdminLeads;

