'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Trophy, Users, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

import { useState } from 'react'; // Added useState
import { useAuth } from '@/contexts/AuthContext';
import CreateProjectDialog from '@/components/CreateProjectDialog';
import { useToast } from '@/hooks/use-toast'; // For toast notifications

export default function Home() {
  const { currentUser } = useAuth();
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleRegisterProjectClick = () => {
    if (currentUser) {
      setIsCreateProjectDialogOpen(true);
    } else {
      // Use next/link for navigation
      // For now, just show a toast if not logged in, or redirect to login page
      toast({ title: "로그인 후 프로젝트를 등록할 수 있습니다." });
      // Optionally, redirect to login page:
      // router.push('/login'); // If using useRouter
    }
  };

  const handleProjectCreated = () => {
    toast({ title: "프로젝트가 성공적으로 등록되었습니다!" });
    // Optionally navigate to projects page or show a success message
    // router.push('/projects'); // If using useRouter
  };

  // Data from the source LandingPage.tsx
  const contests = [
    { name: "Annual Innovation Challenge", description: "Explore ongoing and upcoming contests." },
    { name: "Summer Code Jam", description: "Explore ongoing and upcoming contests." },
    { name: "Design Sprint 2024", description: "Explore ongoing and upcoming contests." },
  ];

  const projects = [
    { name: "AI-Powered Chatbot", description: "Browse amazing projects from our community." },
    { name: "Eco-Friendly Smart Home", description: "Browse amazing projects from our community." },
    { name: "Interactive Data Visualization", description: "Browse amazing projects from our community." },
  ];

  const users = [
    { name: "Alice Johnson", avatar: "https://placehold.co/100x100.png", aiHint: "woman portrait" },
    { name: "Bob Smith", avatar: "https://placehold.co/100x100.png", aiHint: "man portrait" },
    { name: "Team Innovate", avatar: "https://placehold.co/100x100.png", aiHint: "group photo" },
  ];

  return (
    <>
      <main className="flex-1">
        {/* Content from D:\code\NextJS\OpenKnights_nextjs\src\pages\LandingPage.tsx */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
          <h1 className="text-5xl font-extrabold mb-4">우송대학교 경진대회 플랫폼!</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover exciting contests, showcase innovative projects, and connect with talented users.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={handleRegisterProjectClick}>
            내 프로젝트 등록
          </Button>
        </section>

        {/* 3-Card Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>오픈소스 SW활용 경진대회</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-blue-600 dark:text-blue-400 mb-4">
                "작은 아이디어라도 좋다. 무조건 만들어 보고 대회 신청 고고~"
              </p>
              <ul className="list-disc list-inside space-y-2 text-left text-gray-700 dark:text-gray-200">
                <li>본선 일정: 2025년 12월 4일(목)</li>
                <li>예선 신청은 별도 공지 예정</li>
                <li>멘토 교수님과 아이디어를 구체화하고, 미리 작품으로 만들어 보자!</li>
              </ul>
              <a href="#contests" className="inline-block mt-4">
                <Button variant="link">View All Projects in 오픈소스</Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SW창업 아이디어 경진대회</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-blue-600 dark:text-blue-400 mb-4">
                "지금은 AI 시대, 누구나 나만의 아이디어로 창업 준비를 시작할 수 있다."
              </p>
              <ul className="list-disc list-inside space-y-2 text-left text-gray-700 dark:text-gray-200">
                <li>본선 일정: 2025년 12월 11일(목)</li>
                <li>예선 신청은 별도 공지 예정</li>
                <li>멘토 교수님과 창업 아이디어를 협의하고, 꾸준히 준비해 나가자!</li>
              </ul>
              <a href="#projects" className="inline-block mt-4">
                 <Button variant="link">View All Projects in SW창업</Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SW창의융합 경진대회</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-blue-600 dark:text-blue-400 mb-4">
                "작은 아이디어라도 좋다. 무조건 만들어 보고 대회 신청 고고~"
              </p>
              <ul className="list-disc list-inside space-y-2 text-left text-gray-700 dark:text-gray-200">
                <li>본선 일정: 2025년 12월 5일(금)</li>
                <li>예선 신청은 별도 공지 예정</li>
                <li>멘토 교수님과 아이디어를 구체화하고, 미리 작품으로 만들어 보자!</li>
              </ul>
              <a href="#users" className="inline-block mt-4">
                <Button variant="link">View All Projects in 창의융합</Button>
              </a>
            </CardContent>
          </Card>
        </section>
        <CreateProjectDialog
          isOpen={isCreateProjectDialogOpen}
          onOpenChange={setIsCreateProjectDialogOpen}
          onProjectCreated={handleProjectCreated}
        />
      </main>
    </>
  );
}