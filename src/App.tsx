/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Menu, X, ArrowRight, Check, ChevronLeft, ChevronRight, CarFront } from 'lucide-react';

const CATEGORIES = [
  { id: '01', title: 'Sedãs', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: '02', title: 'SUVs', image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: '03', title: 'Compactos', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: '04', title: 'Picapes', image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: '05', title: 'Elétricos', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800' }
];

interface Car {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  details: {
    year: string;
    mileage: string;
    transmission: string;
    fuel: string;
  }
}

const CATALOG_CARS: Car[] = [
  {
    id: 'car-1',
    name: 'BMW M5 Sedan',
    price: 'R$ 680.000',
    description: 'Um sedã esportivo com desempenho excepcional e luxo incomparável. O BMW M5 Sedan traz tração e estabilidade de sobra para curvas.',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: { year: '2023', mileage: '15.000 km', transmission: 'Automático', fuel: 'Híbrido' }
  },
  {
    id: 'car-2',
    name: 'Mercedes-Benz GLE',
    price: 'R$ 540.000',
    description: 'SUV premium que combina versatilidade com sofisticação em cada detalhe. O modelo focado em tecnologia e conforto para toda a família.',
    image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: { year: '2022', mileage: '25.000 km', transmission: 'Automático', fuel: 'Gasolina' }
  },
  {
    id: 'car-3',
    name: 'Audi A3 Sportback',
    price: 'R$ 210.000',
    description: 'Compacto premium, dinâmico e eficiente para o uso diário na cidade, mantendo uma pegada esportiva que traz adrenalina à pista.',
    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: { year: '2024', mileage: '0 km', transmission: 'Automático', fuel: 'Híbrido Leve' }
  },
  {
    id: 'car-4',
    name: 'Ford F-150',
    price: 'R$ 490.000',
    description: 'A picape mais vendida do mundo, com força e tecnologia para qualquer terreno. Motor robusto que não te deixa na mão perante os obstáculos.',
    image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: { year: '2023', mileage: '10.000 km', transmission: 'Automático', fuel: 'Diesel' }
  },
  {
    id: 'car-5',
    name: 'Porsche Taycan',
    price: 'R$ 890.000',
    description: 'Puro DNA esportivo em um veículo 100% elétrico de alta performance. Combinação de velocidade silenciosa com muito apelo visual.',
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: { year: '2023', mileage: '5.000 km', transmission: 'Automático', fuel: 'Elétrico' }
  },
  {
    id: 'car-6',
    name: 'Range Rover Velar',
    price: 'R$ 580.000',
    description: 'Design vanguardista e capacidade off-road em perfeito equilíbrio.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    details: { year: '2022', mileage: '18.000 km', transmission: 'Automático', fuel: 'Gasolina' }
  }
];

const CARS_BY_CATEGORY: Record<string, Car[]> = {
  '01': [
    {
      id: 'sedan-1', name: 'BMW 320i M Sport', price: 'R$ 320.000', description: 'Sedã premium com design esportivo e tecnologia de ponta. Perfeito para a cidade ou estrada.',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: { year: '2023', mileage: '12.000 km', transmission: 'Automático', fuel: 'Flex' }
    },
    {
      id: 'sedan-2', name: 'Honda Civic Touring', price: 'R$ 250.000', description: 'O sedã mais amado, com motorização turbo e design arrojado.',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
      details: { year: '2022', mileage: '25.000 km', transmission: 'Automático', fuel: 'Gasolina' }
    },
    {
      id: 'sedan-3', name: 'Toyota Corolla Altis', price: 'R$ 195.000', description: 'Confiabilidade extrema e baixo custo de manutenção. O sedã mais vendido.',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800',
      details: { year: '2024', mileage: '0 km', transmission: 'Automático', fuel: 'Híbrido' }
    },
    {
      id: 'sedan-4', name: 'Mercedes-Benz C300', price: 'R$ 380.000', description: 'Luxo em cada detalhe. Interior impecável, motorização suave e responsiva.',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      details: { year: '2021', mileage: '40.000 km', transmission: 'Automático', fuel: 'Gasolina' }
    },
    {
      id: 'sedan-5', name: 'Audi A4 Prestige', price: 'R$ 290.000', description: 'Tecnologia alemã de ponta. Silencioso, estável e extremamente rápido.',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0b6e?auto=format&fit=crop&q=80&w=800',
      details: { year: '2022', mileage: '18.000 km', transmission: 'Automático', fuel: 'Gasolina' }
    }
  ],
  '02': [
    {
      id: 'suv-1', name: 'Volkswagen Tiguan', price: 'R$ 240.000', description: 'SUV espaçoso com excelente dirigibilidade e pacote de segurança completo.',
      image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: { year: '2022', mileage: '30.000 km', transmission: 'Automático', fuel: 'Gasolina' }
    },
    {
      id: 'suv-2', name: 'Jeep Compass', price: 'R$ 180.000', description: 'O queridinho da categoria SUV no Brasil. Robusto, moderno e muito bem equipado.',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      details: { year: '2023', mileage: '15.000 km', transmission: 'Automático', fuel: 'Diesel' }
    },
    {
      id: 'suv-3', name: 'Volvo XC60', price: 'R$ 360.000', description: 'O ápice da segurança automobilística somado ao design sueco inconfundível.',
      image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800',
      details: { year: '2021', mileage: '45.000 km', transmission: 'Automático', fuel: 'Híbrido' }
    },
    {
      id: 'suv-4', name: 'Toyota SW4', price: 'R$ 390.000', description: 'Resistência lendária montada sobre chassi de picape. Preparada para qualquer desafio.',
      image: 'https://images.unsplash.com/photo-1625832962383-a75d1d64c01d?auto=format&fit=crop&q=80&w=800',
      details: { year: '2023', mileage: '20.000 km', transmission: 'Automático', fuel: 'Diesel' }
    },
    {
      id: 'suv-5', name: 'Hyundai Creta', price: 'R$ 145.000', description: 'Confortável para cidade e rodovia, custo-benefício que atende famílias perfeitamente.',
      image: 'https://images.unsplash.com/photo-1633501726002-30d88cb6eb20?auto=format&fit=crop&q=80&w=800',
      details: { year: '2024', mileage: '0 km', transmission: 'Automático', fuel: 'Flex' }
    }
  ],
  '03': [
    {
      id: 'comp-1', name: 'Audi A3 Sportback', price: 'R$ 210.000', description: 'Hatch potente e versátil, garantindo a dose certa de adrenalina na cidade.',
      image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: { year: '2024', mileage: '0 km', transmission: 'Automático', fuel: 'Híbrido Leve' }
    },
    {
      id: 'comp-2', name: 'Volkswagen Polo GTS', price: 'R$ 150.000', description: 'Um pocket rocket moderno. Dinâmica excelente com visual diferenciado.',
      image: 'https://images.unsplash.com/photo-1616422285623-14bf73fca9f1?auto=format&fit=crop&q=80&w=800',
      details: { year: '2023', mileage: '8.000 km', transmission: 'Automático', fuel: 'Flex' }
    },
    {
      id: 'comp-3', name: 'Chevrolet Onix Premier', price: 'R$ 115.000', description: 'O preferido dos brasileiros. Completo em tecnologia, seguro e muito econômico.',
      image: 'https://images.unsplash.com/photo-1629897184283-7c8dd76eab8e?auto=format&fit=crop&q=80&w=800',
      details: { year: '2024', mileage: '0 km', transmission: 'Automático', fuel: 'Flex' }
    },
    {
      id: 'comp-4', name: 'Peugeot 208 Style', price: 'R$ 98.000', description: 'Design felino e interior estilo i-Cockpit. A melhor experiência visual da categoria.',
      image: 'https://images.unsplash.com/photo-1627042531388-75f10b78cb47?auto=format&fit=crop&q=80&w=800',
      details: { year: '2023', mileage: '12.000 km', transmission: 'Automático', fuel: 'Flex' }
    },
    {
      id: 'comp-5', name: 'Hyundai HB20', price: 'R$ 105.000', description: 'Estilo próprio e manutenção de baixo custo. Excelente valor de revenda.',
      image: 'https://images.unsplash.com/photo-1590362891991-f705b6bcba96?auto=format&fit=crop&q=80&w=800',
      details: { year: '2024', mileage: '2.000 km', transmission: 'Manual', fuel: 'Flex' }
    }
  ],
  '04': [
    {
      id: 'pic-1', name: 'Ford F-150', price: 'R$ 490.000', description: 'Força bruta e tecnologia para encarar o campo a semana inteira.',
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: { year: '2023', mileage: '10.000 km', transmission: 'Automático', fuel: 'Diesel' }
    },
    {
      id: 'pic-2', name: 'Toyota Hilux SRX', price: 'R$ 340.000', description: 'A lenda das picapes. Inquebrável e preparada para qualquer trabalho pesado.',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      details: { year: '2022', mileage: '50.000 km', transmission: 'Automático', fuel: 'Diesel' }
    },
    {
      id: 'pic-3', name: 'Chevrolet S10 High Country', price: 'R$ 310.000', description: 'Potência e conforto andando juntos num só veículo utilitário.',
      image: 'https://images.unsplash.com/photo-1559404286-9acb765cb17c?auto=format&fit=crop&q=80&w=800',
      details: { year: '2023', mileage: '25.000 km', transmission: 'Automático', fuel: 'Diesel' }
    },
    {
      id: 'pic-4', name: 'Fiat Toro Volcano', price: 'R$ 195.000', description: 'O conforto de um SUV combinado à conveniência de uma caçamba espaçosa.',
      image: 'https://images.unsplash.com/photo-1601009804245-5d9c79e600bd?auto=format&fit=crop&q=80&w=800',
      details: { year: '2024', mileage: '0 km', transmission: 'Automático', fuel: 'Diesel' }
    },
    {
      id: 'pic-5', name: 'Ford Ranger XLT', price: 'R$ 280.000', description: 'Tecnologicamente avançada para a cidade, valente para todo o fora de estrada.',
      image: 'https://images.unsplash.com/photo-1622185135505-2d795003994e?auto=format&fit=crop&q=80&w=800',
      details: { year: '2022', mileage: '40.000 km', transmission: 'Automático', fuel: 'Diesel' }
    }
  ],
  '05': [
    {
      id: 'ev-1', name: 'Porsche Taycan', price: 'R$ 890.000', description: 'DNA Porsche 100% elétrico. O nível definitivo em performance limpa.',
      image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: { year: '2023', mileage: '5.000 km', transmission: 'Automático', fuel: 'Elétrico' }
    },
    {
      id: 'ev-2', name: 'Tesla Model 3 Long Range', price: 'R$ 480.000', description: 'O elétrico de referência, com aceleração insana e muita tecnologia embarcada.',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
      details: { year: '2022', mileage: '12.000 km', transmission: 'Automático', fuel: 'Elétrico' }
    },
    {
      id: 'ev-3', name: 'BYD Seal', price: 'R$ 296.000', description: 'Desempenho assustador e bateria ultra tecnológica a um preço incrível.',
      image: 'https://images.unsplash.com/photo-1698246014442-70b86a076722?auto=format&fit=crop&q=80&w=800',
      details: { year: '2024', mileage: '0 km', transmission: 'Automático', fuel: 'Elétrico' }
    },
    {
      id: 'ev-4', name: 'Volvo XC40 Recharge', price: 'R$ 340.000', description: 'Seguro, ecológico e poderoso, trazendo a nova identidade Volvo.',
      image: 'https://images.unsplash.com/photo-1642456488732-dddb46e50cd7?auto=format&fit=crop&q=80&w=800',
      details: { year: '2023', mileage: '18.000 km', transmission: 'Automático', fuel: 'Elétrico' }
    },
    {
      id: 'ev-5', name: 'Nissan Leaf', price: 'R$ 210.000', description: 'O elétrico de entrada ideal. Confortável, dócil no trânsito e sustentável.',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&q=80&w=800',
      details: { year: '2021', mileage: '35.000 km', transmission: 'Automático', fuel: 'Elétrico' }
    }
  ]
};

const TABS = [
  { id: 'financiamento', label: 'Financiamento' },
  { id: 'seguros', label: 'Seguros' },
  { id: 'garantia', label: 'Garantia' },
  { id: 'manutencao', label: 'Manutenção' },
  { id: 'trade-in', label: 'Câmbio e Trade-In' }
];

const TAB_CONTENT = {
  financiamento: [
    'Financiamento em até 60 meses com taxas competitivas',
    'Aprovação rápida com documentação simplificada',
    'Parcelas que cabem no seu bolso',
    'Trabalhamos com os melhores bancos'
  ],
  seguros: [
    'Parceria com as principais seguradoras do mercado',
    'Cotação rápida e sem compromisso',
    'Opções de cobertura completa ou parcial',
    'Proteção contra roubo, furto e colisões'
  ],
  garantia: [
    'Garantia de procedência para todos os veículos',
    'Garantia estendida opcional para motor e câmbio',
    'Veículos inspecionados em mais de 100 itens',
    'Assistência 24 horas disponível'
  ],
  manutencao: [
    'Revisões programadas com peças originais',
    'Equipe técnica altamente qualificada',
    'Orçamento transparente antes do serviço',
    'Agendamento online para sua comodidade'
  ],
  'trade-in': [
    'Avaliação justa e transparente do seu usado',
    'Use seu carro como entrada no novo',
    'Compramos seu veículo mesmo com dívidas',
    'Processo rápido e burocracia reduzida'
  ]
};

const BRAND_LOGOS: Record<string, string> = {
  'Audi': 'audi',
  'BMW': 'bmw',
  'Chevrolet': 'chevrolet',
  'Fiat': 'fiat',
  'Ford': 'ford',
  'Honda': 'honda',
  'Hyundai': 'hyundai',
  'Jeep': 'jeep',
  'Mercedes-Benz': 'mercedes-benz',
  'Nissan': 'nissan',
  'Peugeot': 'peugeot',
  'Porsche': 'porsche',
  'Range': 'land-rover', // maps "Range Rover" to Land Rover
  'Toyota': 'toyota',
  'Volkswagen': 'volkswagen',
  'Volvo': 'volvo',
  'Tesla': 'tesla',
  'BYD': 'byd'
};

const getBrandLogoUrl = (brand: string) => {
  const brandKey = BRAND_LOGOS[brand] || brand.toLowerCase();
  // Using carlogos.org as it provides nice full-color PNGs
  return `https://www.carlogos.org/car-logos/${brandKey}-logo.png`;
};

const CarDetails = ({ car, onBack, onTestDrive }: { car: Car, onBack: () => void, onTestDrive: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [brand, ...modelParts] = car.name.split(' ');
  const model = modelParts.join(' ');
  
  const brandLogoUrl = getBrandLogoUrl(brand);
  
  const gallery = [
    car.image,
    'https://images.unsplash.com/photo-1549314486-06497f225574?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200'
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-24 relative z-10 w-full">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm">
        <div className="w-full px-6 sm:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-zinc-900 hover:opacity-70 transition-opacity cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span className="font-semibold text-lg">Voltar</span>
            </button>
            <div className="font-bold text-xl tracking-tight uppercase text-zinc-900 cursor-pointer flex items-center gap-2" onClick={onBack}>
              <CarFront className="w-6 h-6" />
              NOVADRIVE
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full px-6 sm:px-12 lg:px-24">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl flex flex-col xl:flex-row border border-zinc-100">
          {/* Image Gallery */}
          <div className="xl:w-1/2 relative h-[400px] xl:h-auto min-h-[500px] group overflow-hidden">
            <AnimatePresence>
              <motion.img 
                key={currentImageIndex}
                src={gallery[currentImageIndex]} 
                alt={car.name} 
                className="absolute inset-0 w-full h-full object-cover" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent xl:hidden z-10 pointer-events-none" />
            
            {/* Gallery Navigation Arrows */}
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-zinc-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg backdrop-blur-sm cursor-pointer z-20">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-zinc-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg backdrop-blur-sm cursor-pointer z-20">
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Gallery Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {gallery.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </div>

          {/* Details Content */}
          <div className="xl:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col bg-[#f4f5f8] gap-4">
            
            {/* Main Info Card */}
            <div className="bg-white rounded-md shadow-sm border border-zinc-100 p-6 md:p-8">
              <div className="flex gap-4 md:gap-6 items-center">
                <div className="flex items-center w-14 h-14 md:w-16 md:h-16 justify-center">
                  <img 
                    src={brandLogoUrl} 
                    alt={`${brand} logo`} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const span = (e.target as HTMLImageElement).nextElementSibling;
                      if (span) (span as HTMLElement).style.display = 'block';
                    }}
                  />
                  <span 
                    className="hidden text-[#8B0024] font-black text-2xl md:text-3xl tracking-tighter uppercase leading-none" 
                    style={{ transform: 'scaleY(1.2)' }}
                  >
                    {brand}
                  </span>
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold text-zinc-800 uppercase">
                    {brand} <span className="text-[#FBB03B]">{model}</span>
                  </h1>
                  <p className="text-xs md:text-sm text-zinc-500 uppercase mt-1">
                    {car.name.includes("Argo") ? "1.0 FIREFLY FLEX DRIVE MANUAL 2026" : `${car.details.fuel} ${car.details.transmission} ${car.details.year}`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-8 border-t border-zinc-100 pt-6">
                <div>
                  <p className="text-zinc-500 text-[11px] md:text-[13px] mb-1">Ano</p>
                  <p className="font-bold text-[#1e293b] text-sm md:text-[15px]">{car.details.year}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[11px] md:text-[13px] mb-1">Câmbio</p>
                  <p className="font-bold text-[#1e293b] text-sm md:text-[15px] capitalize">{car.details.transmission}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[11px] md:text-[13px] mb-1">Combustível</p>
                  <p className="font-bold text-[#1e293b] text-sm md:text-[15px] capitalize">{car.details.fuel}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[11px] md:text-[13px] mb-1">Km</p>
                  <p className="font-bold text-[#1e293b] text-sm md:text-[15px]">{car.details.mileage.replace(' km', '')}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Info Card */}
            <div className="bg-white rounded-md shadow-sm border border-zinc-100 p-6 md:p-8 flex-1 flex flex-col">
              <h3 className="font-bold text-zinc-800 mb-3 text-sm md:text-[15px]">Informações do Veículo</h3>
              <p className="text-[13px] md:text-sm text-zinc-500 leading-relaxed uppercase mb-6">
                {car.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-6">
                <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-zinc-600 uppercase font-medium">
                  <Check className="w-4 h-4 text-[#25D366]" /> Ar Condicionado
                </div>
                <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-zinc-600 uppercase font-medium">
                  <Check className="w-4 h-4 text-[#25D366]" /> Direção Assistida
                </div>
                <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-zinc-600 uppercase font-medium">
                  <Check className="w-4 h-4 text-[#25D366]" /> Vidros e Travas Elétricas
                </div>
                <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-zinc-600 uppercase font-medium">
                  <Check className="w-4 h-4 text-[#25D366]" /> Freios ABS
                </div>
                <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-zinc-600 uppercase font-medium">
                  <Check className="w-4 h-4 text-[#25D366]" /> Airbags
                </div>
                <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-zinc-600 uppercase font-medium">
                  <Check className="w-4 h-4 text-[#25D366]" /> Central Multimídia
                </div>
              </div>

              <div className="mt-auto border-t border-zinc-100 pt-5">
                <p className="text-[11px] md:text-[12px] text-zinc-500 leading-relaxed uppercase text-justify">
                  <span className="font-bold text-zinc-700">REVISADO, HIGIENIZADO, PRONTA ENTREGA</span> • VEÍCULO COM GARANTIA E PROCEDÊNCIA • R. Hildemar Maia, 2725 - Buritizal, Macapá - AP, 68902-870 • R. Leopoldo Machado, 2020 Centro, Macapá - AP, 68900-067
                </p>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-md shadow-sm border border-zinc-100 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-[13px] text-zinc-500 font-medium mb-1">Preço Sugerido</p>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">{car.price}</div>
              </div>
              
              <button 
                onClick={onTestDrive}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-md font-bold text-[15px] active:scale-[0.98] transition-all whitespace-nowrap shadow-sm text-center cursor-pointer uppercase"
              >
                Tenho Interesse
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('financiamento');
  // Initialize with '02' active on desktop if preferred, or null. We'll use null for initial state.
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [selectedCategoryPage, setSelectedCategoryPage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      const bottom = Math.ceil(window.innerHeight + currentScrollY) >= document.documentElement.scrollHeight - 10;
      setIsAtBottom(bottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans relative">
      {selectedCar ? (
        <CarDetails 
          car={selectedCar} 
          onBack={() => setSelectedCar(null)} 
          onTestDrive={() => setIsTestDriveModalOpen(true)} 
        />
      ) : !selectedCategoryPage ? (
        <>
          {/* Navbar */}
          <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-zinc-950/70 backdrop-blur-md shadow-lg text-white border-b border-zinc-800' : 'bg-transparent text-white'}`}
            initial={{ y: 0 }}
            animate={{ 
              y: 0,
              paddingBottom: isAtBottom ? 24 : 0 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
        <div className="w-full px-6 sm:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <CarFront className="w-8 h-8" />
              <span className="font-bold text-2xl tracking-tight">NOVADRIVE</span>
              <span className="text-zinc-400 font-light text-xl">MOTORS</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <button onClick={scrollToCatalog} className="hover:text-zinc-300 transition-colors cursor-pointer">Veículos</button>
              <button onClick={() => setIsTestDriveModalOpen(true)} className="hover:text-zinc-300 transition-colors cursor-pointer">Test Drive</button>
              <a href="#" className="hover:text-zinc-300 transition-colors">Financiamento</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative min-h-[85vh] bg-zinc-900 flex items-center pb-24 lg:pb-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Car bg"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        <div className="relative w-full px-6 sm:px-12 lg:px-24 mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                Seu Carro<br />
                <span className="text-zinc-300">dos Sonhos<br />Aqui</span>
              </h1>
              <p className="text-xl text-zinc-300 max-w-lg">
                Encontre o veículo perfeito com as melhores condições de financiamento e
                atendimento personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsTestDriveModalOpen(true)}
                  className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Agendar Test Drive
                </button>
                <button 
                  onClick={scrollToCatalog}
                  className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Explorar Catálogo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financing Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full px-6 sm:px-12 lg:px-24 -mt-20 relative z-10 hidden sm:block"
      >
        <div className="bg-zinc-950 rounded-2xl p-8 md:p-10 text-white shadow-2xl overflow-hidden relative border border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Financiamento com Juros Especiais</h2>
              <p className="text-zinc-400 text-sm max-w-xl">
                Aproveite nossas taxas de financiamento exclusivas para comprar seu carro novo. Parcelamento em até 60 meses com aprovação rápida e documentação simplificada.
              </p>
            </div>
            <div className="w-full md:w-auto">
               <button className="w-full sm:w-auto px-6 py-4 bg-zinc-800 border-zinc-700 text-white text-sm font-semibold rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-between gap-8 border">
                 Simular Seu Financiamento <ArrowRight className="w-4 h-4 text-zinc-400" />
               </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Accordion */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full px-6 sm:px-12 lg:px-24 py-20"
      >
        <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] gap-2 md:gap-4 overflow-hidden">
          {CATEGORIES.map((cat, index) => {
            const isActive = hoveredCategory === cat.id || (hoveredCategory === null && index === 0);
            return (
              <div
                key={cat.id}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out bg-[#3a3a3a] bg-cover bg-center ${
                  isActive ? 'flex-[4] md:flex-[2]' : 'flex-[1]'
                }`}
                style={{ backgroundImage: `url('${cat.image}')` }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setSelectedCategoryPage(cat.id)}
              >
                {/* Background overlay with blur effect */}
                <div className={`absolute inset-0 transition-all duration-500 ease-out ${
                  isActive ? 'bg-black/20' : 'bg-black/60'
                }`} />
                
                <div className="relative h-full p-6 flex flex-col justify-between">
                  {/* Vertical title - shown when not hovered (desktop) */}
                  <div className={`hidden md:flex items-center justify-center h-full transition-all duration-500 ease-out ${
                    isActive ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                  }`}>
                    <div className="-rotate-90">
                      <h3 className="text-white text-[28px] font-bold tracking-[-1.4px] text-center whitespace-nowrap">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Horizontal title - shown when not hovered (mobile) */}
                  <div className={`flex md:hidden items-center justify-center h-full transition-all duration-500 ease-out ${
                    isActive ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                  }`}>
                    <h3 className="text-white text-xl font-bold tracking-[-1px] text-center whitespace-nowrap">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Horizontal content - shown when hovered */}
                  <div className={`absolute bottom-0 left-0 right-0 p-6 pointer-events-none transition-all duration-500 ease-out ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-white/60 text-[13px] font-mono leading-relaxed">{cat.id}</span>
                      <h4 className="text-white text-[28px] font-bold leading-[1.1] tracking-[-1.4px]">
                        {cat.title}
                      </h4>
                    </div>
                    <p className="text-white/90 text-sm max-w-xs mb-6">
                      Versatilidade e segurança para sua família, com o conforto que você precisa no dia a dia.
                    </p>

                    <button className="text-white text-sm font-medium tracking-[-0.28px] flex items-center gap-2 pointer-events-auto hover:text-white/80 transition-colors">
                      Saiba Mais <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Number - bottom left (only visible when not hovered) */}
                  <div className={`absolute bottom-6 left-6 text-white/60 text-[13px] font-mono transition-all duration-500 ease-out ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}>
                    {cat.id}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Catalog Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-20 bg-zinc-50"
        id="catalogo"
      >
        <div className="w-full px-6 sm:px-12 lg:px-24">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Catálogo de Veículos</h2>
              <p className="text-zinc-600 max-w-xl text-lg">
                Explore nossa seleção de veículos premium. Encontre o carro perfeito para o seu estilo de vida e conquiste as ruas.
              </p>
            </div>
            <button className="hidden sm:flex items-center gap-2 font-semibold hover:gap-3 transition-all pb-2">
              Ver Todo o Estoque <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATALOG_CARS.map((car) => (
              <div key={car.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-zinc-100/80 group flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide shadow-sm">
                    {car.details.year}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-3 tracking-[-0.02em]">{car.name}</h3>
                  <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">{car.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Quilometragem</span>
                      <span className="font-semibold text-sm text-zinc-900">{car.details.mileage}</span>
                    </div>
                    <div className="flex flex-col bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Combustível</span>
                      <span className="font-semibold text-sm text-zinc-900">{car.details.fuel}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                    <div className="text-2xl font-bold tracking-[-0.02em]">{car.price}</div>
                    <button 
                      onClick={() => setSelectedCar(car)}
                      className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition-transform hover:-translate-y-0.5 active:scale-95 shadow-md flex items-center justify-center whitespace-nowrap"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="sm:hidden w-full flex justify-center items-center gap-2 font-semibold bg-zinc-900 text-white p-4 rounded-xl mt-8">
            Ver Todo o Estoque <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-20"
      >
        <div className="w-full px-6 sm:px-12 lg:px-24">
          <h2 className="text-4xl font-bold mb-12">Compre com Segurança</h2>

          <div className="max-w-4xl">
            <div>
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 md:border-b md:border-zinc-200 pb-4">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border md:border-none ${
                      activeTab === tab.id
                        ? 'bg-zinc-900 border-zinc-900 text-white'
                        : 'bg-transparent border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {(TAB_CONTENT as any)[activeTab].map((item: string, index: number) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={`${activeTab}-${index}`}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center">
                      <Check className="w-3 h-3 text-zinc-600" />
                    </div>
                    <p className="text-zinc-600">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full px-6 sm:px-12 lg:px-24 py-10 pb-24"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#4a6b66] text-white p-10 md:p-14 rounded-[2rem] relative overflow-hidden flex flex-col justify-center min-h-[300px]">
             <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">Pacotes de Proteção<br />Completa e Seguro</h3>
              <p className="text-white/80 mb-8 max-w-sm">
                Proteja seu investimento com as melhores coberturas e parcerias do mercado.
              </p>
              <button className="flex items-center gap-2 font-semibold hover:gap-3 transition-all">
                Contratar Seguro <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-zinc-100 p-10 md:p-14 rounded-[2rem] flex flex-col justify-center relative overflow-hidden min-h-[300px]">
             <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-zinc-900">Confiança e<br />Transparência</h3>
              <p className="text-zinc-600 mb-8 max-w-sm">
                Somos uma concessionária comprometida com a satisfação do cliente. Oferecemos condições flexíveis.
              </p>
              <button className="flex items-center gap-2 font-semibold text-zinc-900 hover:gap-3 transition-all">
                Saiba Mais <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
        </>
      ) : (
        <div className="min-h-screen bg-zinc-50 pt-32 pb-24 relative z-10 w-full overflow-hidden">
          <motion.nav 
            className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
            initial={{ y: 0 }}
            animate={{ 
              y: 0,
              paddingBottom: isAtBottom ? 24 : 0 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="w-full px-6 sm:px-12 lg:px-24">
              <div className="flex items-center justify-between h-20">
                <button 
                  onClick={() => setSelectedCategoryPage(null)}
                  className="flex items-center gap-2 text-zinc-900 hover:opacity-70 transition-opacity"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  <span className="font-semibold text-lg">Voltar para Home</span>
                </button>
                <div className="font-bold text-xl tracking-tight uppercase text-zinc-900 cursor-pointer flex items-center gap-2" onClick={() => setSelectedCategoryPage(null)}>
                  <CarFront className="w-6 h-6" />
                  NOVADRIVE
                </div>
              </div>
            </div>
          </motion.nav>

          <div className="w-full px-6 sm:px-12 lg:px-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Escolha seu {CATEGORIES.find(c => c.id === selectedCategoryPage)?.title}
            </h2>
            <p className="text-zinc-600 mb-12 max-w-2xl text-lg">
              Confira nossa seleção exclusiva de veículos. Inspecionados, com garantia de procedência e as melhores condições do mercado.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(CARS_BY_CATEGORY[selectedCategoryPage] || []).map((car) => (
                <div key={car.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-zinc-100/80 group flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide shadow-sm">
                      {car.details.year}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-3 tracking-[-0.02em]">{car.name}</h3>
                    <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">{car.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex flex-col bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Quilometragem</span>
                        <span className="font-semibold text-sm text-zinc-900">{car.details.mileage}</span>
                      </div>
                      <div className="flex flex-col bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Combustível</span>
                        <span className="font-semibold text-sm text-zinc-900">{car.details.fuel}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                      <div className="text-2xl font-bold tracking-[-0.02em]">{car.price}</div>
                      <button 
                        onClick={() => setSelectedCar(car)}
                        className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition-transform hover:-translate-y-0.5 active:scale-95 shadow-md flex items-center justify-center whitespace-nowrap"
                      >
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Test Drive Modal */}
      {isTestDriveModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={() => setIsTestDriveModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10">
              <h3 className="text-3xl font-bold mb-2 tracking-tight">Agendar Test Drive</h3>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                Preencha seus dados e nossa equipe entrará em contato para confirmar o agendamento e o modelo desejado.
              </p>
              
              <form className="space-y-5" onSubmit={(e) => { 
                e.preventDefault(); 
                setIsTestDriveModalOpen(false); 
                alert('Agendamento solicitado com sucesso! Nossa equipe entrará em contato em breve.'); 
              }}>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Nome Completo</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Telefone / WhatsApp</label>
                  <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Modelo de Interesse</label>
                  <select required defaultValue={selectedCar?.id || ''} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all text-zinc-900 bg-white font-medium">
                    <option value="">Selecione um veículo da loja</option>
                    {[...CATALOG_CARS, ...Object.values(CARS_BY_CATEGORY).flat()].map(car => <option key={car.id} value={car.id}>{car.name}</option>)}
                  </select>
                </div>
                
                <button type="submit" className="w-full bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-zinc-800 active:scale-[0.98] transition-all mt-8 shadow-lg shadow-zinc-900/20">
                  Confirmar Agendamento
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

