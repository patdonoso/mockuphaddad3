export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  code?: string;
  capacity?: string;
}

export const categories = [
  "Todos",
  "Bidones",
  "Envases PET",
  "Combustibles",
  "Jardinería",
  "Hogar",
  "Laboratorio",
  "Industrial",
  "Camping",
  "Artículos de Salud",
];

export const products: Product[] = [
  // Bidones
  {
    id: "bidon-5l",
    name: "Bidón 5 Litros Standard",
    category: "Bidones",
    price: 400,
    image: "https://www.haddad.cl/img/bidon5.jpg",
    description: "Bidón de polietileno de alta densidad, ideal para almacenamiento de líquidos.",
    code: "BD-005",
    capacity: "5L"
  },
  {
    id: "bidon-10l",
    name: "Bidón 10 Litros Standard",
    category: "Bidones",
    price: 800,
    image: "https://www.haddad.cl/img/bidon10.jpg",
    description: "Bidón resistente para uso doméstico e industrial.",
    code: "BD-010",
    capacity: "10L"
  },
  {
    id: "bidon-20l",
    name: "Bidón 20 Litros",
    category: "Bidones",
    price: 1500,
    image: "https://www.haddad.cl/img/bidon20.jpg",
    description: "Bidón de gran capacidad para almacenamiento.",
    code: "BD-020",
    capacity: "20L"
  },
  {
    id: "bidon-25l",
    name: "Bidón 25 Litros Boca Ancha",
    category: "Bidones",
    price: 2200,
    image: "https://www.haddad.cl/img/bidon25.jpg",
    description: "Bidón con boca ancha para fácil llenado y limpieza.",
    code: "BD-025",
    capacity: "25L"
  },
  {
    id: "bidon-ruedas",
    name: "Bidón con Ruedas 50L",
    category: "Bidones",
    price: 8500,
    image: "https://www.haddad.cl/img/bidonruedas.jpg",
    description: "Bidón con ruedas para fácil transporte de líquidos.",
    code: "BD-050R",
    capacity: "50L"
  },
  
  // Envases PET
  {
    id: "pet-500ml",
    name: "Botella PET 500ml",
    category: "Envases PET",
    price: 85,
    image: "https://www.haddad.cl/img/pet500.jpg",
    description: "Botella PET cristal transparente, ideal para bebidas.",
    code: "PT-500",
    capacity: "500ml"
  },
  {
    id: "pet-1l",
    name: "Botella PET 1 Litro",
    category: "Envases PET",
    price: 120,
    image: "https://www.haddad.cl/img/pet1000.jpg",
    description: "Botella PET de 1 litro para jugos y bebidas.",
    code: "PT-1000",
    capacity: "1L"
  },
  {
    id: "pet-2l",
    name: "Botella PET 2 Litros",
    category: "Envases PET",
    price: 180,
    image: "https://www.haddad.cl/img/pet2000.jpg",
    description: "Botella PET familiar para bebidas.",
    code: "PT-2000",
    capacity: "2L"
  },
  {
    id: "pet-3l",
    name: "Botella PET 3 Litros Oval",
    category: "Envases PET",
    price: 280,
    image: "https://www.haddad.cl/img/pet3000.jpg",
    description: "Botella PET oval para detergentes y productos de limpieza.",
    code: "PT-3000",
    capacity: "3L"
  },
  
  // Combustibles
  {
    id: "bidon-kero-5l",
    name: "Bidón Kerosene 5L Certificado",
    category: "Combustibles",
    price: 3200,
    image: "https://www.haddad.cl/img/kero5.jpg",
    description: "Bidón certificado para transporte de kerosene/parafina.",
    code: "KC-005",
    capacity: "5L"
  },
  {
    id: "bidon-kero-10l",
    name: "Bidón Kerosene 10L Certificado",
    category: "Combustibles",
    price: 4800,
    image: "https://www.haddad.cl/img/kero10.jpg",
    description: "Bidón con certificación para almacenar kerosene.",
    code: "KC-010",
    capacity: "10L"
  },
  {
    id: "bidon-diesel-20l",
    name: "Bidón Diesel/Petróleo 20L",
    category: "Combustibles",
    price: 7500,
    image: "https://www.haddad.cl/img/diesel20.jpg",
    description: "Bidón certificado para diesel y petróleo.",
    code: "DC-020",
    capacity: "20L"
  },
  {
    id: "bidon-gasolina-5l",
    name: "Bidón Gasolina 5L Certificado",
    category: "Combustibles",
    price: 4200,
    image: "https://www.haddad.cl/img/gas5.jpg",
    description: "Bidón rojo certificado para gasolina.",
    code: "GC-005",
    capacity: "5L"
  },
  
  // Jardinería
  {
    id: "macetero-30",
    name: "Macetero Redondo 30cm",
    category: "Jardinería",
    price: 1800,
    image: "https://www.haddad.cl/img/macetero30.jpg",
    description: "Macetero de plástico resistente a UV.",
    code: "MR-030"
  },
  {
    id: "macetero-40",
    name: "Macetero Redondo 40cm",
    category: "Jardinería",
    price: 2800,
    image: "https://www.haddad.cl/img/macetero40.jpg",
    description: "Macetero grande para plantas de exterior.",
    code: "MR-040"
  },
  {
    id: "regadera-5l",
    name: "Regadera 5 Litros",
    category: "Jardinería",
    price: 2500,
    image: "https://www.haddad.cl/img/regadera.jpg",
    description: "Regadera plástica con difusor desmontable.",
    code: "RG-005",
    capacity: "5L"
  },
  {
    id: "jardinera-rect",
    name: "Jardinera Rectangular 60cm",
    category: "Jardinería",
    price: 3200,
    image: "https://www.haddad.cl/img/jardinera.jpg",
    description: "Jardinera para balcones y terrazas.",
    code: "JR-060"
  },
  
  // Hogar
  {
    id: "silla-plegable",
    name: "Silla Plegable Plástica",
    category: "Hogar",
    price: 8200,
    image: "https://www.haddad.cl/img/silla.jpg",
    description: "Silla plegable resistente para uso interior y exterior.",
    code: "SP-001"
  },
  {
    id: "mesa-plegable",
    name: "Mesa Plegable Plástica",
    category: "Hogar",
    price: 15500,
    image: "https://www.haddad.cl/img/mesa.jpg",
    description: "Mesa plegable ideal para eventos y camping.",
    code: "MP-001"
  },
  {
    id: "basurero-recicla",
    name: "Basurero Reciclaje 40L",
    category: "Hogar",
    price: 4500,
    image: "https://www.haddad.cl/img/basurero.jpg",
    description: "Basurero para separación de residuos reciclables.",
    code: "BR-040",
    capacity: "40L"
  },
  {
    id: "balde-20l",
    name: "Balde Industrial 20L",
    category: "Hogar",
    price: 2800,
    image: "https://www.haddad.cl/img/balde20.jpg",
    description: "Balde con asa metálica para uso industrial.",
    code: "BI-020",
    capacity: "20L"
  },
  
  // Laboratorio
  {
    id: "frasco-lab-500",
    name: "Frasco Laboratorio 500ml",
    category: "Laboratorio",
    price: 450,
    image: "https://www.haddad.cl/img/frascolab500.jpg",
    description: "Frasco autoclavable para uso en laboratorio.",
    code: "FL-500",
    capacity: "500ml"
  },
  {
    id: "frasco-lab-1000",
    name: "Frasco Laboratorio 1000ml",
    category: "Laboratorio",
    price: 680,
    image: "https://www.haddad.cl/img/frascolab1000.jpg",
    description: "Frasco de polipropileno resistente a químicos.",
    code: "FL-1000",
    capacity: "1000ml"
  },
  {
    id: "probeta-250",
    name: "Probeta Graduada 250ml",
    category: "Laboratorio",
    price: 1200,
    image: "https://www.haddad.cl/img/probeta.jpg",
    description: "Probeta de plástico con graduación precisa.",
    code: "PG-250",
    capacity: "250ml"
  },
  
  // Industrial
  {
    id: "tambor-200l",
    name: "Tambor Industrial 200L",
    category: "Industrial",
    price: 28000,
    image: "https://www.haddad.cl/img/tambor200.jpg",
    description: "Tambor de polietileno para uso industrial pesado.",
    code: "TI-200",
    capacity: "200L"
  },
  {
    id: "barrica-100l",
    name: "Barrica 100 Litros",
    category: "Industrial",
    price: 18500,
    image: "https://www.haddad.cl/img/barrica.jpg",
    description: "Barrica resistente para almacenamiento industrial.",
    code: "BA-100",
    capacity: "100L"
  },
  {
    id: "fosa-septica",
    name: "Fosa Séptica 2250L",
    category: "Industrial",
    price: 219530,
    image: "https://www.haddad.cl/img/fosa.jpg",
    description: "Fosa séptica domiciliaria de polietileno.",
    code: "FS-2250",
    capacity: "2250L"
  },
  {
    id: "bandeja-cosechera",
    name: "Bandeja Cosechera",
    category: "Industrial",
    price: 3500,
    image: "https://www.haddad.cl/img/bandeja.jpg",
    description: "Bandeja apilable para cosecha de frutas.",
    code: "BC-001"
  },
  
  // Camping
  {
    id: "termo-1l",
    name: "Termo Camping 1L",
    category: "Camping",
    price: 5500,
    image: "https://www.haddad.cl/img/termo.jpg",
    description: "Termo para bebidas calientes o frías.",
    code: "TC-001",
    capacity: "1L"
  },
  {
    id: "cooler-20l",
    name: "Cooler Térmico 20L",
    category: "Camping",
    price: 12500,
    image: "https://www.haddad.cl/img/cooler.jpg",
    description: "Cooler portátil para mantener temperatura.",
    code: "CT-020",
    capacity: "20L"
  },
  {
    id: "cantimplora",
    name: "Cantimplora 750ml",
    category: "Camping",
    price: 1800,
    image: "https://www.haddad.cl/img/cantimplora.jpg",
    description: "Cantimplora deportiva con tapa segura.",
    code: "CA-750",
    capacity: "750ml"
  },
  
  // Artículos de Salud
  {
    id: "chata-enfermos",
    name: "Chata para Enfermos",
    category: "Artículos de Salud",
    price: 3200,
    image: "https://www.haddad.cl/img/chata.jpg",
    description: "Chata anatómica de polipropileno.",
    code: "CE-001"
  },
  {
    id: "urinario",
    name: "Urinario Masculino",
    category: "Artículos de Salud",
    price: 2800,
    image: "https://www.haddad.cl/img/urinario.jpg",
    description: "Urinario con graduación y tapa.",
    code: "UM-001"
  },
  {
    id: "bacinica",
    name: "Bacinica Infantil",
    category: "Artículos de Salud",
    price: 2200,
    image: "https://www.haddad.cl/img/bacinica.jpg",
    description: "Bacinica ergonómica para niños.",
    code: "BI-001"
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
};
