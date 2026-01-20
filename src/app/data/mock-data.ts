import { Provider } from "@/app/types";

export const mockProviders: Provider[] = [
  {
    id: 1,
    name: "Carlos Silva",
    specialty: "Pedreiro Especializado",
    rating: 4.9,
    reviews: [
      {
        id: 1,
        name: "Ana Paula",
        rating: 5,
        date: "15/01/2026",
        comment: "Excelente profissional! Pontual, cuidadoso e fez um trabalho impecável na reforma do banheiro.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
      },
      {
        id: 2,
        name: "Roberto Mendes",
        rating: 5,
        date: "10/01/2026",
        comment: "Contratei para construir uma laje. Trabalho perfeito, dentro do prazo e orçamento. Super recomendo!",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
      },
      {
        id: 3,
        name: "Juliana Costa",
        rating: 4,
        date: "05/01/2026",
        comment: "Muito bom profissional. Atencioso e fez um ótimo serviço de reboco nas paredes externas.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
      }
    ],
    distance: "2.3 km",
    price: "150/hora",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    verified: true,
    bio: "Pedreiro com 15 anos de experiência em construção civil e reformas. Especializado em lajes, alvenaria e acabamentos de alta qualidade.",
    experience: "15 anos",
    completedJobs: 247,
    responseRate: 98,
    responseTime: "2 horas",
    specialties: ["Especialista em Lajes", "Pintura de Fachadas", "Alvenaria", "Reboco e Acabamento", "Construção", "Reformas"],
    portfolio: [
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600",
      "https://images.unsplash.com/photo-1595814433015-e6f5ce69e8f9?w=600",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
    ],
    certifications: ["NR-35 - Trabalho em Altura", "Curso de Alvenaria Estrutural", "Atendimento ao Cliente"]
  },
  {
    id: 2,
    name: "João Santos",
    specialty: "Eletricista Residencial",
    rating: 4.8,
    reviews: [
      {
        id: 1,
        name: "Marcos Oliveira",
        rating: 5,
        date: "18/01/2026",
        comment: "Resolveu um problema elétrico complexo que outros não conseguiram. Muito competente!",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400"
      },
      {
        id: 2,
        name: "Patricia Lima",
        rating: 5,
        date: "12/01/2026",
        comment: "Instalou todo o sistema elétrico da minha casa nova. Trabalho impecável e seguro.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
      },
      {
        id: 3,
        name: "Fernando Costa",
        rating: 4,
        date: "08/01/2026",
        comment: "Bom profissional, pontual e organizado. Recomendo!",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400"
      }
    ],
    distance: "3.1 km",
    price: "120/hora",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    verified: true,
    bio: "Eletricista certificado com 12 anos de experiência. Especializado em instalações residenciais, manutenção preventiva e sistemas de energia solar.",
    experience: "12 anos",
    completedJobs: 189,
    responseRate: 95,
    responseTime: "3 horas",
    specialties: ["Instalações Elétricas", "Manutenção Preventiva", "Automação Residencial", "Energia Solar", "Quadros Elétricos"],
    portfolio: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600",
      "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600",
      "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=600",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600"
    ],
    certifications: ["NR-10 - Segurança em Eletricidade", "Instalador Solar Certificado", "Automação Residencial"]
  },
  {
    id: 3,
    name: "Maria Oliveira",
    specialty: "Pintora Profissional",
    rating: 5.0,
    reviews: [
      {
        id: 1,
        name: "Sandra Alves",
        rating: 5,
        date: "16/01/2026",
        comment: "Pintou minha casa toda. Trabalho perfeito, super caprichosa e deixou tudo limpo!",
        avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400"
      },
      {
        id: 2,
        name: "Lucas Ferreira",
        rating: 5,
        date: "11/01/2026",
        comment: "Melhor pintora que já contratei. Atenção aos detalhes impressionante!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      },
      {
        id: 3,
        name: "Beatriz Santos",
        rating: 5,
        date: "06/01/2026",
        comment: "Excelente! Pintou com textura e ficou lindo. Super recomendo!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
      }
    ],
    distance: "1.8 km",
    price: "100/hora",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    verified: true,
    bio: "Pintora profissional há 10 anos. Especializada em pinturas residenciais, texturas decorativas e acabamentos especiais.",
    experience: "10 anos",
    completedJobs: 312,
    responseRate: 99,
    responseTime: "1 hora",
    specialties: ["Pintura Residencial", "Texturas Decorativas", "Pintura de Fachadas", "Verniz e Esmaltes", "Papel de Parede"],
    portfolio: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600"
    ],
    certifications: ["Curso de Texturas Decorativas", "Pintura Profissional", "Cores e Harmonização"]
  },
  {
    id: 4,
    name: "Pedro Costa",
    specialty: "Encanador",
    rating: 4.7,
    reviews: [
      {
        id: 1,
        name: "Ricardo Souza",
        rating: 5,
        date: "14/01/2026",
        comment: "Resolveu um vazamento difícil. Muito competente e honesto no orçamento.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"
      },
      {
        id: 2,
        name: "Carla Mendes",
        rating: 4,
        date: "09/01/2026",
        comment: "Bom trabalho na instalação do banheiro. Profissional sério.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
      }
    ],
    distance: "4.2 km",
    price: "130/hora",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    verified: false,
    bio: "Encanador profissional com 8 anos de experiência. Especializado em instalações hidráulicas, desentupimentos e manutenções.",
    experience: "8 anos",
    completedJobs: 156,
    responseRate: 92,
    responseTime: "4 horas",
    specialties: ["Instalações Hidráulicas", "Desentupimentos", "Vazamentos", "Manutenção Preventiva", "Aquecimento"],
    portfolio: [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600"
    ],
    certifications: ["Instalações Hidráulicas Residenciais", "Sistemas de Aquecimento"]
  },
  {
    id: 5,
    name: "André Martins",
    specialty: "Marceneiro",
    rating: 4.9,
    reviews: [
      {
        id: 1,
        name: "Paula Rodrigues",
        rating: 5,
        date: "17/01/2026",
        comment: "Fez móveis planejados para minha cozinha. Ficou perfeito, trabalho de altíssima qualidade!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
      },
      {
        id: 2,
        name: "Eduardo Lima",
        rating: 5,
        date: "13/01/2026",
        comment: "Construiu uma estante sob medida. Acabamento impecável!",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400"
      }
    ],
    distance: "5.5 km",
    price: "140/hora",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    verified: true,
    bio: "Marceneiro artesanal com 18 anos de experiência. Especializado em móveis planejados, restauração e marcenaria fina.",
    experience: "18 anos",
    completedJobs: 203,
    responseRate: 96,
    responseTime: "2 horas",
    specialties: ["Móveis Planejados", "Marcenaria Fina", "Restauração", "Deck de Madeira", "Móveis Sob Medida"],
    portfolio: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600",
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600"
    ],
    certifications: ["Marcenaria Profissional", "Design de Móveis", "Restauração de Móveis Antigos"]
  },
  {
    id: 6,
    name: "Fabiana Rocha",
    specialty: "Arquiteta e Designer",
    rating: 4.8,
    reviews: [
      {
        id: 1,
        name: "Camila Dias",
        rating: 5,
        date: "19/01/2026",
        comment: "Projeto incrível! Transformou completamente meu apartamento. Muito criativa!",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400"
      }
    ],
    distance: "3.8 km",
    price: "200/hora",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    verified: true,
    bio: "Arquiteta e designer de interiores formada pela USP. Especializada em projetos residenciais contemporâneos e reformas inteligentes.",
    experience: "7 anos",
    completedJobs: 94,
    responseRate: 97,
    responseTime: "3 horas",
    specialties: ["Projetos Residenciais", "Design de Interiores", "Reformas", "Decoração", "Consultoria"],
    portfolio: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600"
    ],
    certifications: ["CAU - Conselho de Arquitetura", "Design de Interiores", "Projetos Sustentáveis"]
  }
];
