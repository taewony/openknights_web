"use client";

import { useState } from 'react';
import { MainLayout } from '@/components/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Heart, Users, FileText, ImageIcon, ExternalLink } from 'lucide-react';
import Image from 'next/image';

function LikeButton() {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(350);

    const toggleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    }

    return (
        <Button variant={liked ? "default" : "outline"} onClick={toggleLike}>
            <Heart className={`mr-2 h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            {likeCount} Likes
        </Button>
    )
}

export default function ProjectDetailsPage() {
    const teamMembers = [
        { name: "Dr. Eva Rostova", role: "Project Lead", avatar: "https://placehold.co/100x100.png", aiHint: "woman portrait" },
        { name: "Kenji Tanaka", role: "Lead Developer", avatar: "https://placehold.co/100x100.png", aiHint: "man portrait" },
        { name: "Maria Garcia", role: "AI Researcher", avatar: "https://placehold.co/100x100.png", aiHint: "woman professional" },
    ];
    
    const documents = [
        { name: "Whitepaper.pdf", icon: FileText },
        { name: "Research_Findings.docx", icon: FileText },
    ];

    const screenshots = [
        { src: "https://placehold.co/600x400.png", alt: "App Screenshot 1", aiHint: "dashboard analytics" },
        { src: "https://placehold.co/600x400.png", alt: "App Screenshot 2", aiHint: "user interface" },
    ];

    return (
        <MainLayout>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge>AI / Research</Badge>
                                    <CardTitle className="font-headline text-4xl mt-2">QuantumLeap AI</CardTitle>
                                    <CardDescription className="mt-2 text-lg">Next-gen machine learning framework designed for academic and industrial research.</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-2">
                                   <LikeButton />
                                    <Button variant="outline" asChild>
                                        <a href="#" target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" /> GitHub
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">QuantumLeap AI provides a flexible and powerful platform for developing, training, and deploying advanced machine learning models. It supports distributed training, automatic differentiation, and a rich library of pre-built layers and models. Our goal is to accelerate the pace of AI research by providing tools that are both easy to use and highly performant.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Screenshots</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {screenshots.map((ss, index) => (
                                <Image key={index} src={ss.src} alt={ss.alt} data-ai-hint={ss.aiHint} width={600} height={400} className="rounded-lg object-cover" />
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Users className="h-5 w-5" /> Team Members</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {teamMembers.map(member => (
                                <div key={member.name} className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={member.avatar} data-ai-hint={member.aiHint} />
                                        <AvatarFallback>{member.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{member.name}</p>
                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><FileText className="h-5 w-5" /> Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             {documents.map((doc) => (
                                <Button key={doc.name} variant="outline" className="w-full justify-start" asChild>
                                    <a href="#">
                                      <doc.icon className="mr-2 h-4 w-4" />
                                      {doc.name}
                                      <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                                    </a>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}
