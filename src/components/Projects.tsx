export const Projects = () => {
    return (
        <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6">Professional Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skipper Hospitality Projects */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Cash Widget - Skipper Booking Engine</h3>
              <p className="text-gray-600 text-sm mt-1">Skipper Hospitality</p>
              <p className="text-gray-700 mt-2">
                A modern booking widget built with Svelte and TypeScript, featuring payment processing and
                real-time availability checking.
              </p>
              <div className="mt-4 space-x-4">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">Svelte</span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">TypeScript</span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">X-state</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Hospitality Website Solutions</h3>
              <p className="text-gray-600 text-sm mt-1">Skipper Hospitality</p>
              <p className="text-gray-700 mt-2">
                Custom 11ty framework for developing high-performance hotel websites with island architecture.
              </p>
              <div className="mt-4 space-x-4">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">11ty</span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">Node.js</span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">Tailwind</span>
              </div>
            </div>

            {/* Butler Projects */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">ButlerMenu.com</h3>
              <p className="text-gray-600 text-sm mt-1">Butler Hospitality</p>
              <p className="text-gray-700 mt-2">
                Hotel guest amenity ordering platform with real-time order tracking and kitchen management.
              </p>
              <div className="mt-4 space-x-4">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">React</span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">Node.js</span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">Bulma CSS</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Butler Mobile & Expeditor Apps</h3>
              <p className="text-gray-600 text-sm mt-1">Butler Hospitality</p>
              <p className="text-gray-700 mt-2">
                Cross-platform mobile applications for order management and kitchen operations.
              </p>
              <div className="mt-4 space-x-4">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">React Native</span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">Styled Components</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Open Source Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">svelte-lightbox</h3>
              <p className="text-gray-700 mt-2">
                A lightweight image gallery component for Svelte applications with 500+ weekly downloads.
              </p>
              <a href="https://github.com/azs06/svelte-lightbox" 
                 className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                View Project →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Skipper Organisms</h3>
              <p className="text-gray-700 mt-2">
                An open-source web components library for building hospitality websites.
              </p>
              <a href="https://github.com/Skipper-Hospitality/organisms" 
                 className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                View Project →
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Client Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">Green School Romania</h3>
              <p className="text-gray-600 text-sm mt-1">Client Project</p>
              <p className="text-gray-700 mt-2">
                Website development for an innovative educational institution.
              </p>
              <a href="https://green-school.ro/" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                Visit Website →
              </a>
            </div>
          </div>
        </section>
      </div>
    )
}