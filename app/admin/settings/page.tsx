"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Settings = Record<string,string>;
const groups = [
  { title: "Property", fields: [["site_name","Hotel name"],["tagline","Tagline"],["phone","Phone"],["email","Contact email"],["whatsapp","WhatsApp number"],["address","Address"]] },
  { title: "Maps & Social", fields: [["maps_url","Google Maps URL"],["instagram_url","Instagram URL"],["facebook_url","Facebook URL"],["youtube_url","YouTube URL"]] },
  { title: "Enquiries", fields: [["booking_email","Booking destination email"]] },
];

export default function SettingsPage(){
  const [values,setValues]=useState<Settings>({}); const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [message,setMessage]=useState("");
  useEffect(()=>{fetch("/api/admin/settings",{cache:"no-store"}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error);setValues(d);}).catch(e=>setMessage(e.message||"Could not load settings.")).finally(()=>setLoading(false));},[]);
  async function save(e:React.FormEvent){e.preventDefault();setSaving(true);setMessage("");const r=await fetch("/api/admin/settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(values)});const d=await r.json();setMessage(r.ok?"Settings saved successfully.":(d.error||"Could not save settings."));setSaving(false);}
  return <main className="min-h-screen bg-[#0c0b0a] px-5 py-8 text-white lg:px-8"><div className="mx-auto max-w-4xl"><Link href="/admin" className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">← Dashboard</Link><h1 className="mt-3 font-[var(--font-cormorant)] text-4xl">Site Settings</h1><p className="mt-2 text-sm text-white/50">Manage site-wide contact, property and social information.</p>{message&&<div className="mt-5 rounded-lg border border-[#c7a56a]/30 bg-[#c7a56a]/10 px-4 py-3 text-sm text-[#e2c98f]">{message}</div>}<form onSubmit={save} className="mt-7 space-y-6">{groups.map(group=><section key={group.title} className="rounded-2xl border border-white/10 bg-[#151311] p-6"><h2 className="font-[var(--font-cormorant)] text-2xl">{group.title}</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">{group.fields.map(([key,label])=><label key={key} className={key==="address"||key.includes("url")?"sm:col-span-2":""}><span className="mb-2 block text-xs uppercase tracking-wider text-white/40">{label}</span>{key==="address"?<textarea rows={3} value={values[key]||""} onChange={e=>setValues(v=>({...v,[key]:e.target.value}))} className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c7a56a]"/>:<input type={key.includes("email")?"email":"text"} value={values[key]||""} onChange={e=>setValues(v=>({...v,[key]:e.target.value}))} className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#c7a56a]"/>}</label>)}</div></section>)}<div className="flex justify-end"><button disabled={loading||saving} className="rounded-lg bg-[#c7a56a] px-6 py-3 text-sm font-medium text-[#17130d] disabled:opacity-50">{saving?"Saving…":"Save Settings"}</button></div></form></div></main>;
}
