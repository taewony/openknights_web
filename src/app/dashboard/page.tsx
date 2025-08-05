import { MainLayout } from '@/components/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Swords, Briefcase, Calendar, Clock } from 'lucide-react';

export default function DashboardPage() {
    const contests = [
        { name: "Summer CodeFest '24", startDate: "2024-07-01", endDate: "2024-07-07", status: "Ongoing" },
        { name: "AI Innovation Challenge", startDate: "2024-08-15", endDate: "2024-08-22", status: "Upcoming" },
        { name: "Open Source Collab", startDate: "2024-06-10", endDate: "2024-06-20", status: "Finished" },
    ];

    const projects = [
        { name: "Project Phoenix", contest: "Summer CodeFest '24", members: 4, status: "Active" },
        { name: "QuantumLeap AI", contest: "AI Innovation Challenge", members: 3, status: "Registered" },
        { name: "EcoTrack", contest: "Summer CodeFest '24", members: 5, status: "Active" },
    ];
    
    return (
        <MainLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold font-headline">Contest Dashboard</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ongoing Contests</CardTitle>
                            <Swords className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">vs 2 last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15</div>
                            <p className="text-xs text-muted-foreground">Registered for active contests</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming Contests</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">Starting in August</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Calendar className="h-5 w-5" /> Contest Schedule</CardTitle>
                            <CardDescription>Overview of all ongoing, upcoming, and finished contests.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Contest</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contests.map(c => (
                                        <TableRow key={c.name}>
                                            <TableCell className="font-medium">{c.name}</TableCell>
                                            <TableCell>{c.startDate} to {c.endDate}</TableCell>
                                            <TableCell><Badge variant={c.status === "Ongoing" ? "default" : c.status === "Upcoming" ? "secondary" : "outline"}>{c.status}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Clock className="h-5 w-5" /> Participating Projects</CardTitle>
                            <CardDescription>Projects currently active in contests.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Project</TableHead>
                                        <TableHead>Contest</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {projects.map(p => (
                                        <TableRow key={p.name}>
                                            <TableCell className="font-medium">{p.name}</TableCell>
                                            <TableCell>{p.contest}</TableCell>
                                            <TableCell><Badge variant={p.status === "Active" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}
