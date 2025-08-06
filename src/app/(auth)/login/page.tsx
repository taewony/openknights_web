"use client"
import Link from "next/link"
import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from "lucide-react"
import { app } from "@/lib/firebase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log("로그인 시도", { email, password })
    try {
      const auth = getAuth(app)
      console.log("getAuth(app) 결과", auth)
      await signInWithEmailAndPassword(auth, email, password)
      console.log("로그인 성공, router.push 실행 직전")
      router.push("/dashboard")
      console.log("router.push('/dashboard') 실행됨")
    } catch (err: any) {
      console.error("로그인 에러", err)
      toast({
        title: "로그인 실패",
        description: err.message || "이메일 또는 비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      })
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <div className="flex justify-center mb-4">
            <ShieldCheck className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-headline text-center">Login to OpenKnights</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleLogin}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with GitHub
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to OpenKnights</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          OpenKnights는 여러분의 숨어 있는 재능을 펼쳐 보일 수 있는 무대입니다. 당신을 보여 주세요~~
        </p>
      </div>
    </div>
  )
}
