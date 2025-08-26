"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { Project } from '@/types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Heart, Users, FileText, ImageIcon, ExternalLink, Calendar } from 'lucide-react';
import Image from 'next/image';

function LikeButton() {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

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
    const searchParams = useSearchParams();
    const projectName = searchParams.get('name');
    const [projectData, setProjectData] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!projectName) {
                setError("No project name provided.");
                setLoading(false);
                return;
            }
            try {
                const db = getFirestore(app);
                const projectsRef = collection(db, "projects");
                const q = query(projectsRef, where("name", "==", projectName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setProjectData(querySnapshot.docs[0].data() as Project);
                } else {
                    setError("No project data found for this name.");
                }
            } catch (err) {
                console.error("Error fetching project data:", err);
                setError("Failed to fetch project data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [projectName]);

    if (loading) {
        return (
            <div className="text-center py-12">
                <p>Loading project data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (!projectData) {
        return (
            <div className="text-center py-12">
                <p>Project data not available.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center py-12">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <div className="flex justify-between items-start w-full">
                        <div>
                            <CardTitle>{projectData.name}</CardTitle>
                            <CardDescription>{projectData.description}</CardDescription>
                        </div>
                        <LikeButton />
                    </div>
                </CardHeader>
                <CardContent>
                    <p><strong>Team Name:</strong> {projectData.teamName}</p>
                    <p><strong>Phase:</strong> {projectData.phase}</p>
                    <p><strong>Term:</strong> {projectData.term}</p>
                    <p><strong>Leader:</strong> {projectData.leaderName}</p>
                    <p><strong>Members:</strong> {projectData.members?.join(', ')}</p>
                    {projectData.githubUrl && <p><strong>GitHub:</strong> <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer">{projectData.githubUrl}</a></p>}
                    {projectData.mentor && <p><strong>Mentor:</strong> {projectData.mentor}</p>}
                    {projectData.note && <p><strong>Note:</strong> {projectData.note}</p>}
                    {projectData.language && <p><strong>Language:</strong> {projectData.language}</p>}
                    
                    {/* Documents */}
                    {projectData.documents && projectData.documents.length > 0 && (
                        <div>
                            <h3>Documents:</h3>
                            <ul>
                                {projectData.documents.map((doc, index) => (
                                    <li key={index}><a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Screenshots */}
                    {projectData.screenshots && projectData.screenshots.length > 0 && (
                        <div>
                            <h3>Screenshots:</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {projectData.screenshots.map((ss, index) => (
                                    <Image key={index} src={ss.url} alt={ss.alt} width={300} height={200} />
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
