import { DocsLayout } from '@/components/docs-layout'
import { CodeBlock } from '@/components/code-block'

export default function UiFrameworksPage() {
  const toc = (
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#shadcn-ui" className="hover:text-foreground transition-colors">Shadcn UI</a></li>
      <li><a href="#chakra-ui" className="hover:text-foreground transition-colors">Chakra UI</a></li>
      <li><a href="#material-ui" className="hover:text-foreground transition-colors">Material UI</a></li>
      <li><a href="#tailwind-css" className="hover:text-foreground transition-colors">Tailwind CSS</a></li>
    </ul>
  )

  return (
    <DocsLayout toc={toc}>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">UI Frameworks</h1>
        <p className="text-lg text-muted-foreground">
          NextCraft comes with built-in support for the most popular React UI libraries.
        </p>
      </div>

      <div className="mt-10">
        <h2 id="shadcn-ui" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Shadcn UI (Default)</h2>
        <p className="leading-7 mt-6">
          <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Shadcn UI</a> is the default and recommended UI library for NextCraft. It provides accessible, reusable, and composable components that you can copy and paste into your apps.
        </p>

        <CodeBlock code="npx nextcraft-cli my-app --ui shadcn" language="bash" />

        <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">Features Included</h3>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>Radix UI Primitives:</strong> Accessible, unstyled components.</li>
          <li><strong>Tailwind CSS:</strong> Utility-first styling.</li>
          <li><strong>Dark Mode:</strong> Built-in support with <code>next-themes</code>.</li>
          <li><strong>Icons:</strong> Lucide React icons pre-configured.</li>
          <li><strong>Components:</strong> Button, Input, Dialog, Dropdown, and more pre-installed.</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 id="chakra-ui" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Chakra UI</h2>
        <p className="leading-7 mt-6">
          <a href="https://chakra-ui.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Chakra UI</a> is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.
        </p>

        <CodeBlock code="npx nextcraft-cli my-app --ui chakra" language="bash" />

        <div className="my-6 border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            <strong>Note:</strong> Chakra UI uses Emotion for styling, which has some runtime performance cost compared to Tailwind CSS.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 id="material-ui" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Material UI</h2>
        <p className="leading-7 mt-6">
          <a href="https://mui.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Material UI (MUI)</a> is a comprehensive library of components that features Google's Material Design.
        </p>

        <CodeBlock code="npx nextcraft-cli my-app --ui material" language="bash" />
      </div>

      <div className="mt-10">
        <h2 id="tailwind-css" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Tailwind CSS</h2>
        <p className="leading-7 mt-6">
          All projects, regardless of the UI framework chosen, come with <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Tailwind CSS v4</a> configured.
        </p>

        <p className="leading-7 mt-4">
          We include the following plugins by default:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><code>tailwindcss-animate</code>: For easy animations.</li>
          <li><code>@tailwindcss/typography</code>: For beautiful prose styling.</li>
        </ul>
      </div>
    </DocsLayout>
  )
}
