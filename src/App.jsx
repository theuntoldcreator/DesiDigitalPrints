import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import GeneratorWizard from './components/GeneratorWizard';

function App() {
  const [isDesigning, setIsDesigning] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    // Fetch prebuilt templates from our SQLite via Express backend
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(err => console.error('Error fetching templates:', err));
  }, []);

  const handleStartDesign = (template) => {
    setSelectedTemplate(template);
    setIsDesigning(true);
  };

  return (
    <div className="min-h-screen bg-base-100 font-sans text-base-content">
      {!isDesigning ? (
        <LandingPage 
          templates={templates} 
          onStart={(template) => handleStartDesign(template)} 
        />
      ) : (
        <GeneratorWizard 
          selectedTemplate={selectedTemplate}
          onBack={() => setIsDesigning(false)} 
        />
      )}
    </div>
  );
}

export default App;
