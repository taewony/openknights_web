"use client";

import { useState } from 'react';
import { MainLayout } from '@/components/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Upload, Medal } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

const winnersData = [
    { rank: 1, name: "Project Phoenix", score: 98.5, prize: "$5,000" },
    { rank: 2, name: "QuantumLeap AI", score: 95.2, prize: "$2,500" },
    { rank: 3, name: "DataWeave", score: 92.8, prize: "$1,000" },
];

export default function EvaluationPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [winners, setWinners] = useState<typeof winnersData | null>(null);
    const { toast } = useToast();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };
    
    const handleProcess = () => {
        if (!file) {
            toast({
                title: "No file selected",
                description: "Please upload a CSV file with scores to process.",
                variant: "destructive",
            });
            return;
        }

        setIsProcessing(true);
        // Simulate processing delay
        setTimeout(() => {
            setWinners(winnersData);
            setIsProcessing(false);
            toast({
                title: "Processing Complete",
                description: "The winners have been determined.",
            });
        }, 2000);
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold font-headline">Project Evaluation</h1>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="font-headline">Import Scores</CardTitle>
                            <CardDescription>Upload a CSV file containing project scores for evaluation.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="csv-file">CSV Score File</Label>
                                <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
                            </div>
                            <Button onClick={handleProcess} disabled={isProcessing || !file} className="w-full">
                                {isProcessing ? "Processing..." : <> <Upload className="mr-2 h-4 w-4" /> Process Scores</> }
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2">
                                <Trophy className="h-6 w-6 text-amber-500" /> Contest Winners
                            </CardTitle>
                            <CardDescription>The final rankings based on the processed scores.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {winners ? (
                                <div className="space-y-4">
                                    {winners.map((winner, index) => (
                                        <div key={winner.rank} className="flex items-center justify-between p-4 rounded-lg bg-background border">
                                            <div className="flex items-center gap-4">
                                                <Medal className={`h-8 w-8 ${index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-400' : 'text-amber-700'}`} />
                                                <div>
                                                    <p className="font-bold text-lg">{winner.name}</p>
                                                    <p className="text-sm text-muted-foreground">Score: {winner.score}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg">{winner.prize}</p>
                                                <p className="text-sm text-muted-foreground">Rank #{winner.rank}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center h-48 border-2 border-dashed rounded-lg">
                                    <p className="text-muted-foreground">Winners will be displayed here after processing.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}
