"use client";

import * as React from "react";
import Image from "next/image";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Building,
  ChartLine,
  CircleUser,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  MessageCircleMore,
  Package,
  PieChart,
  ScrollText,
  Settings,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "gang is this real",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Gösterge Paneli",
      url: "#",
      icon: Home,
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
    },
    {
      title: "Müşteri Yorumu",
      url: "#",
      icon: MessageCircleMore,
      items: [
        {
          title: "Müşteri Yorumları",
          url: "#",
        },
        {
          title: "Yorum Değerlendirme",
          url: "#",
        },
        {
          title: "Değerlendirme Konusu",
          url: "#",
        },
      ],
    },
    {
      title: "Raporlar",
      url: "#",
      icon: ChartLine,
    },
  ],
  projects: [
    {
      name: "Kullancılar",
      url: "#",
      icon: CircleUser,
    },
    {
      name: "Soru Havuzu",
      url: "#",
      icon: Package,
    },
    {
      name: "Ayarları",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Firma Ayarları",
          url: "#",
        },
        {
          title: "Tanımlama Ayarları",
          url: "#",
        },
        {
          title: "Görevler",
          url: "#",
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
          width={250}
          height={250}
          className="display-block mx-auto"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
