const fs = require('fs');

const userData = {
  "hotspots": [
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
  ],
  "agatSubSpots": [
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
  ],
  "broochSubSpots": [
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
  ],
  "broochPopupSpots": [
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
  ],
  "talikPopupSpots": [
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
  ],
  "krujkiSpots": [
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
  ],
  "layout": {
    "mainImageWidth": 360,
    "popupImageWidth": 655,
    "popupImageHeight": 846,
    "panelGap": 0,
    "inventoryOffset": {
      "x": -222.80001831054688,
      "y": -72.79998016357422
    },
    "krujkiWrapOffset": {
      "x": 0,
      "y": -50
    },
    "krujkiOffset": {
      "x": -68,
      "y": -69
    },
    "krujkiTitleOffset": {
      "x": -25,
      "y": -57
    },
    "krujkiWidth": 650,
    "statsOffset": {
      "x": -219,
      "y": -109
    },
    "agathionWidth": 30,
    "agathionHeight": 400,
    "gomMaxWidth": 730,
    "skaz1MaxWidth": 930,
    "skaz2MaxWidth": 930,
    "kollMaxWidth": 1010,
    "koll1Width": 455,
    "koll2Width": 900,
    "koll2Height": 750,
    "kollGap": 24,
    "koll1Offset": {
      "x": -205,
      "y": 2
    },
    "koll2Offset": {
      "x": 9,
      "y": -21
    },
    "agat6Top": 76,
    "agat6Left": 5.1,
    "agat6WidthPct": 88,
    "returnBtnRight": 7,
    "returnBtnBottom": 24
  }
};

let content = fs.readFileSync('./src/App.tsx', 'utf-8');

// Replace localHotspots
content = content.replace(/const \[localHotspots, setLocalHotspots\] = useState<HotspotConfig\[\]>\(\[\s*([\s\S]*?)\s*\]\);/, `const [localHotspots, setLocalHotspots] = useState<HotspotConfig[]>(\n    ${JSON.stringify(userData.hotspots, null, 2).replace(/\n/g, '\n    ')}\n  );`);

// Replace agatSubSpots
content = content.replace(/const \[agatSubSpots, setAgatSubSpots\] = useState<\{id: number, top: number, left: number, width: number, height: number\}\[\]>\(\[\s*([\s\S]*?)\s*\]\);/, `const [agatSubSpots, setAgatSubSpots] = useState<{id: number, top: number, left: number, width: number, height: number}[]>(\n    ${JSON.stringify(userData.agatSubSpots, null, 2).replace(/\n/g, '\n    ')}\n  );`);

// Replace broochSubSpots
content = content.replace(/const \[broochSubSpots, setBroochSubSpots\] = useState<\{id: string, img: string, top: number, left: number, width: number, height: number\}\[\]>\(\[\s*([\s\S]*?)\s*\]\);/, `const [broochSubSpots, setBroochSubSpots] = useState<{id: string, img: string, top: number, left: number, width: number, height: number}[]>(\n    ${JSON.stringify(userData.broochSubSpots, null, 2).replace(/\n/g, '\n    ')}\n  );`);

// Replace broochPopupSpots
content = content.replace(/const \[broochPopupSpots, setBroochPopupSpots\] = useState<\{id: string, img: string, top: number, left: number, width: number, height: number\}\[\]>\(\[\s*([\s\S]*?)\s*\]\);/, `const [broochPopupSpots, setBroochPopupSpots] = useState<{id: string, img: string, top: number, left: number, width: number, height: number}[]>(\n    ${JSON.stringify(userData.broochPopupSpots, null, 2).replace(/\n/g, '\n    ')}\n  );`);

// Replace talikPopupSpots
content = content.replace(/const \[talikPopupSpots, setTalikPopupSpots\] = useState<\{id: number, img: string, top: number, left: number, width: number, height: number\}\[\]>\(\[\s*([\s\S]*?)\s*\]\);/, `const [talikPopupSpots, setTalikPopupSpots] = useState<{id: number, img: string, top: number, left: number, width: number, height: number}[]>(\n    ${JSON.stringify(userData.talikPopupSpots, null, 2).replace(/\n/g, '\n    ')}\n  );`);

// Replace krujkiSpots
content = content.replace(/const \[krujkiSpots, setKrujkiSpots\] = useState<\{id: number, img: string, top: number, left: number, width: number, height: number\}\[\]>\(\[\s*([\s\S]*?)\s*\]\);/, `const [krujkiSpots, setKrujkiSpots] = useState<{id: number, img: string, top: number, left: number, width: number, height: number}[]>(\n    ${JSON.stringify(userData.krujkiSpots, null, 2).replace(/\n/g, '\n    ')}\n  );`);

// For layouts, we need to replace each useState for layout values.
const layout = userData.layout;
for (const [key, val] of Object.entries(layout)) {
  const camelKey = key.charAt(0).toUpperCase() + key.slice(1);
  const regex = new RegExp(`const \\[${key}, set${camelKey}\\] = useState(\\<.*?\\>)?\\((.*?)\\);`, 'g');
  if (typeof val === 'object') {
     content = content.replace(regex, `const [${key}, set${camelKey}] = useState(${JSON.stringify(val)});`);
  } else {
     content = content.replace(regex, `const [${key}, set${camelKey}] = useState(${JSON.stringify(val)});`);
  }
}

fs.writeFileSync('./src/App.tsx', content);
