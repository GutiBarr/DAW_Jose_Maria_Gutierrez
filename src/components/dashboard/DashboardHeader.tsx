import Header from "@/components/layout/Header"

interface DashboardHeaderProps {
  subtitle?: string
}

export default function DashboardHeader({ subtitle }: DashboardHeaderProps) {
  return <Header variant="dashboard" subtitle={subtitle} />
}
