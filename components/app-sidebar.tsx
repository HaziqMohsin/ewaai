import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Users,
  Archive,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";

import { createClient } from "@/utils/supabase/server";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/user",
    icon: Users,
  },
  {
    title: "Cases",
    url: "/cases",
    icon: Archive,
  },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: Search,
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Settings,
  //   },
];

const data = {
  user: {
    name: "haziq",
    email: "haziq@gmail.com",
    avatar: "",
  },
};

export async function AppSidebar() {
  //   const supabase = await createClient();

  //   const { data, error } = await supabase.auth.getUser();

  //   console.log(data);

  //   const res = await fetch(`${process.env.API_URL}/user-info`, {
  //     credentials: "include",
  //   });
  //   const dataUser = await res.json();
  //   console.log(dataUser);
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
