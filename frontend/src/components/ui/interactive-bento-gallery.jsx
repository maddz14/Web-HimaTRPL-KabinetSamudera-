import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ---------------------------------------------------------------------------
// MediaItem — renders either <video> (with IntersectionObserver autoplay)
// or <img> based on item.type
// ---------------------------------------------------------------------------
const MediaItem = ({ item, className, onClick }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  // Observe whether the video element is inside the viewport
  useEffect(() => {
    if (item.type !== "video") return;

    const options = { root: null, rootMargin: "50px", threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsInView(entry.isIntersecting));
    }, options);

    const videoEl = videoRef.current;
    if (videoEl) observer.observe(videoEl);

    return () => {
      if (videoEl) observer.unobserve(videoEl);
    };
  }, [item.type]);

  // Play / pause based on visibility
  useEffect(() => {
    if (item.type !== "video") return;
    let mounted = true;

    const handleVideoPlay = async () => {
      if (!videoRef.current || !isInView || !mounted) return;
      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise((resolve) => {
            if (videoRef.current) videoRef.current.oncanplay = resolve;
          });
          if (mounted) {
            setIsBuffering(false);
            await videoRef.current.play();
          }
        }
      } catch (error) {
        console.warn("Video playback failed:", error);
      }
    };

    if (isInView) {
      handleVideoPlay();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }

    return () => {
      mounted = false;
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
      }
    };
  }, [isInView, item.type]);

  if (item.type === "video") {
    const videoSrc = item.url || item.video_url || item.image_url;
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{
            opacity: isBuffering ? 0.8 : 1,
            transition: "opacity 0.2s",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-6 h-6 border-2 border-cyan-300/40 border-t-cyan-300 rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.url || item.image_url}
      alt={item.title}
      className={`${className} object-cover cursor-pointer`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
};

// ---------------------------------------------------------------------------
// GalleryModal — full-screen modal with a draggable dock at the bottom
// ---------------------------------------------------------------------------
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-abyss/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Main modal card */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div
          className="relative w-[95vw] sm:w-[85vw] max-w-3xl rounded-2xl overflow-hidden pointer-events-auto
                     bg-deep/70 backdrop-blur-2xl border border-cyan-500/20 shadow-2xl shadow-abyss/60"
        >
          {/* Media display */}
          <div className="relative w-full aspect-video bg-abyss">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <MediaItem
                  item={selectedItem}
                  className="w-full h-full"
                  onClick={onClose}
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay with title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-abyss/90 via-abyss/40 to-transparent pointer-events-none">
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-1">
                {selectedItem.category}
              </div>
              <h3 className="headline text-sand-300 text-lg sm:text-xl font-semibold leading-tight">
                {selectedItem.title}
              </h3>
              {selectedItem.desc && (
                <p className="text-sand-300/70 text-xs sm:text-sm mt-1">
                  {selectedItem.desc}
                </p>
              )}
            </div>
          </div>

          {/* Close button */}
          <motion.button
            className="absolute top-3 right-3 p-2 rounded-full bg-abyss/60 text-sand-300/80
                       hover:bg-cyan-500/20 hover:text-cyan-300 backdrop-blur-sm border border-cyan-900/40 transition-colors z-10"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Tutup galeri"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Draggable thumbnail dock */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }));
        }}
        className="fixed z-[60] left-1/2 bottom-6 -translate-x-1/2 touch-none"
      >
        <motion.div className="relative rounded-2xl bg-deep/70 backdrop-blur-2xl border border-cyan-500/20 shadow-lg shadow-abyss/50 cursor-grab active:cursor-grabbing">
          <div className="flex items-center -space-x-2 px-3 py-2.5">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
                style={{
                  zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                }}
                className={`relative group w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer hover:z-20
                  ${selectedItem.id === item.id
                    ? "ring-2 ring-cyan-300/80 shadow-lg shadow-cyan-500/30"
                    : "hover:ring-2 hover:ring-cyan-500/40"}`}
                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                animate={{
                  scale: selectedItem.id === item.id ? 1.25 : 1,
                  rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15,
                  y: selectedItem.id === item.id ? -10 : 0,
                }}
                whileHover={{
                  scale: 1.35,
                  rotate: 0,
                  y: -12,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/15" />
                {selectedItem.id === item.id && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute -inset-2 bg-cyan-400/20 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// ---------------------------------------------------------------------------
// Skeleton loader for bento grid
// ---------------------------------------------------------------------------
export const BentoSkeleton = ({ count = 7 }) => {
  const SPAN_CYCLE = [
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`relative rounded-xl overflow-hidden ${SPAN_CYCLE[i % SPAN_CYCLE.length]}`}
        >
          <div className="absolute inset-0 bg-deep/60 animate-pulse" />
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(10,147,150,0.08), transparent)",
            }}
          />
        </div>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// InteractiveBentoGallery — main exported component
// ---------------------------------------------------------------------------
const InteractiveBentoGallery = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);

  // Sync if parent updates mediaItems (e.g. after add/delete)
  useEffect(() => {
    setItems(mediaItems);
  }, [mediaItems]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10 text-center">
        <motion.h2
          className="headline text-2xl sm:text-3xl md:text-4xl text-sand-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}{" "}
        </motion.h2>
        <motion.p
          className="mt-3 text-sm sm:text-base text-sand-300/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Bento Grid */}
      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen={true}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layoutId={`media-${item.id}`}
            className={`relative overflow-hidden rounded-2xl cursor-move ${item.span}`}
            onClick={() => !isDragging && setSelectedItem(item)}
            variants={{
              hidden: { y: 40, scale: 0.92, opacity: 0 },
              visible: {
                y: 0,
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.04 },
              },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              const moveDistance = info.offset.x + info.offset.y;
              if (Math.abs(moveDistance) > 50) {
                const newItems = [...items];
                const draggedItem = newItems[index];
                const targetIndex =
                  moveDistance > 0
                    ? Math.min(index + 1, items.length - 1)
                    : Math.max(index - 1, 0);
                newItems.splice(index, 1);
                newItems.splice(targetIndex, 0, draggedItem);
                setItems(newItems);
              }
            }}
          >
            {/* Media content */}
            <MediaItem
              item={item}
              className="absolute inset-0 w-full h-full"
              onClick={() => !isDragging && setSelectedItem(item)}
            />

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/40 to-transparent" />
              <div className="relative p-3 sm:p-4">
                {item.category && (
                  <div className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 mb-0.5">
                    {item.category}
                  </div>
                )}
                <h3 className="text-sand-300 text-xs sm:text-sm font-medium line-clamp-1">
                  {item.title}
                </h3>
                {item.desc && (
                  <p className="text-sand-300/60 text-[10px] sm:text-xs mt-0.5 line-clamp-2">
                    {item.desc}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Video badge */}
            {item.type === "video" && (
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-abyss/70 border border-cyan-500/30 backdrop-blur-sm">
                <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-wider">
                  ▶ video
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InteractiveBentoGallery;
