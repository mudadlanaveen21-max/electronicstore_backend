import axios from "axios";

// Create centralized Axios instance
const api = axios.create({
  baseURL: "https://electronicstore-backend-0bkd.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

// Fallback seed data in case json-server is not running yet
export const defaultProducts = [
  {
    id: "1",
    name: "Apple iPhone 16 Pro Max",
    brand: "Apple",
    category: "Smartphones",
    price: 144900,
    rating: 4.9,
    stock: 15,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    description: "Engineered with aerospace-grade titanium and the powerhouse A18 Pro chip, delivering supreme gaming performance and studio-quality camera control.",
    warranty: "1 Year Manufacturer Warranty",
    features: [
      "A18 Pro chip with 6-core GPU",
      "6.9-inch Super Retina XDR OLED with ProMotion 120Hz",
      "48MP Ultra-Wide & 5x Telephoto optical zoom",
      "Dedicated Camera Control tactile button",
      "All-day battery life with USB-C 3.0 speeds"
    ]
  },
  {
    id: "2",
    name: "MacBook Pro 16\" M3 Max",
    brand: "Apple",
    category: "Laptops",
    price: 249900,
    rating: 4.9,
    stock: 8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    description: "Unrivaled professional laptop featuring Apple Silicon M3 Max, Liquid Retina XDR display, up to 22 hours of battery life, and complete port versatility.",
    warranty: "1 Year Apple Care Support",
    features: [
      "16-core CPU, 40-core GPU M3 Max processor",
      "36GB Unified Memory, 1TB blazing fast SSD",
      "16.2-inch Liquid Retina XDR with 1600 nits peak brightness",
      "Six-speaker sound system with Spatial Audio",
      "HDMI, SDXC slot, MagSafe 3, 3x Thunderbolt 4"
    ]
  },
  {
    id: "3",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 129999,
    rating: 4.8,
    stock: 12,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
    description: "Unleash Galaxy AI capabilities with titanium armor, integrated S-Pen stylus, and a 200MP camera sensor with quad telephoto zoom system.",
    warranty: "1 Year Samsung India Warranty",
    features: [
      "Snapdragon 8 Gen 3 for Galaxy",
      "6.8-inch Dynamic AMOLED 2X, 2600 nits brightness",
      "200MP Main + 50MP 5x Periscope Zoom",
      "Built-in S-Pen for sketching and note-taking",
      "Galaxy AI Live Translate and Circle to Search"
    ]
  },
  {
    id: "4",
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    category: "Audio",
    price: 29990,
    rating: 4.7,
    stock: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "Industry-leading noise canceling headphones with dual processors, 8 microphones, LDAC Hi-Res audio support, and ultra-comfortable lightweight design.",
    warranty: "1 Year Brand Warranty",
    features: [
      "Integrated Processor V1 & HD Noise Canceling QN1",
      "Auto NC Optimizer calibrating to environment",
      "Up to 30 hours battery life with quick charge",
      "Speak-to-Chat smart pause technology",
      "Crystal clear hands-free calling with beamforming mics"
    ]
  },
  {
    id: "5",
    name: "Dell XPS 15 OLED Laptop",
    brand: "Dell",
    category: "Laptops",
    price: 189900,
    rating: 4.6,
    stock: 6,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
    description: "Crafted from machined aluminum and carbon fiber, featuring a gorgeous 3.5K OLED InfinityEdge touch screen and NVIDIA GeForce RTX graphics.",
    warranty: "1 Year Dell Onsite Service",
    features: [
      "Intel Core i7-13700H 14-core processor",
      "NVIDIA GeForce RTX 4060 8GB GDDR6",
      "15.6-inch 3.5K OLED 400-nit touchscreen",
      "32GB DDR5 RAM & 1TB NVMe PCIe 4.0 SSD",
      "Quad-speaker design with Waves Nx 3D audio"
    ]
  },
  {
    id: "6",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "Wearables",
    price: 89900,
    rating: 4.9,
    stock: 10,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    description: "The ultimate sports and adventure smartwatch with rugged titanium case, precision dual-frequency GPS, and up to 36 hours normal battery life.",
    warranty: "1 Year Apple Warranty",
    features: [
      "49mm aerospace-grade titanium case",
      "Brightest display ever at 3000 nits peak brightness",
      "S9 SiP chip with Double Tap touchless gesture",
      "Precision dual-frequency GPS with compass waypoints",
      "Water resistance to 100m, certified for recreational diving"
    ]
  },
  {
    id: "7",
    name: "Sony PlayStation 5 Pro Console",
    brand: "Sony",
    category: "Gaming",
    price: 68990,
    rating: 4.9,
    stock: 7,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80",
    description: "Next-gen gaming beast featuring PlayStation Spectral Super Resolution (PSSR), advanced ray tracing, and 2TB high-speed solid-state drive.",
    warranty: "1 Year Sony Interactive Entertainment Warranty",
    features: [
      "Upgraded GPU with 67% more compute units",
      "PSSR AI-driven upscaling for razor-sharp 4K clarity",
      "2TB High-Speed Internal NVMe SSD",
      "DualSense Wireless Controller with Haptic Feedback",
      "Smooth high frame rates up to 120fps with VRR"
    ]
  },
  {
    id: "8",
    name: "Bose QuietComfort Ultra Earbuds",
    brand: "Bose",
    category: "Audio",
    price: 25900,
    rating: 4.6,
    stock: 19,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    description: "Revolutionary spatialized audio that places sound right in front of you, paired with world-class active noise cancellation and CustomTune tech.",
    warranty: "1 Year Bose Official Warranty",
    features: [
      "Bose Immersive Audio spatial soundstage",
      "CustomTune personalized sound calibration",
      "Quiet Mode, Aware Mode, and Immersion Mode",
      "Up to 24 hours total play time with USB-C case",
      "Touch controls for playback and volume"
    ]
  }
];

export default api;
