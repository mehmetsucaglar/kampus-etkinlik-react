import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 100,
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/kariyer.png" 
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    capacity: 20,
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    image: "/robotik.jpg"
  },
  {
    id: "event-3",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "2026-11-03",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    capacity: 30,
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    image: "/siber.jpeg" 
  },
  {
    id: "event-4",
    title: "Bahar Şenliği",
    category: "Söyleşi",
    date: "2026-05-15",
    time: "12:00",
    location: "Kampüs Meydanı",
    capacity: 500,
    description: "Öğrenci kulüpleri ile bahara merhaba etkinlikleri.",
    image: "/bahar.jpeg"
  },
  {
    id: "event-5",
    title: "Yapay Zeka Zirvesi",
    category: "Seminer",
    date: "2026-12-10",
    time: "09:30",
    location: "Kültür Merkezi",
    capacity: 250,
    description: "Sektör liderlerinden yapay zeka trendleri.",
    image: "/yapay.jpeg"
  },
  {
    id: "event-6",
    title: "Girişimcilik Yarışması",
    category: "Yarışma",
    date: "2026-11-25",
    time: "13:00",
    location: "Teknokent",
    capacity: 50,
    description: "Yenilikçi iş fikirleri yarışıyor.",
    image: "/girisim.jpeg"
  }
];