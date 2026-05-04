import { useState } from 'react';
import { X, Package, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type HotspotConfig = {
  id: string;
  top: number;
  left: number;
  img: string;
  dir: 'up' | 'down' | 'center';
  isBook?: boolean;
};

const HOTSPOTS: HotspotConfig[] = [
  // Top Row
  { id: 'diadem', top: 10.6, left: 87.7, img: 'diadem.png', dir: 'down' },
  { id: 'helmet', top: 11.4, left: 76.4, img: 'helmet.png', dir: 'down' },
  { id: 'weapon', top: 41.7, left: 70.3, img: 'weapon.png', dir: 'center' }, // Weapon
  
  // Row 2
  { id: 'sigil', top: 41.8, left: 83.8, img: 'sigil.png', dir: 'center' },
  { id: 'chest', top: 21.1, left: 76.4, img: 'chest.png', dir: 'down' },
  { id: 'gloves', top: 20.6, left: 66.1, img: 'gloves.png', dir: 'down' },
  
  // Row 3
  { id: 'cloak', top: 31.4, left: 66.1, img: 'cloak.png', dir: 'center' },
  { id: 'legs', top: 31.2, left: 76.8, img: 'legs.png', dir: 'center' },
  { id: 'boots', top: 21.1, left: 87.8, img: 'boots.png', dir: 'down' },
  
  // Row 4
  { id: 'authority', top: 31.2, left: 87.8, img: 'authority.png', dir: 'center' },
  { id: 'shirt', top: 53.0, left: 90.3, img: 'shirt.png', dir: 'center' },
  { id: 'heir', top: 10.6, left: 66.0, img: 'heir.png', dir: 'down' },
  
  // Row 5 (Jewelry)
  { id: 'earring_dragon', top: 53.4, left: 63.3, img: 'earring_dragon.png', dir: 'center' },
  { id: 'earring_angel', top: 53.3, left: 77.1, img: 'earring_angel.png', dir: 'center' },
  { id: 'necklace', top: 63.9, left: 90.4, img: 'necklace.png', dir: 'center' },
  
  // Row 6 (Jewelry)
  { id: 'ring_angel', top: 63.6, left: 62.9, img: 'ring_angel.png', dir: 'center' },
  { id: 'ring_dragon', top: 63.3, left: 76.9, img: 'ring_dragon.png', dir: 'center' },
  
  // Bottom Block
  { id: 'brooch', top: 88.7, left: 60.9, img: 'brooch.png', dir: 'up' },
  { id: 'bracelet_seed', top: 88.7, left: 81.6, img: 'bracelet_seed.png', dir: 'up' },
  { id: 'bracelet_karla', top: 89.3, left: 71.3, img: 'bracelet_karla.png', dir: 'up' },
  
  // Artifact Book
  { id: 'book', top: 88.9, left: 92.0, img: 'book.png', dir: 'up', isBook: true },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-neutral-200 font-sans flex flex-col relative selection:bg-amber-900/50">
      
      {/* Dynamic Background subtle glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/5 via-[#09090b] to-[#050505]" />
      
      {/* Decorative Top Glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.3)] z-50" />

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col p-4 md:p-8 xl:p-12 items-center justify-center min-h-[100dvh] overflow-hidden">
        {/* Header section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 w-full max-w-[1200px] mb-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl md:text-4xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-amber-100 to-amber-600/80 flex items-center gap-3">
              <Sparkles className="text-amber-500/50" size={24} />
              AETHEL EQUIPMENT
            </h1>
            <p className="text-neutral-500 text-xs md:text-sm tracking-widest uppercase mt-2">
              Character Build & Artifacts
            </p>
          </div>
        </motion.div>

        <div className="relative w-full max-w-[1200px] z-10 flex flex-col items-center">
          {/* Main Background Image Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative w-full rounded-xl shadow-[0_0_80px_rgba(0,0,0,1)] border border-neutral-800/80 bg-black/60 overflow-visible flex justify-center"
          >
            <img 
              src="/1.png" 
              alt="Character Inventory Showcase" 
              className="block rounded-xl w-full h-auto transition-all"
            />

            {/* Render all internal Hotspots */}
            {HOTSPOTS.map((spot) => (
              <div
                key={spot.id}
                tabIndex={0}
                onClick={() => spot.isBook && setIsModalOpen(true)}
                className={`absolute w-[7.5%] h-[8.5%] rounded-md transition-all duration-300 group z-20 focus:outline-none focus:bg-white/10 cursor-pointer ${
                  spot.isBook ? 'hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:border-amber-400/60' : 'hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-neutral-400/30'
                } hover:bg-white/5 border border-transparent`}
                style={{ 
                  top: `${spot.top}%`, 
                  left: `${spot.left}%`
                }}
              >
                {/* Tooltip Wrapper */}
                <div 
                  className="hidden group-hover:flex group-focus:flex pointer-events-none animate-in fade-in zoom-in-95 duration-200 z-[100] fixed inset-0 items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="w-full max-w-[95vw] md:max-w-2xl xl:max-w-4xl shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
                  >
                    <img
                      src={`/${spot.img}`}
                      alt={`${spot.id} stats`}
                      className="w-full h-auto object-contain max-h-[90vh] rounded-lg border border-neutral-700/80 bg-neutral-900/95"
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Artifacts Fullscreen Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/95 z-[200] flex flex-col justify-center items-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Close button top right */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 md:top-8 right-4 md:right-8 p-3 md:p-4 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-all border border-neutral-700 group shadow-2xl z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300 md:w-7 md:h-7" />
            </motion.button>
            
            <div className="mb-4 md:mb-8 flex items-center gap-3 text-amber-500/80">
              <Package size={20} className="md:w-6 md:h-6" />
              <h2 className="text-lg md:text-xl tracking-widest font-light uppercase text-amber-100">Artifact Collections</h2>
            </div>
            
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
              className="flex gap-4 md:gap-8 w-full max-w-[100vw] overflow-x-auto p-4 md:p-8 snap-x snap-mandatory hide-scrollbars"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the modal
            >
              {/* Spacer for centering first item nicely if needed */}
              <div className="w-[10vw] flex-shrink-0 md:hidden" />
              
              {['3.png', '4.png', '5.png'].map((img, index) => (
                <div key={img} className="relative group snap-center shrink-0">
                  <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={`/${img}`} 
                    alt={`Artifact configuration ${index + 1}`} 
                    className="relative h-[55vh] md:h-[60vh] xl:h-[70vh] w-auto max-w-[85vw] object-contain border border-neutral-700/80 hover:border-amber-600/50 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-lg bg-[#050505]"
                  />
                </div>
              ))}
              
              <div className="w-[10vw] flex-shrink-0 md:hidden" />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-neutral-500 mt-6 md:mt-10 text-xs md:text-sm tracking-widest uppercase font-mono"
            >
              <span className="animate-pulse">Click anywhere to close</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
