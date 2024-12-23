"use client";

import * as React from "react";
import Image from "next/image";
import {
  Building,
  ChartLine,
  CircleUser,
  Home,
  MessageCircleMore,
  Package,
  ScrollText,
  Settings,
  ListChecks,
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
      url: "/checklist",
      icon: ScrollText,
      items: [
        {
          title: "Checklist",
          url: "/checklist",
        },
        {
          title: "Checklist Yönetimi",
          url: "/checklist/yonetim",
        },
      ],
    },
    {
      title: "Denetimler",
      url: "#",
      icon: ListChecks,
      items: [
        {
          title: "Denetimler",
          url: "/denetimler",
        },
        {
          title: "Denetim Ayarları",
          url: "/denetimler/ayarlari",
        },
      ],
    },

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
      items: [
        {
          title: "Soru Havuzu",
          url: "/soruhavuzu",
        },
        {
          title: "Checklist Havuzu",
          url: "/soruhavuzu/checklist",
        },
      ],
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
