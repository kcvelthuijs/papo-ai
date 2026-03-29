import { VerbClickTest } from "@workspace/ui/components/atoms/VerbClickTest"
import { VerbTypeTest } from "@workspace/ui/components/atoms/VerbTypeTest"
import { Button } from "@workspace/ui/components/shadcn/button"

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>

        <VerbClickTest
          verb={{
            infinitive: "ser",
            tense: "presente",
            forms: {
              p1ev: "sou",
              p2ev: "és",
              p3ev: "é",
              p1mv: "somos",
              p2mv: "são",
              p3mv: "são",
            },
          }}
        />
        <VerbTypeTest
          verb={{
            infinitive: "ser",
            tense: "presente",
            forms: {
              p1ev: "sou",
              p2ev: "és",
              p3ev: "é",
              p1mv: "somos",
              p2mv: "são",
              p3mv: "são",
            },
          }}
        />
      </div>
    </div>
  )
}
