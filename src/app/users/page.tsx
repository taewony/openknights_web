import { MainLayout } from '@/components/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';


export default function UsersPage() {
    const users = [
        { name: "Alice Johnson", email: "alice@example.com", role: "Admin", projects: 3, contests: 2, avatar: "https://placehold.co/100x100.png", aiHint: "woman professional" },
        { name: "Bob Williams", email: "bob@example.com", role: "Participant", projects: 1, contests: 1, avatar: "https://placehold.co/100x100.png", aiHint: "man professional" },
        { name: "Charlie Brown", email: "charlie@example.com", role: "Participant", projects: 2, contests: 2, avatar: "https://placehold.co/100x100.png", aiHint: "man smiling" },
        { name: "Diana Prince", email: "diana@example.com", role: "Judge", projects: 0, contests: 5, avatar: "https://placehold.co/100x100.png", aiHint: "woman confident" },
        { name: "Ethan Hunt", email: "ethan@example.com", role: "Participant", projects: 1, contests: 3, avatar: "https://placehold.co/100x100.png", aiHint: "man serious" },
    ];
    
    return (
        <MainLayout>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">User Management</CardTitle>
                    <CardDescription>List of all registered users and their roles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-center">Projects</TableHead>
                                <TableHead className="text-center">Contests</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.email}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar} data-ai-hint={user.aiHint} />
                                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Judge' ? 'default' : 'secondary'}>{user.role}</Badge>
                                    </TableCell>
                                    <TableCell className="text-center font-medium">{user.projects}</TableCell>
                                    <TableCell className="text-center font-medium">{user.contests}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
