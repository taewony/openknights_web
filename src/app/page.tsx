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

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Contests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Explore ongoing and upcoming contests.</p>
              <ul className="list-disc list-inside space-y-1 text-left text-gray-700 dark:text-gray-200">
                {contests.map((contest, index) => (
                  <li key={index}>{contest.name}</li>
                ))}
              </ul>
              <Link href="/contests">
                <Button variant="link" className="mt-4 p-0 h-auto">View All Contests</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Browse amazing projects from our community.</p>
              <ul className="list-disc list-inside space-y-1 text-left text-gray-700 dark:text-gray-200">
                {projects.map((project, index) => (
                  <li key={index}>{project.name}</li>
                ))}
              </ul>
              <Link href="/projects">
                <Button variant="link" className="mt-4 p-0 h-auto">View All Projects</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Meet the talented individuals and teams.</p>
              <ul className="list-disc list-inside space-y-1 text-left text-gray-700 dark:text-gray-200">
                {users.map((user, index) => (
                  <li key={index}>{user.name}</li>
                ))}
              </ul>
              <Link href="/users">
                <Button variant="link" className="mt-4 p-0 h-auto">View All Users</Button>
              </Link>
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