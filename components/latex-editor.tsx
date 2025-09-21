"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Eye, Download } from "lucide-react"

interface LaTeXEditorProps {
  initialCode?: string
  onCodeChange?: (code: string) => void
  onCompile?: (code: string) => void
  isCompiling?: boolean
  className?: string
}

export function LaTeXEditor({ initialCode = "", onCodeChange, onCompile, isCompiling, className }: LaTeXEditorProps) {
  const [code, setCode] = useState(initialCode)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    onCodeChange?.(newCode)
  }

  const handleCompile = () => {
    onCompile?.(code)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            LaTeX Editor
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCompile} disabled={isCompiling}>
              <Eye className="h-4 w-4 mr-2" />
              {isCompiling ? "Compiling..." : "Preview"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export .tex
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-0">
            <div className="h-[600px] border-t">
              <textarea
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm resize-none border-0 focus:outline-none focus:ring-0"
                placeholder="LaTeX code will appear here..."
                spellCheck={false}
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="h-[600px] border-t bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Code className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">LaTeX preview will appear here</p>
                <p className="text-xs">Monaco editor integration coming soon</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
