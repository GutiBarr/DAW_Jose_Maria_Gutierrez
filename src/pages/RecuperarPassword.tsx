import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/database/supabase/Client"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useLangStore } from "@/store/langStore"

export default function RecuperarPassword() {
  const { lang } = useLangStore()
  const [email, setEmail]       = useState("")
  const [enviado, setEnviado]   = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError]       = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setCargando(true)

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nueva-password`,
    })

    setCargando(false)

    if (resetError) {
      setError(lang === "es"
        ? "No se pudo enviar el correo. Comprueba el email introducido."
        : "Could not send the email. Check the address entered.")
      return
    }

    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">
            {lang === "es" ? "Correo enviado" : "Email sent"}
          </h1>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            {lang === "es"
              ? `Hemos enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada y sigue las instrucciones.`
              : `We've sent a recovery link to ${email}. Check your inbox and follow the instructions.`}
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← {lang === "es" ? "Volver al inicio de sesión" : "Back to sign in"}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-[380px] bg-card border-r border-border flex-col px-10 py-10">
        <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-auto">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {lang === "es" ? "Volver" : "Back"}
        </Link>

        <div className="py-14">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-foreground leading-snug mb-4">
            {lang === "es" ? "Recupera tu acceso" : "Recover your access"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {lang === "es"
              ? "Introduce tu correo y te enviaremos un enlace para restablecer tu contraseña."
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        <p className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} ConciliaEx</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile back */}
          <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8 lg:hidden">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {lang === "es" ? "Volver" : "Back"}
          </Link>

          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
              <LogoFamilia variante="header" />
              <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
            </Link>
            <h1 className="text-2xl font-semibold text-foreground mb-1.5">
              {lang === "es" ? "¿Olvidaste tu contraseña?" : "Forgot your password?"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {lang === "es"
                ? "Introduce tu email y te enviamos un enlace de recuperación."
                : "Enter your email and we'll send you a recovery link."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                {lang === "es" ? "Correo electrónico" : "Email address"}
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError("") }}
                required
                className="w-full h-10 px-3 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full h-10 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {cargando
                ? (lang === "es" ? "Enviando..." : "Sending...")
                : (lang === "es" ? "Enviar enlace de recuperación" : "Send recovery link")}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              {lang === "es" ? "¿Recuerdas tu contraseña?" : "Remember your password?"}{" "}
              <Link to="/login" className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                {lang === "es" ? "Inicia sesión" : "Sign in"}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}