"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

import type { Room } from "@/types/rooms";
import type { CompareRow } from "@/types/rooms-page";

type CompareRoomsTableProps = {
  rooms: Room[];
  rows: CompareRow[];
};

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} strokeWidth={2} className="mx-auto text-[#C9A24A]" />
    ) : (
      <Minus size={18} strokeWidth={2} className="mx-auto text-[#F8F8F5]/25" />
    );
  }

  return <span>{value}</span>;
}

export default function CompareRoomsTable({ rooms, rows }: CompareRoomsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-x-auto rounded-[28px] border border-[#C9A24A]/20 bg-[#111827]/60 shadow-[0_25px_65px_-25px_rgba(0,0,0,0.55)]"
    >
      <table className="w-full min-w-[640px] border-collapse font-body text-sm text-[#F8F8F5]">
        <thead>
          <tr className="border-b border-[#F8F8F5]/10">
            <th className="w-1/4 px-6 py-5 text-left font-body text-xs font-medium uppercase tracking-[0.15em] text-[#F8F8F5]/50">
              &nbsp;
            </th>
            {rooms.map((room) => (
              <th
                key={room.id}
                className="px-6 py-5 text-center font-display text-base font-medium text-[#F8F8F5] sm:text-lg"
              >
                {room.category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.label}
              className={
                index !== rows.length - 1 ? "border-b border-[#F8F8F5]/5" : undefined
              }
            >
              <td className="px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.12em] text-[#F8F8F5]/50">
                {row.label}
              </td>
              {row.values.map((value, i) => (
                <td key={rooms[i]?.id ?? i} className="px-6 py-4 text-center">
                  <CellValue value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
