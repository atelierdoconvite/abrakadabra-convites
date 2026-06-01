export default function Home() {
  return (
    <div className="bg-[#f7f2ea] text-[#2b1b14] min-h-screen">

      {/* NAVBAR */}
      <header className="flex justify-between items-center px-10 py-6 border-b border-[#e8dccd]">
        <h1 className="text-2xl font-serif tracking-wide">
✨ Abrakadabra Convites
        </h1>

        <nav className="flex gap-8 text-sm">
          <a href="/" className="hover:opacity-70">Home</a>
          <a href="/catalogo" className="hover:opacity-70">Catálogo</a>
          <a href="/login" className="hover:opacity-70">Admin</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-20 items-center">

        <div>
          <h2 className="text-5xl font-serif leading-tight mb-6">
            Convites que contam histórias com elegância
          </h2>

          <p className="text-lg opacity-80 mb-8">
            Crie convites digitais sofisticados para casamentos,
            aniversários e momentos inesquecíveis.
          </p>

          <a
            href="/catalogo"
            className="bg-[#2b1b14] text-white px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            Ver Catálogo
          </a>
        </div>

       <section className="grid lg:grid-cols-2 gap-12 px-10 py-24 items-center">

  <div>

    <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full mb-6">
      ✨ Convites Digitais Personalizados
    </span>

    <h2 className="text-6xl font-bold leading-tight mb-6">
      Transformamos momentos especiais em magia
    </h2>

    <p className="text-xl opacity-80 mb-8">
      Convites digitais personalizados para aniversários,
      chá revelação, casamentos e eventos inesquecíveis.
    </p>

    <div className="flex flex-wrap gap-4">

      <a
        href="/catalogo"
        className="bg-pink-500 text-white px-8 py-4 rounded-full"
      >
        🎨 Ver Catálogo
      </a>

      <a
        href="https://wa.me/5513981922078"
        className="bg-green-500 text-white px-8 py-4 rounded-full"
      >
        💬 WhatsApp
      </a>

    </div>

  </div>

  <div className="rounded-3xl overflow-hidden shadow-2xl">
    <img
      src="https://images.unsplash.com/photo-1513151233558-d860c5398176"
      className="w-full h-[600px] object-cover"
      alt="Festa Infantil"
    />
  </div>
<section className="px-10 py-16">

  <div className="grid md:grid-cols-4 gap-6">

    <div className="bg-white rounded-3xl p-8 text-center shadow">
      <h3 className="text-4xl font-bold text-pink-500">1000+</h3>
      <p>Convites Entregues</p>
    </div>

    <div className="bg-white rounded-3xl p-8 text-center shadow">
      <h3 className="text-4xl font-bold text-pink-500">500+</h3>
      <p>Clientes Felizes</p>
    </div>

    <div className="bg-white rounded-3xl p-8 text-center shadow">
      <h3 className="text-4xl font-bold text-pink-500">5⭐</h3>
      <p>Avaliação Média</p>
    </div>

    <div className="bg-white rounded-3xl p-8 text-center shadow">
      <h3 className="text-4xl font-bold text-pink-500">24h</h3>
      <p>Entrega Rápida</p>
    </div>

  </div>

</section>
</section>
      </section>
<section className="px-10 py-20">

  <h3 className="text-4xl font-bold text-center mb-12">
    🌟 Temas Mais Procurados
  </h3>

  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

    {[
      "🎮 Minecraft",
      "👑 Princesas",
      "🦄 Unicórnio",
      "🚀 Astronauta",
      "🦁 Safári",
      "🌸 Jardim"
    ].map((tema) => (

      <div
        key={tema}
        className="bg-white rounded-3xl p-8 text-center shadow hover:scale-105 transition"
      >
        {tema}
      </div>

    ))}

  </div>

</section>

      {/* COMO FUNCIONA */}
      <section className="px-10 py-20 bg-[#efe6da]">
        <h3 className="text-3xl font-serif mb-10 text-center">
          Como Funciona
        </h3>

        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div>
            <p className="text-4xl mb-3">✨</p>
            <h4 className="font-serif text-xl mb-2">Escolha o modelo</h4>
            <p className="text-sm opacity-70">Selecione seu convite favorito</p>
          </div>

          <div>
            <p className="text-4xl mb-3">✏️</p>
            <h4 className="font-serif text-xl mb-2">Personalize</h4>
            <p className="text-sm opacity-70">Edite com seu estilo</p>
          </div>

          <div>
            <p className="text-4xl mb-3">💾</p>
            <h4 className="font-serif text-xl mb-2">Baixe ou compartilhe</h4>
            <p className="text-sm opacity-70">Pronto em segundos</p>
          </div>

        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="px-10 py-20">
        <h3 className="text-3xl font-serif mb-10 text-center">
          O que nossas clientes dizem
        </h3>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="italic opacity-80">
              "Simplesmente perfeito! Meu convite ficou sofisticado e único."
            </p>
            <p className="mt-4 font-semibold">— Mariana</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="italic opacity-80">
              "A experiência é linda e muito fácil de usar."
            </p>
            <p className="mt-4 font-semibold">— Juliana</p>
          </div>

        </div>
      </section>

    </div>
  );
  <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-20 px-10 text-center">

  <h2 className="text-5xl font-bold mb-6">
    ✨ Pronta para criar algo mágico?
  </h2>

  <p className="text-xl mb-8">
    Seu convite personalizado está a poucos cliques de distância.
  </p>

  <a
    href="/catalogo"
    className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold"
  >
    Ver Convites
  </a>

</section>
}