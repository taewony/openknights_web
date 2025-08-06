"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Trophy, Swords, Users, ShieldCheck, LogOut, Settings } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from 'react';
import LoginMenu from '@/components/LoginMenu';

function KnightsLogo() {
  return (
    <div className="flex items-center gap-2">
       <ShieldCheck className="h-6 w-6 text-primary" />
    </div>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const auth = getAuth(app); // app 인스턴스를 명시적으로 전달
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Firestore에서 role 정보 가져오기
        try {
          const db = getFirestore(app); // app 인스턴스를 명시적으로 전달
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role || "");
          } else {
            setUserRole("");
          }
        } catch {
          setUserRole("");
        }
      } else {
        setUserRole("");
      }
    });
    return () => unsubscribe();
  }, []);

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Swords },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/users", label: "Users", icon: Users },
    { href: "/evaluation", label: "Evaluation", icon: Trophy },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <Link href="/" className="flex items-center gap-2 font-headline font-bold text-lg">
                <KnightsLogo />
                <span className="group-data-[collapsible=icon]:hidden">OpenKnights</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{
                    children: item.label,
                    side: "right",
                  }}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 rounded-md font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm h-10 ${pathname.startsWith(item.href) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {/* 로그인/로그아웃 메뉴를 LoginMenu로 대체 */}
            <SidebarMenuItem key="login-menu">
              <SidebarMenuButton asChild isActive={pathname === '/login'} tooltip={{ children: "로그인/로그아웃", side: "right" }}>
                <LoginMenu active={pathname === '/login'} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <Separator className="my-2" />
        <SidebarFooter>
          {/* 좌측 하단 사용자 정보 표시 복원 */}
          {currentUser && (
            <div className="flex items-center gap-2 p-2 text-xs text-muted-foreground">
              <span className="font-semibold">{userRole ? userRole : 'User'}:</span>
              <span>{currentUser.email?.split("@")[0]}</span>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1 flex items-center gap-4 justify-end">
              {/* 우측 상단 내비게이션: 로그인/로그아웃 상태에 따라 동적 표시 */}
              {menuItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${pathname.startsWith(item.href)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
                >
                  {item.label}
                </Link>
              ))}
              {currentUser ? (
                <button
                  className="px-3 py-2 rounded-md font-medium hover:bg-accent transition-colors text-muted-foreground"
                  onClick={() => {
                    const auth = getAuth(app); // app 인스턴스 명시
                    auth.signOut();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md font-medium hover:bg-accent transition-colors ${pathname === '/login' ? 'bg-accent text-primary' : 'text-muted-foreground'}`}
                >
                  Login
                </Link>
              )}
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
