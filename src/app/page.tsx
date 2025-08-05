import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Trophy, Users, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

function KnightsLogo() {
  return (
    <ShieldCheck className="h-8 w-8 text-primary" />
  );
}

export default function Home() {
  const contests = [
    { name: "Summer CodeFest '24", description: "A week-long coding marathon." },
    { name: "AI Innovation Challenge", description: "Build the next generation of AI." },
    { name: "Open Source Collab", description: "Contribute to impactful OS projects." },
  ];

  const projects = [
    { name: "Project Phoenix", description: "A decentralized social network." },
    { name: "QuantumLeap AI", description: "Next-gen machine learning framework." },
    { name: "EcoTrack", description: "An app for monitoring carbon footprints." },
  ];

  const users = [
    { name: "Alice", avatar: "https://placehold.co/100x100.png", aiHint: "woman portrait" },
    { name: "Bob", avatar: "https://placehold.co/100x100.png", aiHint: "man portrait" },
    { name: "Charlie", avatar: "https://placehold.co/100x100.png", aiHint: "man smiling" },
    { name: "Diana", avatar: "https://placehold.co/100x100.png", aiHint: "woman professional" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <KnightsLogo />
          <span className="text-xl font-headline font-semibold">OpenKnights</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Dashboard
          </Link>
          <Link href="/projects" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Projects
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Unleash Your Competitive Spirit
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    OpenKnights is the ultimate platform for discovering, joining, and managing coding contests and collaborative projects.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">
                        Request a Contest Registration
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="collaboration coding"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        
        <section id="contests" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Contests</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Join the Fray</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse through our list of active and upcoming contests. There's a challenge for everyone.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contests.map((contest, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Trophy className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline">{contest.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{contest.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Projects</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Forge Alliances</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore innovative projects from our community. Find a team or get inspired for your next big idea.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Briefcase className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="users" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Community</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Meet the Knights</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our vibrant community of developers, designers, and innovators.
                </p>
              </div>
            </div>
            <div className="flex justify-center flex-wrap gap-4">
              {users.map((user, index) => (
                 <Avatar key={index} className="w-16 h-16 border-2 border-primary">
                  <AvatarImage src={user.avatar} data-ai-hint={user.aiHint}/>
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 OpenKnights. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
