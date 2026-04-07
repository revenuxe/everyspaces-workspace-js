import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, Edit, Trash2, Eye, LogOut, Building2, Tag, Sparkles, MapPin, ChevronDown, ToggleLeft, ToggleRight } from "lucide-react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

type Tab = "properties" | "types" | "amenities" | "locations";

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
    { key: "properties", label: "Properties", icon: Building2 },
    { key: "types", label: "Types", icon: Tag },
    { key: "amenities", label: "Amenities", icon: Sparkles },
    { key: "locations", label: "Locations", icon: MapPin },
  ];

  return (
    <>
      <SEOHead title="Admin Dashboard | EverySpaces" description="Admin dashboard" keywords="admin" noIndex />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <Building2 size={20} />
            <h1 className="text-lg font-serif">Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin/leads" className="text-xs bg-primary-foreground/10 px-3 py-1.5 rounded-full hover:bg-primary-foreground/20 transition-colors">Leads</Link>
            <button onClick={handleLogout} className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="border-b border-border overflow-x-auto">
          <div className="max-w-5xl mx-auto flex">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto p-4">
          {activeTab === "properties" && <PropertiesTab />}
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
