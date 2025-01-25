"use client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const timer1 = setTimeout(() => setProgress(25), 1000);
      const timer2 = setTimeout(() => setProgress(50), 2000);
      const timer3 = setTimeout(() => setProgress(80), 3000);
      const timer4 = setTimeout(() => setProgress(100), 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [loading]);

  const handleClick = () => {
    toast("You clicked on Agree");
    setLoading(true);
    setTimeout(() => {
      router.push('/start');
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl mb-4">User Agreement</h1>
      <p>
        "user agreement goes here"
      </p>
      <br />

      <div className="mb-8">
        <Button variant="outline" onClick={handleClick} disabled={loading}>
          Agree
        </Button>
      </div>
      {loading && <Progress value={progress} className="w-1/4" />}
    </div>
  );
}
