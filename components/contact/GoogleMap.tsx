type GoogleMapProps = {
  embedSrc: string;
  title: string;
};

export default function GoogleMap({ embedSrc, title }: GoogleMapProps) {
  return (
    <div className="h-[450px] w-full overflow-hidden rounded-3xl border border-[#C9A24A]/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      <iframe
        src={embedSrc}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
