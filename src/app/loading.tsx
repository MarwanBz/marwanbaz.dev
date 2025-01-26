import { DottedProgressLoader } from "@/components/ui/dotted-progress-loader"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <DottedProgressLoader size={200} interactive={false} duration={10} />
    </div>
  )
}
