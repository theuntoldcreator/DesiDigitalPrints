export const generateHtml = (config) => {
  const { title, groomName, brideName, date, venue, colorTheme, imageQuery, daisyTheme, fontFamily } = config;
  
  // Provide reliable image backup from lorempicsum if search is empty
  const imageUrl = imageQuery ? `https://loremflickr.com/1200/800/${encodeURIComponent(imageQuery)}` : 'https://images.unsplash.com/photo-1583089892943-e02e52f17004?q=80&w=2670&auto=format&fit=crop';

  const fontUrl = fontFamily === 'Montserrat' 
    ? 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap'
    : 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap';

  return `
<!DOCTYPE html>
<html lang="en" data-theme="${daisyTheme || 'luxury'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'Wedding Invitation'}</title>
    <!-- DaisyUI and Tailwind CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.10.1/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${fontUrl}" rel="stylesheet">
    <style>
      body {
        font-family: '${fontFamily || 'Playfair Display'}', serif;
      }
      .font-serif {
        font-family: 'Playfair Display', serif;
      }
      .parallax {
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    </style>
</head>
<body class="antialiased min-h-screen bg-base-200 overflow-x-hidden text-base-content">

  <!-- Hero Section with DaisyUI Hero Component -->
  <div class="hero min-h-screen parallax relative" style="background-image: url('${imageUrl}');">
    <div class="hero-overlay bg-black bg-opacity-60 backdrop-blur-sm"></div>
    <div class="hero-content text-center text-neutral-content flex-col gap-6 relative z-10 w-full">
      <div class="badge badge-primary badge-outline px-6 py-4 text-xs tracking-[0.3em] font-bold uppercase rounded-full border-2 bg-black/40 text-yellow-500">
        ${title || 'You are Invited'}
      </div>
      
      <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 mt-4">
        <h1 class="text-7xl md:text-9xl font-bold text-white drop-shadow-2xl font-serif leading-none tracking-tight">
          ${groomName || 'Rahul'}
        </h1>
        <div class="text-5xl md:text-6xl text-primary font-light italic drop-shadow-lg">&</div>
        <h1 class="text-7xl md:text-9xl font-bold text-white drop-shadow-2xl font-serif leading-none tracking-tight">
          ${brideName || 'Aisha'}
        </h1>
      </div>

      <div class="bg-base-100/10 backdrop-blur-md rounded-2xl px-12 py-6 border border-white/20 mt-12 shadow-2xl">
         <p class="text-2xl md:text-3xl tracking-[0.2em] font-light text-white uppercase drop-shadow-md">
           ${date || 'December 24, 2026'}
         </p>
      </div>
    </div>
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
       <div class="w-8 h-12 border-2 text-white border-white/50 rounded-full flex justify-center pt-2">
         <div class="w-1 h-3 bg-white/50 rounded-full animate-ping"></div>
       </div>
    </div>
  </div>

  <!-- Venue Details -->
  <main class="py-32 px-6 bg-base-100 relative z-20 shadow-2xl rounded-t-[4rem] -mt-10 border-t border-base-300">
    <div class="max-w-5xl mx-auto flex flex-col items-center">
      
      <div class="text-center w-full max-w-2xl mb-24">
        <h2 class="text-5xl font-serif font-bold mb-6 text-base-content relative inline-block">
          The Celebration
          <div class="absolute -bottom-4 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </h2>
        <p class="text-base-content/80 text-xl leading-relaxed mt-10">
          We invite you to witness the beginning of our new journey together. 
          Your presence will bring joy to our hearts and blessings to our union.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full text-left">
        <!-- DaisyUI Card When -->
        <div class="card bg-base-200 shadow-xl border border-base-300 hover:border-primary transition-colors group overflow-hidden">
          <div class="h-2 w-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
          <div class="card-body">
            <h3 class="card-title text-3xl font-serif text-primary border-b border-base-300 pb-4 mb-4">When</h3>
            <p class="text-xl text-base-content/90 font-medium">${date || 'December 24, 2026'}</p>
            <div class="card-actions justify-start mt-6">
              <button class="btn btn-outline btn-primary btn-sm outline-none border-2">Add to Calendar</button>
            </div>
          </div>
        </div>

        <!-- DaisyUI Card Where -->
        <div class="card bg-base-200 shadow-xl border border-base-300 hover:border-secondary transition-colors group overflow-hidden">
          <div class="h-2 w-full bg-secondary/20 group-hover:bg-secondary transition-colors"></div>
          <div class="card-body">
            <h3 class="card-title text-3xl font-serif text-secondary border-b border-base-300 pb-4 mb-4">Where</h3>
            <p class="text-xl text-base-content/90 font-medium">${venue || 'The Grand Palace, Jaipur, India'}</p>
            <div class="card-actions justify-start mt-6">
              <button class="btn btn-outline btn-secondary btn-sm outline-none border-2">Get Directions</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider before:bg-primary/20 after:bg-primary/20 my-24 w-full">✨</div>

      <!-- DaisyUI RSVP Hero -->
      <div class="hero bg-base-300 rounded-[3rem] shadow-2xl overflow-hidden py-16 w-full border border-base-200 relative group">
        <div class="absolute inset-0 bg-base-100/50 backdrop-blur-3xl group-hover:bg-transparent transition-colors duration-1000 z-0"></div>
        <div class="hero-content text-center relative z-10 w-full max-w-md">
          <div class="max-w-md bg-base-100/80 p-10 rounded-3xl shadow-xl backdrop-blur-md border border-white/10">
            <h2 class="text-4xl font-serif font-bold text-base-content mb-4">Are you attending?</h2>
            <p class="mb-8 text-base-content/70 text-lg">We would be honored to have you with us on our special day.</p>
            <button class="btn btn-primary btn-lg w-full shadow-lg shadow-primary/30 rounded-full font-bold text-lg hover:-translate-y-1 transition-transform">
              RSVP Now
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </main>

  <footer class="footer footer-center p-10 bg-neutral text-neutral-content border-t-4 border-primary">
    <aside>
      <p class="opacity-60">Handcrafted with <span class="text-rose-500 font-bold">♥</span> using Desi Digital Prints</p>
    </aside>
  </footer>

</body>
</html>
  `;
};
