function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-verde-suave">
      <div className="text-center space-y-4 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-verde-oscuro">
          ConciliaEx
        </h1>
        <p className="text-muted-foreground">
          Si ves esto con el fondo verde clarito y el título en verde oscuro, Tailwind funciona 🎉
        </p>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-verde-oscuro transition-colors">
          Botón de prueba
        </button>
      </div>
    </div>
  )
}

export default App
