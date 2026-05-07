import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Package,
  Sparkles,
  User,
  MonitorPlay,
  Home,
  Share2,
  ChevronDown,
  Menu,
  X,
  Volume2,
  VolumeX,
  Calculator,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ExpCalculator } from "./components/ExpCalculator";

type HotspotConfig = {
  id: string;
  top: number;
  left: number;
  width?: number;  // in %
  height?: number; // in %
  img?: string;
  dir: "up" | "down" | "center";
  isBook?: boolean;
  isAgathion?: boolean;
  isKrujki?: boolean;
};

const HOTSPOTS: HotspotConfig[] = [
  {
    "id": "diadem",
    "top": 3.3,
    "left": 71.4,
    "img": "diadem.png",
    "dir": "down",
    "width": 16.8,
    "height": 9
  },
  {
    "id": "helmet",
    "top": 2.5,
    "left": 42.8,
    "img": "helmet.png",
    "dir": "down",
    "width": 17.7,
    "height": 9.7
  },
  {
    "id": "weapon",
    "top": 38.7,
    "left": 27.2,
    "img": "weapon.png",
    "dir": "center",
    "width": 15.9,
    "height": 8.4
  },
  {
    "id": "sigil",
    "top": 38.4,
    "left": 61.9,
    "img": "sigil.png",
    "dir": "center",
    "width": 16.2,
    "height": 7.8
  },
  {
    "id": "chest",
    "top": 15.1,
    "left": 43.7,
    "img": "chest.png",
    "dir": "down",
    "width": 15.9,
    "height": 8.5
  },
  {
    "id": "gloves",
    "top": 15.3,
    "left": 16.1,
    "img": "gloves.png",
    "dir": "down",
    "width": 16.2,
    "height": 8.2
  },
  {
    "id": "cloak",
    "top": 26.4,
    "left": 15.1,
    "img": "cloak.png",
    "dir": "center",
    "width": 17.1,
    "height": 8.5
  },
  {
    "id": "legs",
    "top": 27.1,
    "left": 43.4,
    "img": "legs.png",
    "dir": "center",
    "width": 15.9,
    "height": 8.2
  },
  {
    "id": "boots",
    "top": 15.1,
    "left": 71.6,
    "img": "boots.png",
    "dir": "down",
    "width": 15.9,
    "height": 8.8
  },
  {
    "id": "authority",
    "top": 26.9,
    "left": 71.8,
    "img": "authority.png",
    "dir": "center",
    "width": 16.2,
    "height": 8.1
  },
  {
    "id": "shirt",
    "top": 50.7,
    "left": 78.1,
    "img": "shirt.png",
    "dir": "center",
    "width": 17.1,
    "height": 8.5
  },
  {
    "id": "heir",
    "top": 3.2,
    "left": 16.2,
    "img": "heir.png",
    "dir": "down",
    "width": 15.6,
    "height": 8.8
  },
  {
    "id": "earring_dragon",
    "top": 51.1,
    "left": 9.2,
    "img": "earring_dragon.png",
    "dir": "center",
    "width": 16.2,
    "height": 8.5
  },
  {
    "id": "earring_angel",
    "top": 51,
    "left": 43.9,
    "img": "earring_angel.png",
    "dir": "center",
    "width": 16.2,
    "height": 8.6
  },
  {
    "id": "necklace",
    "top": 63.2,
    "left": 78.6,
    "img": "necklace.png",
    "dir": "center",
    "width": 16.2,
    "height": 7.8
  },
  {
    "id": "ring_angel",
    "top": 63,
    "left": 9.5,
    "img": "ring_angel.png",
    "dir": "center",
    "width": 15.3,
    "height": 8.2
  },
  {
    "id": "ring_dragon",
    "top": 63.1,
    "left": 43.8,
    "img": "ring_dragon.png",
    "dir": "center",
    "width": 16.5,
    "height": 8.3
  },
  {
    "id": "brooch",
    "top": 91.2,
    "left": 1.5,
    "img": "brooch.png",
    "dir": "up",
    "width": 17.4,
    "height": 8.7
  },
  {
    "id": "bracelet_seed",
    "top": 91.2,
    "left": 56,
    "img": "bracelet_seed.png",
    "dir": "up",
    isAgathion: true,
    "width": 16.5,
    "height": 8.2
  },
  {
    "id": "bracelet_karla",
    "top": 91.1,
    "left": 28.8,
    "img": "bracelet_karla.png",
    "dir": "up",
    "width": 15.6,
    "height": 8.4
  },
  {
    "id": "book",
    "top": 91.4,
    "left": 82.2,
    "img": "book.png",
    "dir": "up",
    isBook: true,
    "width": 17.1,
    "height": 8.4
  },
  {
    "id": "krujki_btn",
    "top": 25.6,
    "left": 5.4,
    "dir": "up",
    isKrujki: true,
    "width": 10.5,
    "height": 5.3
  },
  {
    "id": "tatu1",
    "top": 45,
    "left": 5.4,
    "dir": "up",
    "img": "Tatu1.png",
    "width": 10.5,
    "height": 5.3
  },
  {
    "id": "tatu2",
    "top": 51,
    "left": 5.4,
    "dir": "up",
    "img": "Tatu2.png",
    "width": 10.5,
    "height": 5.3
  },
  {
    "id": "tatu3",
    "top": 57,
    "left": 5.4,
    "dir": "up",
    "img": "Tatu3.png",
    "width": 10.5,
    "height": 5.3
  }
];

const ITEM_NAMES: Record<string, string> = {
  diadem: "Венец",
  helmet: "Шлем",
  weapon: "Оружие",
  sigil: "Символ",
  chest: "Доспех",
  gloves: "Перчатки",
  cloak: "Плащ",
  legs: "Поножи",
  boots: "Ботинки",
  authority: "Полномочия Правителя",
  shirt: "Футболка",
  heir: "Сияние Наследника",
  earring_dragon: "Серьга Дракона",
  earring_angel: "Серьга Ангела",
  necklace: "Ожерелье",
  ring_angel: "Кольцо Ангела",
  ring_dragon: "Кольцо Дракона",
  brooch: "Брошь",
  bracelet_seed: "Браслет Семени",
  bracelet_karla: "Браслет Карли",
  book: "Коллекция Артефактов",
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mainTab, setMainTab] = useState<
    "home" | "character" | "exp" | "referral" | "stream"
  >("home");
  const [hoveredSpot, setHoveredSpot] = useState<HotspotConfig | null>(null);
  const [activeTab, setActiveTab] = useState<"equipment" | "map" | "agathion" | "krujki" | "skaz1" | "skaz2" | "koll" | "relic">("equipment");
  const [relicSubTab, setRelicSubTab] = useState<"mine" | "collection">("mine");

  const [editMode, setEditMode] = useState(false);
  const [localHotspots, setLocalHotspots] = useState<HotspotConfig[]>(
    [
      {
        "id": "diadem",
        "top": 5.7,
        "left": 70.8,
        "img": "diadem.png",
        "dir": "down",
        "width": 15.6,
        "height": 8.4
      },
      {
        "id": "helmet",
        "top": 5.7,
        "left": 44,
        "img": "helmet.png",
        "dir": "down",
        "width": 16.5,
        "height": 8.5
      },
      {
        "id": "weapon",
        "top": 39.5,
        "left": 28.7,
        "img": "weapon.png",
        "dir": "center",
        "width": 15.3,
        "height": 7.9
      },
      {
        "id": "sigil",
        "top": 39.3,
        "left": 61.6,
        "img": "sigil.png",
        "dir": "center",
        "width": 15.9,
        "height": 8.6
      },
      {
        "id": "chest",
        "top": 17.4,
        "left": 44.6,
        "img": "chest.png",
        "dir": "down",
        "width": 15,
        "height": 7.6
      },
      {
        "id": "gloves",
        "top": 17,
        "left": 18.5,
        "img": "gloves.png",
        "dir": "down",
        "width": 15,
        "height": 8.3
      },
      {
        "id": "cloak",
        "top": 28.4,
        "left": 17.8,
        "img": "cloak.png",
        "dir": "center",
        "width": 15.6,
        "height": 8.2
      },
      {
        "id": "legs",
        "top": 28.6,
        "left": 44.3,
        "img": "legs.png",
        "dir": "center",
        "width": 15.9,
        "height": 7.9
      },
      {
        "id": "boots",
        "top": 17.2,
        "left": 71.3,
        "img": "boots.png",
        "dir": "down",
        "width": 15.3,
        "height": 8.2
      },
      {
        "id": "authority",
        "top": 28,
        "left": 70.6,
        "img": "authority.png",
        "dir": "center",
        "width": 15.6,
        "height": 8.7
      },
      {
        "id": "shirt",
        "top": 51.8,
        "left": 77.2,
        "img": "shirt.png",
        "dir": "center",
        "width": 15.6,
        "height": 8.2
      },
      {
        "id": "heir",
        "top": 5.7,
        "left": 18.3,
        "img": "heir.png",
        "dir": "down",
        "width": 14.7,
        "height": 8.6
      },
      {
        "id": "earring_dragon",
        "top": 51.6,
        "left": 11.3,
        "img": "earring_dragon.png",
        "dir": "center",
        "width": 15.9,
        "height": 8.3
      },
      {
        "id": "earring_angel",
        "top": 51.8,
        "left": 44.5,
        "img": "earring_angel.png",
        "dir": "center",
        "width": 15.3,
        "height": 8.3
      },
      {
        "id": "necklace",
        "top": 63.2,
        "left": 77.7,
        "img": "necklace.png",
        "dir": "center",
        "width": 15.6,
        "height": 7.8
      },
      {
        "id": "ring_angel",
        "top": 62.8,
        "left": 11.9,
        "img": "ring_angel.png",
        "dir": "center",
        "width": 15.3,
        "height": 8.2
      },
      {
        "id": "ring_dragon",
        "top": 62.8,
        "left": 44.1,
        "img": "ring_dragon.png",
        "dir": "center",
        "width": 16.5,
        "height": 8.3
      },
      {
        "id": "brooch",
        "top": 90.1,
        "left": 3.3,
        "img": "brooch.png",
        "dir": "up",
        "width": 17.4,
        "height": 8.7
      },
      {
        "id": "bracelet_seed",
        "top": 90.4,
        "left": 56,
        "img": "bracelet_seed.png",
        "dir": "up",
        "isAgathion": true,
        "width": 16.5,
        "height": 8.2
      },
      {
        "id": "bracelet_karla",
        "top": 90.3,
        "left": 30.6,
        "img": "bracelet_karla.png",
        "dir": "up",
        "width": 15.6,
        "height": 8.4
      },
      {
        "id": "book",
        "top": 90,
        "left": 81,
        "img": "book.png",
        "dir": "up",
        "isBook": true,
        "width": 17.1,
        "height": 8.4
      },
      {
        "id": "krujki_btn",
        "top": 25.5,
        "left": 5.2,
        "dir": "up",
        "isKrujki": true,
        "width": 10.5,
        "height": 5.3
      },
      {
        "id": "tatu1",
        "top": 5.3,
        "left": 6,
        "dir": "up",
        "img": "Tatu1.png",
        "width": 9.3,
        "height": 4.9
      },
      {
        "id": "tatu2",
        "top": 10.2,
        "left": 6,
        "dir": "up",
        "img": "Tatu2.png",
        "width": 8.7,
        "height": 4.6
      },
      {
        "id": "tatu3",
        "top": 14.4,
        "left": 5.8,
        "dir": "up",
        "img": "Tatu3.png",
        "width": 8.9,
        "height": 4.9
      }
    ]
  );
  const [draggingSpot, setDraggingSpot] = useState<{id: string, startX: number, startY: number, startTop: number, startLeft: number, containerWidth?: number, containerHeight?: number} | null>(null);
  const [resizingSpot, setResizingSpot] = useState<{id: string, startX: number, startY: number, startWidth: number, startHeight: number, containerWidth?: number, containerHeight?: number} | null>(null);
  const [agatSubSpots, setAgatSubSpots] = useState<{id: number, top: number, left: number, width: number, height: number}[]>(
    [
      {
        "id": 10,
        "top": 22.4,
        "left": 12.7,
        "width": 13,
        "height": 51.7
      },
      {
        "id": 9,
        "top": 23.6,
        "left": 35.5,
        "width": 13.1,
        "height": 47.1
      },
      {
        "id": 7,
        "top": 22.4,
        "left": 50.1,
        "width": 13.5,
        "height": 51.9
      },
      {
        "id": 8,
        "top": 23.6,
        "left": 64.6,
        "width": 13.5,
        "height": 49.5
      },
      {
        "id": 11,
        "top": 18.8,
        "left": 80,
        "width": 13.5,
        "height": 56
      }
    ]
  );
  const [broochSubSpots, setBroochSubSpots] = useState<{id: string, img: string, top: number, left: number, width: number, height: number}[]>(
    [
      {
        "id": "stone1",
        "img": "Red.png",
        "top": 79.3,
        "left": 22.9,
        "width": 13,
        "height": 7
      },
      {
        "id": "stone2",
        "img": "RedEye.png",
        "top": 79.2,
        "left": 7.1,
        "width": 13,
        "height": 7
      },
      {
        "id": "stone3",
        "img": "Blue.png",
        "top": 79.2,
        "left": 37.7,
        "width": 13,
        "height": 7
      },
      {
        "id": "stone4",
        "img": "Green.png",
        "top": 79.3,
        "left": 52.4,
        "width": 13,
        "height": 7
      },
      {
        "id": "stone5",
        "img": "Razniy.png",
        "top": 79.1,
        "left": 67.4,
        "width": 13,
        "height": 7
      },
      {
        "id": "stone6",
        "img": "LOrb.png",
        "top": 79.3,
        "left": 82.4,
        "width": 13,
        "height": 7
      }
    ]
  );
  const [broochPopupSpots, setBroochPopupSpots] = useState<{id: string, img: string, top: number, left: number, width: number, height: number}[]>(
    [
      {
        "id": "stone1",
        "img": "Red.png",
        "top": 20,
        "left": 5,
        "width": 14,
        "height": 60
      },
      {
        "id": "stone2",
        "img": "RedEye.png",
        "top": 20,
        "left": 20,
        "width": 14,
        "height": 60
      },
      {
        "id": "stone3",
        "img": "Blue.png",
        "top": 20,
        "left": 35,
        "width": 14,
        "height": 60
      },
      {
        "id": "stone4",
        "img": "Green.png",
        "top": 20,
        "left": 50,
        "width": 14,
        "height": 60
      },
      {
        "id": "stone5",
        "img": "Razniy.png",
        "top": 20,
        "left": 65,
        "width": 18.9,
        "height": 2
      },
      {
        "id": "stone6",
        "img": "LOrb.png",
        "top": 20,
        "left": 80,
        "width": 14,
        "height": 60
      }
    ]
  );
  const [mainImageWidth, setMainImageWidth] = useState(360);
  const [popupImageWidth, setPopupImageWidth] = useState(655);
  const [popupImageHeight, setPopupImageHeight] = useState(846);
  const [agathionWidth, setAgathionWidth] = useState(30);
  const [agathionHeight, setAgathionHeight] = useState(400);
  const [gomMaxWidth, setGomMaxWidth] = useState(730);
  const [skaz1MaxWidth, setSkaz1MaxWidth] = useState(930);
  const [skaz2MaxWidth, setSkaz2MaxWidth] = useState(930);
  const [kollMaxWidth, setKollMaxWidth] = useState(1010);
  const [koll1Width, setKoll1Width] = useState(455);
  const [koll2Width, setKoll2Width] = useState(900);
  const [koll2Height, setKoll2Height] = useState(750);
  const [kollGap, setKollGap] = useState(24);
  const [koll1Offset, setKoll1Offset] = useState({"x":-205,"y":2});
  const [koll2Offset, setKoll2Offset] = useState({"x":9,"y":-21});
  const [returnBtnRight, setReturnBtnRight] = useState(7);
  const [returnBtnBottom, setReturnBtnBottom] = useState(24);
  const [showAgat6, setShowAgat6] = useState(false);
  const [agat6Top, setAgat6Top] = useState(76);
  const [agat6Left, setAgat6Left] = useState(5.1);
  const [agat6WidthPct, setAgat6WidthPct] = useState(88);
  const [showBroochPopup, setShowBroochPopup] = useState(false);
  const [showKarlaPopup, setShowKarlaPopup] = useState(false);
  const [hoveredAgat, setHoveredAgat] = useState<number | null>(null);
  const [hoveredBroochStone, setHoveredBroochStone] = useState<string | null>(null);
  const [hoveredTalik, setHoveredTalik] = useState<number | null>(null);
  const [hoveredKrujok, setHoveredKrujok] = useState<number | null>(null);
  const [talikPopupSpots, setTalikPopupSpots] = useState<{id: number, img: string, top: number, left: number, width: number, height: number}[]>(
    [
      {
        "id": 1,
        "img": "Talik6.png",
        "top": 20,
        "left": 5,
        "width": 14,
        "height": 60
      },
      {
        "id": 2,
        "img": "Talik3.png",
        "top": 20,
        "left": 20,
        "width": 14,
        "height": 60
      },
      {
        "id": 3,
        "img": "Talik2.png",
        "top": 20,
        "left": 35,
        "width": 14,
        "height": 60
      },
      {
        "id": 4,
        "img": "Talik4.png",
        "top": 20,
        "left": 50,
        "width": 14,
        "height": 60
      },
      {
        "id": 5,
        "img": "Talik5.png",
        "top": 20,
        "left": 65,
        "width": 14,
        "height": 60
      },
      {
        "id": 6,
        "img": "Talik1.png",
        "top": 20,
        "left": 80,
        "width": 14,
        "height": 60
      }
    ]
  );
  const [krujkiSpots, setKrujkiSpots] = useState<{id: number, img: string, top: number, left: number, width: number, height: number}[]>(
    [
      {
        "id": 2,
        "img": "Krukji2.png",
        "top": 35.682254,
        "left": 69.05,
        "width": 24,
        "height": 20.5
      },
      {
        "id": 3,
        "img": "Krukji3.png",
        "top": 36.30392445729317,
        "left": 7.057692307692311,
        "width": 24.6,
        "height": 20.2
      },
      {
        "id": 4,
        "img": "Krukji4.png",
        "top": 66.74970603483281,
        "left": 18.275,
        "width": 25.3,
        "height": 20.5
      },
      {
        "id": 5,
        "img": "Krukji5.png",
        "top": 66.434833,
        "left": 57.075,
        "width": 24.5,
        "height": 20.5
      },
      {
        "id": 6,
        "img": "Krukji6.png",
        "top": 16.57996974601899,
        "left": 37.775,
        "width": 24.5,
        "height": 20.5
      }
    ]
  );
  const [panelGap, setPanelGap] = useState(0);
  const [inventoryOffset, setInventoryOffset] = useState({"x":-222.80001831054688,"y":-72.79998016357422});
  const [krujkiWrapOffset, setKrujkiWrapOffset] = useState({"x":0,"y":-50});
  const [krujkiOffset, setKrujkiOffset] = useState({"x":-68,"y":-69});
  const [krujkiWidth, setKrujkiWidth] = useState(650);
  const [krujkiTitleOffset, setKrujkiTitleOffset] = useState({"x":-25,"y":-57});
  const [relic1Width, setRelic1Width] = useState(580);
  const [relic1Offset, setRelic1Offset] = useState({"x": 0, "y": 0});
  const [relic2WidthLeft, setRelic2WidthLeft] = useState(450);
  const [relic2WidthRight, setRelic2WidthRight] = useState(800);
  const [relic2Height, setRelic2Height] = useState(700);
  const [relic2Offset, setRelic2Offset] = useState({"x":0,"y":0});
  const [relic2Gap, setRelic2Gap] = useState(24);
  const [statsOffset, setStatsOffset] = useState({"x":-219,"y":-109});
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    if (!editMode) return;
    
    if (id.startsWith('krujok_')) {
      const krujokId = parseInt(id.split('_')[1]);
      const spot = krujkiSpots.find((s) => s.id === krujokId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setDraggingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startTop: spot.top,
        startLeft: spot.left,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height
      });
      return;
    }

    if (id.startsWith('agat_sub_')) {
      const agatId = parseInt(id.split('_')[2]);
      const spot = agatSubSpots.find((s) => s.id === agatId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setDraggingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startTop: spot.top,
        startLeft: spot.left,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height,
      });
      return;
    }

    if (id.startsWith('brooch_sub_')) {
      const broochId = id.split('brooch_sub_')[1];
      const spot = broochSubSpots.find((s) => s.id === broochId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setDraggingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startTop: spot.top,
        startLeft: spot.left,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height,
      });
      return;
    }

    if (id.startsWith('brooch_popup_')) {
      const broochId = id.split('brooch_popup_')[1];
      const spot = broochPopupSpots.find((s) => s.id === broochId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setDraggingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startTop: spot.top,
        startLeft: spot.left,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height,
      });
      return;
    }

    if (id.startsWith('talik_popup_')) {
      const talikId = parseInt(id.split('talik_popup_')[1]);
      const spot = talikPopupSpots.find((s) => s.id === talikId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setDraggingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startTop: spot.top,
        startLeft: spot.left,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height,
      });
      return;
    }

    const spot = localHotspots.find((s) => s.id === id);
    if (!spot) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDraggingSpot({
      id,
      startX: e.clientX,
      startY: e.clientY,
      startTop: spot.top,
      startLeft: spot.left,
      containerWidth: rect.width,
      containerHeight: rect.height,
    });
  };

  const handleResizePointerDown = (id: string, e: React.PointerEvent) => {
    if (!editMode) return;

    if (id.startsWith('krujok_')) {
      const krujokId = parseInt(id.split('_')[1]);
      const spot = krujkiSpots.find((s) => s.id === krujokId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setResizingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: spot.width || 10,
        startHeight: spot.height || 10,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height
      });
      return;
    }

    if (id.startsWith('agat_sub_')) {
      const agatId = parseInt(id.split('_')[2]);
      const spot = agatSubSpots.find((s) => s.id === agatId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setResizingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: spot.width || 20,
        startHeight: spot.height || 60,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height,
      });
      return;
    }

    if (id.startsWith('brooch_sub_')) {
      const broochId = id.split('brooch_sub_')[1];
      const spot = broochSubSpots.find((s) => s.id === broochId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setResizingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: spot.width || 15,
        startHeight: spot.height || 60,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height,
      });
      return;
    }

    if (id.startsWith('brooch_popup_')) {
      const broochId = id.split('brooch_popup_')[1];
      const spot = broochPopupSpots.find((s) => s.id === broochId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setResizingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: spot.width || 15,
        startHeight: spot.height || 60,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height,
      });
      return;
    }

    if (id.startsWith('talik_popup_')) {
      const talikId = parseInt(id.split('talik_popup_')[1]);
      const spot = talikPopupSpots.find((s) => s.id === talikId);
      if (!spot) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const parentRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      setResizingSpot({
        id,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: spot.width || 14,
        startHeight: spot.height || 60,
        containerWidth: parentRect.width,
        containerHeight: parentRect.height,
      });
      return;
    }

    const spot = localHotspots.find((s) => s.id === id);
    if (!spot) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setResizingSpot({
      id,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: spot.width || 22.5,
      startHeight: spot.height || 11.2,
      containerWidth: rect.width,
      containerHeight: rect.height,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!editMode) return;

    if (draggingSpot && draggingSpot.containerWidth && draggingSpot.containerHeight) {
      const deltaX = e.clientX - draggingSpot.startX;
      const deltaY = e.clientY - draggingSpot.startY;

      const deltaLeftPercent = (deltaX / draggingSpot.containerWidth) * 100;
      const deltaTopPercent = (deltaY / draggingSpot.containerHeight) * 100;

      if (draggingSpot.id.startsWith('krujok_')) {
        const id = parseInt(draggingSpot.id.split('_')[1]);
        setKrujkiSpots(prev => prev.map(s => 
          s.id === id 
            ? { ...s, left: draggingSpot.startLeft + deltaLeftPercent, top: draggingSpot.startTop + deltaTopPercent }
            : s
        ));
      } else if (draggingSpot.id.startsWith('agat_sub_')) {
        const agatId = parseInt(draggingSpot.id.split('_')[2]);
        setAgatSubSpots((prev) =>
          prev.map((spot) =>
            spot.id === agatId
              ? {
                  ...spot,
                  left: Number((draggingSpot.startLeft + deltaLeftPercent).toFixed(1)),
                  top: Number((draggingSpot.startTop + deltaTopPercent).toFixed(1)),
                }
              : spot
          )
        );
      } else if (draggingSpot.id.startsWith('brooch_sub_')) {
        const broochId = draggingSpot.id.split('brooch_sub_')[1];
        setBroochSubSpots((prev) =>
          prev.map((spot) =>
            spot.id === broochId
              ? {
                  ...spot,
                  left: Number((draggingSpot.startLeft + deltaLeftPercent).toFixed(1)),
                  top: Number((draggingSpot.startTop + deltaTopPercent).toFixed(1)),
                }
              : spot
          )
        );
      } else if (draggingSpot.id.startsWith('brooch_popup_')) {
        const broochId = draggingSpot.id.split('brooch_popup_')[1];
        setBroochPopupSpots((prev) =>
          prev.map((spot) =>
            spot.id === broochId
              ? {
                  ...spot,
                  left: Number((draggingSpot.startLeft + deltaLeftPercent).toFixed(1)),
                  top: Number((draggingSpot.startTop + deltaTopPercent).toFixed(1)),
                }
              : spot
          )
        );
      } else if (draggingSpot.id.startsWith('talik_popup_')) {
        const talikId = parseInt(draggingSpot.id.split('talik_popup_')[1]);
        setTalikPopupSpots((prev) =>
          prev.map((spot) =>
            spot.id === talikId
              ? {
                  ...spot,
                  left: Number((draggingSpot.startLeft + deltaLeftPercent).toFixed(1)),
                  top: Number((draggingSpot.startTop + deltaTopPercent).toFixed(1)),
                }
              : spot
          )
        );
      } else {
        setLocalHotspots((prev) =>
          prev.map((spot) =>
            spot.id === draggingSpot.id
              ? {
                  ...spot,
                  left: Number((draggingSpot.startLeft + deltaLeftPercent).toFixed(1)),
                  top: Number((draggingSpot.startTop + deltaTopPercent).toFixed(1)),
                }
              : spot
          )
        );
      }
    } else if (resizingSpot && resizingSpot.containerWidth && resizingSpot.containerHeight) {
      const deltaX = e.clientX - resizingSpot.startX;
      const deltaY = e.clientY - resizingSpot.startY;

      const deltaWidthPercent = (deltaX / resizingSpot.containerWidth) * 100;
      const deltaHeightPercent = (deltaY / resizingSpot.containerHeight) * 100;

      if (resizingSpot.id.startsWith('krujok_')) {
        const id = parseInt(resizingSpot.id.split('_')[1]);
        setKrujkiSpots(prev => prev.map(s => 
          s.id === id 
            ? {
                ...s,
                width: Number(Math.max(2, resizingSpot.startWidth + deltaWidthPercent).toFixed(1)),
                height: Number(Math.max(2, resizingSpot.startHeight + deltaHeightPercent).toFixed(1)),
              }
            : s
        ));
      } else if (resizingSpot.id.startsWith('agat_sub_')) {
        const agatId = parseInt(resizingSpot.id.split('_')[2]);
        setAgatSubSpots((prev) =>
          prev.map((spot) =>
            spot.id === agatId
              ? {
                  ...spot,
                  width: Number(Math.max(2, resizingSpot.startWidth + deltaWidthPercent).toFixed(1)),
                  height: Number(Math.max(2, resizingSpot.startHeight + deltaHeightPercent).toFixed(1)),
                }
              : spot
          )
        );
      } else if (resizingSpot.id.startsWith('brooch_sub_')) {
        const broochId = resizingSpot.id.split('brooch_sub_')[1];
        setBroochSubSpots((prev) =>
          prev.map((spot) =>
            spot.id === broochId
              ? {
                  ...spot,
                  width: Number(Math.max(2, resizingSpot.startWidth + deltaWidthPercent).toFixed(1)),
                  height: Number(Math.max(2, resizingSpot.startHeight + deltaHeightPercent).toFixed(1)),
                }
              : spot
          )
        );
      } else if (resizingSpot.id.startsWith('brooch_popup_')) {
        const broochId = resizingSpot.id.split('brooch_popup_')[1];
        setBroochPopupSpots((prev) =>
          prev.map((spot) =>
            spot.id === broochId
              ? {
                  ...spot,
                  width: Number(Math.max(2, resizingSpot.startWidth + deltaWidthPercent).toFixed(1)),
                  height: Number(Math.max(2, resizingSpot.startHeight + deltaHeightPercent).toFixed(1)),
                }
              : spot
          )
        );
      } else if (resizingSpot.id.startsWith('talik_popup_')) {
        const talikId = parseInt(resizingSpot.id.split('talik_popup_')[1]);
        setTalikPopupSpots((prev) =>
          prev.map((spot) =>
            spot.id === talikId
              ? {
                  ...spot,
                  width: Number(Math.max(2, resizingSpot.startWidth + deltaWidthPercent).toFixed(1)),
                  height: Number(Math.max(2, resizingSpot.startHeight + deltaHeightPercent).toFixed(1)),
                }
              : spot
          )
        );
      } else {
        setLocalHotspots((prev) =>
          prev.map((spot) =>
            spot.id === resizingSpot.id
              ? {
                  ...spot,
                  width: Number(Math.max(2, resizingSpot.startWidth + deltaWidthPercent).toFixed(1)),
                  height: Number(Math.max(2, resizingSpot.startHeight + deltaHeightPercent).toFixed(1)),
                }
              : spot
          )
        );
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!editMode) return;
    if (draggingSpot) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setDraggingSpot(null);
    }
    if (resizingSpot) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setResizingSpot(null);
    }
  };

  const navItems = [
    { id: "character", label: "Буст Персонажа" },
    { id: "exp", label: "Калькулятор Опыта" },
    { id: "stream", label: "Стрим" },
    { id: "referral", label: "Рефералка" },
  ] as const;

  const handleTabChange = (
    tab: "home" | "character" | "exp" | "referral" | "stream",
  ) => {
    setMainTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans relative flex flex-col selection:bg-cyan-900/50 overflow-x-hidden">
      {/* Background Video Setup */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          src="/Samurai.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-[0.35] select-none mix-blend-screen"
        />
        {/* Gradients to darken edges and create focal point */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/10 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Mobile Menu Toggle (Floating) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 text-neutral-400 bg-black/60 border border-white/10 w-10 h-10 flex items-center justify-center rounded-lg hover:text-white hover:bg-white/10 transition-colors lg:hidden backdrop-blur-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Floating actions right side */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 z-30 flex items-center gap-1">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-8 h-8 md:w-9 md:h-9 border border-white/10 bg-black/60 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          title={isMuted ? "Включить звук" : "Выключить звук"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <button
          onClick={() => setMainTab("home")}
          className="w-8 h-8 md:w-9 md:h-9 border border-white/10 bg-black/60 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Home size={14} />
        </button>
        <button className="h-8 md:h-9 px-3 md:px-4 border border-white/10 bg-black/60 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors text-[10px] md:text-[11px] tracking-widest uppercase">
          <span className="hidden sm:inline">Последние обновления</span>
          <span className="sm:hidden">Обновления</span>
          <span className="ml-1.5 md:ml-2 pt-0.5 font-serif text-cyan-400 text-base md:text-lg leading-none">
            &gt;
          </span>
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col lg:flex-row">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:sticky lg:top-[50px] left-0 w-64 h-[calc(100vh-50px)] shrink-0 flex flex-col pt-8 lg:pt-0 lg:justify-center pl-8 lg:pl-16 z-50 bg-black/90 lg:bg-transparent border-r border-white/5 lg:border-none transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="relative pb-6 mb-4">
            <div className="absolute left-0 bottom-0 w-48 h-[1px] bg-gradient-to-r from-cyan-400/80 via-cyan-600/30 to-transparent"></div>

            <button
              onClick={() => handleTabChange("home")}
              className={`flex items-center gap-2 group transition-colors ${mainTab === "home" ? "text-cyan-400" : "text-neutral-400 hover:text-cyan-300"}`}
            >
              <div
                className={`w-1.5 h-1.5 rotate-45 border ${mainTab === "home" ? "border-cyan-400 bg-cyan-400/20" : "border-neutral-500 group-hover:border-cyan-300"}`}
              ></div>
              <span className="text-[13px] font-bold tracking-widest uppercase">
                ГЛАВНАЯ
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-4 pl-3.5 mt-2 lg:mt-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center gap-3 text-left transition-colors text-[12px] tracking-widest uppercase group ${mainTab === item.id ? "text-cyan-300" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                <div
                  className={`w-1 h-1 rotate-45 border transition-colors ${mainTab === item.id ? "border-cyan-400 bg-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "border-neutral-600 group-hover:border-neutral-400"}`}
                />
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 relative flex flex-col min-w-0">
          <div className="flex flex-col w-full pb-32">
            {mainTab === "home" && (
              <motion.div
                id="section-home"
                initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center pt-[15vh] pb-[15vh] min-h-[90vh] overflow-x-hidden w-full relative"
              >
                {/* Giant metallic text effect using overlapping gradients */}
                <div className="relative mb-6">
                  <h1
                    className="text-6xl sm:text-7xl md:text-[80px] lg:text-[110px] xl:text-[130px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900/50 tracking-[0.15em] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] filter mb-4 text-center pb-4 font-serif uppercase"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
                  >
                    WaralinnPlay
                  </h1>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm"></div>
                  <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full mix-blend-screen pointer-events-none -z-10"></div>
                </div>
              </motion.div>
            )}

            {["character", "exp", "referral", "stream"].includes(mainTab) && (
            <div className="w-full max-w-[1500px] mx-auto bg-black/50 backdrop-blur-xl border border-white/5 relative overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10 w-full flex flex-col">
                {/* Content Injection Points */}

                {mainTab === "character" && (
                <motion.div
                  id="section-character"
                  initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="p-4 sm:p-6 md:p-12 border-b border-white/5 min-h-[90vh] pb-24 overflow-x-hidden"
                >
                  {/* Header section */}
                  <div className="mb-6 lg:mb-10 z-10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
                      <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                        {!editMode && activeTab !== "equipment" && activeTab !== "agathion" && activeTab !== "krujki" && activeTab !== "skaz1" && activeTab !== "skaz2" && activeTab !== "koll" && (
                          <button
                            onClick={() => {
                              setActiveTab("equipment");
                              setEditMode(true);
                            }}
                            className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold uppercase tracking-wider text-sm transition-all px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 w-full md:w-auto"
                          >
                            <span className="w-2 h-2 rounded-full bg-cyan-500 opacity-50 animate-pulse"></span>
                            Редактор
                          </button>
                        )}
                        {!editMode && (activeTab === "equipment" || activeTab === "agathion" || activeTab === "krujki" || activeTab === "skaz1" || activeTab === "skaz2" || activeTab === "koll" || activeTab === "relic") && (
                          <button
                            onClick={() => setEditMode(true)}
                            className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold uppercase tracking-wider text-sm transition-all px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 w-full md:w-auto"
                          >
                            <span className="w-2 h-2 rounded-full bg-cyan-500 opacity-50 animate-pulse"></span>
                            Редактор
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {activeTab === "equipment" && (
                    <div 
                      className="flex flex-col xl:flex-row justify-center items-start animate-in fade-in slide-in-from-bottom-4 duration-500 xl:px-4"
                      style={{ gap: panelGap > 0 ? panelGap : 16 }}
                    >
                      {/* Left side: Character inventory image */}
                      <motion.div 
                        drag={editMode}
                        dragMomentum={false}
                        animate={{ x: inventoryOffset.x, y: inventoryOffset.y }}
                        onDragEnd={(e, info) => setInventoryOffset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
                        className={`relative shrink-0 mx-auto xl:mx-0 w-full transition-all duration-300 ${editMode ? 'cursor-grab active:cursor-grabbing z-50' : ''}`}
                        style={{ maxWidth: editMode || mainImageWidth !== 360 ? mainImageWidth : undefined }}
                        // Keep default classes if not edited
                        {...(editMode || mainImageWidth !== 360 ? {} : { className: "relative shrink-0 mx-auto xl:mx-0 w-full max-w-[260px] md:max-w-[300px] xl:max-w-[360px]" })}
                      >
                        {editMode && (
                          <div className="absolute -top-10 left-0 right-0 py-2 px-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-200 text-xs text-center font-medium animate-in fade-in">
                            Режим редактора. Перетаскивайте и меняйте размер точек.
                          </div>
                        )}
                        <div className="relative rounded-xl border border-neutral-700/50 bg-[#111119] overflow-hidden shadow-2xl p-2 md:p-3 group">
                          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                          <div 
                            ref={imageContainerRef}
                            className={`relative w-full rounded-md overflow-hidden bg-black/40 border border-neutral-800/80 ${editMode ? "touch-none cursor-crosshair" : ""}`}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerLeave={handlePointerUp}
                          >

                            <img
                              src="/1.png?v=3"
                              alt="Character Inventory"
                              className="block w-full h-auto drop-shadow-xl select-none pointer-events-none"
                            />

                            {/* Hotspots */}
                            {localHotspots.map((spot) => (
                              <div
                                key={spot.id}
                                tabIndex={0}
                                onPointerDown={(e) => handlePointerDown(spot.id, e)}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (editMode) return;
                                  if (spot.isBook) setActiveTab("map");
                                  else if (spot.isKrujki) setActiveTab("krujki");
                                  else if (spot.id === "bracelet_karla") {
                                    setShowKarlaPopup(!showKarlaPopup);
                                    setShowAgat6(false);
                                    setShowBroochPopup(false);
                                  } else if (spot.isAgathion) {
                                    setShowAgat6(!showAgat6);
                                    setShowBroochPopup(false);
                                    setShowKarlaPopup(false);
                                  } else if (spot.id === "brooch") {
                                    setShowBroochPopup(!showBroochPopup);
                                    setShowAgat6(false);
                                    setShowKarlaPopup(false);
                                  }
                                  setHoveredSpot(spot);
                                  if (window.innerWidth < 1280 && !spot.isAgathion) {
                                    document
                                      .getElementById("stats-panel")
                                      ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                      });
                                  }
                                }}
                                onMouseEnter={() => {
                                  if (!editMode) setHoveredSpot(spot);
                                }}
                                onFocus={() => {
                                  if (!editMode) setHoveredSpot(spot);
                                }}
                                className={`absolute rounded-md transition-all duration-75 z-20 focus:outline-none ${!editMode ? "cursor-pointer" : "cursor-move"} ${
                                  !editMode && hoveredSpot?.id === spot.id
                                    ? "bg-purple-500/10 border-2 border-purple-500 shadow-[inset_0_0_15px_rgba(168,85,247,0.4),0_0_15px_rgba(168,85,247,0.8)] z-30"
                                    : editMode ? "bg-cyan-500/30 border border-cyan-400 group-hover:bg-cyan-500/50" : "hover:bg-white/10 focus:bg-white/10 border-transparent hover:border hover:border-white/20"
                                }`}
                                style={{
                                  top: `${spot.top}%`,
                                  left: `${spot.left}%`,
                                  width: `${spot.width || 22.5}%`,
                                  height: `${spot.height || 11.2}%`,
                                  boxShadow: editMode && draggingSpot?.id === spot.id ? '0 0 0 2px white' : undefined
                                }}
                              >
                                {editMode && (
                                  <div 
                                    className="absolute bottom-0 right-0 w-4 h-4 bg-white/50 cursor-nwse-resize rounded-tl-md"
                                    onPointerDown={(e) => handleResizePointerDown(spot.id, e)}
                                  />
                                )}
                                {editMode && (
                                  <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-mono pointer-events-none drop-shadow-md overflow-hidden bg-black/20">
                                    {spot.id}
                                  </div>
                                )}
                              </div>
                            ))}

                            {/* Brooch Stones directly on main image */}
                            {broochSubSpots.map((spot) => (
                              <div
                                key={`main_${spot.id}`}
                                tabIndex={0}
                                className={`absolute rounded-md transition-all duration-75 z-20 focus:outline-none ${!editMode ? "cursor-pointer" : "cursor-move"} ${
                                  !editMode && hoveredBroochStone === spot.id
                                    ? "bg-purple-500/10 border-2 border-purple-500 shadow-[inset_0_0_15px_rgba(168,85,247,0.4),0_0_15px_rgba(168,85,247,0.8)] z-30"
                                    : editMode ? "bg-pink-500/30 border border-pink-400 hover:bg-pink-500/50" : "hover:bg-white/10 focus:bg-white/10 border-transparent hover:border hover:border-white/20"
                                }`}
                                onMouseEnter={() => !editMode && setHoveredBroochStone(spot.id)}
                                onMouseLeave={() => !editMode && setHoveredBroochStone(null)}
                                onPointerDown={(e) => handlePointerDown(`brooch_sub_${spot.id}`, e)}
                                style={{
                                  top: `${spot.top}%`,
                                  left: `${spot.left}%`,
                                  width: `${spot.width}%`,
                                  height: `${spot.height}%`,
                                  boxShadow: editMode && draggingSpot?.id === `brooch_sub_${spot.id}` ? '0 0 0 2px white' : undefined
                                }}
                              >
                                {editMode && (
                                  <div 
                                    className="absolute bottom-0 right-0 w-4 h-4 bg-white/50 cursor-nwse-resize rounded-tl-md"
                                    onPointerDown={(e) => handleResizePointerDown(`brooch_sub_${spot.id}`, e)}
                                  />
                                )}
                                {editMode && (
                                  <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-mono pointer-events-none drop-shadow-md overflow-hidden bg-black/20">
                                    {spot.id}
                                  </div>
                                )}
                              </div>
                            ))}

                            {/* Agat6 Popup */}
                            {showAgat6 && (
                              <div
                                className="absolute z-30 pointer-events-auto shadow-2xl animate-in zoom-in-95 duration-200"
                                style={{
                                  top: `${agat6Top}%`,
                                  left: `${agat6Left}%`,
                                  width: `${agat6WidthPct}%`,
                                }}
                              >
                                <div className="relative w-full h-full">
                                  <img
                                    src="/Agat12.png"
                                    alt="Agathion popup"
                                    className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                                    onClick={(e) => {
                                      if (!editMode) {
                                        setShowAgat6(false);
                                      }
                                    }}
                                  />
                                  {/* Hover areas for 5 agathions */}
                                  <div 
                                    className="absolute inset-0 w-full h-full"
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    onPointerLeave={handlePointerUp}
                                  >
                                    {agatSubSpots.map((spot) => (
                                      <div
                                        key={spot.id}
                                        tabIndex={0}
                                        className={`absolute rounded-md transition-all duration-75 z-20 focus:outline-none ${!editMode ? "cursor-pointer" : "cursor-move"} ${
                                          !editMode && hoveredAgat === spot.id
                                            ? "bg-purple-500/10 border-2 border-purple-500 shadow-[inset_0_0_15px_rgba(168,85,247,0.4),0_0_15px_rgba(168,85,247,0.8)] z-30"
                                            : editMode ? "bg-cyan-500/30 border border-cyan-400 hover:bg-cyan-500/50" : "hover:bg-white/10 focus:bg-white/10 border-transparent hover:border hover:border-white/20"
                                        }`}
                                        onMouseEnter={() => !editMode && setHoveredAgat(spot.id)}
                                        onMouseLeave={() => !editMode && setHoveredAgat(null)}
                                        onPointerDown={(e) => handlePointerDown(`agat_sub_${spot.id}`, e)}
                                        style={{
                                          top: `${spot.top}%`,
                                          left: `${spot.left}%`,
                                          width: `${spot.width}%`,
                                          height: `${spot.height}%`,
                                          boxShadow: editMode && draggingSpot?.id === `agat_sub_${spot.id}` ? '0 0 0 2px white' : undefined
                                        }}
                                      >
                                        {editMode && (
                                          <div 
                                            className="absolute bottom-0 right-0 w-4 h-4 bg-white/50 cursor-nwse-resize rounded-tl-md"
                                            onPointerDown={(e) => handleResizePointerDown(`agat_sub_${spot.id}`, e)}
                                          />
                                        )}
                                        {editMode && (
                                          <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-mono pointer-events-none drop-shadow-md overflow-hidden bg-black/20">
                                            Agat {spot.id}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Brooch Popup */}
                            {showBroochPopup && (
                              <div
                                className="absolute z-30 pointer-events-auto shadow-2xl animate-in zoom-in-95 duration-200"
                                style={{
                                  top: `${agat6Top}%`,
                                  left: `${agat6Left}%`,
                                  width: `${agat6WidthPct}%`,
                                }}
                              >
                                <div className="relative w-full h-full">
                                  <img
                                    src="/Ston.png"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    alt="Brooch stones popup"
                                    className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] rounded-md"
                                    onClick={(e) => {
                                      if (!editMode) {
                                        setShowBroochPopup(false);
                                      }
                                    }}
                                  />
                                  {/* Hover areas for brooch stones in popup */}
                                  <div 
                                    className="absolute inset-0 w-full h-full"
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    onPointerLeave={handlePointerUp}
                                  >
                                    {broochPopupSpots.map((spot) => (
                                      <div
                                        key={`popup_${spot.id}`}
                                        tabIndex={0}
                                        className={`absolute rounded-md transition-all duration-75 z-20 focus:outline-none ${!editMode ? "cursor-pointer" : "cursor-move"} ${
                                          !editMode && hoveredBroochStone === spot.id
                                            ? "bg-purple-500/10 border-2 border-purple-500 shadow-[inset_0_0_15px_rgba(168,85,247,0.4),0_0_15px_rgba(168,85,247,0.8)] z-30"
                                            : editMode ? "bg-cyan-500/30 border border-cyan-400 hover:bg-cyan-500/50" : "hover:bg-white/10 focus:bg-white/10 border-transparent hover:border hover:border-white/20"
                                        }`}
                                        onMouseEnter={() => !editMode && setHoveredBroochStone(spot.id)}
                                        onMouseLeave={() => !editMode && setHoveredBroochStone(null)}
                                        onPointerDown={(e) => handlePointerDown(`brooch_popup_${spot.id}`, e)}
                                        style={{
                                          top: `${spot.top}%`,
                                          left: `${spot.left}%`,
                                          width: `${spot.width}%`,
                                          height: `${spot.height}%`,
                                          boxShadow: editMode && draggingSpot?.id === `brooch_popup_${spot.id}` ? '0 0 0 2px white' : undefined
                                        }}
                                      >
                                        {editMode && (
                                          <div 
                                            className="absolute bottom-0 right-0 w-4 h-4 bg-white/50 cursor-nwse-resize rounded-tl-md"
                                            onPointerDown={(e) => handleResizePointerDown(`brooch_popup_${spot.id}`, e)}
                                          />
                                        )}
                                        {editMode && (
                                          <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-mono pointer-events-none drop-shadow-md overflow-hidden bg-black/20">
                                            {spot.id} (P)
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Karla Popup */}
                            {showKarlaPopup && (
                              <div
                                className="absolute z-30 pointer-events-auto shadow-2xl animate-in zoom-in-95 duration-200"
                                style={{
                                  top: `${agat6Top}%`,
                                  left: `${agat6Left}%`,
                                  width: `${agat6WidthPct}%`,
                                }}
                              >
                                <div className="relative w-full h-full">
                                  <img
                                    src="/Talik7.png"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    alt="Karla bracelet popup"
                                    className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] rounded-md"
                                    onClick={(e) => {
                                      if (!editMode) {
                                        setShowKarlaPopup(false);
                                      }
                                    }}
                                  />
                                  {/* Hover areas for talismans in popup */}
                                  <div 
                                    className="absolute inset-0 w-full h-full"
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    onPointerLeave={handlePointerUp}
                                  >
                                    {talikPopupSpots.map((spot) => (
                                      <div
                                        key={`talik_${spot.id}`}
                                        tabIndex={0}
                                        className={`absolute rounded-md transition-all duration-75 z-20 focus:outline-none ${!editMode ? "cursor-pointer" : "cursor-move"} ${
                                          !editMode && hoveredTalik === spot.id
                                            ? "bg-purple-500/10 border-2 border-purple-500 shadow-[inset_0_0_15px_rgba(168,85,247,0.4),0_0_15px_rgba(168,85,247,0.8)] z-30"
                                            : editMode ? "bg-cyan-500/30 border border-cyan-400 hover:bg-cyan-500/50" : "hover:bg-white/10 focus:bg-white/10 border-transparent hover:border hover:border-white/20"
                                        }`}
                                        onMouseEnter={() => !editMode && setHoveredTalik(spot.id)}
                                        onMouseLeave={() => !editMode && setHoveredTalik(null)}
                                        onPointerDown={(e) => handlePointerDown(`talik_popup_${spot.id}`, e)}
                                        style={{
                                          top: `${spot.top}%`,
                                          left: `${spot.left}%`,
                                          width: `${spot.width}%`,
                                          height: `${spot.height}%`,
                                          boxShadow: editMode && draggingSpot?.id === `talik_popup_${spot.id}` ? '0 0 0 2px white' : undefined
                                        }}
                                      >
                                        {editMode && (
                                          <div 
                                            className="absolute bottom-0 right-0 w-4 h-4 bg-white/50 cursor-nwse-resize rounded-tl-md"
                                            onPointerDown={(e) => handleResizePointerDown(`talik_popup_${spot.id}`, e)}
                                          />
                                        )}
                                        {editMode && (
                                          <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-mono pointer-events-none drop-shadow-md overflow-hidden bg-black/20">
                                            {spot.id} (P)
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>

                        <div className="mt-4 pointer-events-auto flex justify-center w-full relative z-40">
                          <div className="flex rounded-lg bg-[#111119]/80 border border-neutral-800/60 p-1 w-fit mx-auto backdrop-blur-sm shadow-xl flex-wrap justify-center gap-1">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveTab("koll"); }}
                              onPointerDown={(e) => e.stopPropagation()}
                              className={`px-3 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-200 hover:text-cyan-100 ${activeTab === 'koll' ? 'bg-white/10' : 'hover:bg-white/5'} rounded-md transition-all`}
                            >
                              Коллекция
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveTab("agathion"); }}
                              onPointerDown={(e) => e.stopPropagation()}
                              className="px-3 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-200 hover:text-cyan-100 hover:bg-white/5 rounded-md transition-all"
                            >
                              Гомункулы
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveTab("skaz1"); }}
                              onPointerDown={(e) => e.stopPropagation()}
                              className={`px-3 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-amber-200 hover:text-amber-100 ${activeTab === "skaz1" || activeTab === "skaz2" ? 'bg-white/10' : 'hover:bg-white/5'} rounded-md transition-all`}
                            >
                              Сказания
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveTab("krujki"); }}
                              onPointerDown={(e) => e.stopPropagation()}
                              className="px-3 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-purple-300 hover:text-purple-200 hover:bg-white/5 rounded-md transition-all"
                            >
                              Кружки Свержения
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveTab("relic"); }}
                              onPointerDown={(e) => e.stopPropagation()}
                              className={`px-3 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-rose-300 hover:text-rose-200 ${activeTab === "relic" ? 'bg-white/10' : 'hover:bg-white/5'} rounded-md transition-all`}
                            >
                              Мой Релик
                            </button>
                          </div>
                        </div>

                      </motion.div>

                      {/* Right side: Stats/Hovered info */}
                      <motion.div
                        drag={editMode}
                        dragMomentum={false}
                        animate={{ x: statsOffset.x, y: statsOffset.y }}
                        onDragEnd={(e, info) => setStatsOffset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
                        id="stats-panel"
                        className={`w-full h-fit xl:sticky xl:top-[120px] self-start scroll-mt-[120px] mx-auto xl:mx-0 ${editMode ? 'cursor-grab active:cursor-grabbing z-50' : ''}`}
                        style={{ maxWidth: popupImageWidth }}
                      >
                        {(hoveredSpot || hoveredAgat || hoveredBroochStone || hoveredTalik) ? (
                          <motion.div
                            key={hoveredTalik ? `talik-${hoveredTalik}` : hoveredBroochStone ? `brooch-${hoveredBroochStone}` : hoveredAgat ? `agat-${hoveredAgat}` : hoveredSpot?.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.15 }}
                            className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col"
                            style={{ minHeight: popupImageHeight + 60 }}
                          >
                            <div className="flex items-center justify-center flex-1 w-full h-full">
                              {(hoveredTalik || hoveredBroochStone || hoveredAgat || (hoveredSpot && hoveredSpot.img)) ? (
                                <img
                                  src={hoveredTalik ? `/${talikPopupSpots.find(s => s.id === hoveredTalik)?.img}` : hoveredBroochStone ? `/${broochSubSpots.find(s => s.id === hoveredBroochStone)?.img || broochPopupSpots.find(s => s.id === hoveredBroochStone)?.img}` : hoveredAgat ? `/Agat${hoveredAgat}.png` : (hoveredSpot && hoveredSpot.img) ? `/${hoveredSpot.img}` : ""}
                                  alt={hoveredTalik ? `Talisman ${hoveredTalik}` : hoveredBroochStone ? `Brooch Stone ${hoveredBroochStone}` : hoveredAgat ? `Agathion ${hoveredAgat}` : hoveredSpot ? `${hoveredSpot.id} stats` : ""}
                                  className="block max-w-full object-contain mx-auto transition-all duration-300"
                                  style={{ 
                                    height: popupImageHeight
                                  }}
                                />
                              ) : (hoveredSpot && hoveredSpot.isKrujki) ? (
                                <div className="text-purple-200 text-sm flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-purple-800/50 w-full h-full max-h-[200px] gap-2">
                                  <span className="text-lg font-bold">Кружки Свержения</span>
                                  <span className="text-center">Нажмите, чтобы открыть инвентарь кружек свержения.</span>
                                </div>
                              ) : null}
                            </div>
                            <div className="h-[60px] flex items-center mt-2">
                              {hoveredSpot?.isBook && !hoveredAgat && !hoveredBroochStone && !hoveredTalik && (
                                <div className="text-cyan-200 text-xs flex items-center bg-black/60 backdrop-blur-sm p-3 rounded border border-cyan-800/50 w-fit max-w-full">
                                  <Sparkles className="w-4 h-4 mr-2 shrink-0 text-cyan-400" />
                                  <span>
                                    Нажмите на книгу еще раз, чтобы открыть полную страницу коллекции артефактов.
                                  </span>
                                </div>
                              )}
                              {hoveredSpot?.isAgathion && !hoveredAgat && !hoveredTalik && (
                                <div className="text-amber-200 text-xs flex items-center bg-black/60 backdrop-blur-sm p-3 rounded border border-amber-800/50 w-fit max-w-full">
                                  <Sparkles className="w-4 h-4 mr-2 shrink-0 text-amber-400" />
                                  <span>
                                    Нажмите на предмет еще раз, чтобы закрыть окно с агатионами.
                                  </span>
                                </div>
                              )}
                              {hoveredSpot?.id === 'brooch' && !hoveredBroochStone && !hoveredTalik && (
                                <div className="text-pink-200 text-xs flex items-center bg-black/60 backdrop-blur-sm p-3 rounded border border-pink-800/50 w-fit max-w-full">
                                  <Sparkles className="w-4 h-4 mr-2 shrink-0 text-pink-400" />
                                  <span>
                                    Нажмите на брошь еще раз, чтобы закрыть окно с камнями.
                                  </span>
                                </div>
                              )}
                              {hoveredSpot?.id === 'bracelet_karla' && !hoveredTalik && !hoveredAgat && !hoveredBroochStone && (
                                <div className="text-orange-200 text-xs flex items-center bg-black/60 backdrop-blur-sm p-3 rounded border border-orange-800/50 w-fit max-w-full">
                                  <Sparkles className="w-4 h-4 mr-2 shrink-0 text-orange-400" />
                                  <span>
                                    Нажмите на браслет еще раз, чтобы закрыть окно с талисманами.
                                  </span>
                                </div>
                              )}

                            </div>
                          </motion.div>
                        ) : (
                          <div 
                            className="rounded-xl border border-neutral-800/80 border-dashed bg-white/[0.02] flex flex-col items-center justify-center p-8 text-center text-neutral-500 group transition-colors hover:bg-white/[0.04] hover:border-neutral-700 w-full"
                            style={{ height: popupImageHeight }}
                          >
                            <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <User className="text-neutral-600 w-8 h-8" />
                            </div>
                            <p className="text-lg text-neutral-400 mb-2">
                              Ничего не выбрано
                            </p>
                            <p className="text-sm px-4">
                              Наведите курсор (на ПК) или нажмите (на смартфоне)
                              на предмет в инвентаре, чтобы увидеть его
                              характеристики.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  )}

                  {activeTab === "koll" && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-500 pb-12 w-full">
                      <div className="border-b border-neutral-800 pb-6 mb-2">
                        <h2 className="text-3xl font-light text-amber-100 flex items-center gap-3">
                          <Package size={28} className="text-amber-500" />
                          <span>
                            Коллекция
                          </span>
                        </h2>
                        <p className="text-neutral-400 mt-2">
                          Скролльте вниз, чтобы просмотреть все изображения коллекции.
                        </p>
                      </div>

                      <div className="flex flex-col xl:flex-row items-start justify-center w-full mx-auto px-4 mt-4" style={{ maxWidth: editMode || kollMaxWidth !== 820 ? kollMaxWidth : 820, gap: kollGap }}>
                        <motion.div 
                          drag={editMode}
                          dragMomentum={false}
                          animate={{ x: koll1Offset.x, y: koll1Offset.y }}
                          onDragEnd={(e, info) => { e.stopPropagation(); setKoll1Offset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}}
                          className={`flex-shrink-0 relative ${editMode ? 'cursor-move ring-2 ring-cyan-500/50 rounded-2xl' : ''}`} 
                          style={{ width: editMode || koll1Width !== 330 ? koll1Width : 'auto', maxWidth: '100%' }}
                        >
                          <img 
                            src={`/Koll6.png?v=2`} 
                            alt="Коллекция 6" 
                            className="w-full h-auto drop-shadow-2xl rounded-2xl border border-neutral-700/60"
                          />
                        </motion.div>
                        <motion.div 
                          drag={editMode}
                          dragMomentum={false}
                          animate={{ x: koll2Offset.x, y: koll2Offset.y }}
                          onDragEnd={(e, info) => { e.stopPropagation(); setKoll2Offset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}}
                          className={`rounded-2xl border border-neutral-700/60 bg-gradient-to-b from-[#161622] to-[#0b0b14] p-2 md:p-4 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative z-10 ${editMode ? 'cursor-move ring-2 ring-cyan-500/50' : ''}`} 
                          style={{ width: editMode || koll2Width !== 500 ? koll2Width : 'auto', maxWidth: '100%' }}
                        >
                          <div className="w-full overflow-y-auto rounded-xl custom-scrollbar flex flex-col gap-4 bg-black/20 p-4" style={{ height: editMode || koll2Height !== 750 ? koll2Height : '75vh' }}>
                            {[1, 2, 3, 4, 5].map((idx) => (
                              <img
                                key={idx}
                                src={`/Koll${idx}.png`}
                                alt={`Коллекция ${idx}`}
                                className="w-full h-auto object-contain rounded-xl drop-shadow-2xl"
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {activeTab === "map" && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-500 pb-12 w-full">
                      <div className="border-b border-neutral-800 pb-6 mb-2">
                        <h2 className="text-3xl font-light text-amber-100 flex items-center gap-3">
                          <Package size={28} className="text-amber-500" />
                          <span>
                            Коллекции{" "}
                            <span className="font-bold">Артефактов</span>
                          </span>
                        </h2>
                        <p className="text-neutral-400 mt-2">
                          Полные страницы вашей коллекции артефактов.
                        </p>
                      </div>

                      <div className="flex flex-col xl:flex-row gap-6 items-stretch w-full max-w-[1920px] mx-auto justify-center px-4">
                        {["3.png", "4.png", "5.png"].map((img, index) => (
                          <motion.div
                            key={img}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full xl:w-1/3 flex flex-col rounded-2xl border border-neutral-700/60 bg-gradient-to-b from-[#161622] to-[#0b0b14] overflow-hidden p-3 md:p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                          >
                            <div className="flex items-center gap-3 mb-4 px-2">
                              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                              <h3 className="text-lg text-white font-medium">
                                Страница {index + 1}
                              </h3>
                            </div>
                            <div className="flex-1 flex justify-center items-center mt-4 bg-black/40 rounded-xl overflow-hidden">
                              <img
                                src={`/${img}`}
                                alt={`Artifact configuration ${index + 1}`}
                                className="w-full h-auto max-h-[85vh] object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "agathion" && (
                    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-right-8 duration-500 pb-4 w-full h-full justify-center">
                      <div className="border-b border-neutral-800 pb-2 mb-0 mt-[-10px] w-fit mx-auto xl:mx-0">
                        <h2 className="text-3xl font-light text-amber-100 flex items-center gap-3">
                          <Package size={28} className="text-amber-500" />
                          <span>
                            Ваши{" "}
                            <span className="font-bold">Гомункулы</span>
                          </span>
                        </h2>
                      </div>
                      <div className="flex justify-center items-center w-full mt-4">
                        <div
                          className="relative inline-block w-full"
                          style={{ maxWidth: editMode || gomMaxWidth !== 1200 ? gomMaxWidth : 1200 }}
                        >
                          <img
                            src="/Gom.png"
                            alt="Гомункулы"
                            className="w-full h-auto drop-shadow-2xl rounded-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "skaz1" && (
                    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-right-8 duration-500 pb-4 w-full h-full justify-center">
                      <div className="flex flex-wrap justify-center mb-4 gap-4 px-4 w-full mx-auto xl:mx-0">
                        <button
                          onClick={() => setActiveTab("skaz1")}
                          className="px-4 py-2 rounded-lg font-bold text-amber-100 bg-amber-500/20 border border-amber-500/50"
                        >
                          Сказания Героя
                        </button>
                        <button
                          onClick={() => setActiveTab("skaz2")}
                          className="px-4 py-2 rounded-lg font-bold text-amber-300 hover:text-amber-100 bg-amber-500/5 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all"
                        >
                          Сказания Героя - Странствия
                        </button>
                      </div>
                      <div className="flex justify-center items-center w-full mt-2">
                        <div
                          className="relative inline-block w-full"
                          style={{ maxWidth: editMode || skaz1MaxWidth !== 930 ? skaz1MaxWidth : 930 }}
                        >
                          <img
                            src="/Skaz1.png"
                            alt="Сказания Героя"
                            className="w-full h-auto drop-shadow-2xl rounded-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "skaz2" && (
                    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-right-8 duration-500 pb-4 w-full h-full justify-center">
                      <div className="flex flex-wrap justify-center mb-4 gap-4 px-4 w-full mx-auto xl:mx-0">
                        <button
                          onClick={() => setActiveTab("skaz1")}
                          className="px-4 py-2 rounded-lg font-bold text-amber-300 hover:text-amber-100 bg-amber-500/5 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all"
                        >
                          Сказания Героя
                        </button>
                        <button
                          onClick={() => setActiveTab("skaz2")}
                          className="px-4 py-2 rounded-lg font-bold text-amber-100 bg-amber-500/20 border border-amber-500/50"
                        >
                          Сказания Героя - Странствия
                        </button>
                      </div>
                      <div className="flex justify-center items-center w-full mt-2">
                        <div
                          className="relative inline-block w-full"
                          style={{ maxWidth: editMode || skaz2MaxWidth !== 930 ? skaz2MaxWidth : 930 }}
                        >
                          <img
                            src="/Skaz2.png"
                            alt="Сказания Героя - Странствия"
                            className="w-full h-auto drop-shadow-2xl rounded-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "krujki" && (
                    <motion.div 
                      drag={editMode}
                      dragMomentum={false}
                      animate={{ x: krujkiWrapOffset.x, y: krujkiWrapOffset.y }}
                      onDragEnd={(e, info) => setKrujkiWrapOffset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
                      className={`flex flex-col gap-3 animate-in fade-in slide-in-from-right-8 duration-500 pb-4 w-full h-full justify-center ${editMode ? 'cursor-grab active:cursor-grabbing z-50' : ''}`}
                    >
                      <motion.div 
                        drag={editMode}
                        dragMomentum={false}
                        animate={{ x: krujkiTitleOffset.x, y: krujkiTitleOffset.y }}
                        onDragEnd={(e, info) => { e.stopPropagation(); setKrujkiTitleOffset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}}
                        onPointerDown={(e) => e.stopPropagation()}
                        className={`border-b border-neutral-800 pb-2 mb-0 mt-[-10px] w-fit mx-auto xl:mx-0 ${editMode ? 'cursor-grab active:cursor-grabbing z-50' : ''}`}
                      >
                        <h2 className="text-3xl font-light text-purple-100 flex items-center gap-3">
                          <Package size={28} className="text-purple-500" />
                          <span>
                            Кружки{" "}
                            <span className="font-bold">Свержения</span>
                          </span>
                        </h2>
                        <p className="text-neutral-400 mt-2">
                          Ваши Кружки Свержения. Наведите на кружок, чтобы увидеть деталь.
                        </p>
                      </motion.div>

                      <div className="flex flex-col gap-6 items-center w-full max-w-[1920px] mx-auto px-4 mt-4 relative">
                        <motion.div 
                          drag={editMode}
                          dragMomentum={false}
                          animate={{ x: krujkiOffset.x, y: krujkiOffset.y }}
                          onDragEnd={(e, info) => { e.stopPropagation(); setKrujkiOffset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}}
                          onPointerDown={(e) => e.stopPropagation()}
                          className={`relative inline-block w-full ${editMode ? 'cursor-grab active:cursor-grabbing z-50' : ''}`}
                          style={{ maxWidth: editMode || krujkiWidth !== 800 ? krujkiWidth : 800 }}
                        >
                          <img
                            src="/Krujki.png?v=4"
                            alt="Кружки Свержения"
                            className="w-full h-auto drop-shadow-2xl rounded-2xl"
                          />
                          
                          {/* Hover areas for Krujki spots */}
                          <div 
                            className="absolute inset-0 w-full h-full"
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerLeave={handlePointerUp}
                          >
                            {krujkiSpots.map((spot) => (
                              <div
                                key={`krujok_${spot.id}`}
                                tabIndex={0}
                                className={`absolute rounded-full transition-all duration-75 z-20 focus:outline-none ${!editMode ? "cursor-pointer" : "cursor-move"} ${
                                  !editMode && hoveredKrujok === spot.id
                                    ? "bg-purple-500/20 border-2 border-purple-500 shadow-[inset_0_0_15px_rgba(168,85,247,0.6),0_0_20px_rgba(168,85,247,0.8)] z-30"
                                    : editMode ? "bg-purple-500/30 border border-purple-400 hover:bg-purple-500/50" : "hover:bg-white/10 focus:bg-white/10 border-transparent hover:border hover:border-white/20"
                                }`}
                                onMouseEnter={() => !editMode && setHoveredKrujok(spot.id)}
                                onMouseLeave={() => !editMode && setHoveredKrujok(null)}
                                onPointerDown={(e) => handlePointerDown(`krujok_${spot.id}`, e)}
                                style={{
                                  top: `${spot.top}%`,
                                  left: `${spot.left}%`,
                                  width: `${spot.width}%`,
                                  height: `${spot.height}%`,
                                  boxShadow: editMode && draggingSpot?.id === `krujok_${spot.id}` ? '0 0 0 2px white' : undefined
                                }}
                              >
                                {editMode && (
                                  <div 
                                    className="absolute -bottom-2 -right-2 w-4 h-4 bg-white rounded-sm cursor-nwse-resize z-50 border border-black shadow-sm touch-none"
                                    onPointerDown={(e) => handleResizePointerDown(`krujok_${spot.id}`, e)}
                                  />
                                )}
                              </div>
                            ))}
                          </div>

                          <AnimatePresence>
                            {hoveredKrujok && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-30 pointer-events-none shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
                                style={{
                                  top: `${(krujkiSpots.find(s => s.id === hoveredKrujok)?.top || 0) + (krujkiSpots.find(s => s.id === hoveredKrujok)?.height || 0) + 2}%`,
                                  left: `${krujkiSpots.find(s => s.id === hoveredKrujok)?.left}%`,
                                  width: '35%',
                                }}
                              >
                                <img
                                  src={`/${krujkiSpots.find(s => s.id === hoveredKrujok)?.img}?v=4`}
                                  alt={`Krujok ${hoveredKrujok}`}
                                  className="w-full h-auto"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "relic" && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-500 pb-12 w-full"
                    >
                      <div className="flex flex-col gap-4 border-b border-neutral-800 pb-6 mb-2">
                        <div className="flex items-center justify-center w-full">
                          {/* Sub-tabs Centered */}
                          <div className="flex bg-black/40 p-1 rounded-lg border border-neutral-700/50">
                            <button
                              onClick={() => setRelicSubTab("mine")}
                              className={`px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-md transition-all ${relicSubTab === "mine" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]" : "text-neutral-500 hover:text-neutral-300"}`}
                            >
                              Мой Релик
                            </button>
                            <button
                              onClick={() => setRelicSubTab("collection")}
                              className={`px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-md transition-all ${relicSubTab === "collection" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]" : "text-neutral-500 hover:text-neutral-300"}`}
                            >
                              Коллекция Реликвий
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center w-full mx-auto px-4">
                        {relicSubTab === "mine" ? (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1, x: relic1Offset.x, y: relic1Offset.y }}
                            drag={editMode}
                            dragMomentum={false}
                            onDragEnd={(e, info) => setRelic1Offset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
                            className={`w-full rounded-2xl border border-neutral-700/60 bg-gradient-to-b from-[#161622] to-[#0b0b14] p-2 md:p-4 shadow-[0_30px_60px_rgba(0,0,0,0.6)] ${editMode ? 'cursor-grab active:cursor-grabbing z-50' : ''}`}
                            style={{ maxWidth: relic1Width }}
                          >
                            <img 
                              src="/Meteor.png" 
                              alt="Мой Релик" 
                              className="w-full h-auto rounded-xl drop-shadow-2xl"
                            />
                          </motion.div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1, x: relic2Offset.x, y: relic2Offset.y }}
                            drag={editMode}
                            dragMomentum={false}
                            onDragEnd={(e, info) => setRelic2Offset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
                            className={`flex flex-col xl:flex-row w-full max-w-[1400px] justify-center items-start ${editMode ? 'cursor-grab active:cursor-grabbing z-50' : ''}`}
                            style={{ gap: relic2Gap }}
                          >
                            <div 
                              className="w-full xl:w-1/3 shrink-0"
                              style={{ maxWidth: relic2WidthLeft }}
                            >
                              <img 
                                src="/RelikKrujki.png" 
                                alt="Krujki" 
                                className="w-full h-auto rounded-2xl border border-neutral-800 shadow-xl"
                              />
                            </div>
                            <div 
                              className="w-full xl:w-2/3 rounded-2xl border border-neutral-700/60 bg-[#11111a] p-2 md:p-4 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                              style={{ maxWidth: relic2WidthRight }}
                            >
                              <div 
                                className="w-full overflow-y-auto rounded-xl custom-scrollbar flex flex-col gap-6 p-4"
                                style={{ height: relic2Height }}
                              >
                                {["Relik1.png", "Relik2.png", "Relik3.png", "RelikKrujki.png"].map((img, idx) => (
                                  <div key={idx} className="w-full shrink-0">
                                    <img
                                      src={`/${img}`}
                                      alt={`Реликвия ${idx + 1}`}
                                      className="w-full h-auto object-contain rounded-xl drop-shadow-2xl border border-white/5"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                </motion.div>
                )}

                {/* Referral Tab */}
                {mainTab === "exp" && (
          <ExpCalculator />
        )}

        {mainTab === "referral" && (
                <motion.div
                  id="section-referral"
                  initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="p-4 sm:p-6 md:p-12 border-b border-white/5 min-h-[80vh] flex flex-col justify-center pb-24 w-full mx-auto"
                >
                  <div className="mb-8 lg:mb-12 border-b border-neutral-800 pb-6 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600/90">
                      Партнерская программа
                    </h2>
                    <p className="text-neutral-400 text-lg">
                      Приглашайте друзей и получайте крутые бонусы за их игру!
                    </p>
                  </div>

                  <div className="flex flex-col xl:flex-row gap-8 items-start mb-12">
                    <div className="flex-1 w-full max-w-[800px] flex flex-col gap-6">
                      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                          Ваша реферальная ссылка
                        </h3>
                        <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full bg-black/60 border border-white/10 rounded-lg p-2 mb-8 relative z-10">
                          <input
                            type="text"
                            readOnly
                            value="https://waralinnplay.com/ref/1259902"
                            className="bg-transparent border-none outline-none text-cyan-100 font-mono flex-1 w-full px-4 py-2 sm:py-0 text-sm sm:text-base focus:ring-0"
                          />
                          <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 sm:py-2 rounded-md font-bold transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)] whitespace-nowrap">
                            Копировать
                          </button>
                        </div>

                        <h4 className="text-lg font-black text-cyan-400 mb-4 tracking-wider uppercase relative z-10">
                          Статистика
                        </h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                          <div className="bg-white/5 border border-white/10 p-5 rounded-lg text-center backdrop-blur-sm shadow-inner">
                            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
                              Переходов
                            </p>
                            <p className="text-3xl font-bold text-white">0</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-5 rounded-lg text-center backdrop-blur-sm shadow-inner">
                            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
                              Рег-ций
                            </p>
                            <p className="text-3xl font-bold text-white">0</p>
                          </div>
                          <div className="bg-white/5 border border-cyan-500/20 p-5 rounded-lg text-center backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
                              Активных
                            </p>
                            <p className="text-3xl font-bold text-green-400">
                              0
                            </p>
                          </div>
                          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/30 p-5 rounded-lg text-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                            <p className="text-cyan-200/70 text-xs uppercase tracking-widest mb-2">
                              Бонусы
                            </p>
                            <p className="text-3xl font-bold text-cyan-400">
                              0
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rewards Box */}
                    <div className="w-full xl:w-[600px] 2xl:w-[700px] shrink-0">
                      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-900/20 to-black/80 p-1 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl">
                        <div className="bg-black/60 rounded-xl p-6 h-full border border-white/5 overflow-hidden relative">
                          <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                            <Package size={160} className="text-cyan-500" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-cyan-400 mb-6 flex items-center gap-3 relative z-10 tracking-wide uppercase">
                            <Package className="w-6 h-6 md:w-8 md:h-8" />
                            Награды за приглашения
                          </h3>

                          <div className="relative z-10 w-full flex justify-center bg-black/40 rounded-lg border border-white/5 p-4 sm:p-6 shadow-inner">
                            <img
                              src="/изображение_2026-05-05_025611387.png"
                              alt="Куб Помощи Партнера"
                              className="w-full max-w-[550px] 2xl:max-w-[650px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                )}

                {/* Stream Tab */}
                {mainTab === "stream" && (
                <motion.div
                  id="section-stream"
                  initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="p-4 sm:p-6 md:p-12 min-h-[80vh] flex flex-col justify-center pb-24 w-full mx-auto"
                >
                  <div className="mb-6 lg:mb-10 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center md:justify-start gap-4">
                      Прямой Эфир
                      <span className="relative flex h-4 w-4 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                      </span>
                    </h2>
                    <p className="text-neutral-400 text-lg">
                      Следите за осадами, эпик боссами и турнирами в реальном
                      времени.
                    </p>
                  </div>

                  <div className="flex-1 w-full rounded-2xl overflow-hidden border border-neutral-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#050505] relative group flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                    {/* Fake video background using a cool dark pattern or image */}
                    <div className="absolute inset-0 opacity-30 mix-blend-screen bg-black" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/40 via-black to-black"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center animate-pulse">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center border-2 border-red-500/50 shadow-[0_0_50px_rgba(220,38,38,0.2)] mb-8">
                        <MonitorPlay
                          size={48}
                          className="ml-2 md:w-16 md:h-16"
                        />
                      </div>
                      <h3 className="text-2xl md:text-4xl font-black tracking-widest uppercase text-white mb-4">
                        Трансляция Оффлайн
                      </h3>
                      <p className="text-neutral-400 max-w-md">
                        Стример сейчас не в сети. Заходите во время вечерних
                        осад и респауна эпик боссов!
                      </p>
                    </div>

                    {/* Offline Banner Overlay */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-neutral-900/80 border border-neutral-700 rounded-lg font-bold text-neutral-400 uppercase text-xs tracking-widest backdrop-blur flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-neutral-600"></div>{" "}
                      Оффлайн
                    </div>
                  </div>
                </motion.div>
                )}
              </div>
            </div>
            )}
          </div>
        </main>
        
        {activeTab !== "equipment" && mainTab === "character" && (
           <button
             onClick={() => setActiveTab("equipment")}
             className="fixed z-[90] flex items-center justify-center gap-2 text-white font-semibold uppercase tracking-wider text-sm transition-all px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 shadow-[0_10px_40px_rgba(8,145,178,0.5)] border border-cyan-400"
             style={{ bottom: `${returnBtnBottom}px`, right: `${returnBtnRight}px` }}
           >
             Вернуться к инвентарю
           </button>
        )}

        {/* Floating Edit Panel */}
        {editMode && (
          <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-cyan-500/30 p-4 z-[100] flex flex-col md:flex-row items-center justify-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {activeTab === "equipment" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Главное инвентарь ({mainImageWidth}px)</label>
                    <input type="range" min="200" max="800" value={mainImageWidth} onChange={(e) => setMainImageWidth(Number(e.target.value))} className="w-32 accent-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Ширина всплывашки ({popupImageWidth}px)</label>
                    <input type="range" min="200" max="1000" value={popupImageWidth} onChange={(e) => setPopupImageWidth(Number(e.target.value))} className="w-32 accent-purple-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Высота всплывашки ({popupImageHeight}px)</label>
                    <input type="range" min="100" max="1200" value={popupImageHeight} onChange={(e) => setPopupImageHeight(Number(e.target.value))} className="w-32 accent-purple-500" />
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Расстояние между ними ({panelGap}px)</label>
                    <input type="range" min="0" max="100" value={panelGap} onChange={(e) => setPanelGap(Number(e.target.value))} className="w-32 accent-purple-500" />
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <label className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Agat6 X ({agat6Left}%)</label>
                    <input type="range" min="0" max="100" step="0.1" value={agat6Left} onChange={(e) => setAgat6Left(Number(e.target.value))} className="w-24 accent-green-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Agat6 Y ({agat6Top}%)</label>
                    <input type="range" min="0" max="100" step="0.1" value={agat6Top} onChange={(e) => setAgat6Top(Number(e.target.value))} className="w-24 accent-green-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Agat6 W ({agat6WidthPct}%)</label>
                    <input type="range" min="10" max="100" step="0.1" value={agat6WidthPct} onChange={(e) => setAgat6WidthPct(Number(e.target.value))} className="w-24 accent-green-500" />
                  </div>
                </>
              )}
              {activeTab === "agathion" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Ширина агатиона ({agathionWidth}%)</label>
                    <input type="range" min="10" max="100" value={agathionWidth} onChange={(e) => setAgathionWidth(Number(e.target.value))} className="w-32 accent-amber-500" />
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <label className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Макс. высота ({agathionHeight}px)</label>
                    <input type="range" min="100" max="800" value={agathionHeight} onChange={(e) => setAgathionHeight(Number(e.target.value))} className="w-32 accent-amber-500" />
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <label className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Ширина Гомункулов ({gomMaxWidth}px)</label>
                    <input type="range" min="100" max="1920" step="10" value={gomMaxWidth} onChange={(e) => setGomMaxWidth(Number(e.target.value))} className="w-32 accent-amber-500" />
                  </div>
                </>
              )}
              {activeTab === "skaz1" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Ширина Сказания Героя ({skaz1MaxWidth}px)</label>
                    <input type="range" min="100" max="1920" step="10" value={skaz1MaxWidth} onChange={(e) => setSkaz1MaxWidth(Number(e.target.value))} className="w-32 accent-amber-500" />
                  </div>
                </>
              )}
              {activeTab === "skaz2" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Ширина Стрн. ({skaz2MaxWidth}px)</label>
                    <input type="range" min="100" max="1920" step="10" value={skaz2MaxWidth} onChange={(e) => setSkaz2MaxWidth(Number(e.target.value))} className="w-32 accent-amber-500" />
                  </div>
                </>
              )}
              {activeTab === "koll" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Шир. Коллекции ({kollMaxWidth}px)</label>
                    <input type="range" min="100" max="1920" step="10" value={kollMaxWidth} onChange={(e) => setKollMaxWidth(Number(e.target.value))} className="w-32 accent-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <label className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Отступ между ({kollGap}px)</label>
                    <input type="range" min="0" max="100" step="1" value={kollGap} onChange={(e) => setKollGap(Number(e.target.value))} className="w-32 accent-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <label className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Шир. левого ({koll1Width}px)</label>
                    <input type="range" min="100" max="1920" step="5" value={koll1Width} onChange={(e) => setKoll1Width(Number(e.target.value))} className="w-32 accent-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Шир. правого ({koll2Width}px)</label>
                     <input type="range" min="100" max="1920" step="5" value={koll2Width} onChange={(e) => setKoll2Width(Number(e.target.value))} className="w-32 accent-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Выс. правого ({koll2Height}px)</label>
                     <input type="range" min="100" max="1920" step="5" value={koll2Height} onChange={(e) => setKoll2Height(Number(e.target.value))} className="w-32 accent-cyan-500" />
                  </div>
                </>
              )}
              {activeTab === "krujki" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Ширина контейнера ({krujkiWidth}px)</label>
                    <input type="range" min="100" max="1920" step="10" value={krujkiWidth} onChange={(e) => setKrujkiWidth(Number(e.target.value))} className="w-32 accent-purple-500" />
                  </div>
                </>
              )}
              {activeTab === "relic" && (
                <>
                  {relicSubTab === "mine" ? (
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Ширина 'Мой Релик' ({relic1Width}px)</label>
                      <input type="range" min="100" max="1920" step="10" value={relic1Width} onChange={(e) => setRelic1Width(Number(e.target.value))} className="w-32 accent-rose-500" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Шир. левого ({relic2WidthLeft}px)</label>
                        <input type="range" min="100" max="1000" step="5" value={relic2WidthLeft} onChange={(e) => setRelic2WidthLeft(Number(e.target.value))} className="w-32 accent-rose-500" />
                      </div>
                      <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                        <label className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Шир. правого ({relic2WidthRight}px)</label>
                        <input type="range" min="100" max="1500" step="10" value={relic2WidthRight} onChange={(e) => setRelic2WidthRight(Number(e.target.value))} className="w-32 accent-rose-500" />
                      </div>
                      <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                        <label className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Высота правого ({relic2Height}px)</label>
                        <input type="range" min="100" max="1200" step="10" value={relic2Height} onChange={(e) => setRelic2Height(Number(e.target.value))} className="w-32 accent-rose-500" />
                      </div>
                      <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                        <label className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Отступ между ({relic2Gap}px)</label>
                        <input type="range" min="0" max="200" step="1" value={relic2Gap} onChange={(e) => setRelic2Gap(Number(e.target.value))} className="w-32 accent-rose-500" />
                      </div>
                    </>
                  )}
                </>
              )}
              {activeTab !== "equipment" && mainTab === "character" && (
                <div className="flex flex-col gap-1 border-l border-white/10 pl-4 ml-2">
                  <label className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Кн. 'назад' (Отступ Прав/Низ)</label>
                  <div className="flex gap-2">
                    <input type="range" min="0" max="1920" step="1" value={returnBtnRight} onChange={(e) => setReturnBtnRight(Number(e.target.value))} className="w-20 accent-green-500" />
                    <input type="range" min="0" max="1920" step="1" value={returnBtnBottom} onChange={(e) => setReturnBtnBottom(Number(e.target.value))} className="w-20 accent-green-500" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
              <button
                onClick={() => {
                  const exportData = {
                    hotspots: localHotspots,
                    agatSubSpots: agatSubSpots,
                    broochSubSpots: broochSubSpots,
                    broochPopupSpots: broochPopupSpots,
                    talikPopupSpots: talikPopupSpots,
                    krujkiSpots: krujkiSpots,
                    layout: { mainImageWidth, popupImageWidth, popupImageHeight, panelGap, inventoryOffset, krujkiWrapOffset, krujkiOffset, krujkiTitleOffset, krujkiWidth, statsOffset, agathionWidth, agathionHeight, gomMaxWidth, skaz1MaxWidth, skaz2MaxWidth, kollMaxWidth, koll1Width, koll2Width, koll2Height, kollGap, koll1Offset, koll2Offset, agat6Top, agat6Left, agat6WidthPct, relic1Width, relic1Offset, relic2WidthLeft, relic2WidthRight, relic2Height, relic2Offset, relic2Gap, returnBtnRight, returnBtnBottom }
                  };
                  console.log(JSON.stringify(exportData, null, 2));
                  navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
                  alert('Скопировано в буфер обмена!');
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg border bg-purple-500/20 text-purple-200 border-purple-500/50 hover:bg-purple-500/40 transition-colors"
                title="Копировать JSON"
              >
                Сохранить (Копировать JSON)
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 text-xs font-bold rounded-lg border bg-cyan-500/20 text-cyan-200 border-cyan-500/50 hover:bg-cyan-500/40 transition-colors"
              >
                Выйти из редактора
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
