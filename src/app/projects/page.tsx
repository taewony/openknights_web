"use client";
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { Project } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

import { ArrowRight, Heart, Users, User, Award, ClipboardList, FileText, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const fetchProjects = async (filterTerm?: string) => {
    setLoading(true);
    console.log("Fetching projects with filterTerm:", filterTerm);
    try {
      const db = getFirestore(app);
      let projectsQuery = collection(db, "projects");
      if (filterTerm) {
        projectsQuery = query(projectsQuery, where("term", "==", filterTerm));
      }
      const querySnapshot = await getDocs(projectsQuery);
      const projectsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Project),
      })) as Project[];
      setProjects(projectsList);
      console.log("Fetched projects:", projectsList);
    } catch (error) {
      console.error("Error fetching projects: ", error);
      toast({ title: "Failed to fetch projects.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const term = searchParams.get("term");
    console.log("ProjectsPage useEffect - term from URL:", term);
    fetchProjects(term || undefined);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center">Projects: {projects.length}개</h1>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{project.name}</CardTitle>
                    <Badge variant={project.phase.includes('SUBMITTED') ? 'default' : 'outline'}>
                        {project.phase}
                    </Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  <strong>Team:</strong><span className="ml-2">{project.teamName}</span>
                </div>
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <strong>Leader:</strong><span className="ml-2">{project.leaderName}</span>
                </div>
                 <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <strong>Mentor:</strong><span className="ml-2">{project.mentor}</span>
                </div>
                <div className="flex items-start text-sm">
                  <Users className="w-4 h-4 mr-2 mt-1 text-muted-foreground" />
                  <strong>Members:</strong>
                  <div className="flex flex-wrap gap-1 ml-2">
                    {project.members.map((member, index) => (
                      <Badge key={index} variant="secondary">{member}</Badge>
                    ))}
                  </div>
                </div>
                 <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <strong>Term:</strong><span className="ml-2">{project.term}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                  <strong>Note:</strong><span className="ml-2">{project.note}</span>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/40 p-4 flex justify-around text-sm">
                 <div className="flex items-center">
                    <ClipboardList className="w-4 h-4 mr-2"/>
                    <span>Preliminary: <strong>{project.preTotal}</strong></span>
                 </div>
                 <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2"/>
                    <span>Final: <strong>{project.finalTotal}</strong></span>
                 </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-10 border-2 border-dashed rounded-lg mt-8">
            <h2 className="text-xl font-semibold">No Projects Found</h2>
            <p className="text-muted-foreground mt-2">Be the first to create a project!</p>
        </div>
      )}
    </div>
  );
}
