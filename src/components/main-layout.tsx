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
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {/* 로그인/로그아웃 상태에 따라 Login/Logout 메뉴 동적 표시 */}
            {currentUser ? (
              <SidebarMenuItem key="logout">
                <SidebarMenuButton
                  asChild
                  isActive={false}
                  tooltip={{ children: "로그아웃", side: "right" }}
                >
                  <button
                    className="flex items-center w-full gap-2 text-left"
                    onClick={() => {
                      const auth = getAuth();
                      auth.signOut();
                      window.location.href = "/";
                    }}
                  >
                    <LogOut />
                    <span>로그아웃</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem key="login">
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/login"}
                  tooltip={{ children: "로그인", side: "right" }}
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <ShieldCheck />
                    <span>로그인</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <Separator className="my-2" />
        <SidebarFooter>
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto w-full justify-start p-2">
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user avatar" />
                      <AvatarFallback>OK</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-medium">
                        {userRole}: {currentUser.email?.split("@")[0]}
                      </span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" side="right" align="start" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userRole}: {currentUser.email?.split("@")[0]}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    const auth = getAuth();
                    auth.signOut();
                    window.location.href = "/";
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              className="h-auto w-full justify-start p-2"
              onClick={() => (window.location.href = "/login")}
            >
              <div className="flex items-center gap-2 w-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user avatar" />
                  <AvatarFallback>OK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-medium">로그인</span>
                </div>
              </div>
            </Button>
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
                  className={`px-3 py-2 rounded-md font-medium hover:bg-accent transition-colors ${pathname.startsWith(item.href) ? 'bg-accent text-primary' : 'text-muted-foreground'}`}
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
