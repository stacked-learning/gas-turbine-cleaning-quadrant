// Quadrant data
const quadrantData = {
  process: {
    title: "Deionised Water",
    subtitle: "Water Purification Methods",
    description: "Deionised Waterwashing for gas turbines uses highly purified water that has had its minerals and contaminants removed, ensuring that no trace metals like sodium (Na) or potassium (K) are introduced into the turbine. These metals can lead to hot corrosion, which damages turbine components. Demineralised water helps prevent surface streaks, watermarks, and corrosion while ensuring that the cleaning agents retain their effectiveness. It is particularly important for both online and offline waterwashing to use deionised water to protect the turbine's performance and structural integrity."
  },
  transport: {
    title: "Offline",
    subtitle: "Offline Waterwashing",
    description: "Offline Waterwashing for gas turbines is performed when the turbine is shut down. It involves flushing the compressor with water to remove contaminants, improving efficiency and preventing fouling buildup. This method allows for a thorough cleaning when the turbine is not in operation."
  },
  storage: {
    title: "Chemical",
    subtitle: "Chemical Cleaning Agents",
    description: "Chemical Waterwashing uses a specially formulated cleaning solution applied to the turbine compressor throughout either an online or offline wash. The chemicals help break down stubborn deposits like oils, salts, and other contaminants, ensuring the turbine runs efficiently once it is back online."
  },
  product: {
    title: "Online",
    subtitle: "Online Waterwashing",
    description: "Online waterwashing for gas turbines is a maintenance process performed while the turbine is still in operation. It helps remove contaminants from the compressor section, improving efficiency and performance without requiring a shutdown. This method is typically used to maintain optimal turbine function during extended operation periods."
  }
};

// Application state
let currentQuadrant = null;
let isDetailView = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
});

// Initialize navigation handlers
function initializeNavigation() {
  const quadrantButtons = document.querySelectorAll('.quadrant-button');
  const navPills = document.querySelectorAll('.nav-pill');
  
  quadrantButtons.forEach(btn => {
    btn.addEventListener('click', () => handleQuadrantClick(btn.dataset.quadrant));
  });
  
  navPills.forEach(btn => {
    btn.addEventListener('click', () => handleQuadrantClick(btn.dataset.quadrant));
  });
}

// Handle quadrant selection
function handleQuadrantClick(quadrant) {
  if (currentQuadrant === quadrant && isDetailView) {
    // Return to grid view
    returnToGrid();
  } else {
    // Show detail view
    showDetailView(quadrant);
  }
}

// Return to grid view
function returnToGrid() {
  currentQuadrant = null;
  isDetailView = false;
  
  document.getElementById('quadrant-grid').classList.remove('hidden');
  document.getElementById('nav-pills').classList.add('hidden');
  document.getElementById('content-area').innerHTML = '';
  document.getElementById('instruction-text').textContent = 
    'Hover over each quadrant to explore, click to view details';
  
  updateActiveButtons();
}

// Show detail view
function showDetailView(quadrant) {
  currentQuadrant = quadrant;
  isDetailView = true;
  
  document.getElementById('quadrant-grid').classList.add('hidden');
  document.getElementById('nav-pills').classList.remove('hidden');
  
  const data = quadrantData[quadrant];
  document.getElementById('instruction-text').textContent = 
    `Click the ${data.title} button again to return to the grid view`;
  
  updateActiveButtons();
  renderContent(quadrant);
}

// Update active button states
function updateActiveButtons() {
  document.querySelectorAll('.quadrant-button, .nav-pill').forEach(btn => {
    if (btn.dataset.quadrant === currentQuadrant && isDetailView) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Render content for selected quadrant
function renderContent(quadrant) {
  const contentArea = document.getElementById('content-area');
  const data = quadrantData[quadrant];
  
  let html = `
    <div class="content-card animate-fade-in">
      <div class="content-card-header">
        <h2 class="content-card-title">${data.title}</h2>
        <div class="content-card-divider"></div>
      </div>
      <div class="content-card-body">
        <p>${data.description}</p>
        <p class="scroll-hint">Scroll Down to Learn More</p>
      </div>
    </div>
  `;
  
  // Add component-specific content
  html += renderComponentContent(quadrant);
  
  contentArea.innerHTML = html;
  
  // Initialize component-specific logic
  initializeComponent(quadrant);
}

// Render component-specific HTML
function renderComponentContent(quadrant) {
  switch(quadrant) {
    case 'product':
      return renderOnlineContent();
    case 'transport':
      return renderOfflineContent();
    case 'storage':
      return renderChemicalContent();
    case 'process':
      return renderDeionisedContent();
    default:
      return '';
  }
}

// Initialize component-specific JavaScript
function initializeComponent(quadrant) {
  switch(quadrant) {
    case 'product':
      initializeOnline();
      break;
    case 'transport':
      initializeOffline();
      break;
    case 'storage':
      initializeChemical();
      break;
    case 'process':
      initializeDeionised();
      break;
  }
}

// === ONLINE COMPONENT ===
function renderOnlineContent() {
  return `
    <div class="online-wrapper" data-component="online">
      <div class="online-progress-container" id="online-nav">
        <nav class="online-timeline-nav" aria-label="Section navigation">
          <ul role="list">
            <li><a href="#introduction" data-section="introduction"><span class="circle"></span><span class="label">Introduction</span></a></li>
            <li><a href="#process" data-section="process"><span class="circle"></span><span class="label">Process</span></a></li>
            <li><a href="#set-up" data-section="set-up"><span class="circle"></span><span class="label">Set-Up</span></a></li>
            <li><a href="#time" data-section="time"><span class="circle"></span><span class="label">Time</span></a></li>
          </ul>
        </nav>
      </div>
      
      <button id="back-to-top" class="online-back-to-top" aria-label="Back to top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <main class="online-main-content">
        <h1 class="online-main-title">Online Waterwash</h1>
        
        <section id="introduction">
          <h2>Introduction</h2>
          <p>Starting and stopping a gas turbine for off-line waterwashing can affect component life. Therefore, extending the time between offline waterwashes can be ideal. However, this method does not regain full power, performing most effectively in the first few compressor stages, but pushing foulant downstream to the other compressor stages. By performing both online and offline washes, much of the power lost due to fowling can be restored.</p>
          <p>Performed while the turbine is running, usually at reduced load (50–80%). This minimises the on-going losses, and extends time between shutdowns.</p>
          <ul>
            <li>Requires no shutdown, meaning minimal production loss.</li>
            <li>Aims to remove light surface contaminants before they harden or bake onto compressor blades.</li>
            <li>Uses atomised demineralised water (sometimes with mild detergent).</li>
          </ul>
          
          <div class="switcher-container">
            <div class="switcher-image-container">
              <img id="online-display-image" src="assets/image_1761195535928_1761262288703-DGsTdqb4.png" alt="Online Washed Blades" />
            </div>
            <p id="online-image-caption" class="switcher-caption">
              Axial Compressor blades which have undergone online washing every 4 days, for a one month operation period.
            </p>
            <div class="switcher-button-group">
              <button class="switcher-btn active" data-image="1">Online Washed Blades</button>
              <button class="switcher-btn inactive" data-image="2">Post-Online Wash Fouling #1</button>
              <button class="switcher-btn inactive" data-image="3">Post-Online Wash Fouling #2</button>
            </div>
          </div>
        </section>
        
        <section id="process">
          <h2>Process</h2>
          <p>The cleaning mixture is injected through atomising spray nozzles located upstream of the compressor section. It is essential that demineralised water is used for both the cleaning and flushing processes to prevent high-temperature corrosion damage.</p>
          <p>Factors to consider include:</p>
          <ul>
            <li>Total solids content (both dissolved and undissolved)</li>
            <li>pH level of the cleaning solution</li>
            <li>Content of alkalis and metals that can promote hot corrosion</li>
          </ul>
          <p>Detergent cleaners are employed in online washes every wash, or every few washes. This is to cause deposits to break off before they become too large - especially if they're insoluble. It is vital that any chemicals used during an online waterwash are non-flammable, especially due to the hot-operating temperatures of gas turbine engines.</p>
          <p>The droplet size should be adequate. If too small, it may evaporate before hitting the compressor blade. If it is too large, it can erode the compressor blades, and lead to increased running costs.</p>
          <figure class="graph-figure">
            <img src="assets/image_1761193652537_1761262283596-QTgVqsNj.png" alt="Online Manifold" class="graph-image" />
            <figcaption>Photo of an Online Manifold</figcaption>
          </figure>
        </section>
        
        <section id="set-up">
          <h2>Set-Up</h2>
          <p>The positioning of the nozzles is critical to achieving a finely atomised cleaning spray. Optimal placement depends on the geometry of the plenum inlet and the resulting airflow patterns to ensure uniform distribution of the cleaning solution.</p>
          <p>The nozzle should produce droplets within the 50–250 micron range. Larger droplets are more difficult for the airstream to carry and will fall down from the air stream quicker, reducing cleaning effectiveness. Lower water injection rates do not necessarily impair on-line cleaning efficiency and can reduce costs associated with water consumption and system wear.</p>
          <p>Heaters are not required for on-line washes, as the compressor and inlet airflow are already at elevated operating temperatures. The combination of warm air and continuous rotation promotes effective atomisation and evaporation of the cleaning solution without the need for external heating.</p>
          <figure class="graph-figure">
            <img src="assets/image_1761192931085_1761262281025-BgaiINnE.png" alt="Adjustable Injection Nozzles" class="graph-image" />
            <figcaption>Adjustable Injection Nozzles which are flush mounted to the Air Inlet Plenum</figcaption>
          </figure>
        </section>
        
        <section id="time">
          <h2>Time</h2>
          <ul>
            <li>On-line waterwashes are carried out between short-intervals, unlike off-line washing. These range from every three days to a week - dictated by local operating conditions.</li>
            <li>Duration is short, typically taking between 5-15 minutes per wash.</li>
          </ul>
          <figure class="graph-figure">
            <img src="assets/image_1761186251491_1761262275110-DbgR3Cl8.png" alt="Graph showing efficiency over time with online and offline washes" class="graph-image" />
            <figcaption>Online washing is used between offline washes, which require scheduled downtime. This provides boosts in efficiency, albeit smaller than that of an offline wash.</figcaption>
          </figure>
        </section>
      </main>
    </div>
  `;
}

function initializeOnline() {
  const images = {
    1: 'assets/image_1761195535928_1761262288703-DGsTdqb4.png',
    2: 'assets/image_1761195546745_1761262291058-DszJJ7vt.png',
    3: 'assets/image_1761195565626_1761262293142-C_zPQKIe.png'
  };
  
  const captions = {
    1: 'Axial Compressor blades which have undergone online washing every 4 days, for a one month operation period.',
    2: 'Fouling seen on First Stage Guide Vanes under these conditions. Without online washing, these deposits would have been worse.',
    3: 'Fouling seen on First Stage Guide Vanes under these conditions. Without online washing, these deposits would have been worse.'
  };
  
  let currentImage = 1;
  
  // Image switcher
  const buttons = document.querySelectorAll('.online-wrapper .switcher-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const imageNum = parseInt(btn.dataset.image);
      if (currentImage === imageNum) return;
      
      const displayImg = document.getElementById('online-display-image');
      const caption = document.getElementById('online-image-caption');
      
      displayImg.classList.add('fade-out');
      setTimeout(() => {
        currentImage = imageNum;
        displayImg.src = images[imageNum];
        caption.textContent = captions[imageNum];
        displayImg.classList.remove('fade-out');
        
        buttons.forEach(b => {
          b.className = parseInt(b.dataset.image) === imageNum ? 'switcher-btn active' : 'switcher-btn inactive';
        });
      }, 150);
    });
  });
  
  // Timeline navigation and scroll handling
  setupScrollHandling('online', '.online-main-title', '#online-nav', '#back-to-top');
}

// === OFFLINE COMPONENT ===
function renderOfflineContent() {
  return `
    <div class="offline-wrapper" data-component="offline">
      <div class="offline-progress-container" id="offline-nav">
        <nav class="offline-timeline-nav" aria-label="Section navigation">
          <ul role="list">
            <li><a href="#introduction" data-section="introduction"><span class="circle"></span><span class="label">Introduction</span></a></li>
            <li><a href="#process" data-section="process"><span class="circle"></span><span class="label">Process</span></a></li>
            <li><a href="#set-up" data-section="set-up"><span class="circle"></span><span class="label">Set-Up</span></a></li>
            <li><a href="#time" data-section="time"><span class="circle"></span><span class="label">Time</span></a></li>
          </ul>
        </nav>
      </div>
      
      <button id="back-to-top-offline" class="offline-back-to-top" aria-label="Back to top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <main class="offline-main-content">
        <h1 class="offline-main-title">Offline Waterwash</h1>
        
        <section id="introduction">
          <h2>Introduction</h2>
          <p>Starting and stopping a gas turbine for off-line waterwashing can affect component life. Therefore, extending the time between offline waterwashes can be ideal. However, this method does not regain full power, performing most effectively in the first few compressor stages, but pushing foulant downstream to the other compressor stages. By performing both online and offline washes, much of the power lost due to fowling can be restored.</p>
          <p>Performed while the turbine is running, usually at reduced load (50–80%). This minimises the on-going losses, and extends time between shutdowns.</p>
          <ul>
            <li>Requires no shutdown, meaning minimal production loss.</li>
            <li>Aims to remove light surface contaminants before they harden or bake onto compressor blades.</li>
            <li>Uses atomised demineralised water (sometimes with mild detergent).</li>
          </ul>
          
          <div class="image-switcher-container">
            <div class="image-container">
              <img id="offline-display-image" src="assets/image_before_washing_1761263062496-CHQq6ZYX.png" alt="Pre-wash metallic fan" />
            </div>
            <div class="caption" id="offline-caption">
              Heavy fouling is visible after long periods without washing, which negatively affects performance.
            </div>
            <div class="button-group">
              <button class="switcher-btn active" data-image="1">PRE-WASH</button>
              <button class="switcher-btn inactive" data-image="2">POST-WASH</button>
            </div>
          </div>
        </section>
        
        <section id="process">
          <h2>Process</h2>
          <p>The cleaning mixture is injected through atomising spray nozzles located upstream of the compressor section. It is essential that demineralised water is used for both the cleaning and flushing processes to prevent high-temperature corrosion damage.</p>
          <p>Factors to consider include:</p>
          <ul>
            <li>Total solids content (both dissolved and undissolved)</li>
            <li>pH level of the cleaning solution</li>
            <li>Content of alkalis and metals that can promote hot corrosion</li>
          </ul>
          <p>Detergent cleaners are employed in online washes every wash, or every few washes. This is to cause deposits to break off before they become too large - especially if they're insoluble. It is vital that any chemicals used during an online waterwash are non-flammable, especially due to the hot-operating temperatures of gas turbine engines.</p>
          <p>The droplet size should be adequate. If too small, it may evaporate before hitting the compressor blade. If it is too large, it can erode the compressor blades, and lead to increased running costs.</p>
        </section>
        
        <section id="set-up">
          <h2>Set-Up</h2>
          <p>The positioning of the nozzles is critical to achieving a finely atomised cleaning spray. Optimal placement depends on the geometry of the plenum inlet and the resulting airflow patterns to ensure uniform distribution of the cleaning solution.</p>
          <p>The nozzle should produce droplets within the 50–250 micron range. Larger droplets are more difficult for the airstream to carry and will fall down from the air stream quicker, reducing cleaning effectiveness. Lower water injection rates do not necessarily impair on-line cleaning efficiency and can reduce costs associated with water consumption and system wear.</p>
          <p>Heaters are not required for on-line washes, as the compressor and inlet airflow are already at elevated operating temperatures. The combination of warm air and continuous rotation promotes effective atomisation and evaporation of the cleaning solution without the need for external heating.</p>
          <figure class="section-image">
            <img src="assets/waterwash_manifold_1761263068052-Ca707PJB.png" alt="Waterwash manifold set-up" />
            <figcaption>Image of a waterwash manifold set-up, used for offline waterwashing.</figcaption>
          </figure>
        </section>
        
        <section id="time">
          <h2>Time</h2>
          <ul>
            <li>On-line waterwashes are carried out between short-intervals, unlike off-line washing. These range from every three days to a week - dictated by local operating conditions.</li>
            <li>Duration is short, typically taking between 5-15 minutes per wash.</li>
          </ul>
          <figure class="section-image">
            <img src="assets/performance_graph_1761263064753-6UJG-vGa.png" alt="Performance graph" />
            <figcaption>A gas turbine engine's performance benefits the most from offline washes. However, their cost mandates that they're performed less frequently.</figcaption>
          </figure>
        </section>
      </main>
    </div>
  `;
}

function initializeOffline() {
  const images = {
    1: 'assets/image_before_washing_1761263062496-CHQq6ZYX.png',
    2: 'assets/image_after_washing_1761263059982-Da7sdPGs.png'
  };
  
  const captions = {
    1: 'Heavy fouling is visible after long periods without washing, which negatively affects performance.',
    2: 'Following an offline wash, the compressor blades are cleaned restoring most lost performance.'
  };
  
  let currentImage = 1;
  
  // Image switcher
  const buttons = document.querySelectorAll('.offline-wrapper .switcher-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const imageNum = parseInt(btn.dataset.image);
      if (currentImage === imageNum) return;
      
      const displayImg = document.getElementById('offline-display-image');
      const caption = document.getElementById('offline-caption');
      
      displayImg.classList.add('fade-out');
      caption.classList.add('fade-out');
      setTimeout(() => {
        currentImage = imageNum;
        displayImg.src = images[imageNum];
        caption.textContent = captions[imageNum];
        displayImg.classList.remove('fade-out');
        caption.classList.remove('fade-out');
        
        buttons.forEach(b => {
          b.className = parseInt(b.dataset.image) === imageNum ? 'switcher-btn active' : 'switcher-btn inactive';
        });
      }, 150);
    });
  });
  
  // Timeline navigation and scroll handling
  setupScrollHandling('offline', '.offline-main-title', '#offline-nav', '#back-to-top-offline');
}

// === CHEMICAL COMPONENT ===
function renderChemicalContent() {
  return `
    <div class="chemical-wrapper" data-component="chemical">
      <div class="chemical-progress-container" id="chemical-nav">
        <nav class="chemical-timeline-nav" aria-label="Section navigation">
          <ul role="list">
            <li><a href="#introduction" data-section="introduction"><span class="circle"></span><span class="label">Water vs Chemical Cleaning</span></a></li>
            <li><a href="#process" data-section="process"><span class="circle"></span><span class="label">Types of Detergents/Chemical Cleaning Agents</span></a></li>
            <li><a href="#set-up" data-section="set-up"><span class="circle"></span><span class="label">Environmental Concerns</span></a></li>
          </ul>
        </nav>
      </div>
      
      <button id="back-to-top-chemical" class="chemical-back-to-top" aria-label="Back to top">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <main class="chemical-main-content">
        <h1 class="chemical-main-title">Chemical Waterwash</h1>
        
        <section id="introduction">
          <h2>Water vs Chemical Cleaning</h2>
          <p>Water alone is an inefficient means of cleaning a gas turbine, as hydrocarbons are the most common fouling substance. Firstly, water generally doesn't combine chemically with hydrocarbons. Heating water can assist with hydrocarbon removal, but this can cause issues with water evaporating before an adequate droplet migration depth is achieved. High-pressure water-based cleaning can also be effective, but can risk eroding the compressor blades. Likewise, if water isn't demineralised, it can lead to issues of hot corrosion in the long term.</p>
          <p>In contrast, chemical waterwash are much more effective. Chemical cleaning is based on lipophiles and hydrophiles. Lipophiles are attracted to hydrocarbons, whilst hydrophiles are attracted to water.</p>
        </section>
        
        <section id="process">
          <h2>Types of Detergents/Chemical Cleaning Agents</h2>
          <p>A detergent is a cleaning agent which comprise of mainly surfactants, but can be combined with builders, solvents, pH adjusters, corrosion inhibitors, and anti-foaming or foaming agents.</p>
          
          <h3>Solvents</h3>
          <p>Solvents: Are responsible for dissolving another material (the solute). They're almost never used for online washes due to their flammability. A key rule for solubility is that like-substances dissolve other like- substances.</p>
          <ul>
            <li><strong>Polar Solvents:</strong> Includes water (the "universal solvent"), additionally alcohols, esters, ethers, and ketones are less polar compounds which have both a polar and non-polar section, allowing them to dissolve in water, and be non-polar enough to penetrate oily deposits.</li>
            <li><strong>Non-Polar Solvents:</strong> Mineral spirits, kerosene, naphtha, and aromatic hydrocarbons. Good for removing other non-polar substances.</li>
          </ul>
          <div class="surfactant-image">
            <img src="assets/image_1761198440227_1761264566168-8HOENOn2.png" alt="Solutions diagram showing solvent and solute" />
            <p class="image-caption">A solvent works by dissolving a solute. Water is a common solvent.</p>
          </div>
          
          <h3>Surfactants</h3>
          <p>Consisting of both hydrophobic and hydrophilic ends, the hydrophobic portion of the surfactant embeds itself within the hydrophobic substance, while the hydrophilic end is drawn to water. This interaction leads to the formation of micelles, which effectively transport the hydrophobic substance within water. Additionally, these molecules reduce the surface tension of the water, enhancing its ability to interact with other substances.</p>
          <ul>
            <li><strong>Anionic surfactants</strong> – Strong cleaning and foaming agents; excellent at lifting particulate soils. Commonly used in dishwashing, floor and bathroom cleaners due to their high detergency and stable foam formation.</li>
            <li><strong>Nonionic surfactants</strong> – Effective degreasers; good at dissolving oily or organic residues. Some types produce stable foam, others suppress it, making them versatile for both manual and automatic cleaning applications.</li>
            <li><strong>Cationic surfactants</strong> – Positively charged and adhere well to surfaces. Used where surface conditioning or disinfection is needed—long-chain types act as fabric and hair softeners, while short-chain types provide antimicrobial action in sanitizers.</li>
          </ul>
          <div class="surfactant-image">
            <img src="assets/image_1761198144218_1761264563215-DzMoyT2v.png" alt="Surfactant molecule diagram" />
            <p class="image-caption">Surfactants operate through one end being hydrophillic (attracted to water), and the other being hydrophobic (which can attract it to the substance that is intended for removal). These are common in detergent formulations.</p>
          </div>
        </section>
        
        <section id="set-up">
          <h2>Environmental Concerns</h2>
          <p>There are many environmental concerns associated with chemical compressor washing.</p>
          <ul>
            <li><strong>Chemical Runoff:</strong> Results from cleaning solutions being disposed incorrectly. This can lead to contamination of soil and water systems, alongside the accumulation of non-biodegradable chemicals in the environment - posing risks to many ecosystems.</li>
            <li><strong>Emissions:</strong> The high temperatures waterwashes are undertaken at can release harmful vapors and/or aerosols into the environment.</li>
            <li><strong>Resourcefulness:</strong> Both water, cleaning agents, and energy are required to perform a waterwash. Inefficient methods can lead to increased resource wastage.</li>
          </ul>
        </section>
      </main>
    </div>
  `;
}

function initializeChemical() {
  setupScrollHandling('chemical', '.chemical-main-title', '#chemical-nav', '#back-to-top-chemical');
}

// === DEIONISED COMPONENT ===
function renderDeionisedContent() {
  return `
    <div class="deionised-water-wrapper" data-component="deionised">
      <nav id="timeline-nav" aria-label="Section navigation">
        <ul role="list">
          <li><a href="#introduction" data-section="introduction"><span class="circle"></span><span class="label">Introduction</span></a></li>
          <li><a href="#process" data-section="process"><span class="circle"></span><span class="label">Common Water Contaminants</span></a></li>
          <li><a href="#set-up" data-section="set-up"><span class="circle"></span><span class="label">Water Tests</span></a></li>
          <li><a href="#time" data-section="time"><span class="circle"></span><span class="label">Water Purification Systems</span></a></li>
        </ul>
      </nav>
      
      <main class="deionised-main-content">
        <div class="deionised-water-container">
          <h1 class="main-title">Deionised Waterwash</h1>
          
          <section id="introduction">
            <h2>Introduction</h2>
            <p>Waterwashing, both with and without detergent should use deionised/demineralised water. The water quality is almost always specified with regards to online washing due to the possibility of introducing harmful trace metal contaminants like Na (sodium) and K (potassium), which can lead to hot corrosion.</p>
            <p>Demineralised water rinses alone can be effective for water-soluble deposits. However, if deposits contain trace quantities of hydrocarbon, a detergent will be required to break the surface tension of these deposits, and remove them.</p>
            <figure class="intro-image">
              <img src="assets/image_1761196839327-b11Q7avs.png" alt="Hot corrosion damage on turbine components" />
              <figcaption>Water which isn't deionised or demineralised can accelerate hot corrosion. Shown in the picture is the damage corrision can result in.</figcaption>
            </figure>
          </section>
          
          <section id="process">
            <h2>Common Water Contaminants</h2>
            <p>Common contaminants in water include dissolved solids, trace metals, and organic compounds that can affect water quality.</p>
            <div class="element-buttons">
              <button class="element-btn" title="Sodium">Na</button>
              <button class="element-btn" title="Potassium">K</button>
              <button class="element-btn" title="Vanadium">V</button>
              <button class="element-btn" title="Lead">Pb</button>
            </div>
          </section>
          
          <section id="set-up">
            <h2>Water Tests</h2>
            <p>Water containing contaminants can:</p>
            <ul>
              <li>Further damage components of a gas turbine - reacting with metals like titanium and aluminium. This can weaken structural integrity,</li>
              <li>Leave streaks, spots, and watermarks on the surfaces</li>
            </ul>
            <h3>Water Test Checks</h3>
            <div class="test-buttons">
              <div class="test-button-row">
                <button class="test-btn">Conductivity</button>
                <button class="test-btn">Dissolved & Undissolved Solids</button>
                <button class="test-btn">Total Alkali metals (Na, K)</button>
              </div>
              <div class="test-button-row">
                <button class="test-btn">Hot Corrosion Metals</button>
                <button class="test-btn">pH</button>
              </div>
            </div>
          </section>
          
          <section id="time">
            <h2>Water Purification Systems</h2>
            
            <div class="purification-system">
              <div class="system-text">
                <h3>Reverse Osmosis</h3>
                <p>A water purification process that uses a semi-permeable membrane to remove ions, molecules, and larger particles from water.</p>
              </div>
              <div class="system-image">
                <img src="assets/image_1761196378110-BlNAfESw.png" alt="Reverse Osmosis System" />
              </div>
            </div>
            
            <div class="purification-system">
              <div class="system-text">
                <h3>Nanofiltration</h3>
                <p>A membrane filtration process that operates between ultrafiltration and reverse osmosis, removing specific contaminants while allowing some minerals to pass through.</p>
              </div>
              <div class="system-image">
                <img src="assets/image_1761196394159-VHvap1oi.png" alt="Nanofiltration System" />
              </div>
            </div>
            
            <div class="purification-system">
              <div class="system-text">
                <h3>Deionisation System</h3>
                <p>Removes mineral ions from water using ion exchange resins, producing highly purified water for industrial applications.</p>
              </div>
              <div class="system-image">
                <img src="assets/image_1761196414644-BhOo259j.png" alt="Deionisation System" />
              </div>
            </div>
            
            <div class="purification-system">
              <div class="system-text">
                <h3>Electrodeionisation (EDI)</h3>
                <p>Combines ion exchange resins with electricity to remove ionized species from water, providing continuous high-purity water production.</p>
              </div>
              <div class="system-image">
                <img src="assets/image_1761196429576--E1a6E4R.png" alt="Electrodeionisation (EDI) System" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  `;
}

function initializeDeionised() {
  setupScrollHandling('deionised', '.main-title', '#timeline-nav', null);
}

// Common scroll handling utility
function setupScrollHandling(component, titleSelector, navSelector, backToTopSelector) {
  const mainTitle = document.querySelector(titleSelector);
  const timelineNav = document.querySelector(navSelector);
  const backToTopBtn = backToTopSelector ? document.querySelector(backToTopSelector) : null;
  const navLinks = document.querySelectorAll(`${navSelector} a`);
  const sections = document.querySelectorAll(`[data-component="${component}"] section`);
  
  // Intersection Observer for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNavItem(navLinks, entry.target.id);
      }
    });
  }, {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  });
  
  sections.forEach(section => observer.observe(section));
  
  // Nav link click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        updateActiveNavItem(navLinks, targetId);
      }
    });
  });
  
  // Scroll handler
  const handleScroll = () => {
    if (mainTitle) {
      const rect = mainTitle.getBoundingClientRect();
      if (rect.bottom <= 0) {
        timelineNav.classList.add('visible');
      } else {
        timelineNav.classList.remove('visible');
      }
    }
    
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  
  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Update active nav item
function updateActiveNavItem(navLinks, sectionId) {
  navLinks.forEach(link => {
    if (link.dataset.section === sectionId) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
