import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, Edit, Trash2, Eye, LogOut, Building2, Tag, Sparkles, MapPin, ToggleLeft, ToggleRight, Users, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";

type Tab = "properties" | "types" | "amenities" | "locations" | "leads";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("properties");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }
      const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      if (!roleData) { await supabase.auth.signOut(); navigate("/admin/login"); return; }
      setIsAdmin(true);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><span className="h-8 w-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "properties", label: "Listings", icon: Building2 },
    { key: "leads", label: "Leads", icon: Users },
    { key: "types", label: "Types", icon: Tag },
    { key: "amenities", label: "Amenities", icon: Sparkles },
    { key: "locations", label: "Locations", icon: MapPin },
  ];

  return (
    <>
      <SEOHead title="Admin Dashboard | EverySpaces" description="Admin dashboard" keywords="admin" noIndex />
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-30 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <Building2 size={20} />
            <h1 className="text-lg font-serif">Admin</h1>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors">
            <LogOut size={16} />
          </button>
        </header>

        <div className="border-b border-border overflow-x-auto">
          <div className="max-w-5xl mx-auto flex">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-4">
          {activeTab === "properties" && <PropertiesTab />}
          {activeTab === "leads" && <LeadsTab />}
          {activeTab === "types" && <CrudTab table="property_types" label="Property Type" fields={["name", "slug"]} />}
          {activeTab === "amenities" && <CrudTab table="amenities" label="Amenity" fields={["name", "icon"]} />}
          {activeTab === "locations" && <CrudTab table="locations" label="Location" fields={["city", "area", "slug"]} />}
        </div>
      </div>
    </>
  );
};

/* =================== Properties Tab =================== */
const PropertiesTab = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  const fetchProperties = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("properties")
      .select("id, name, slug, city, area, price, status, is_featured, property_types(name), created_at")
      .order("created_at", { ascending: false });
    setProperties(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  const filtered = properties.filter((p) => {
    if (search && !`${p.name} ${p.city} ${p.area}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    return true;
  });

  const toggleStatus = async (id: string, current: string) => {
    const newStatus = current === "active" ? "draft" : "active";
    await supabase.from("properties").update({ status: newStatus }).eq("id", id);
    setProperties((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus } : p));
  };

  const deleteProperty = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await supabase.from("properties").delete().eq("id", id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-bold">Properties</h2>
        <button onClick={() => navigate("/admin/property/new")} className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:opacity-90 transition-opacity">
          <Plus size={14} /> Add Property
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search properties..." className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm appearance-none">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><span className="h-6 w-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Building2 size={40} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No properties found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.area}, {p.city} • {(p as any).property_types?.name || "—"}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.status === "active" ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground"}`}>
                    {p.status}
                  </span>
                  {p.price && <span className="text-[10px] text-accent font-medium">₹{p.price.toLocaleString()}/mo</span>}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => toggleStatus(p.id, p.status)} className="p-2 rounded-full hover:bg-muted transition-colors" title="Toggle status">
                  {p.status === "active" ? <ToggleRight size={16} className="text-accent" /> : <ToggleLeft size={16} className="text-muted-foreground" />}
                </button>
                <button onClick={() => navigate(`/admin/property/${p.id}`)} className="p-2 rounded-full hover:bg-muted transition-colors" title="Edit">
                  <Edit size={14} />
                </button>
                <Link to={`/listings/${p.slug}`} className="p-2 rounded-full hover:bg-muted transition-colors" title="View">
                  <Eye size={14} />
                </Link>
                <button onClick={() => deleteProperty(p.id)} className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

/* =================== Leads Tab =================== */
interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  team_size: string | null;
  preferred_location: string | null;
  nature_of_business: string | null;
  planned_timeline: string | null;
  created_at: string;
}

const LeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLead?.id === id) setSelectedLead(null);
    setDeletingId(null);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-serif font-bold">Leads</h2>
          <span className="bg-secondary text-foreground text-xs px-2 py-0.5 rounded-full">{leads.length}</span>
        </div>
        <button onClick={fetchLeads} className="p-2 rounded-full hover:bg-muted transition-colors"><RefreshCw size={16} /></button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><span className="h-6 w-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
      ) : leads.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Users size={40} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No leads yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead, i) => (
            <motion.div key={lead.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm truncate">{lead.full_name}</h3>
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
                {lead.team_size && <span className="text-[10px] bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded-full">{lead.team_size} people</span>}
                {lead.preferred_location && <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">{lead.preferred_location}</span>}
                {lead.planned_timeline && <span className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full">{lead.planned_timeline}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
  );
};

const DetailRow = ({ label, value }: { label: string; value: string | null }) => (
  <div className="flex justify-between items-start gap-3 py-1.5 border-b border-border/50 last:border-0">
    <span className="text-xs text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm text-foreground text-right font-medium">{value || "—"}</span>
  </div>
);

/* =================== Generic CRUD Tab =================== */
const CrudTab = ({ table, label, fields }: { table: "property_types" | "amenities" | "locations"; label: string; fields: string[] }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [table]);

  const handleSave = async () => {
    if (editingId) {
      await supabase.from(table).update(formData as any).eq("id", editingId);
    } else {
      await supabase.from(table).insert(formData as any);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({});
    fetchItems();
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    const data: Record<string, string> = {};
    fields.forEach((f) => { data[f] = item[f] || ""; });
    setFormData(data);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete this ${label.toLowerCase()}?`)) return;
    await supabase.from(table).delete().eq("id", id);
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-bold">{label}s</h2>
        <button onClick={() => { setShowForm(true); setEditingId(null); setFormData({}); }} className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:opacity-90">
          <Plus size={14} /> Add {label}
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-sm mb-3">{editingId ? "Edit" : "Add"} {label}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {fields.map((f) => (
              <div key={f}>
                <label className="text-xs text-muted-foreground mb-1 block capitalize">{f.replace("_", " ")}</label>
                <input value={formData[f] || ""} onChange={(e) => setFormData({ ...formData, [f]: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90">Save</button>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-xs px-4 py-2 rounded-full border border-border hover:bg-muted">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><span className="h-6 w-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground"><p className="text-sm">No {label.toLowerCase()}s yet</p></div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{fields.map((f) => item[f]).filter(Boolean).join(" · ")}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => handleEdit(item)} className="p-2 rounded-full hover:bg-muted transition-colors"><Edit size={13} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
