"use client";

import * as React from "react";
import Image from "next/image";
import {
  AudioWaveform,
  Building,
  ChartLine,
  CircleUser,
  Command,
  GalleryVerticalEnd,
  Home,
  MessageCircleMore,
  Package,
  ScrollText,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Gösterge Paneli",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Checklist",
      url: "#",
      icon: ScrollText,
      items: [
        {
          title: "Denetimleri",
          url: "#",
        },
        {
          title: "Denetimleri Ayarları",
          url: "#",
        },
      ],
    },
    // Need to add ...categories logic here.
    {
      title: "Tanımlamalar",
      url: "#",
      icon: Building,
      items: [],
    },
    {
      title: "Müşteri Yorumu",
      url: "#",
      icon: MessageCircleMore,
      items: [
        {
          title: "Müşteri Yorumları",
          url: "/musteri/yorumlari",
        },
        {
          title: "Yorum Değerlendirme",
          url: "/musteri/yonetimi",
        },
        {
          title: "Değerlendirme Konusu",
          url: "/musteri/konusu",
        },
      ],
    },
    {
      title: "Raporlar",
      url: "/raporlama",
      icon: ChartLine,
      items: [
        {
          title: "Raporlar",
          url: "/raporlama",
        },
        {
          title: "Rapor Ayarları",
          url: "/raporlama/ayarlar",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Kullanıcılar",
      url: "#",
      icon: CircleUser,
      items: [
        {
          title: "Kullanıcılar Listesi",
          url: "/kullanicilar",
        },
      ],
    },
    {
      title: "Soru Havuzu",
      url: "/soruhavuzu",
      icon: Package,
    },
    {
      title: "Ayarları",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Firma Ayarları",
          url: "/ayarlar/firma",
        },
        {
          title: "Tanımlama Ayarları",
          url: "/ayarlar/tanimlama",
        },
        {
          title: "Görevler",
          url: "/ayarlar/gorevler",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={120}
          height={100}
          className="display-block mx-auto cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMain items={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
