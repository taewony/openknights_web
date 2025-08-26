"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react"; // Using Users icon for staff
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Contest } from "@/types"; // Assuming Contest interface is in @/types

const ContestsPage: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "contests"));
        const contestsList: Contest[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Contest, 'id'>),
        }));
        setContests(contestsList);
      } catch (error) {
        console.error("Error fetching contests: ", error);
        toast({ title: "Failed to fetch contests.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const handleViewProjects = (term: string) => {
    router.push(`/projects?term=${term}`);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading contests...</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contests</h1>
      {contests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {contests.map((contest) => (
            <Card key={contest.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{contest.term}</CardTitle>
                    <CardDescription className="mt-1">{contest.description}</CardDescription>
                  </div>
                  <Badge variant={contest.phase === 'PLANED' ? 'outline' : 'default'}>
                    {contest.phase}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Staff</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {contest.staff.map((staffMember, index) => (
                    <Badge key={index} variant="secondary">
                      {staffMember}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => handleViewProjects(contest.term)} variant="outline">
                    View Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No contests found.
        </p>
      )}
    </div>
  );
};

export default ContestsPage;