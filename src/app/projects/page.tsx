import Link from 'next/link';
import { MainLayout } from '@/components/main-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Heart, Users } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsPage() {
    const projects = [
        { id: 1, name: "Project Phoenix", description: "A decentralized social network built on modern web technologies.", image: "https://placehold.co/400x225.png", aiHint: "abstract network", tags: ["Web3", "Social"], likes: 120, members: 4 },
        { id: 2, name: "QuantumLeap AI", description: "Next-gen machine learning framework for researchers.", image: "https://placehold.co/400x225.png", aiHint: "artificial intelligence", tags: ["AI", "Research"], likes: 350, members: 3 },
        { id: 3, name: "EcoTrack", description: "An app for monitoring personal and community carbon footprints.", image: "https://placehold.co/400x225.png", aiHint: "nature technology", tags: ["Mobile", "Sustainability"], likes: 88, members: 5 },
        { id: 4, name: "DataWeave", description: "A visual tool for complex data pipeline construction.", image: "https://placehold.co/400x225.png", aiHint: "data visualization", tags: ["Data", "SaaS"], likes: 215, members: 6 },
    ];
    
    return (
        <MainLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold font-headline">All Projects</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {projects.map(project => (
                        <Card key={project.id} className="flex flex-col">
                            <CardHeader>
                                <div className="aspect-[16/9] relative">
                                  <Image src={project.image} alt={project.name} data-ai-hint={project.aiHint} fill className="rounded-t-lg object-cover" />
                                </div>
                                <CardTitle className="font-headline pt-4">{project.name}</CardTitle>
                                <div className="flex gap-2 pt-1 flex-wrap">
                                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                                <CardDescription className="pt-2">{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow"></CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Heart className="h-4 w-4" />
                                        <span>{project.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>{project.members}</span>
                                    </div>
                                </div>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/projects/details`}>
                                        View <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
